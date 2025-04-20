document.addEventListener('DOMContentLoaded', () => {
    populateStationDropdowns();
});

function populateStationDropdowns() {
    const startSelect = document.getElementById('startStation');
    const endSelect = document.getElementById('endStation');
    // Sort station names based on their primary mileage for a more logical order (optional)
    const stationNames = Object.keys(stationsData).sort((a, b) => {
        const mileA = stationsData[a].mileage || 0;
        const mileB = stationsData[b].mileage || 0;
        // Simple sort by mileage, might need refinement based on line grouping
        return mileA - mileB;
    });

    stationNames.forEach(name => {
        // Skip stations explicitly marked as omit or without mileage if needed
        // if (stationsData[name].omit) return;

        const option1 = document.createElement('option');
        option1.value = name;
        option1.textContent = name;
        startSelect.appendChild(option1);

        const option2 = document.createElement('option');
        option2.value = name;
        option2.textContent = name;
        endSelect.appendChild(option2);
    });
     // Set default different values
    if (stationNames.includes("台北") && stationNames.includes("高雄")) {
        startSelect.value = "台北"; // Default start
        endSelect.value = "高雄";   // Default end
    } else if (stationNames.length > 1) {
        startSelect.value = stationNames[0];
        endSelect.value = stationNames[stationNames.length - 1];
    }
}


const originalRates = {
    local: 1.46,
    juguang: 1.75,
    ziqiang: 2.27
};

// Per-kilometer rates for each bracket (from image)
const newRates = {
    local: { // 區間
        '<50': 2.18,
        '50.1-100': 1.92,
        '100.1-200': 1.81,
        '200.1-300': 1.53,
        '300.1+': 1.42
    },
    juguang: { // 莒光
        '<50': 2.61,
        '50.1-100': 2.30,
        '100.1-200': 2.17,
        '200.1-300': 1.83,
        '300.1+': 1.70
    },
    ziqiang: { // 自強
        '<50': 3.39,
        '50.1-100': 2.98,
        '100.1-200': 2.81,
        '200.1-300': 2.37,
        '300.1+': 2.20
    }
};

function getStation(name) {
    // Add basic check for existence
    if (!stationsData || !stationsData[name]) {
        console.error(`Station data not found for: ${name}`);
        return null;
    }
    return stationsData[name];
}

