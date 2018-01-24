'use strict'
function firstRunInitialize() {
  if(localStorage.isFirstRun == undefined)
  {
    localStorage.isFirstRun = true;
    localStorage.username = "";

    localStorage.log_isprint_talk = true;
    localStorage.log_isnotify_talk = false;
    localStorage.log_isprint_nobodyusing = true;
    localStorage.log_isnotify_nobodyusing = false;
    localStorage.log_isprint_shout = true;
    localStorage.log_isnotify_shout = false;
    localStorage.log_isprint_whisper = true;
    localStorage.log_isnotify_whisper = false;
    localStorage.log_isprint_party = true;
    localStorage.log_isnotify_party = false;
    localStorage.log_isprint_grandparty = true;
    localStorage.log_isnotify_grandparty = false;
    localStorage.log_isprint_novice = true;
    localStorage.log_isnotify_novice = false;
    localStorage.log_isprint_emote = true;
    localStorage.log_isnotify_emote = false;

    localStorage.log_isprint_fc = true;
    localStorage.log_isnotify_fc = false;
    localStorage.log_isprint_ls1 = true;
    localStorage.log_isnotify_ls1 = false;
    localStorage.log_isprint_ls2 = true;
    localStorage.log_isnotify_ls2 = false;
    localStorage.log_isprint_ls3 = true;
    localStorage.log_isnotify_ls3 = false;
    localStorage.log_isprint_ls4 = true;
    localStorage.log_isnotify_ls4 = false;
    localStorage.log_isprint_ls5 = true;
    localStorage.log_isnotify_ls5 = false;
    localStorage.log_isprint_ls6 = true;
    localStorage.log_isnotify_ls6 = false;
    localStorage.log_isprint_ls7 = true;
    localStorage.log_isnotify_ls7 = false;
    localStorage.log_isprint_ls8 = true;
    localStorage.log_isnotify_ls8 = false;
    
    localStorage.log_isprint_system = true;
    localStorage.log_istranslate = false;
    localStorage.log_apikey = "";
  }
}

const resolveOwner = function resolveOwner(_) {
  let o = /^.+? \((.+?)\)$/.exec(_)
  return o && o[1] || undefined
}

const pFloat = function parseLocaledFloat(string) {
  if (typeof string !== 'string') return string
  else return parseFloat(string.replace(',', '.'))
}

const getType = function getLogType(type) {
  if (type < 40)
    return 0;
  else if (type < 50)
    return 1;
  else if (type < 58)
    return 0;
  else if (type == 58)
    return 1;
  else if (type < 61)
    return 0;
  else if (type == 61)
    return 2;
  else if (type < 100)
    return 0;
  else if (type < 185)
    return 1;
  else if (type == 185)
    return 0;
  else if (type == 186)
    return 1;
  return 0;
};

function filterLog(type) {
  var isTalkLogEnabled = true;
  var isBattleLogEnabled = false;
  var isEventLogEnabled = false;

  if (type == 0) return isTalkLogEnabled;
  if (type == 1) return isBattleLogEnabled;
  if (type == 2) return isEventLogEnabled;
  return false;
}

function getTimeStampSpan(data) {
  var timestamp = new Date(data.timestamp);
  var str = '<span class="colorTime">[' + (timestamp.getHours() < 10 ? "0" + timestamp.getHours() : timestamp.getHours()) + ":" + (timestamp.getMinutes() < 10 ? "0" + timestamp.getMinutes() : timestamp.getMinutes()) + '] </span>';
  return str;
}

