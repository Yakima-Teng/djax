(function (doc, win) {
  var setAppName = win.$utils.storage.setAppName;
  var setApiPrefix = win.$utils.ajax.setApiPrefix;
  var setApiSuffix = win.$utils.ajax.setApiSuffix;

  function updateConfig (opts) {
    setAppName(opts.appName || 'app');
    setApiPrefix(opts.apiPrefix || '');
    setApiSuffix(opts.apiSuffix || '');
  }

  var output = {
    updateConfig: updateConfig
  };

  if (win.$utils) {
    win.$utils.config = output;
  } else {
    win.$utils = { config: output };
  }
})(document, window);
