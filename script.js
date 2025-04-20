// --- Global Constants and Rates ---
const originalRates = { local: 1.46, juguang: 1.75, ziqiang: 2.27 };
const newRates = {
    local: { '<50': 2.18, '50.1-100': 1.92, '100.1-200': 1.81, '200.1-300': 1.53, '300.1+': 1.42 },
    juguang: { '<50': 2.61, '50.1-100': 2.30, '100.1-200': 2.17, '200.1-300': 1.83, '300.1+': 1.70 },
    ziqiang: { '<50': 3.39, '50.1-100': 2.98, '100.1-200': 2.81, '200.1-300': 2.37, '300.1+': 2.20 }
};


// --- Initialization ---
document.addEventListener('DOMContentLoaded', () => {
    populateStationDropdowns();
    initializeTheme(); // Set theme on load
});

// --- Theme Toggler ---
function initializeTheme() {
    const storedTheme = localStorage.getItem('theme') || 'light'; // Default to light
    document.documentElement.setAttribute('data-bs-theme', storedTheme);
    updateTogglerIcon(storedTheme);

    const toggler = document.getElementById('theme-toggler');
    if(toggler){
        toggler.addEventListener('click', () => {
            const currentTheme = document.documentElement.getAttribute('data-bs-theme');
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            document.documentElement.setAttribute('data-bs-theme', newTheme);
            localStorage.setItem('theme', newTheme);
            updateTogglerIcon(newTheme);
        });
    } else {
        console.error("Theme toggler button not found");
    }
}

function updateTogglerIcon(theme) {
     const toggler = document.getElementById('theme-toggler');
     if (!toggler) return;
     const icon = toggler.querySelector('i');
     if (!icon) return;
     if (theme === 'dark') {
         icon.classList.remove('bi-moon-stars-fill');
         icon.classList.add('bi-sun-fill');
     } else {
         icon.classList.remove('bi-sun-fill');
         icon.classList.add('bi-moon-stars-fill');
     }
}


// --- Station Dropdown Population ---
function populateStationDropdowns() {
    const startSelect = document.getElementById('startStation');
    const endSelect = document.getElementById('endStation');
    startSelect.innerHTML = ''; // Clear existing options
    endSelect.innerHTML = '';

    // 1. Get station list and filter out internal keys like _lineGroups
    const stationList = Object.values(stationsData).filter(s => typeof s === 'object' && s.name);

    // 2. Sort stations
    stationList.sort((a, b) => {
        const groupA = stationsData._lineGroups[a.lineGroup] || { order: 99 };
        const groupB = stationsData._lineGroups[b.lineGroup] || { order: 99 };
        const lineOrderDiff = groupA.order - groupB.order;
        if (lineOrderDiff !== 0) return lineOrderDiff;

        // Within the same group, sort by mileage
        // Handle branch lines having mileage relative to base
        let mileageA = a.mileage;
        let mileageB = b.mileage;
         if (a.baseStation) mileageA = (stationsData[a.baseStation]?.mileage || 0) + a.mileage; // Approximate main line pos
         if (b.baseStation) mileageB = (stationsData[b.baseStation]?.mileage || 0) + b.mileage;

        return mileageA - mileageB;
    });

    // 3. Group stations and create options
    const groups = {};
    stationList.forEach(station => {
        const groupKey = station.lineGroup || "其他"; // Fallback group
        if (!groups[groupKey]) {
            groups[groupKey] = [];
        }
        groups[groupKey].push(station);
    });

    // 4. Create optgroups and options, ordered by group sortOrder
    const sortedGroupKeys = Object.keys(groups).sort((a, b) => {
         const orderA = stationsData._lineGroups[a]?.order ?? 99;
         const orderB = stationsData._lineGroups[b]?.order ?? 99;
         return orderA - orderB;
    });

    sortedGroupKeys.forEach(groupKey => {
        const optgroup = document.createElement('optgroup');
        optgroup.label = stationsData._lineGroups[groupKey]?.label || groupKey;

        groups[groupKey].forEach(station => {
            const option = document.createElement('option');
            option.value = station.name;
            option.textContent = station.name;
            optgroup.appendChild(option);
        });
        startSelect.appendChild(optgroup.cloneNode(true)); // Clone for end station
        endSelect.appendChild(optgroup);
    });


    // Set default different values if possible
    if (stationList.find(s => s.name === "台北") && stationList.find(s => s.name === "高雄")) {
        startSelect.value = "台北";
        endSelect.value = "高雄";
    } else if (stationList.length > 1) {
        startSelect.value = stationList[0].name;
        endSelect.value = stationList[stationList.length - 1].name;
    }
}