// Calculates the physical distance, potentially shortest path if ambiguous
function calculatePhysicalDistance(startName, endName) {
    const startStation = getStation(startName);
    const endStation = getStation(endName);

    if (!startStation || !endStation) return { error: `無法取得車站資料 (${startName} 或 ${endName})` };
    if (startName === endName) return { distance: 0 };

    const startLine = startStation.line;
    const endLine = endStation.line;

    // --- Handle Branch Lines ---
    if (startLine !== endLine && (startLine.match(/Jiji|Neiwan|Pingxi/) || endLine.match(/Jiji|Neiwan|Pingxi/))) {
        let totalDist = 0;
        let currentStation = startStation;
        let currentName = startName;
        let targetStation = endStation;
        let targetName = endName;
        let baseStationNameStart = null;
        let baseStationNameEnd = null;


        // If start is on branch
        if (currentStation.baseStation) {
             baseStationNameStart = currentStation.baseStation;
            const base = getStation(baseStationNameStart);
             if (!base) return { error: `無法取得 ${startName} 的主線連接站 ${baseStationNameStart} 資料` };
            totalDist += currentStation.mileage; // Dist on branch
            currentName = baseStationNameStart; // Move to main line
            currentStation = base;
        }
        // If end is on branch
        if (targetStation.baseStation) {
            baseStationNameEnd = targetStation.baseStation;
            const base = getStation(baseStationNameEnd);
            if (!base) return { error: `無法取得 ${endName} 的主線連接站 ${baseStationNameEnd} 資料` };
            totalDist += targetStation.mileage; // Dist on branch
            targetName = baseStationNameEnd; // Move target to main line
            targetStation = base;
        }

        // Check if calculation reduced to same base station
         if (currentName === targetName) {
             return { distance: totalDist }
         }

        // Now calculate distance between the (potentially new) main line stations
        const mainLineDistResult = calculatePhysicalDistance(currentName, targetName);
         if (mainLineDistResult.error) return mainLineDistResult; // Propagate error
         totalDist += mainLineDistResult.distance;
         return { distance: totalDist };
    }

     // --- Handle Keelung/SuAo Branches ---
     // Treat as extensions from Badu/Suaoxin respectively
    if (startLine !== endLine && (startLine.match(/Keelung|SuAo/) || endLine.match(/Keelung|SuAo/))) {
         let dist = 0;
         let baseStartName = startName;
         let baseEndName = endName;

         if (startStation.line === 'Keelung') {
             dist += Math.abs(startStation.mileage - stationsData["八堵"].mileage); // Dist Keelung-Badu approx
             baseStartName = "八堵";
         } else if (startStation.line === 'SuAo') {
             dist += Math.abs(startStation.mileage - stationsData["蘇澳新"].mileage); // Dist SuAo-SuaoXin approx
             baseStartName = "蘇澳新";
         }

         if (endStation.line === 'Keelung') {
             dist += Math.abs(endStation.mileage - stationsData["八堵"].mileage);
             baseEndName = "八堵";
         } else if (endStation.line === 'SuAo') {
              dist += Math.abs(endStation.mileage - stationsData["蘇澳新"].mileage);
             baseEndName = "蘇澳新";
         }

         // Avoid double counting if both are on same simple branch
         if (startStation.line === endStation.line && (startStation.line === 'Keelung' || startStation.line === 'SuAo')) {
             dist = Math.abs(startStation.mileage - endStation.mileage); // Direct distance on branch
             return { distance: dist };
         }


         // If one station was moved to base, calculate dist from new base pair
         if (baseStartName !== startName || baseEndName !== endName) {
             const mainDistResult = calculatePhysicalDistance(baseStartName, baseEndName);
             if (mainDistResult.error) return mainDistResult;
             // This summing logic might be flawed if both are on different branches
             // Let's refine: calc dist on branch + dist main-main
             let finalDist = 0;
             let mainS = startName, mainE = endName;
             if(startStation.line === 'Keelung' || startStation.line === 'SuAo'){
                finalDist += Math.abs(startStation.mileage - stationsData[startStation.baseStation].mileage);
                mainS = startStation.baseStation;
             }
              if(endStation.line === 'Keelung' || endStation.line === 'SuAo'){
                finalDist += Math.abs(endStation.mileage - stationsData[endStation.baseStation].mileage);
                mainE = endStation.baseStation;
             }
             if (mainS === mainE) return { distance: finalDist }; // Connected at same base
             const mainDistRes = calculatePhysicalDistance(mainS, mainE);
             if(mainDistRes.error) return mainDistRes;
             return { distance: finalDist + mainDistRes.distance };

         } else {
             // Should not happen if lines were different and involved Keelung/Suao
             return { error: "無法處理基隆/蘇澳支線路徑" };
         }
    }


    // --- Handle Main Lines (West, East, Mountain, Coast) ---
    const isStartWest = startStation.segment && startStation.segment !== 'East' && startStation.line !== 'Pingxi';
    const isEndWest = endStation.segment && endStation.segment !== 'East' && endStation.line !== 'Pingxi';

    if (isStartWest !== isEndWest) {
        // Crossing between East and West: MUST go via South Link or via Taipei change.
        // Fare calculation typically assumes the SHORTEST path for the passenger.

        // Path 1: Via Taipei (summing distances)
        const distToTaipeiS = calculatePhysicalDistance(startName, "台北").distance ?? Infinity;
        const distFromTaipeiE = calculatePhysicalDistance("台北", endName).distance ?? Infinity;
        const distViaTaipei = distToTaipeiS + distFromTaipeiE;

        // Path 2: Via South Link (Fangliao connection)
        // Dist on West side to Fangliao
        const distWestToFangliaoS = calculatePhysicalDistance(startName, FANG_LIAO_WEST).distance ?? Infinity;
         // Dist on East side to Fangliao (using East mileage data)
        const distEastToFangliaoE = calculatePhysicalDistance(endName, FANG_LIAO_WEST).distance ?? Infinity;
        const distViaSouthLink = (isStartWest ? distWestToFangliaoS : distEastToFangliaoE) +
                                 (isEndWest ? distWestToFangliaoS : distEastToFangliaoE); // Sum of segments to Fangliao


        // Select the shorter path for fare distance
        // This simplified South Link calc might be inaccurate, official calc is complex.
        // For now, returning minimum, but highlight potential inaccuracy.
        // console.warn("East-West distance calculation is simplified (min of via Taipei/Fangliao). Actual South-Link pathing differs.");
        if (distViaTaipei === Infinity && distViaSouthLink === Infinity){
            return { error: `無法計算東西幹線之間的路徑 (${startName} <-> ${endName})` };
        }
        return { distance: Math.min(distViaTaipei, distViaSouthLink) };


    } else if (isStartWest && isEndWest) {
        // Both stations on Western side (West, Mountain, Coast, Jiji, Neiwan)
        const segS = startStation.segment;
        const segE = endStation.segment;
        const isBetweenJunctionsS = segS === 'Mountain' || segS === 'Coast';
        const isBetweenJunctionsE = segE === 'Mountain' || segE === 'Coast';

        // Use the logic from getFareDistance directly here as it calculates shortest path where needed
        if ((segS === 'NorthOfZhunan' && segE === 'SouthOfChanghua') || (segS === 'SouthOfChanghua' && segE === 'NorthOfZhunan')) {
             return { distance: Math.abs(startStation.mileage - endStation.mileage) };
        } else if (((segS === 'NorthOfZhunan' || segS === 'SouthOfChanghua') && isBetweenJunctionsE) ||
                   ((segE === 'NorthOfZhunan' || segE === 'SouthOfChanghua') && isBetweenJunctionsS)) {
            // Rule 2: Trunk <-> Mtn/Coast Station: Use shortest path
            const distViaMountain = Math.abs(startStation.mileage - endStation.mileage);
            const distViaCoast = calculateDistanceViaCoast(startName, endName);
            if(isNaN(distViaMountain) || isNaN(distViaCoast)) return { error: "計算山/海線路徑距離失敗" };
            return { distance: Math.min(distViaMountain, distViaCoast) };
        } else if (isBetweenJunctionsS && isBetweenJunctionsE && segS !== segE) {
            // Rule 3: Mountain <-> Coast (between junctions) - Use shortest path via junctions
            const distViaZhunan = (calculatePhysicalDistance(startName, ZHU_NAN).distance ?? Infinity) + (calculatePhysicalDistance(ZHU_NAN, endName).distance ?? Infinity);
            const distViaChanghua = (calculatePhysicalDistance(startName, CHANG_HUA).distance ?? Infinity) + (calculatePhysicalDistance(CHANG_HUA, endName).distance ?? Infinity);
             if (distViaZhunan === Infinity && distViaChanghua === Infinity) return { error: "計算山海線之間路徑失敗" };
             return { distance: Math.min(distViaZhunan, distViaChanghua) };
        } else {
            // Standard same-line (including Mtn-Mtn, Coast-Coast) or North-North, South-South
            // Use direct mileage difference based on the defined line's mileage
            // Need to handle Coast line having its own mileage set potentially
             if (startStation.line === 'Coast' && endStation.line === 'Coast') {
                 return { distance: Math.abs(startStation.mileage - endStation.mileage)}; // Assumes coast list mileage is consistent
             } else {
                // Default to primary (likely Mountain) mileage
                return { distance: Math.abs(startStation.mileage - endStation.mileage) };
             }
        }

    } else { // Both on Eastern side (East, Pingxi)
         // Simple difference in East line mileage
         return { distance: Math.abs(startStation.mileage - endStation.mileage) };
    }
}

