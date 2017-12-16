(function (doc, win) {
  const setAppName = win.$utils.storage.setAppName;
  const setApiPrefix = win.$utils.ajax.setApiPrefix;
  const setApiSuffix = win.$utils.ajax.setApiSuffix;

  function updateConfig (opts) {
    setAppName(opts.appName || 'app');
    setApiPrefix(opts.apiPrefix || '');
    setApiSuffix(opts.apiSuffix || '');
  }

  const output = {
    updateConfig
  };

  if (win.$utils) {
    win.$utils.config = output;
  } else {
    win.$utils = { config: output };
  }
})(document, window);
