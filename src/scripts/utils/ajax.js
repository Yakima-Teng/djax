(function (doc, win) {
  const common = win.$utils.common;
  const merge = win.$utils.object.merge;
  const modalLoad = win.$utils.modal.load;
  const modalAlert = win.$utils.modal.alert;
  const getIdxForLoad = win.$utils.modal.getIdxForLoad;
  if (!common) {
    throw new Error('请先加载utils/common.js文件，再加载utils目录下的其他文件');
  }

  let apiPrefix = '';
  let apiSuffix = '';
  let countForAjaxWait = 0;

  function setApiPrefix (val) {
    apiPrefix = val;
  };

  function setApiSuffix (val) {
    apiSuffix = val;
  };

  function post (endPoint, requestData, options, config) {
    requestData = requestData || {};
    config = config || { handleErrorAutomatically: true, silent: false };
    const handleErrorAutomatically = config.handleErrorAutomatically || false;
    const silent = config.silent || false;
    if (!silent) {
      countForAjaxWait++;
      if (countForAjaxWait === 1 && !getIdxForLoad()) {
        modalLoad(true);
      }
    }
    return $.ajax(merge({
      type: 'POST',
      accept: 'application/json',
      contentType: requestData instanceof FormData ? false : 'application/x-www-form-urlencoded;charset=utf-8',
      url: apiPrefix + (endPoint || '') + apiSuffix,
      dataType: 'json',
      processData: !(requestData instanceof FormData),
      data: (function () {
        if (requestData instanceof FormData) {
          return requestData;
        }
        const d = new Date().getTime();
        return {
          requestTime: d,
          sessionToken: hexMd5((d + '').substring((d + '').length - 8)),
          requestBody: JSON.stringify(requestData)
        };
      })()
    }, options || {})).done(function (data) {
      if (data.status === '200' && !data.errorCode) {
        //
      } else {
        handleErrorAutomatically && modalAlert(data.errorMsg || '服务器响应异常！');
      }
    }).fail(function () {
      handleErrorAutomatically && modalAlert('网络异常，请稍后再试！');
    }).always(function () {
      if (!silent) {
        countForAjaxWait--;
        if (countForAjaxWait === 0 && getIdxForLoad()) {
          modalLoad(false);
        }
      }
    });
  };

  const output = {
    setApiPrefix,
    setApiSuffix,
    post
  };

  if (win.$utils) {
    win.$utils.ajax = output;
  } else {
    win.$utils = { ajax: output };
  }
})(document, window);
