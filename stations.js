const stationsData = {
    // --- Western Line (Main, mileage from Taipei) ---
    "台北": { line: "West", mileage: 0.0 },
    "萬華": { line: "West", mileage: 2.6 },
    "板橋": { line: "West", mileage: 7.8 },
    "樹林": { line: "West", mileage: 12.4 },
    "山佳": { line: "West", mileage: 16.2 },
    "鶯歌": { line: "West", mileage: 20.7 },
    "桃園": { line: "West", mileage: 28.9 },
    "內壢": { line: "West", mileage: 35.0 },
    "中壢": { line: "West", mileage: 38.8 },
    "埔心": { line: "West", mileage: 44.6 },
    "楊梅": { line: "West", mileage: 48.6 },
    "富岡": { line: "West", mileage: 55.5 },
    "湖口": { line: "West", mileage: 61.2 },
    "新豐": { line: "West", mileage: 67.3 },
    "竹北": { line: "West", mileage: 72.3 },
    "新竹": { line: "West", mileage: 78.1, isBranchStart: "Neiwan" }, // Neiwan branch start
    "香山": { line: "West", mileage: 86.2 },
    "崎頂": { line: "West", mileage: 92.6 },
    "竹南": { line: "West", mileage: 97.1, isJunction: true }, // Mountain/Coast Junction
    // Mountain Line (Continues West line mileage)
    "造橋": { line: "Mountain", mileage: 102.5 },
    "豐富": { line: "Mountain", mileage: 108.8 },
    "苗栗": { line: "Mountain", mileage: 112.3 },
    "南勢": { line: "Mountain", mileage: 119.0 },
    "銅鑼": { line: "Mountain", mileage: 123.1 },
    "三義": { line: "Mountain", mileage: 130.6 },
    "泰安": { line: "Mountain", mileage: 141.5 }, // Note: This is New Taian station
    "后里": { line: "Mountain", mileage: 144.1 },
    "豐原": { line: "Mountain", mileage: 150.8 },
    "潭子": { line: "Mountain", mileage: 155.8 },
    //"太原": { line: "Mountain", mileage: ??? }, // Missing mileage
    "台中": { line: "Mountain", mileage: 165.0 },
    "大慶": { line: "Mountain", mileage: 169.3 },
    "烏日": { line: "Mountain", mileage: 172.2 },
    "成功": { line: "Mountain", mileage: 175.7, isCoastEnd: true }, // Connects to Coast at Changhua
    // Coast Line (Mileage also from Taipei)
    "談文": { line: "Coast", mileage: 101.8 },
    "大山": { line: "Coast", mileage: 108.6 },
    "後龍": { line: "Coast", mileage: 112.3 },
    "龍港": { line: "Coast", mileage: 116.3 },
    "白沙屯": { line: "Coast", mileage: 124.6 },
    "新埔": { line: "Coast", mileage: 127.7 }, // Note: Miaoli, not Hsinchu
    "通霄": { line: "Coast", mileage: 133.4 },
    "苑裡": { line: "Coast", mileage: 139.6 },
    "日南": { line: "Coast", mileage: 147.4 },
    "大甲": { line: "Coast", mileage: 152.0 },
    "台中港": { line: "Coast", mileage: 157.3 },
    "清水": { line: "Coast", mileage: 163.3 },
    "沙鹿": { line: "Coast", mileage: 166.5 },
    "龍井": { line: "Coast", mileage: 171.1 },
    "大肚": { line: "Coast", mileage: 176.1 },
    "追分": { line: "Coast", mileage: 181.1, isMountainEnd: true }, // Connects to Mountain at Changhua
    // South of Changhua (Continues West line mileage via Mountain default)
    "彰化": { line: "West", mileage: 182.6, isJunction: true }, // Mountain/Coast Junction
    "花壇": { line: "West", mileage: 189.2 },
    "大村": { line: "West", mileage: 193.9 },
    "員林": { line: "West", mileage: 197.3 },
    "永靖": { line: "West", mileage: 200.7 },
    "社頭": { line: "West", mileage: 204.5 },
    "田中": { line: "West", mileage: 208.8 },
    "二水": { line: "West", mileage: 214.6, isBranchStart: "Jiji" }, // Jiji branch start
    "林內": { line: "West", mileage: 222.8 },
    "石榴": { line: "West", mileage: 227.5 },
    "斗六": { line: "West", mileage: 232.3 },
    "斗南": { line: "West", mileage: 240.0 },
    "石龜": { line: "West", mileage: 243.9 },
    "大林": { line: "West", mileage: 248.5 },
    "民雄": { line: "West", mileage: 254.3 },
    //"嘉北": { line: "West", mileage: ??? }, // Missing mileage
    "嘉義": { line: "West", mileage: 263.6 },
    "水上": { line: "West", mileage: 270.1 },
    "南靖": { line: "West", mileage: 272.8 },
    "後壁": { line: "West", mileage: 278.9 },
    "新營": { line: "West", mileage: 286.6 },
    "柳營": { line: "West", mileage: 290.0 },
    "林鳳營": { line: "West", mileage: 293.8 },
    "隆田": { line: "West", mileage: 299.3 },
    "拔林": { line: "West", mileage: 301.6 },
    "善化": { line: "West", mileage: 306.2 },
    "新市": { line: "West", mileage: 313.7 },
    "永康": { line: "West", mileage: 318.7 },
    //"大橋": { line: "West", mileage: ??? }, // Missing mileage
    "台南": { line: "West", mileage: 325.1 },
    "保安": { line: "West", mileage: 332.7 },
    "中洲": { line: "West", mileage: 336.7 }, // Shalun line branches here
    "大湖": { line: "West", mileage: 339.6 },
    "路竹": { line: "West", mileage: 342.6 },
    "岡山": { line: "West", mileage: 349.9 },
    "橋頭": { line: "West", mileage: 353.9 },
    "楠梓": { line: "West", mileage: 358.0 },
    "左營": { line: "West", mileage: 365.0 }, // Note: TRA Zuoying, not HSR
    "高雄": { line: "West", mileage: 371.8 },
    // Pingtung Line (Continues West line mileage)
    "鳳山": { line: "West", mileage: 377.5 },
    "後庄": { line: "West", mileage: 381.2 },
    "九曲堂": { line: "West", mileage: 385.5 },
    "六塊厝": { line: "West", mileage: 390.5 },
    "屏東": { line: "West", mileage: 392.7 },
    "歸來": { line: "West", mileage: 395.4 },
    "麟洛": { line: "West", mileage: 397.7 },
    "西勢": { line: "West", mileage: 400.1 },
    "竹田": { line: "West", mileage: 403.8 },
    "潮州": { line: "West", mileage: 407.8 },
    "崁頂": { line: "West", mileage: 412.7 },
    "南州": { line: "West", mileage: 415.1 },
    "鎮安": { line: "West", mileage: 418.9 },
    "林邊": { line: "West", mileage: 421.9 },
    "佳冬": { line: "West", mileage: 425.9 },
    "東海": { line: "West", mileage: 428.9 }, // Note: Pingtung, not Hualien
    "枋寮": { line: "West", mileage: 433.1, isSouthLinkStartWest: true }, // South Link starts

    // --- Eastern Line + South Link (Mileage from Taipei via Yilan) ---
    //"台北": { line: "East", mileage: 0.0 }, // Already defined in West
    "松山": { line: "East", mileage: 6.4 },
    "南港": { line: "East", mileage: 9.9 },
    "汐止": { line: "East", mileage: 15.5 },
    "五堵": { line: "East", mileage: 16.7 },
    "七堵": { line: "East", mileage: 23.0 },
    "八堵": { line: "East", mileage: 24.9 }, // Keelung branches off
    "基隆": { line: "Keelung", mileage: 28.6, baseMileage: 24.9 }, // Keelung branch
    "暖暖": { line: "East", mileage: 26.4 },
    "四腳亭": { line: "East", mileage: 28.7 },
    "瑞芳": { line: "East", mileage: 34.5 }, // Pingxi may connect conceptually here or Sandiaoling
    "侯硐": { line: "East", mileage: 39.1 },
    "三貂嶺": { line: "East", mileage: 41.6, isBranchStart: "Pingxi" }, // Pingxi branch start
    "牡丹": { line: "East", mileage: 45.3 },
    "雙溪": { line: "East", mileage: 48.4 },
    "貢寮": { line: "East", mileage: 53.7 },
    "福隆": { line: "East", mileage: 57.5 },
    "石城": { line: "East", mileage: 63.1 },
    "大里": { line: "East", mileage: 65.8 },
    "大溪": { line: "East", mileage: 70.8 },
    "龜山": { line: "East", mileage: 75.5 },
    "外澳": { line: "East", mileage: 79.1 },
    "頭城": { line: "East", mileage: 82.8 },
    "頂埔": { line: "East", mileage: 85.0 },
    "礁溪": { line: "East", mileage: 89.1 },
    "四城": { line: "East", mileage: 93.1 }, // Estimated based on surroundings
    "宜蘭": { line: "East", mileage: 97.4 },
    "二結": { line: "East", mileage: 103.2 },
    "中里": { line: "East", mileage: 104.4 },
    "羅東": { line: "East", mileage: 106.3 },
    "冬山": { line: "East", mileage: 111.3 },
    "新馬": { line: "East", mileage: 115.5 },
    "蘇澳新": { line: "East", mileage: 116.7 },
    "蘇澳": { line: "SuAo", mileage: 119.9, baseMileage: 116.7 }, // SuAo branch
    "永樂": { line: "East", mileage: 122.0 }, // Listed after SuAo in data, but seems on main North-link
    "東澳": { line: "East", mileage: 127.4 },
    "南澳": { line: "East", mileage: 135.4 },
    "武塔": { line: "East", mileage: 138.9 },
    "漢本": { line: "East", mileage: 152.1 },
    "和平": { line: "East", mileage: 156.5 },
    "和仁": { line: "East", mileage: 164.2 },
    "崇德": { line: "East", mileage: 174.3 },
    "新城": { line: "East", mileage: 179.6 }, // Taroko station
    "景美": { line: "East", mileage: 184.9 }, // Note: Hualien, not Taipei
    "北埔": { line: "East", mileage: 191.4 },
    "花蓮": { line: "East", mileage: 195.9 },
    "吉安": { line: "East", mileage: 199.3 },
    "志學": { line: "East", mileage: 208.3 },
    "平和": { line: "East", mileage: 211.2 },
    "壽豐": { line: "East", mileage: 213.0 },
    "豐田": { line: "East", mileage: 216.4 }, // Estimated
    "溪口": { line: "East", mileage: 219.8 },
    "南平": { line: "East", mileage: 224.2 },
    "鳳林": { line: "East", mileage: 228.4 },
    "萬榮": { line: "East", mileage: 233.4 },
    "光復": { line: "East", mileage: 239.0 },
    "大富": { line: "East", mileage: 246.8 },
    "富源": { line: "East", mileage: 249.8 },
    "瑞北": { line: "East", mileage: 255.7 },
    "瑞穗": { line: "East", mileage: 259.1 },
    "三民": { line: "East", mileage: 268.5 },
    "玉里": { line: "East", mileage: 280.0 },
    "安通": { line: "East", mileage: 285.7 }, // Listed before Dongli in data
    "東里": { line: "East", mileage: 289.8 },
    "東竹": { line: "East", mileage: 295.8 },
    "富里": { line: "East", mileage: 302.0 },
    "池上": { line: "East", mileage: 308.9 },
    "海端": { line: "East", mileage: 314.5 },
    "關山": { line: "East", mileage: 321.1 },
    "月美": { line: "East", mileage: 324.8 },
    "瑞和": { line: "East", mileage: 328.8 },
    "瑞源": { line: "East", mileage: 331.7 },
    "鹿野": { line: "East", mileage: 337.3 },
    "山里": { line: "East", mileage: 343.5 },
    "台東": { line: "East", mileage: 351.6 }, // New Taitung Station
    "康樂": { line: "East", mileage: 356.2 }, // South Link starts conceptually
    "知本": { line: "East", mileage: 363.2 },
    "太麻里": { line: "East", mileage: 374.9 },
    "金崙": { line: "East", mileage: 385.8 },
    "瀧溪": { line: "East", mileage: 394.2 },
    "大武": { line: "East", mileage: 406.0 },
    "古莊": { line: "East", mileage: 409.2 },
    //"中央隧道": { line: "East", mileage: 426.1 }, // Not a station
    "枋野": { line: "East", mileage: 429.2 }, // Signal station mainly
    "枋山": { line: "East", mileage: 436.1 },
    "內獅": { line: "East", mileage: 441.0 },
    "加祿": { line: "East", mileage: 444.4 },
    //"枋寮": { line: "East", mileage: 449.8 }, // South Link Ends - Mileage already defined via West

    // --- Branch Lines (Mileage from branch start) ---
    // Jiji Line (Starts from Ershui)
    "源泉": { line: "Jiji", mileage: 2.9, baseStation: "二水" },
    "濁水": { line: "Jiji", mileage: 10.8, baseStation: "二水" },
    "龍泉": { line: "Jiji", mileage: 15.7, baseStation: "二水" },
    "集集": { line: "Jiji", mileage: 20.0, baseStation: "二水" },
    "水里": { line: "Jiji", mileage: 27.4, baseStation: "二水" },
    "車埕": { line: "Jiji", mileage: 29.7, baseStation: "二水" },
    // Neiwan Line (Starts from Hsinchu)
    "竹中": { line: "Neiwan", mileage: 8.0, baseStation: "新竹" }, // Liujia line also branches here
    "上員": { line: "Neiwan", mileage: 10.5, baseStation: "新竹" },
    "竹東": { line: "Neiwan", mileage: 16.6, baseStation: "新竹" },
    "橫山": { line: "Neiwan", mileage: 19.9, baseStation: "新竹" },
    "九讚頭": { line: "Neiwan", mileage: 22.2, baseStation: "新竹" },
    "合興": { line: "Neiwan", mileage: 24.3, baseStation: "新竹" },
    "富貴": { line: "Neiwan", mileage: 25.7, baseStation: "新竹" },
    "內灣": { line: "Neiwan", mileage: 27.9, baseStation: "新竹" },
    // Pingxi Line (Starts from Sandiaoling)
    "大華": { line: "Pingxi", mileage: 3.5, baseStation: "三貂嶺" },
    "十分": { line: "Pingxi", mileage: 6.4, baseStation: "三貂嶺" },
    "望古": { line: "Pingxi", mileage: 8.0, baseStation: "三貂嶺" },
    "嶺腳": { line: "Pingxi", mileage: 10.1, baseStation: "三貂嶺" },
    "平溪": { line: "Pingxi", mileage: 11.1, baseStation: "三貂嶺" },
    "菁桐": { line: "Pingxi", mileage: 12.9, baseStation: "三貂嶺" },
};