function makeDetailData(data, decType) {
  var obj = {};
  obj.prefix = "";
  obj.logColor = "";
  obj.isVisible = true;

  switch (decType) {
    case 10:
      // 말하기
      if (localStorage.log_isprint_talk == 'true') {
        if (keywordCheck(data)) playSnd('tell1');
        else if (localStorage.log_isnotify_talk == 'true') playSnd('tell3');
        obj.prefix = data.nickname + ": ";
        obj.logColor = "colorSay";
      }
      else obj.isVisible = false;
      break;
    case 30:
      // 떠들기
      if (localStorage.log_isprint_nobodyusing == 'true') {
        if (keywordCheck(data)) playSnd('tell1');
        else if (localStorage.log_isnotify_nobodyusing == 'true') playSnd('tell3');
        obj.prefix = data.nickname + ": ";
        obj.logColor = "colorYell";
      }
      else obj.isVisible = false;
      break;
    case 11:
      // 외치기
      if (localStorage.log_isprint_shout == 'true') {
        if (keywordCheck(data)) playSnd('tell1');
        else if (localStorage.log_isnotify_shout == 'true') playSnd('tell3');
        obj.prefix = data.nickname + ": ";
        obj.logColor = "colorShout";
      }
      else obj.isVisible = false;
      break;

    case 12:
      // 귓속말 보내기
      if (localStorage.log_isprint_whisper == 'true') {
        if (keywordCheck(data)) playSnd('tell1');
        else if (localStorage.log_isnotify_whisper == 'true') playSnd('tell3');
        obj.prefix = ">>" + data.nickname + ": ";
        obj.logColor = "colorWhisper";
      }
      else obj.isVisible = false;
      break;

    case 13:
      // 귓속말 받기
      if (localStorage.log_isprint_whisper == 'true') {
        if (keywordCheck(data)) playSnd('tell1');
        else if (localStorage.log_isnotify_whisper == 'true') playSnd('tell3');
        obj.prefix = data.nickname + " >> ";
        obj.logColor = "colorWhisper";
      }
      else obj.isVisible = false;
      break;

    case 14:
      // 파티
      if (localStorage.log_isprint_party == 'true') {
        if (keywordCheck(data)) playSnd('tell1');
        else if (localStorage.log_isnotify_party == 'true') playSnd('tell3');
        obj.prefix = "(" + data.nickname + ") ";
        obj.logColor = "colorParty";
      }
      else obj.isVisible = false;
      break;

    case 15:
      // 연합 파티
      if (localStorage.log_isprint_grandparty == 'true') {
        if (keywordCheck(data)) playSnd('tell1');
        else if (localStorage.log_isnotify_grandparty == 'true') playSnd('tell3');
        obj.prefix = "((" + data.nickname + ")) ";
        obj.logColor = "colorAli";
      }
      else obj.isVisible = false;
      break;

    case 27:
      // 초보자 채널
      if (localStorage.log_isprint_novice == 'true') {
        if (keywordCheck(data)) playSnd('tell1');
        else if (localStorage.log_isnotify_novice == 'true') playSnd('tell3');
        obj.prefix = "[초보자]<" + data.nickname + "> ";
        obj.logColor = "colorLS";
      }
      else obj.isVisible = false;
      break;

    case 28:
      // 나만의 감정 표현
      if (localStorage.log_isprint_emote == 'true') {
        if (keywordCheck(data)) playSnd('tell1');
        else if (localStorage.log_isnotify_emote == 'true') playSnd('tell3');
        obj.prefix = data.nickname;
        obj.logColor = "colorEmo";
      }
      else obj.isVisible = false;
      break;

    case 29:
      // 감정 표현
      if (localStorage.log_isprint_emote == 'true') {
        if (keywordCheck(data)) playSnd('tell1');
        else if (localStorage.log_isnotify_emote == 'true') playSnd('tell3');
        obj.logColor = "colorEmo";
      }
      else obj.isVisible = false;
      break;


    case 24:
      // 자유부대
      if (localStorage.log_isprint_fc == 'true') {
        if (keywordCheck(data)) playSnd('tell1');
        else if (localStorage.log_isnotify_fc == 'true') playSnd('tell3');
        obj.prefix = "[자유부대]<" + data.nickname + "> ";
        obj.logColor = "colorFC";
      }
      else obj.isVisible = false;
      break;

    case 16:
      // 링크셸 1
      if (localStorage.log_isprint_ls1 == 'true') {
        if (keywordCheck(data)) playSnd('tell1');
        else if (localStorage.log_isnotify_ls1 == 'true') playSnd('tell3');
        obj.prefix = "[" + (decType - 15) + "]<" + data.nickname + "> ";
        obj.logColor = "colorLS";
      }
      else obj.isVisible = false;
      break;
    case 17:
      // 링크셸 2
      if (localStorage.log_isprint_ls2 == 'true') {
        if (keywordCheck(data)) playSnd('tell1');
        else if (localStorage.log_isnotify_ls2 == 'true') playSnd('tell3');
        obj.prefix = "[" + (decType - 15) + "]<" + data.nickname + "> ";
        obj.logColor = "colorLS";
      }
      else obj.isVisible = false;
      break;
    case 18:
      // 링크셸 3
      if (localStorage.log_isprint_ls3 == 'true') {
        if (keywordCheck(data)) playSnd('tell1');
        else if (localStorage.log_isnotify_ls3 == 'true') playSnd('tell3');
        obj.prefix = "[" + (decType - 15) + "]<" + data.nickname + "> ";
        obj.logColor = "colorLS";
      }
      else obj.isVisible = false;
      break;
    case 19:
      // 링크셸 4
      if (localStorage.log_isprint_ls4 == 'true') {
        if (keywordCheck(data)) playSnd('tell1');
        else if (localStorage.log_isnotify_ls4 == 'true') playSnd('tell3');
        obj.prefix = "[" + (decType - 15) + "]<" + data.nickname + "> ";
        obj.logColor = "colorLS";
      }
      else obj.isVisible = false;
      break;
    case 20:
      // 링크셸 5
      if (localStorage.log_isprint_ls5 == 'true') {
        if (keywordCheck(data)) playSnd('tell1');
        else if (localStorage.log_isnotify_ls5 == 'true') playSnd('tell3');
        obj.prefix = "[" + (decType - 15) + "]<" + data.nickname + "> ";
        obj.logColor = "colorLS";
      }
      else obj.isVisible = false;
      break;
    case 21:
      // 링크셸 6
      if (localStorage.log_isprint_ls6 == 'true') {
        if (keywordCheck(data)) playSnd('tell1');
        else if (localStorage.log_isnotify_ls6 == 'true') playSnd('tell3');
        obj.prefix = "[" + (decType - 15) + "]<" + data.nickname + "> ";
        obj.logColor = "colorLS";
      }
      else obj.isVisible = false;
      break;
    case 22:
      // 링크셸 7
      if (localStorage.log_isprint_ls7 == 'true') {
        if (keywordCheck(data)) playSnd('tell1');
        else if (localStorage.log_isnotify_ls7 == 'true') playSnd('tell3');
        obj.prefix = "[" + (decType - 15) + "]<" + data.nickname + "> ";
        obj.logColor = "colorLS";
      }
      else obj.isVisible = false;
      break;
    case 23:
      // 링크셸 8
      if (localStorage.log_isprint_ls8 == 'true') {
        if (keywordCheck(data)) playSnd('tell1');
        else if (localStorage.log_isnotify_ls8 == 'true') playSnd('tell3');
        obj.prefix = "[" + (decType - 15) + "]<" + data.nickname + "> ";
        obj.logColor = "colorLS";
      }
      else obj.isVisible = false;
      break;

    case 61:
      // NPC 대사 (추정)
      obj.prefix = data.nickname + ": ";
      obj.logColor = "colorMob";
      obj.isVisible = localStorage.log_isprint_system == 'true';
      break;
    case 68:
      // NPC 대사 (추정)
      obj.prefix = data.nickname + ": ";
      obj.logColor = "colorMob";
      obj.isVisible = localStorage.log_isprint_system == 'true';
      break;

    default:
      obj.logColor = getOtherColor(decType);
      obj.isVisible = localStorage.log_isprint_system == 'true';
      break;
  }

  return obj;
}

