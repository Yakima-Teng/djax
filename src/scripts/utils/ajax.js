import { merge } from './object';
import { load as modalLoad, alert as modalAlert, getLoadStatus } from './modal';

let apiPrefix = '';
let apiSuffix = '';
let countForAjaxWait = 0;

export function setApiPrefix (val) {
  apiPrefix = val;
}

export function setApiSuffix (val) {
  apiSuffix = val;
}

export function post (endPoint, requestData, options, config) {
  requestData = requestData || {};
  config = config || { handleErrorAutomatically: true, silent: false };
  const handleErrorAutomatically = config.handleErrorAutomatically || false;
  const silent = config.silent || false;
  if (!silent) {
    countForAjaxWait++;
    if (countForAjaxWait === 1 && getLoadStatus() === false) {
      modalLoad(true);
    }
  }
  return $.ajax(merge({
    type: 'POST',
    accept: 'application/json',
    contentType: requestData instanceof FormData ? false : (typeof requestData === 'string' ? 'application/json;charset=utf-8' : 'application/x-www-form-urlencoded;charset=utf-8'),
    url: apiPrefix + (endPoint || '') + apiSuffix,
    dataType: 'json',
    processData: !(requestData instanceof FormData),
    data: typeof requestData === 'string' ? JSON.stringify(requestData) : requestData
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
      if (countForAjaxWait === 0 && getLoadStatus() === true) {
        modalLoad(false);
      }
    }
  });
}
