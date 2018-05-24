'use strict'

function getLogList() {
    var list = undefined;
    if (localStorage["loglist"] == undefined || localStorage["loglist"].length == 0) {
        list = new Array();
        localStorage["loglist"] = list;
    }
    else {
        list = JSON.parse(localStorage["loglist"]);
    }
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
        'keynotification':keynotification,	// 키워드 알림 여부
        'translation': translation,			// 번역 여부
    });
    localStorage["loglist"] = JSON.stringify(list);
}

function appendLogList(callback) {
    var list = getLogList();
    for (var i = 0; i < list.length; i++) {
        var item = list[i];
        var code = item[code];
        $("#loglist").append('<div class="llr">' + item.code + " : " + item.name + '　<div class="li_s">설정</div></div>');
    }
    $('.li_s').click(callback())
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


function initializeLogItems() {
    addLogItem(-1, "기본값", "/timestamp/ /content/", "#f8f8f8", true, false, false, true);

    addLogItem(10, "말하기", "/timestamp/ /teller/: /content/", "#f8f8f8", true, false, true, true);
    addLogItem(30, "떠들기", "/timestamp/ /teller/: /content/", "#eeee00", true, false, true, true);
    addLogItem(11, "외치기", "/timestamp/ /teller/: /content/", "#ffa666", true, false, true, true);
    addLogItem(12, "귓속말 보내기", "/timestamp/ &#62&#62/teller/: /content/", "#ff32e0", true, false, true, true);
    addLogItem(13, "귓속말 받기", "/timestamp/ /teller/&#62&#62: /content/", "#ff32e0", true, false, true, true);
    addLogItem(14, "파티", "/timestamp/ (/teller/) /content/", "#66e6ff", true, false, true, true);
    addLogItem(15, "연합 파티", "/timestamp/ ((/teller/)) /content/", "#66e6ff", true, false, true, true);
    addLogItem(27, "초보자 채널", "/timestamp/ [초보자]&#60/teller/&#62 /content/", "#acdce6", true, false, true, true);
    addLogItem(28, "나만의 감정 표현", "/timestamp/ /teller//content/", "#bcfff0", true, false, true, true);
    addLogItem(29, "감정 표현", "/timestamp/ /teller//content/", "#bcfff0", true, false, true, true);
    addLogItem(24, "자유부대", "/timestamp/ [자유부대]&#60/teller/&#62 /content/", "#ee83b9", true, false, true, true);
    addLogItem(16, "링크셸 1", "/timestamp/ [1]&#60/teller/&#62 /content/", "#d4ff7f", true, false, true, true);
    addLogItem(17, "링크셸 2", "/timestamp/ [2]&#60/teller/&#62 /content/", "#d4ff7f", true, false, true, true);
    addLogItem(18, "링크셸 3", "/timestamp/ [3]&#60/teller/&#62 /content/", "#d4ff7f", true, false, true, true);
    addLogItem(19, "링크셸 4", "/timestamp/ [4]&#60/teller/&#62 /content/", "#d4ff7f", true, false, true, true);
    addLogItem(20, "링크셸 5", "/timestamp/ [5]&#60/teller/&#62 /content/", "#d4ff7f", true, false, true, true);
    addLogItem(21, "링크셸 6", "/timestamp/ [6]&#60/teller/&#62 /content/", "#d4ff7f", true, false, true, true);
    addLogItem(22, "링크셸 7", "/timestamp/ [7]&#60/teller/&#62 /content/", "#d4ff7f", true, false, true, true);
    addLogItem(23, "링크셸 8", "/timestamp/ [8]&#60/teller/&#62 /content/", "#d4ff7f", true, false, true, true);
    addLogItem(37, "크로스 월드 링크셸", "/timestamp/ [CWLS]&#60/teller/&#62 /content/", "#d4ff7f", true, false, true, true);

    addLogItem(3, "공지", "/timestamp/ /content/", "#b38cff", true, false, false, true);
    addLogItem(60, "오류", "/timestamp/ /content/", "#ff4c4c", true, false, false, true);
}