// --- Core Logic ---

function getStation(name) {
    if (!stationsData || !stationsData[name] || name === '_lineGroups') {
        // console.error(`Station data lookup failed for: ${name}`);
        return null;
    }
    return stationsData[name];
}


// **REVISED Distance Calculation - Less Prone to Recursion**
// Cache for memoization
const distanceCache = new Map();

function calculatePhysicalDistance(startName, endName, depth = 0) {
    const MAX_DEPTH = 10; // Adjust as needed
    if (depth > MAX_DEPTH) {
        return { error: `遞迴深度過高 (${startName} <-> ${endName})` };
    }

    // Check cache
    const cacheKey = [startName, endName].sort().join('->');
    if (distanceCache.has(cacheKey)) {
        return distanceCache.get(cacheKey);
    }

    const s = getStation(startName);
    const e = getStation(endName);

    if (!s || !e) return { error: `無法取得車站資料 (${startName}/${endName})` };
    if (startName === endName) return { distance: 0 };

    // Validate station data
    if (s.baseStation === startName || e.baseStation === endName) {
        return { error: `車站資料錯誤：基站循環 (${startName}/${endName})` };
    }

    // --- Direct Same Line Calculation (Base Case) ---
    if (s.line === e.line && typeof s.mileage === 'number' && typeof e.mileage === 'number') {
        if (s.baseStation) {
            return { distance: Math.abs(s.mileage - e.mileage) };
        } else {
            return { distance: Math.abs(s.mileage - e.mileage) };
        }
    }

    // --- Branch Line Handling ---
    let currentS = s;
    let currentE = e;
    let distAcc = 0;

    if (currentS.baseStation) {
        const baseS = getStation(currentS.baseStation);
        if (!baseS) return { error: `無法取得 ${startName} 的主線基站 ${currentS.baseStation}` };
        distAcc += currentS.mileage;
        currentS = baseS;
    }
    if (currentE.baseStation) {
        const baseE = getStation(currentE.baseStation);
        if (!baseE) return { error: `無法取得 ${endName} 的主線基站 ${currentE.baseStation}` };
        distAcc += currentE.mileage;
        currentE = baseE;
    }

    if (currentS.name === currentE.name) {
        return { distance: distAcc };
    }

    // --- Same Main Line After Branch Resolution ---
    if (currentS.line === currentE.line && typeof currentS.mileage === 'number' && typeof currentE.mileage === 'number') {
        return { distance: distAcc + Math.abs(currentS.mileage - currentE.mileage) };
    }

    // --- Different Main Lines or Complex Paths ---
    const isWestS = currentS.segment && currentS.segment !== 'East' && currentS.segment !== 'Pingxi' && currentS.segment !== 'South-Link';
    const isWestE = currentE.segment && currentE.segment !== 'East' && currentE.segment !== 'Pingxi' && currentE.segment !== 'South-Link';
    const isEastS = currentS.segment && (currentS.segment === 'East-North' || currentS.segment === 'Hualien-Taitung' || currentS.segment === 'South-Link' || currentS.segment === 'Pingxi');
    const isEastE = currentE.segment && (currentE.segment === 'East-North' || currentE.segment === 'Hualien-Taitung' || currentE.segment === 'South-Link' || currentE.segment === 'Pingxi');

    // Case 1: East <-> West
    if (isWestS !== isWestE || isEastS !== isEastE) {
        const taipei = getStation(TAIPEI);
        const fangliao = getStation(FANG_LIAO);

        let pathViaTaipei = Infinity;
        let pathViaFangliao = Infinity;

        // Optimize for same-line calculations
        if (currentS.line === taipei.line && typeof currentS.mileage === 'number' && typeof taipei.mileage === 'number') {
            pathViaTaipei = Math.abs(currentS.mileage - taipei.mileage);
        } else {
            pathViaTaipei = calculatePhysicalDistance(currentS.name, TAIPEI, depth + 1).distance ?? Infinity;
        }
        if (currentE.line === taipei.line && typeof currentE.mileage === 'number' && typeof taipei.mileage === 'number') {
            pathViaTaipei += Math.abs(currentE.mileage - taipei.mileage);
        } else {
            pathViaTaipei += calculatePhysicalDistance(TAIPEI, currentE.name, depth + 1).distance ?? Infinity;
        }

        if (currentS.line === fangliao.line && typeof currentS.mileage === 'number' && typeof fangliao.mileage === 'number') {
            pathViaFangliao = Math.abs(currentS.mileage - fangliao.mileage);
        } else {
            pathViaFangliao = calculatePhysicalDistance(currentS.name, FANG_LIAO, depth + 1).distance ?? Infinity;
        }
        if (currentE.line === fangliao.line && typeof currentE.mileage === 'number' && typeof fangliao.mileage === 'number') {
            pathViaFangliao += Math.abs(currentE.mileage - fangliao.mileage);
        } else {
            pathViaFangliao += calculatePhysicalDistance(FANG_LIAO, currentE.name, depth + 1).distance ?? Infinity;
        }

        if (pathViaTaipei === Infinity && pathViaFangliao === Infinity) {
            return { error: `無法計算東西幹線路徑 (${currentS.name} <-> ${currentE.name})` };
        }

        const result = { distance: distAcc + Math.min(pathViaTaipei, pathViaFangliao) };
        distanceCache.set(cacheKey, result);
        return result;
    }

    // Case 2: Both West - Mountain/Coast Logic
    if (isWestS && isWestE) {
        const segS = currentS.segment;
        const segE = currentE.segment;
        const isBetweenJunctionsS = segS === 'Mountain' || segS === 'Coast';
        const isBetweenJunctionsE = segE === 'Mountain' || segE === 'Coast';

        if ((segS === 'West-North' && segE === 'West-South') || (segS === 'West-South' && segE === 'West-North') ||
            (segS === 'West-North' && segE === 'Pingtung') || (segS === 'Pingtung' && segE === 'West-North')) {
            return { distance: distAcc + Math.abs(currentS.mileage - currentE.mileage) };
        } else if (((segS === 'West-North' || segS === 'West-South' || segS === 'Pingtung') && isBetweenJunctionsE) ||
                   ((segE === 'West-North' || segE === 'West-South' || segE === 'Pingtung') && isBetweenJunctionsS)) {
            const distMtn = Math.abs(currentS.mileage - currentE.mileage);
            const distToZhunanS = calculatePhysicalDistance(currentS.name, ZHU_NAN, depth + 1).distance ?? Infinity;
            const distToChanghuaS = calculatePhysicalDistance(currentS.name, CHANG_HUA, depth + 1).distance ?? Infinity;
            const distToZhunanE = calculatePhysicalDistance(currentE.name, ZHU_NAN, depth + 1).distance ?? Infinity;
            const distToChanghuaE = calculatePhysicalDistance(currentE.name, CHANG_HUA, depth + 1).distance ?? Infinity;
            const coastLen = Math.abs(stationsData[ZHU_NAN].mileage - stationsData[CHANG_HUA].mileageCoast);
            const pathViaCoastJct = Math.min(distToZhunanS + coastLen + distToChanghuaE, distToChanghuaS + coastLen + distToZhunanE);

            if (isNaN(distMtn) || isNaN(pathViaCoastJct)) {
                return { error: `計算山海線路徑錯誤 (${currentS.name} <-> ${currentE.name})` };
            }
            const result = { distance: distAcc + Math.min(distMtn, pathViaCoastJct) };
            distanceCache.set(cacheKey, result);
            return result;
        } else if (isBetweenJunctionsS && isBetweenJunctionsE && segS !== segE) {
            const distViaZhunan = (calculatePhysicalDistance(currentS.name, ZHU_NAN, depth + 1).distance ?? Infinity) +
                                  (calculatePhysicalDistance(ZHU_NAN, currentE.name, depth + 1).distance ?? Infinity);
            const distViaChanghua = (calculatePhysicalDistance(currentS.name, CHANG_HUA, depth + 1).distance ?? Infinity) +
                                    (calculatePhysicalDistance(CHANG_HUA, currentE.name, depth + 1).distance ?? Infinity);
            if (distViaZhunan === Infinity && distViaChanghua === Infinity) {
                return { error: `計算山海線之間路徑錯誤 (${currentS.name} <-> ${currentE.name})` };
            }
            const result = { distance: distAcc + Math.min(distViaZhunan, distViaChanghua) };
            distanceCache.set(cacheKey, result);
            return result;
        } else {
            if (currentS.line === 'Coast' && currentE.line === 'Coast') {
                return { distance: distAcc + Math.abs(currentS.mileage - currentE.mileage) };
            }
            return { distance: distAcc + Math.abs(currentS.mileage - currentE.mileage) };
        }
    }

    // Case 3: Both East
    if (isEastS && isEastE) {
        return { distance: distAcc + Math.abs(currentS.mileage - currentE.mileage) };
    }

    // Fallback / Error Case
    console.error("Unhandled distance calculation path:", startName, "->", endName);
    return { error: "無法計算此路徑里程" };
}


