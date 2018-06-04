'use strict'


function getLogList() {
    var list = undefined;
    if (localStorage["loglist"] == undefined || localStorage["loglist"].length == 0 || localStorage["loglist"] == "undefined") {
        list = new Array();
        localStorage["loglist"] = list;
    }
    else {
        list = JSON.parse(localStorage["loglist"]);
    }
    list.sort(function (a, b) { return a.code - b.code });
    return list;
}

function findLogItem(code) {
    var list = getLogList();
    for (var i = 0; i < list.length; i++) {
        if (list[i].code == code) {
            return i;
        }
    }
    return -1;
}

function addLogItem(code, name, format, color, visibility, notification, keynotification, translation) {
    var list = getLogList();
    var i = findLogItem(code);
    if (i > -1) {
        list.splice(i, 1);
    }
    list.push({
        'code': code,						// 챗 인덱스
        'name': name,						// 식별 코드
        'format': format,					// 채팅 포맷
        'color': color,						// 로그 색상
        'visibility': visibility,			// 가시 여부
        'notification': notification,		// 채팅 알림 여부
        'keynotification': keynotification,	// 키워드 알림 여부
        'translation': translation,			// 번역 여부
    });
    localStorage["loglist"] = JSON.stringify(list);
}

function appendLogList() {
    $("#loglist").empty();
    var list = getLogList();
    var timestamp = new Date();
    for (var i = 0; i < list.length; i++) {
        var item = list[i];
        $("#loglist").append('<div class="fadelabel" style="font-size: 1.4rem; display:flex; padding:0.5rem; color: ' + item.color + '" onclick="loadEditForm(' + item.code + ')">'+
        '<div style="color: ' + item.color + '; font-size: 1.4rem; margin-right:0.5rem;">●</div>' +
            item.format
                .replace("/teller/", "민필리아")
                .replace("/content/", item.name + ' (' + item.code + ')')
                .replace("/timestamp/", '<div style="color: #ffffff; font-size: 1.4rem; margin-right:0.5rem;">[' + (timestamp.getHours() < 10 ? "0" + timestamp.getHours() : timestamp.getHours()) + ":" + (timestamp.getMinutes() < 10 ? "0" + timestamp.getMinutes() : timestamp.getMinutes()) + ']</div>') +
            '</div>');
    }
}

function getLogItem(code) {
    var list = getLogList();
    for (var i = 0; i < list.length; i++) {
        if (list[i].code == code) {
            return list[i];
        }
    }
    return undefined;
}

function removeLogItem(code) {
    var list = getLogList();
    for (var i = 0; i < list.length; i++) {
        if (list[i].code == code) {
            //console.log("code : " + code + ", index: " + i);
            list.splice(i, 1);
            break;
        }
    }
    localStorage["loglist"] = JSON.stringify(list);
}

function removeAllLogItems() {
    localStorage["loglist"] = undefined;
}

function initializeLogItems() {
    addLogItem(-1, "지정되지 않은 로그", "/timestamp/ /content/", "#ffffff", true, false, false, true);

    addLogItem(10, "말하기", "/timestamp/ /teller/: /content/", "#f7f7f7", true, false, true, true);
    addLogItem(30, "떠들기", "/timestamp/ /teller/: /content/", "#ffff00", true, false, true, true);
    addLogItem(11, "외치기", "/timestamp/ /teller/: /content/", "#ffa666", true, false, true, true);
    addLogItem(12, "귓속말 보내기", "/timestamp/ &#62&#62/teller/: /content/", "#ffb8de", true, false, true, true);
    addLogItem(13, "귓속말 받기", "/timestamp/ /teller/&#62&#62: /content/", "#ffb8de", true, false, true, true);
    addLogItem(14, "파티", "/timestamp/ (/teller/) /content/", "#66e5ff", true, false, true, true);
    addLogItem(15, "연합 파티", "/timestamp/ ((/teller/)) /content/", "#ff7f00", true, false, true, true);
    addLogItem(27, "초보자 채널", "/timestamp/ [초보자]&#60/teller/&#62 /content/", "#d4ff7f", true, false, true, true);
    addLogItem(28, "나만의 감정 표현", "/timestamp/ /teller//content/", "#bafff0", true, false, true, true);
    addLogItem(29, "감정 표현", "/timestamp/ /teller//content/", "#bafff0", true, false, true, true);
    addLogItem(24, "자유부대", "/timestamp/ [자유부대]&#60/teller/&#62 /content/", "#abdbe5", true, false, true, true);
    addLogItem(16, "링크셸 1", "/timestamp/ [1]&#60/teller/&#62 /content/", "#d4ff7f", true, false, true, true);
    addLogItem(17, "링크셸 2", "/timestamp/ [2]&#60/teller/&#62 /content/", "#d4ff7f", true, false, true, true);
    addLogItem(18, "링크셸 3", "/timestamp/ [3]&#60/teller/&#62 /content/", "#d4ff7f", true, false, true, true);
    addLogItem(19, "링크셸 4", "/timestamp/ [4]&#60/teller/&#62 /content/", "#d4ff7f", true, false, true, true);
    addLogItem(20, "링크셸 5", "/timestamp/ [5]&#60/teller/&#62 /content/", "#d4ff7f", true, false, true, true);
    addLogItem(21, "링크셸 6", "/timestamp/ [6]&#60/teller/&#62 /content/", "#d4ff7f", true, false, true, true);
    addLogItem(22, "링크셸 7", "/timestamp/ [7]&#60/teller/&#62 /content/", "#d4ff7f", true, false, true, true);
    addLogItem(23, "링크셸 8", "/timestamp/ [8]&#60/teller/&#62 /content/", "#d4ff7f", true, false, true, true);
    addLogItem(37, "크로스 월드 링크셸", "/timestamp/ [CWLS]&#60/teller/&#62 /content/", "#d4ff7d", true, false, true, true);

    addLogItem(3, "공지", "/timestamp/ /content/", "#debff7", true, false, false, true);
    addLogItem(60, "오류", "/timestamp/ /content/", "#ff4a4a", true, false, false, true);
    addLogItem(57, "시스템", "/timestamp/ /content/", "#cccccc", true, false, false, true);
    addLogItem(61, "NPC 대화", "/teller/: /content/", "#abd647", true, false, false, true);
}