function keywordCheck(data) {
  var username = localStorage.username;
  if(username.length == 0) return false;
  if(data.nickname == username) return false;
  if (data.data.indexOf(username) > -1) return true;
  else return false;
}

function getOtherColor(type) {
  if (type == 45 || type == 173 || type == 75)
    return "colorLS";
  else if (type == 57 || type == 72 || type == 185 || type == 59 || type == 42 || type == 58 || type == 170 || type == 186 || type == 76 || type == 56 || type == 71 || type == 73 || type == 201)
    return "colorSys";
  else if (type == 3)
    return "colorNotice";
  else if (type == 60)
    return "colorErr";
  else if (type == 65)
    return "colorItem";
  else if (type == 62 || type == 43 || type == 44 || type == 171 || type == 172 || type == 190)
    return "colorGet";
  else if (type == 64)
    return "colorExp";
  else if (type == 66 || type == 67 || type == 194 || type == 195)
    return "colorCraft";
  else if (type == 69 || type == 70)
    return "colorFCNotice";
  else if (type == 41 || type == 169)
    return "colorDamage";
  else if (type == 47 || type == 49 || type == 175 || type == 177)
    return "colorDebuff";
  else if (type == 46 || type == 48 || type == 174 || type == 176)
    return "colorBuff";
  else if (type == 74)
    return "colorDice";
  return "colorUnknown";
}

function escapeLog(text) {
  text = text
    // 이하 정수를 나타내는 문자
    .replace("", "1")
    .replace("", "2")
    .replace("", "3")

    // 이하 특수문자
    .replace("", "HQ")
    ;

  var startList = ["\u001c", "\u0002", "�", "\u0003"];

  while (true) {
    var start = startList.map(function (start) {
      return text.indexOf(start);
    }).sort(function (cmp1, cmp2) {
      if (cmp1 == -1)
        return 1;
      else if (cmp2 == -1)
        return -1;
      return cmp1 > cmp2;
    })[0];

    if (start == -1)
      break;

    var target = text.substring(start, text.indexOf("\u0003") + "\u0003".length);
    text = text.replace(target, "");
  }

  text = text.replace(/[\u0001-\u001f]/g, "");
  text = text.replace(/[\ue000-\uf8ff]/g, "");

  return text;
}