// Calculates the distance to be used for FARE calculation, applying rules
function getFareDistance(startName, endName) {
     // For most cases, Fare Distance = Physical Distance after resolving branches/paths
     // The special rules are mainly about WHICH path's distance to use

    const s = getStation(startName);
    const e = getStation(endName);
    if (!s || !e) return { error: "無法取得車站資料" };

     // Resolve branches first to get main line equivalents
     let currentS = s;
     let currentE = e;
     if (currentS.baseStation) currentS = getStation(currentS.baseStation);
     if (currentE.baseStation) currentE = getStation(currentE.baseStation);
     if (!currentS || !currentE) return { error: "無法取得主線基站資料" }; // Error if base station missing

     const segS = currentS.segment;
     const segE = currentE.segment;
     const isWestSideS = segS && segS !== 'East' && segS !== 'Pingxi' && segS !== 'South-Link';
     const isWestSideE = segE && segE !== 'East' && segE !== 'Pingxi' && segE !== 'South-Link';
     const isBetweenJunctionsS = segS === 'Mountain' || segS === 'Coast';
     const isBetweenJunctionsE = segE === 'Mountain' || segE === 'Coast';

     // Apply specific Mountain/Coast Fare Logic Rules FIRST
     if (isWestSideS && isWestSideE) {
          if (( (segS === 'West-North') && (segE === 'West-South' || segE === 'Pingtung') ) ||
              ( (segE === 'West-North') && (segS === 'West-South' || segS === 'Pingtung') )) {
             // Rule 1: North <-> South: Use Mountain Line Distance
             const dist = Math.abs(s.mileage - e.mileage); // Use original station mileage
             if(isNaN(dist)) return { error: "無法計算山線基礎里程 (規則1)" };
             return { distance: dist }; // Return only Mountain distance
          } else if (((segS === 'West-North' || segS === 'West-South' || segS === 'Pingtung') && isBetweenJunctionsE) ||
                     ((segE === 'West-North' || segE === 'West-South' || segE === 'Pingtung') && isBetweenJunctionsS)) {
            // Rule 2: Trunk <-> Mtn/Coast Station: Use SHORTEST Distance
             return calculatePhysicalDistance(startName, endName); // Let physical calc find shortest
          } else if (isBetweenJunctionsS && isBetweenJunctionsE && segS !== segE) {
            // Rule 3: Mountain <-> Coast (between junctions): Use SHORTEST path via junctions
             return calculatePhysicalDistance(startName, endName); // Let physical calc find shortest
          }
     }

     // For all other cases, including East-West, East-East, West-West (same segment), Branches
     // the fare distance is the calculated physical (usually shortest) distance.
     return calculatePhysicalDistance(startName, endName);
}