// Helper to calculate distance via coast line path more robustly
function calculateDistanceViaCoast(startName, endName) {
    const s = getStation(startName);
    const e = getStation(endName);
    if(!s || !e) return Infinity;

    // Get mileage on Coast Line if station exists there, otherwise use Mountain mileage
    const getComparableMileage = (name) => {
        const st = getStation(name);
        if (st.line === 'Coast') return st.mileage;
         // If it's a Mountain station between junctions, estimate Coast mileage via Changhua/Zhunan
        // This is complex. For now, just use its main (Mountain) mileage.
         return st.mileage;
    };

    const mileS = getComparableMileage(startName);
    const mileE = getComparableMileage(endName);

    // This is still simplified, doesn't truly calculate path *along* coast line
    // vs path *along* mountain line. Recalculates shortest via junctions.
     const distViaZhunan = (calculatePhysicalDistance(startName, ZHU_NAN).distance ?? Infinity) + (calculatePhysicalDistance(ZHU_NAN, endName).distance ?? Infinity);
     const distViaChanghua = (calculatePhysicalDistance(startName, CHANG_HUA).distance ?? Infinity) + (calculatePhysicalDistance(CHANG_HUA, endName).distance ?? Infinity);

    return Math.min(distViaZhunan, distViaChanghua); // Returns shortest overall path, may not be strictly "via coast"


}


