const stationsData = {
    // --- Define Line Groups and Order ---
    // lineGroup key corresponds to optgroup label
    // sortOrder defines the display order of groups
    _lineGroups: {
        "West-North": { order: 1, label: "西部幹線 (北段)" },
        "Mountain": { order: 2, label: "西部幹線 (山線)" },
        "Coast": { order: 3, label: "西部幹線 (海線)" },
        "West-South": { order: 4, label: "西部幹線 (南段)" },
        "Pingtung": { order: 5, label: "屏東線" },
        "Jiji": { order: 6, label: "集集線" },
        "Neiwan": { order: 7, label: "內灣線" },
        "East-North": { order: 10, label: "東部幹線 (宜蘭/北迴)" },
         "Keelung": { order: 11, label: "基隆支線" },
         "Pingxi": { order: 12, label: "平溪線" },
         "SuAo": { order: 13, label: "蘇澳支線" },
        "Hualien-Taitung": { order: 14, label: "東部幹線 (花東)" },
        "South-Link": { order: 15, label: "南迴線" },
        // Add other branches like Shalun if data exists
    },

    // --- Stations with added lineGroup ---
    // West-North
    "基隆": { line: "Keelung", mileage: 28.6, baseMileage: 24.9, lineGroup: "Keelung", baseStation: "八堵" },
    "三坑": { line: "Keelung", mileage: 27.0, baseMileage: 24.9, lineGroup: "Keelung", baseStation: "八堵" }, // Approx mileage
    "八堵": { line: "East", mileage: 24.9, lineGroup: "East-North", isJunction: true }, // Part of East for mileage calc but gateway to Keelung
    "七堵": { line: "East", mileage: 23.0, lineGroup: "East-North" }, // Often considered West North boundary
    "百福": { line: "East", mileage: 19.0, lineGroup: "East-North" }, // Approx
    "五堵": { line: "East", mileage: 16.7, lineGroup: "East-North" },
    "汐止": { line: "East", mileage: 15.5, lineGroup: "East-North" },
    "汐科": { line: "East", mileage: 14.0, lineGroup: "East-North" }, // Approx
    "南港": { line: "East", mileage: 9.9, lineGroup: "West-North", isJunction: true }, // Switch conceptual line group
    "松山": { line: "East", mileage: 6.4, lineGroup: "West-North" },
    "台北": { line: "West", mileage: 0.0, lineGroup: "West-North", isJunction: true },
    "萬華": { line: "West", mileage: 2.6, lineGroup: "West-North" },
    "板橋": { line: "West", mileage: 7.8, lineGroup: "West-North" },
    "浮洲": { line: "West", mileage: 10.0, lineGroup: "West-North" }, // Approx
    "樹林": { line: "West", mileage: 12.4, lineGroup: "West-North" },
    "南樹林": { line: "West", mileage: 14.0, lineGroup: "West-North" }, // Approx
    "山佳": { line: "West", mileage: 16.2, lineGroup: "West-North" },
    "鶯歌": { line: "West", mileage: 20.7, lineGroup: "West-North" },
    "桃園": { line: "West", mileage: 28.9, lineGroup: "West-North" },
    "內壢": { line: "West", mileage: 35.0, lineGroup: "West-North" },
    "中壢": { line: "West", mileage: 38.8, lineGroup: "West-North" },
    "埔心": { line: "West", mileage: 44.6, lineGroup: "West-North" },
    "楊梅": { line: "West", mileage: 48.6, lineGroup: "West-North" },
    "富岡": { line: "West", mileage: 55.5, lineGroup: "West-North" },
    "新富": { line: "West", mileage: 58.0, lineGroup: "West-North" }, // Approx
    "北湖": { line: "West", mileage: 60.0, lineGroup: "West-North" }, // Approx
    "湖口": { line: "West", mileage: 61.2, lineGroup: "West-North" },
    "新豐": { line: "West", mileage: 67.3, lineGroup: "West-North" },
    "竹北": { line: "West", mileage: 72.3, lineGroup: "West-North" },
    "北新竹": { line: "West", mileage: 77.0, lineGroup: "West-North", isJunction: true }, // Connects Neiwan/Liujia
    "新竹": { line: "West", mileage: 78.1, lineGroup: "West-North", isBranchStart: "Neiwan", isJunction: true },
    "三姓橋": { line: "West", mileage: 82.0, lineGroup: "West-North" }, // Approx
    "香山": { line: "West", mileage: 86.2, lineGroup: "West-North" },
    "崎頂": { line: "West", mileage: 92.6, lineGroup: "West-North" },
    "竹南": { line: "West", mileage: 97.1, lineGroup: "West-North", isJunction: true }, // Mountain/Coast Junction

    // Mountain Line
    "造橋": { line: "Mountain", mileage: 102.5, lineGroup: "Mountain" },
    "豐富": { line: "Mountain", mileage: 108.8, lineGroup: "Mountain" },
    "苗栗": { line: "Mountain", mileage: 112.3, lineGroup: "Mountain" },
    "南勢": { line: "Mountain", mileage: 119.0, lineGroup: "Mountain" },
    "銅鑼": { line: "Mountain", mileage: 123.1, lineGroup: "Mountain" },
    "三義": { line: "Mountain", mileage: 130.6, lineGroup: "Mountain" },
    "泰安": { line: "Mountain", mileage: 141.5, lineGroup: "Mountain" },
    "后里": { line: "Mountain", mileage: 144.1, lineGroup: "Mountain" },
    "豐原": { line: "Mountain", mileage: 150.8, lineGroup: "Mountain" },
    "栗林": { line: "Mountain", mileage: 153.0, lineGroup: "Mountain" }, // Approx
    "潭子": { line: "Mountain", mileage: 155.8, lineGroup: "Mountain" },
    "頭家厝": { line: "Mountain", mileage: 158.0, lineGroup: "Mountain" }, // Approx
    "松竹": { line: "Mountain", mileage: 160.0, lineGroup: "Mountain" }, // Approx
    "太原": { line: "Mountain", mileage: 161.5, lineGroup: "Mountain" }, // Approx mileage needed
    "精武": { line: "Mountain", mileage: 163.0, lineGroup: "Mountain" }, // Approx
    "台中": { line: "Mountain", mileage: 165.0, lineGroup: "Mountain" },
    "五權": { line: "Mountain", mileage: 167.0, lineGroup: "Mountain" }, // Approx
    "大慶": { line: "Mountain", mileage: 169.3, lineGroup: "Mountain" },
    "烏日": { line: "Mountain", mileage: 172.2, lineGroup: "Mountain" },
    "新烏日": { line: "Mountain", mileage: 173.0, lineGroup: "Mountain" }, // HSR connection
    "成功": { line: "Mountain", mileage: 175.7, lineGroup: "Mountain", isCoastEnd: true }, // Connects to Coast

    // Coast Line
    "談文": { line: "Coast", mileage: 101.8, lineGroup: "Coast" },
    "大山": { line: "Coast", mileage: 108.6, lineGroup: "Coast" },
    "後龍": { line: "Coast", mileage: 112.3, lineGroup: "Coast" },
    "龍港": { line: "Coast", mileage: 116.3, lineGroup: "Coast" },
    "白沙屯": { line: "Coast", mileage: 124.6, lineGroup: "Coast" },
    "新埔": { line: "Coast", mileage: 127.7, lineGroup: "Coast" },
    "通霄": { line: "Coast", mileage: 133.4, lineGroup: "Coast" },
    "苑裡": { line: "Coast", mileage: 139.6, lineGroup: "Coast" },
    "日南": { line: "Coast", mileage: 147.4, lineGroup: "Coast" },
    "大甲": { line: "Coast", mileage: 152.0, lineGroup: "Coast" },
    "台中港": { line: "Coast", mileage: 157.3, lineGroup: "Coast" },
    "清水": { line: "Coast", mileage: 163.3, lineGroup: "Coast" },
    "沙鹿": { line: "Coast", mileage: 166.5, lineGroup: "Coast" },
    "龍井": { line: "Coast", mileage: 171.1, lineGroup: "Coast" },
    "大肚": { line: "Coast", mileage: 176.1, lineGroup: "Coast" },
    "追分": { line: "Coast", mileage: 181.1, lineGroup: "Coast", isMountainEnd: true }, // Connects to Mountain

    // West-South (South of Changhua)
    "彰化": { line: "West", mileage: 182.6, lineGroup: "West-South", isJunction: true },
    "花壇": { line: "West", mileage: 189.2, lineGroup: "West-South" },
    "大村": { line: "West", mileage: 193.9, lineGroup: "West-South" },
    "員林": { line: "West", mileage: 197.3, lineGroup: "West-South" },
    "永靖": { line: "West", mileage: 200.7, lineGroup: "West-South" },
    "社頭": { line: "West", mileage: 204.5, lineGroup: "West-South" },
    "田中": { line: "West", mileage: 208.8, lineGroup: "West-South" },
    "二水": { line: "West", mileage: 214.6, lineGroup: "West-South", isBranchStart: "Jiji", isJunction: true },
    "林內": { line: "West", mileage: 222.8, lineGroup: "West-South" },
    "石榴": { line: "West", mileage: 227.5, lineGroup: "West-South" },
    "斗六": { line: "West", mileage: 232.3, lineGroup: "West-South" },
    "斗南": { line: "West", mileage: 240.0, lineGroup: "West-South" },
    "石龜": { line: "West", mileage: 243.9, lineGroup: "West-South" },
    "大林": { line: "West", mileage: 248.5, lineGroup: "West-South" },
    "民雄": { line: "West", mileage: 254.3, lineGroup: "West-South" },
    "嘉北": { line: "West", mileage: 261.0, lineGroup: "West-South" }, // Approx
    "嘉義": { line: "West", mileage: 263.6, lineGroup: "West-South" }, // Alishan Forest Railway connection
    "水上": { line: "West", mileage: 270.1, lineGroup: "West-South" },
    "南靖": { line: "West", mileage: 272.8, lineGroup: "West-South" },
    "後壁": { line: "West", mileage: 278.9, lineGroup: "West-South" },
    "新營": { line: "West", mileage: 286.6, lineGroup: "West-South" },
    "柳營": { line: "West", mileage: 290.0, lineGroup: "West-South" },
    "林鳳營": { line: "West", mileage: 293.8, lineGroup: "West-South" },
    "隆田": { line: "West", mileage: 299.3, lineGroup: "West-South" },
    "拔林": { line: "West", mileage: 301.6, lineGroup: "West-South" },
    "善化": { line: "West", mileage: 306.2, lineGroup: "West-South" },
    "南科": { line: "West", mileage: 310.0, lineGroup: "West-South" }, // Approx
    "新市": { line: "West", mileage: 313.7, lineGroup: "West-South" },
    "永康": { line: "West", mileage: 318.7, lineGroup: "West-South" },
    "大橋": { line: "West", mileage: 322.0, lineGroup: "West-South" }, // Approx
    "台南": { line: "West", mileage: 325.1, lineGroup: "West-South" },
    "林森": { line: "West", mileage: 327.0, lineGroup: "West-South" }, // Tainan Urban
    "南台南": { line: "West", mileage: 329.0, lineGroup: "West-South" }, // Tainan Urban
    "保安": { line: "West", mileage: 332.7, lineGroup: "West-South" },
    "仁德": { line: "West", mileage: 334.0, lineGroup: "West-South" }, // Near Bao'an
    "中洲": { line: "West", mileage: 336.7, lineGroup: "West-South", isJunction: true }, // Shalun line branches here
    "大湖": { line: "West", mileage: 339.6, lineGroup: "West-South" },
    "路竹": { line: "West", mileage: 342.6, lineGroup: "West-South" },
    "岡山": { line: "West", mileage: 349.9, lineGroup: "West-South" },
    "橋頭": { line: "West", mileage: 353.9, lineGroup: "West-South" },
    "楠梓": { line: "West", mileage: 358.0, lineGroup: "West-South" },
    "新左營": { line: "West", mileage: 362.0, lineGroup: "West-South", isJunction: true }, // HSR Connection
    "左營": { line: "West", mileage: 365.0, lineGroup: "West-South" },
    //高雄地下化段
    "內惟": { line: "West", mileage: 367.0, lineGroup: "West-South" },
    "美術館": { line: "West", mileage: 368.5, lineGroup: "West-South" },
    "鼓山": { line: "West", mileage: 370.0, lineGroup: "West-South" },
    "三塊厝": { line: "West", mileage: 371.0, lineGroup: "West-South" },
    "高雄": { line: "West", mileage: 371.8, lineGroup: "West-South", isJunction: true },
    "民族": { line: "West", mileage: 373.5, lineGroup: "Pingtung" }, // Switch conceptual group
    "科工館": { line: "West", mileage: 375.0, lineGroup: "Pingtung" },
    "正義": { line: "West", mileage: 376.0, lineGroup: "Pingtung" },

    // Pingtung Line
    "鳳山": { line: "West", mileage: 377.5, lineGroup: "Pingtung" },
    "後庄": { line: "West", mileage: 381.2, lineGroup: "Pingtung" },
    "九曲堂": { line: "West", mileage: 385.5, lineGroup: "Pingtung" },
    "六塊厝": { line: "West", mileage: 390.5, lineGroup: "Pingtung" },
    "屏東": { line: "West", mileage: 392.7, lineGroup: "Pingtung" },
    "歸來": { line: "West", mileage: 395.4, lineGroup: "Pingtung" },
    "麟洛": { line: "West", mileage: 397.7, lineGroup: "Pingtung" },
    "西勢": { line: "West", mileage: 400.1, lineGroup: "Pingtung" },
    "竹田": { line: "West", mileage: 403.8, lineGroup: "Pingtung" },
    "潮州": { line: "West", mileage: 407.8, lineGroup: "Pingtung" },
    "崁頂": { line: "West", mileage: 412.7, lineGroup: "Pingtung" },
    "南州": { line: "West", mileage: 415.1, lineGroup: "Pingtung" },
    "鎮安": { line: "West", mileage: 418.9, lineGroup: "Pingtung" },
    "林邊": { line: "West", mileage: 421.9, lineGroup: "Pingtung" },
    "佳冬": { line: "West", mileage: 425.9, lineGroup: "Pingtung" },
    "東海": { line: "West", mileage: 428.9, lineGroup: "Pingtung" },
    "枋寮": { line: "West", mileage: 433.1, lineGroup: "Pingtung", isSouthLinkStartWest: true, isJunction: true },

    // Jiji Line (Starts from Ershui - Mileage relative to Ershui)
    "源泉": { line: "Jiji", mileage: 2.9, baseStation: "二水", lineGroup: "Jiji" },
    "濁水": { line: "Jiji", mileage: 10.8, baseStation: "二水", lineGroup: "Jiji" },
    "龍泉": { line: "Jiji", mileage: 15.7, baseStation: "二水", lineGroup: "Jiji" },
    "集集": { line: "Jiji", mileage: 20.0, baseStation: "二水", lineGroup: "Jiji" },
    "水里": { line: "Jiji", mileage: 27.4, baseStation: "二水", lineGroup: "Jiji" },
    "車埕": { line: "Jiji", mileage: 29.7, baseStation: "二水", lineGroup: "Jiji" },

    // Neiwan Line (Starts from Hsinchu - Mileage relative to Hsinchu)
    "千甲": { line: "Neiwan", mileage: 3.0, baseStation: "新竹", lineGroup: "Neiwan" }, // Approx
    "新莊": { line: "Neiwan", mileage: 5.0, baseStation: "新竹", lineGroup: "Neiwan" }, // Approx (Near Hsinchu Science Park)
    "竹中": { line: "Neiwan", mileage: 8.0, baseStation: "新竹", lineGroup: "Neiwan", isJunction: true }, // Liujia line branches
    "六家": { line: "Liujia", mileage: 11.0, baseStation: "竹中", lineGroup: "Neiwan"}, // Liujia branch - Approx rel Hsinchu
    "上員": { line: "Neiwan", mileage: 10.5, baseStation: "新竹", lineGroup: "Neiwan" },
    "榮華": { line: "Neiwan", mileage: 14.0, baseStation: "新竹", lineGroup: "Neiwan" }, // Approx
    "竹東": { line: "Neiwan", mileage: 16.6, baseStation: "新竹", lineGroup: "Neiwan" },
    "橫山": { line: "Neiwan", mileage: 19.9, baseStation: "新竹", lineGroup: "Neiwan" },
    "九讚頭": { line: "Neiwan", mileage: 22.2, baseStation: "新竹", lineGroup: "Neiwan" },
    "合興": { line: "Neiwan", mileage: 24.3, baseStation: "新竹", lineGroup: "Neiwan" },
    "富貴": { line: "Neiwan", mileage: 25.7, baseStation: "新竹", lineGroup: "Neiwan" },
    "內灣": { line: "Neiwan", mileage: 27.9, baseStation: "新竹", lineGroup: "Neiwan" },

    // --- Eastern Line (Yilan/North Link - Mileage from Taipei) ---
    "暖暖": { line: "East", mileage: 26.4, lineGroup: "East-North" },
    "四腳亭": { line: "East", mileage: 28.7, lineGroup: "East-North" },
    "瑞芳": { line: "East", mileage: 34.5, lineGroup: "East-North", isJunction: true }, // Pingxi/Shen'ao connection
    "海科館": { line: "ShenAo", mileage: 36.0, baseStation: "瑞芳", lineGroup: "Pingxi" }, // Shen'ao Branch - group w Pingxi
    "八斗子": { line: "ShenAo", mileage: 37.0, baseStation: "瑞芳", lineGroup: "Pingxi" }, // Shen'ao Branch
    "侯硐": { line: "East", mileage: 39.1, lineGroup: "East-North" },
    "三貂嶺": { line: "East", mileage: 41.6, lineGroup: "East-North", isBranchStart: "Pingxi", isJunction: true },
    "牡丹": { line: "East", mileage: 45.3, lineGroup: "East-North" },
    "雙溪": { line: "East", mileage: 48.4, lineGroup: "East-North" },
    "貢寮": { line: "East", mileage: 53.7, lineGroup: "East-North" },
    "福隆": { line: "East", mileage: 57.5, lineGroup: "East-North" },
    "石城": { line: "East", mileage: 63.1, lineGroup: "East-North" },
    "大里": { line: "East", mileage: 65.8, lineGroup: "East-North" },
    "大溪": { line: "East", mileage: 70.8, lineGroup: "East-North" },
    "龜山": { line: "East", mileage: 75.5, lineGroup: "East-North" },
    "外澳": { line: "East", mileage: 79.1, lineGroup: "East-North" },
    "頭城": { line: "East", mileage: 82.8, lineGroup: "East-North" },
    "頂埔": { line: "East", mileage: 85.0, lineGroup: "East-North" },
    "礁溪": { line: "East", mileage: 89.1, lineGroup: "East-North" },
    "四城": { line: "East", mileage: 93.1, lineGroup: "East-North" },
    "宜蘭": { line: "East", mileage: 97.4, lineGroup: "East-North" },
    "二結": { line: "East", mileage: 103.2, lineGroup: "East-North" },
    "中里": { line: "East", mileage: 104.4, lineGroup: "East-North" },
    "羅東": { line: "East", mileage: 106.3, lineGroup: "East-North" },
    "冬山": { line: "East", mileage: 111.3, lineGroup: "East-North" },
    "新馬": { line: "East", mileage: 115.5, lineGroup: "East-North" },
    "蘇澳新": { line: "East", mileage: 116.7, lineGroup: "East-North", isBranchStart: "SuAo", isJunction: true },
    "蘇澳": { line: "SuAo", mileage: 119.9, baseMileage: 116.7, lineGroup: "SuAo", baseStation: "蘇澳新" },
    "永樂": { line: "East", mileage: 122.0, lineGroup: "East-North" },
    "東澳": { line: "East", mileage: 127.4, lineGroup: "East-North" },
    "南澳": { line: "East", mileage: 135.4, lineGroup: "East-North" },
    "武塔": { line: "East", mileage: 138.9, lineGroup: "East-North" },
    "漢本": { line: "East", mileage: 152.1, lineGroup: "East-North" },
    "和平": { line: "East", mileage: 156.5, lineGroup: "East-North" },
    "和仁": { line: "East", mileage: 164.2, lineGroup: "East-North" },
    "崇德": { line: "East", mileage: 174.3, lineGroup: "East-North" },
    "新城": { line: "East", mileage: 179.6, lineGroup: "East-North" },
    "景美": { line: "East", mileage: 184.9, lineGroup: "East-North" },
    "北埔": { line: "East", mileage: 191.4, lineGroup: "East-North" },

     // Hualien-Taitung Line
    "花蓮": { line: "East", mileage: 195.9, lineGroup: "Hualien-Taitung", isJunction: true },
    "吉安": { line: "East", mileage: 199.3, lineGroup: "Hualien-Taitung" },
    "干城": { line: "East", mileage: 201.0, lineGroup: "Hualien-Taitung" }, // Approx
    "志學": { line: "East", mileage: 208.3, lineGroup: "Hualien-Taitung" },
    "平和": { line: "East", mileage: 211.2, lineGroup: "Hualien-Taitung" },
    "壽豐": { line: "East", mileage: 213.0, lineGroup: "Hualien-Taitung" },
    "豐田": { line: "East", mileage: 216.4, lineGroup: "Hualien-Taitung" },
    "溪口": { line: "East", mileage: 219.8, lineGroup: "Hualien-Taitung" },
    "南平": { line: "East", mileage: 224.2, lineGroup: "Hualien-Taitung" },
    "鳳林": { line: "East", mileage: 228.4, lineGroup: "Hualien-Taitung" },
    "萬榮": { line: "East", mileage: 233.4, lineGroup: "Hualien-Taitung" },
    "光復": { line: "East", mileage: 239.0, lineGroup: "Hualien-Taitung" },
    "大富": { line: "East", mileage: 246.8, lineGroup: "Hualien-Taitung" },
    "富源": { line: "East", mileage: 249.8, lineGroup: "Hualien-Taitung" },
    "瑞北": { line: "East", mileage: 255.7, lineGroup: "Hualien-Taitung" },
    "瑞穗": { line: "East", mileage: 259.1, lineGroup: "Hualien-Taitung" },
    "三民": { line: "East", mileage: 268.5, lineGroup: "Hualien-Taitung" },
    "玉里": { line: "East", mileage: 280.0, lineGroup: "Hualien-Taitung" },
    "安通": { line: "East", mileage: 285.7, lineGroup: "Hualien-Taitung" },
    "東里": { line: "East", mileage: 289.8, lineGroup: "Hualien-Taitung" },
    "東竹": { line: "East", mileage: 295.8, lineGroup: "Hualien-Taitung" },
    "富里": { line: "East", mileage: 302.0, lineGroup: "Hualien-Taitung" },
    "池上": { line: "East", mileage: 308.9, lineGroup: "Hualien-Taitung" },
    "海端": { line: "East", mileage: 314.5, lineGroup: "Hualien-Taitung" },
    "關山": { line: "East", mileage: 321.1, lineGroup: "Hualien-Taitung" },
    "月美": { line: "East", mileage: 324.8, lineGroup: "Hualien-Taitung" },
    "瑞和": { line: "East", mileage: 328.8, lineGroup: "Hualien-Taitung" },
    "瑞源": { line: "East", mileage: 331.7, lineGroup: "Hualien-Taitung" },
    "鹿野": { line: "East", mileage: 337.3, lineGroup: "Hualien-Taitung" },
    "山里": { line: "East", mileage: 343.5, lineGroup: "Hualien-Taitung" },
    "台東": { line: "East", mileage: 351.6, lineGroup: "Hualien-Taitung", isJunction: true }, // South Link starts

    // South-Link Line (Continues East mileage from Taipei)
    "康樂": { line: "East", mileage: 356.2, lineGroup: "South-Link" },
    "知本": { line: "East", mileage: 363.2, lineGroup: "South-Link" },
    "太麻里": { line: "East", mileage: 374.9, lineGroup: "South-Link" },
    "金崙": { line: "East", mileage: 385.8, lineGroup: "South-Link" },
    "瀧溪": { line: "East", mileage: 394.2, lineGroup: "South-Link" },
    "大武": { line: "East", mileage: 406.0, lineGroup: "South-Link" },
    "古莊": { line: "East", mileage: 409.2, lineGroup: "South-Link" },
    "枋野": { line: "East", mileage: 429.2, lineGroup: "South-Link" },
    "枋山": { line: "East", mileage: 436.1, lineGroup: "South-Link" },
    "內獅": { line: "East", mileage: 441.0, lineGroup: "South-Link" },
    "加祿": { line: "East", mileage: 444.4, lineGroup: "South-Link" },
    // Fangliao is the end point, already defined in Pingtung line


    // Pingxi Line (Starts from Sandiaoling - Mileage relative to Sandiaoling)
    "大華": { line: "Pingxi", mileage: 3.5, baseStation: "三貂嶺", lineGroup: "Pingxi" },
    "十分": { line: "Pingxi", mileage: 6.4, baseStation: "三貂嶺", lineGroup: "Pingxi" },
    "望古": { line: "Pingxi", mileage: 8.0, baseStation: "三貂嶺", lineGroup: "Pingxi" },
    "嶺腳": { line: "Pingxi", mileage: 10.1, baseStation: "三貂嶺", lineGroup: "Pingxi" },
    "平溪": { line: "Pingxi", mileage: 11.1, baseStation: "三貂嶺", lineGroup: "Pingxi" },
    "菁桐": { line: "Pingxi", mileage: 12.9, baseStation: "三貂嶺", lineGroup: "Pingxi" },
};

