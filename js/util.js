'use strict'
function initializeUtilValues() {
  if (localStorage.isFirstRun == undefined) {
    localStorage.isFirstRun = true;
    localStorage.username = "";

    localStorage.log_isprint_system = true;
    localStorage.log_istranslate = false;
    localStorage.log_apikey = "";

    localStorage.logColor_time = "#ffffff";
    localStorage.logColor_mob = "#acd848";
    localStorage.logColor_system = "#cccccc";
    localStorage.logColor_error = "#ff4c4c";
    localStorage.logColor_item = "#bbb395";
    localStorage.logColor_get = "#ffffb2";
    localStorage.logColor_exp = "#ffde73";
    localStorage.logColor_notice = "#b38cff";
    localStorage.logColor_craft = "#e0c0f8";
    localStorage.logColor_damage = "#ff7f7f";
    localStorage.logColor_debuff = "#ff8cc6";
    localStorage.logColor_buff = "#94c0ff";
    localStorage.logColor_dice = "#c8c0a0";
    localStorage.logColor_unknown = "#fff8f8";
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
    return 0;
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
  var isEventLogEnabled = true;

  if (type == 0) return isTalkLogEnabled;
  if (type == 1) return isBattleLogEnabled;
  if (type == 2) return isEventLogEnabled;
  return false;
}

function getTimeStampSpan(data) {
  var timestamp = new Date(data);
  var str = '<span style="color: #ffffff;" ">[' + (timestamp.getHours() < 10 ? "0" + timestamp.getHours() : timestamp.getHours()) + ":" + (timestamp.getMinutes() < 10 ? "0" + timestamp.getMinutes() : timestamp.getMinutes()) + '] </span>';
  return str;
}

function makeDetailData(data, decType) {

  var obj = {};
  obj.prefix = "";
  obj.logColor = "";
  obj.isVisible = true;


  switch (decType) {
   
    case 61:
      // NPC 대사 (추정)
      obj.prefix = data.nickname + ": ";
      obj.logColor = localStorage["logColor_mob"];
      obj.isVisible = localStorage.log_isprint_system == 'true';
      break;
    case 68:
      // NPC 대사 (추정)
      obj.prefix = data.nickname + ": ";
      obj.logColor = localStorage["logColor_mob"];
      obj.isVisible = localStorage.log_isprint_system == 'true';
      break;

    default:
      obj.logColor = getOtherColor(decType);
      obj.isVisible = localStorage.log_isprint_system == 'true';
      break;
  }

  return obj;
}

function getUserName() {
  return localStorage.username;
}

function escapeLog(text) {
  text = text
    // 정수를 나타내는 문자
    .replace("", "1")
    .replace("", "2")
    .replace("", "3")

    // 특수문자
    .replace("", "HQ");

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