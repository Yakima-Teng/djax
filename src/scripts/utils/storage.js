import { merge } from './object';

function setSessionStorage (key, val) {
  window.sessionStorage.setItem(key, encodeURI(JSON.stringify(val)));
};

function getSessionStorage (key) {
  var val = window.sessionStorage.getItem(key);
  return val ? JSON.parse(val) : null;
};

let appName = 'app';
let storageKey = location.hostname + ':' + appName;

export function setAppName (name) {
  appName = name;
  storageKey = location.hostname + ':' + appName;
}

export function getSessionData (key) {
  var storageValue = getSessionStorage(storageKey) || {};
  return storageValue[key] || {};
};

export function setSessionData (key, options) {
  const storageValue = getSessionStorage(storageKey) || {};
  setSessionStorage(storageKey, merge(storageValue, {
    [key]: options || {}
  }));
};