// Add name property and ensure segments for all
Object.keys(stationsData).forEach(name => {
    if (name === '_lineGroups') return;
    const station = stationsData[name];
    station.name = name;
    // Assign segment based on lineGroup if not already set by old logic
     if (!station.segment) {
        const groupInfo = stationsData._lineGroups[station.lineGroup];
         // Use lineGroup as segment identifier or a simplified version
         station.segment = station.lineGroup || station.line;
     }
     // Ensure base stations exist
     if (station.baseStation && !stationsData[station.baseStation]) {
         console.warn(`Base station '${station.baseStation}' for branch station '${name}' not found.`);
     }
      // Define base mileage for coast line for junction calculations
      if (name === '彰化' && !station.mileageCoast) {
         const zhuifen = stationsData['追分'];
         const chenggong = stationsData['成功'];
         if (zhuifen && chenggong) {
             //Approximate Changhua's coast mileage based on distance from ZhuiFen
             station.mileageCoast = zhuifen.mileage + Math.abs(station.mileage - chenggong.mileage);
         } else {
             station.mileageCoast = station.mileage; // Fallback
         }
     }
});

// Define key junctions by name
const ZHU_NAN = "竹南";
const CHANG_HUA = "彰化";
const FANG_LIAO = "枋寮";
const TAIPEI = "台北";
const BADU = "八堵";
const SUAOXIN = "蘇澳新";
const SANDIAOLING = "三貂嶺";
const ERSHEI = "二水";
const HSINCHU = "新竹";