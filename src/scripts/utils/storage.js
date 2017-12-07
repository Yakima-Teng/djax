(function (doc, win) {
  var common = win.$utils.common;
  var merge = win.$utils.object.merge;
  if (!common) {
    throw new Error('请先加载utils/common.js文件，再加载utils目录下的其他文件');
  }

  function setSessionStorage (key, val) {
    window.sessionStorage.setItem(key, encodeURI(JSON.stringify(val)));
  };

  function getSessionStorage (key) {
    var val = window.sessionStorage.getItem(key);
    return val ? JSON.parse(val) : null;
  };

  var appName = 'app';
  var storageKey = window.location.hostname + ':' + appName;

  function setAppName (name) {
    appName = name;
  }

  function getSessionData (key) {
    var storageValue = getSessionStorage(storageKey) || {};
    return storageValue[key] || {};
  };

  function setSessionData (key, options) {
    var storageValue = getSessionStorage(storageKey) || {};
    setSessionStorage(storageKey, merge(storageValue, {
      [key]: options || {}
    }));
  };

  var output = {
    setAppName: setAppName,
    getSessionData: getSessionData,
    setSessionData: setSessionData
  };

  if (win.$utils) {
    win.$utils.storage = output;
  } else {
    win.$utils = { storage: output };
  }
})(document, window);