function calculateFare(distance, trainClass, isNewFare) {
    if (typeof distance !== 'number' || distance < 0) {
         console.error("Invalid distance provided to calculateFare:", distance);
         return NaN;
    }

    const effectiveDistance = Math.max(distance, 10.0);
    let fare = 0;
    const epsilon = 0.001; // Tolerance for floating point

    if (!isNewFare) {
        const rate = originalRates[trainClass];
        if (!rate) return NaN;
        fare = effectiveDistance * rate;
    } else {
        const rates = newRates[trainClass];
        if (!rates) return NaN;

        let remainingDistance = effectiveDistance;
        let currentFare = 0;

        // Bracket 1: 0 - 50 km
        const distInBracket1 = Math.min(remainingDistance, 50.0);
        if (distInBracket1 > epsilon) {
            currentFare += distInBracket1 * rates['<50'];
            remainingDistance -= distInBracket1;
        }

        // Bracket 2: 50.1 - 100 km (Length = 50 km)
        if (remainingDistance > epsilon) {
            const distInBracket2 = Math.min(remainingDistance, 50.0);
             currentFare += distInBracket2 * rates['50.1-100'];
             remainingDistance -= distInBracket2;
        }

        // Bracket 3: 100.1 - 200 km (Length = 100 km)
        if (remainingDistance > epsilon) {
            const distInBracket3 = Math.min(remainingDistance, 100.0);
            currentFare += distInBracket3 * rates['100.1-200'];
            remainingDistance -= distInBracket3;
        }

        // Bracket 4: 200.1 - 300 km (Length = 100 km)
         if (remainingDistance > epsilon) {
            const distInBracket4 = Math.min(remainingDistance, 100.0);
            currentFare += distInBracket4 * rates['200.1-300'];
            remainingDistance -= distInBracket4;
        }

        // Bracket 5: 300.1+ km
        if (remainingDistance > epsilon) {
            currentFare += remainingDistance * rates['300.1+'];
        }
        fare = currentFare;
    }

    return Math.round(fare);
}


