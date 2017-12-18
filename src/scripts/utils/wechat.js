function onBridgeReady (options, objCallbacks) {
  window.WeixinJSBridge && window.WeixinJSBridge.invoke(
    'getBrandWCPayRequest', options, function (data) {
      if (data && data.err_msg === 'get_brand_wcpay_request:ok') {
        objCallbacks.onOk && objCallbacks.onOk();
      } else if (data && data.err_msg === 'get_brand_wcpay_request:cancel') {
        objCallbacks.onCancel && objCallbacks.onCancel();
      } else if (data && data.err_msg === 'get_brand_wcpay_request:fail') {
        objCallbacks.onFail && objCallbacks.onFail();
      } else if (data && data.err_desc) {
        objCallbacks.onErr && objCallbacks.onErr(data.err_desc);
      } else {
        objCallbacks.onErr && objCallbacks.onErr('');
      }
    }
  );
}

export function payByWechat (opts, objCallbacks) {
  opts = {
    appId: opts.appId || '',
    timeStamp: opts.timeStamp || '',
    nonceStr: opts.nonceStr || '',
    package: opts.package || '',
    signType: 'MD5',
    paySign: opts.paySign
  };
  if (typeof window.WeixinJSBridge === 'undefined') {
    if (window.document.addEventListener) {
      window.document.addEventListener('WeixinJSBridgeReady', onBridgeReady.bind(null, opts, objCallbacks), false);
    } else if (window.document.attachEvent) {
      window.document.attachEvent('WeixinJSBridgeReady', onBridgeReady.bind(null, opts, objCallbacks));
      window.document.attachEvent('onWeixinJSBridgeReady', onBridgeReady.bind(null, opts, objCallbacks));
    }
  } else {
    onBridgeReady(opts);
  }
}
