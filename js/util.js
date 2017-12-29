'use strict'

const resolveOwner = function resolveOwner(_) {
  let o = /^.+? \((.+?)\)$/.exec(_)
  return o && o[1] || undefined
}

const pFloat = function parseLocaledFloat(string) {
  if(typeof string !== 'string') return string
  else return parseFloat(string.replace(',', '.'))
}

const getType = function getLogType(type){
  if(type<40)
    return 0;
  else if(type<50)
    return 1;
  else if(type<58)
    return 0;
  else if(type==58)
    return 1;
  else if(type<61)
    return 0;
  else if(type==61)
    return 2;
  else if(type<100)
    return 0;
  else if(type<185)
    return 1;
  else if(type==185)
    return 0;
  else if(type==186)
    return 1;
  return 0;
};