// Calculates the distance to be used for FARE calculation, applying rules
function getFareDistance(startName, endName) {
    const startStation = getStation(startName);
    const endStation = getStation(endName);
    const errorResult = { error: "無法取得車站資料" };

    if (!startStation || !endStation) return errorResult;
    if (startName === endName) return { distance: 0 };

    const segS = startStation.segment;
    const segE = endStation.segment;
    const isBetweenJunctionsS = segS === 'Mountain' || segS === 'Coast';
    const isBetweenJunctionsE = segE === 'Mountain' || segE === 'Coast';
    const isWestSideS = segS && segS !== 'East' && segS !== 'Pingxi';
    const isWestSideE = segE && segE !== 'East' && segE !== 'Pingxi';

    if(isWestSideS && isWestSideE) {
        // --- Apply Mountain/Coast FARE Rules ---
        if ((segS === 'NorthOfZhunan' && segE === 'SouthOfChanghua') || (segS === 'SouthOfChanghua' && segE === 'NorthOfZhunan')) {
            // Rule 1: North <-> South: Use Mountain Line Distance
            // Use base mileage which should be mountain line equivalent
             const dist = Math.abs(startStation.mileage - endStation.mileage);
             if (isNaN(dist)) return { error: "無法計算山線基礎里程" };
             return { distance: dist };
        } else if (((segS === 'NorthOfZhunan' || segS === 'SouthOfChanghua') && isBetweenJunctionsE) ||
                   ((segE === 'NorthOfZhunan' || segE === 'SouthOfChanghua') && isBetweenJunctionsS)) {
            // Rule 2: Trunk <-> Mtn/Coast Station: Use SHORTEST Distance
             return calculatePhysicalDistance(startName, endName); // Physical distance calc should find shortest
        } else if (isBetweenJunctionsS && isBetweenJunctionsE && segS !== segE) {
            // Rule 3: Mountain <-> Coast (between junctions): Use SHORTEST path via junctions
             return calculatePhysicalDistance(startName, endName); // Physical distance calc should find shortest
        }
    }

    // Default: For all other cases use the standard physical distance.
    // Includes: East-East, West-West (same segment), Branch lines, East-West
    return calculatePhysicalDistance(startName, endName);
}


function calculateFare(distance, trainClass, isNewFare) {
    if (typeof distance !== 'number' || distance < 0) {
         console.error("Invalid distance provided to calculateFare:", distance);
         return NaN; // Return Not-a-Number for invalid input
    }

    const effectiveDistance = Math.max(distance, 10.0); // Apply 10km minimum
    let fare = 0;

    if (!isNewFare) {
        // --- Original Fare Calculation ---
        const rate = originalRates[trainClass];
        if (!rate) return NaN; // Invalid train class
        fare = effectiveDistance * rate;
    } else {
        // --- New Cumulative Fare Calculation ---
        const rates = newRates[trainClass];
        if (!rates) return NaN; // Invalid train class for new rates

        let remainingDistance = effectiveDistance;
        let currentFare = 0;
        const epsilon = 0.001; // Small value for floating point comparisons

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
             // No need to decrease remainingDistance here as it's the last bracket
        }

        fare = currentFare; // Assign the calculated cumulative fare
    }

    return Math.round(fare); // Round the final calculated fare
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

    // Validate station existence early
    if (!getStation(startName) || !getStation(endName)) {
         errorDiv.textContent = `無法找到車站資料: ${!getStation(startName) ? startName : ''} ${!getStation(endName) ? endName : ''}。`;
         errorDiv.style.display = 'block';
         return;
    }

    // Use getFareDistance to determine the mileage for fare calculation
    const distanceResult = getFareDistance(startName, endName);

    // --- Centralized Error Handling for Distance ---
    if (distanceResult.error) {
        errorDiv.textContent = `計算距離時發生錯誤：${distanceResult.error}。`;
        errorDiv.style.display = 'block';
        return;
    }
     if (typeof distanceResult.distance !== 'number' || isNaN(distanceResult.distance) || distanceResult.distance < 0) {
         errorDiv.textContent = "計算出的里程無效，無法計算票價。";
         console.error("Invalid distance calculated:", distanceResult.distance);
         errorDiv.style.display = 'block';
         return;
     }
    // --- End Error Handling ---

    const fareDist = distanceResult.distance;

    // Check for 0 distance between different stations - indicates potential logic issue
    if (fareDist < 0.01 && startName !== endName) {
         console.warn(`計算里程為 ${fareDist.toFixed(2)}，但起訖站不同: ${startName} -> ${endName}`);
         // Display 0 distance, calculate minimum fare
    }

    const originalFare = calculateFare(fareDist, trainClass, false);
    const newFare = calculateFare(fareDist, trainClass, true);

     // --- Final Sanity Check for Fare Calculation ---
     if (isNaN(originalFare) || isNaN(newFare)) {
         errorDiv.textContent = "計算票價時發生未預期的錯誤 (NaN)。";
         console.error(`Fare calculation returned NaN: Original=${originalFare}, New=${newFare}, Dist=${fareDist}, Class=${trainClass}`);
         errorDiv.style.display = 'block';
         return;
     }
     // --- End Sanity Check ---

    // Display results
    document.getElementById('calculatedDistance').textContent = fareDist.toFixed(1); // Show distance with 1 decimal
    document.getElementById('originalFare').textContent = originalFare;
    document.getElementById('newFare').textContent = newFare;
    resultDiv.style.display = 'block'; // Show the results section
}

// Ensure baseStation exists in stationsData
Object.keys(stationsData).forEach(name => {
    stationsData[name].name = name; // Add name property for convenience
    if (stationsData[name].baseStation && !stationsData[stationsData[name].baseStation]) {
        console.warn(`Base station '${stationsData[name].baseStation}' for branch station '${name}' not found in data.`);
    }
});