// Add simplified East line mileage to West stations for cross-line calculation
// This assumes travel via Taipei as the connection point
// Example: Kaohsiung to Hualien = (Kaohsiung to Taipei) + (Taipei to Hualien)
// This isn't perfect for South Link travel, which needs specific handling.

// Add mountain/coast identifiers for clarity in logic
for (const stationName in stationsData) {
    const station = stationsData[stationName];
    if (station.mileage > 97.1 && station.mileage < 182.6) {
        if (station.line === "Mountain") station.segment = "Mountain";
        if (station.line === "Coast") station.segment = "Coast";
    } else if (station.mileage <= 97.1 && (station.line === "West" || station.line === "Mountain" || station.line === "Coast")) {
         station.segment = "NorthOfZhunan";
    } else if (station.mileage >= 182.6 && (station.line === "West" || station.line === "Mountain" || station.line === "Coast")) {
         station.segment = "SouthOfChanghua";
    } else if (station.line === "East" || station.line === "Keelung" || station.line === "SuAo") {
         station.segment = "East"; // Group East/SouthLink/Branches off East
    }
    // Branch lines keep their line name as segment for now
    else if (station.line === "Jiji" || station.line === "Neiwan" || station.line === "Pingxi") {
         station.segment = station.line;
    }
}
// Define junction points for easier reference
const ZHU_NAN = "竹南";
const CHANG_HUA = "彰化";
const FANG_LIAO_WEST = "枋寮"; // West line perspective
// Find Fangliao mileage on East/SouthLink perspective (relative to Taipei via East)
const FANG_LIAO_EAST_MILEAGE = Object.values(stationsData).find(s => s.isSouthLinkStartWest)?.mileage // West mileage
const TAIPEI_TO_FANG_LIAO_EAST = 449.8; // From East data list

// Define mileage for Changhua via Coast
stationsData[CHANG_HUA].mileageCoast = 181.1 + Math.abs(stationsData[CHANG_HUA].mileage - stationsData["成功"].mileage); //追分 to 成功 distance approximated via Changhua