function calculateAndDisplayFare() {
    const startName = document.getElementById('startStation').value;
    const endName = document.getElementById('endStation').value;
    const trainClass = document.getElementById('trainClass').value;
    const resultDiv = document.getElementById('result');
    const errorDiv = document.getElementById('error');

    // Clear previous results/errors robustly
    resultDiv.style.display = 'none';
    errorDiv.style.display = 'none';
    errorDiv.textContent = '';
    document.getElementById('calculatedDistance').textContent = '--';
    document.getElementById('originalFare').textContent = '--';
    document.getElementById('newFare').textContent = '--';
    document.getElementById('fareDifference').textContent = '--';
    document.getElementById('fareDiffPercentage').textContent = '--';


    if (!startName || !endName) {
         errorDiv.textContent = "請選擇起站與迄站。";
         errorDiv.style.display = 'block';
         return;
    }
    if (startName === endName) {
        errorDiv.textContent = "起站與迄站不可相同。";
        errorDiv.style.display = 'block';
        return;
    }
    if (!getStation(startName) || !getStation(endName)) {
         errorDiv.textContent = `無法找到車站資料: ${!getStation(startName) ? startName : ''} ${!getStation(endName) ? endName : ''}。`;
         errorDiv.style.display = 'block';
         return;
    }

    const distanceResult = getFareDistance(startName, endName);

    if (distanceResult.error || typeof distanceResult.distance !== 'number' || isNaN(distanceResult.distance) || distanceResult.distance < 0) {
        const errorMsg = distanceResult.error || "計算出的里程無效";
        errorDiv.textContent = `計算距離時發生錯誤：${errorMsg}。`;
        console.error("Distance Error:", distanceResult);
        errorDiv.style.display = 'block';
        return;
    }

    const fareDist = distanceResult.distance;

    if (fareDist < 0.01 && startName !== endName) {
         console.warn(`計算里程為 ${fareDist.toFixed(2)}，但起訖站不同: ${startName} -> ${endName}`);
    }

    const originalFare = calculateFare(fareDist, trainClass, false);
    const newFare = calculateFare(fareDist, trainClass, true);

    if (isNaN(originalFare) || isNaN(newFare)) {
         errorDiv.textContent = "計算票價時發生未預期的錯誤 (NaN)。";
         console.error(`Fare NaN: Orig=${originalFare}, New=${newFare}, Dist=${fareDist}, Class=${trainClass}`);
         errorDiv.style.display = 'block';
         return;
     }

    // Calculate Difference
    const fareDifference = newFare - originalFare;
    let diffPercentage = 0;
    if (originalFare > 0) {
        diffPercentage = ((fareDifference / originalFare) * 100);
    } else if (newFare > 0) {
        diffPercentage = Infinity; // Avoid division by zero, indicate large increase
    }

    // Display results
    document.getElementById('calculatedDistance').textContent = fareDist.toFixed(1);
    document.getElementById('originalFare').textContent = originalFare;
    document.getElementById('newFare').textContent = newFare;
    document.getElementById('fareDifference').textContent = fareDifference >= 0 ? `+${fareDifference}` : fareDifference;
    document.getElementById('fareDiffPercentage').textContent = isFinite(diffPercentage) ? diffPercentage.toFixed(1) : (newFare > 0 ? 'N/A' : '0.0');
    resultDiv.style.display = 'block';
}