(function (doc, win) {
  var utils = {};

  utils.ready = function (cb) {
    $(document).ready(function () {
      cb && cb ();
    });
  };

  utils.router = {
    serializeParams: function (params) {
      var str = '';
      for (var p in params) {
        if (params.hasOwnProperty(p)) {
          str += '&' + p + '=' + params[p]
        }
      }
      return str.replace(/^&/, '');
    },
    // eg. '/index.html?key1=value1&key2=value2' => opts = { path: '/index', query: { key1: value1, key2: value2 } }
    go: function (opts) {
      var location = window.location;
      const path = opts.path || '/index';
      const query = opts.query || {};
      var str = location.origin + location.pathname.replace(/\/[a-z-]+\.html$/, '') + path + '.html' + '?' + this.serializeParams(query);
      location.href = str;
    }
  };

  // 获取当前路由对象的属性
  utils.getRoute = function () {
    var location = window.location;
    return {
      path: location.pathname.replace(/^.*(\/[a-z-]+)\.html/, '$1'),
      query: (function () {
        var search = location.search.replace(/^\?/, '');
        if (!search) {
          return {};
        }
        var obj = {};
        search.split('&').forEach(function (item) {
          var arr = item.split('=');
          obj[arr[0]] = arr[1];
        });
        return obj;
      })()
    }
  };

  // typeOf, return 'array', 'object', 'function', 'null', 'undefined', 'string', 'number'
  function typeOf (input) {
    return ({}).toString.call(input).slice(8, -1).toLowerCase();
  };
  utils.typeOf = typeOf;

  // 合并对象属性（在原始对象上进行修改）
  function merge (obj1, obj2) {
    if (typeOf(obj1) === 'object' && typeOf(obj2) === 'object') {
      for (var p in obj2) {
        if (obj2.hasOwnProperty(p)) {
          if (typeOf(obj1[p]) === 'object' && typeOf(obj2[p]) === 'object') {
            merge(obj1[p], obj2[p]);
          } else {
            obj1[p] === obj2[p];
          }
        }
      }
    }
    return obj1;
  };
  utils.merge = merge;

  utils.alert = function (content, options, yes) {
    options = options || {};
    yes = yes || function () {};
    layui.use('layer', function () {
      var layer = layui.layer;
      layer.ready(function () {
        layer.alert(content, options, function (idx) {
          yes();
          layer.close(idx);
        });
      });
    });
  };

  utils.confirm = function (content, options, yes, cancel) {
    options = options || {};
    yes = yes || function () {};
    cancel = cancel || function () {};
    layui.use('layer', function () {
      var layer = layui.layer;
      layer.ready(function () {
        layer.confirm(content, options, function (idx) {
          yes();
          layer.close(idx);
        }, function (idx) {
          cancel();
          layer.close(idx);
        });
      });
    });
  };

  // 提示组件，默认3秒后自动关系
  utils.msg = function (msg, options, end) {
    options = options || {};
    end = end || function () {};
    layui.use('layer', function () {
      var layer = layui.layer;
      layer.ready(function () {
        layer.msg(content, options, end);
      });
    });
  };

  var idxForLoad = null;
  utils.load = function (boolean) {
    boolean = boolean || false;
    if (boolean) {
      layui.use('layer', function () {
        var layer = layui.layer;
        layer.ready(function () {
          if (idxForLoad) {
            layer.close(idxForLoad);
          }
          idxForLoad = layer.load(0);
        });
      });
    } else {
      layui.use('layer', function () {
        var layer = layui.layer;
        layer.ready(function () {
          if (idxForLoad) {
            layer.close(idxForLoad);
          }
        });
      });
    }
  };

  utils.swiper = function (elem) {
    new window.Swiper(elem, {
      direction: 'horizontal',
      loop: true,
      autoplay: 2000,
      // 用户操作swiper之后，是否禁止autoplay。默认为true：停止。
      autoplayDisableOnInteraction: false,
      // 如果需要分页器
      pagination: {
        el: '.swiper-pagination'
      }
    });
  };

  var apiPrefix = '/api-prefix/';
  var apiSuffix = '.do';
  var countForAjaxWait = 0;
  utils.post = function (endPoint, requestData, options, config) {
    requestData = requestData || {};
    config = config || { handleErrorAutomatically: true, silent: false };
    var handleErrorAutomatically = config.handleErrorAutomatically || false;
    var silent = config.silent || false;
    if (!silent) {
      countForAjaxWait++;
      if (countForAjaxWait === 1 && !idxForLoad) {
        utils.load(true);
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
        }
      })(),
    }, options || {})).done(function (data) {
      if (data.status === '200' && !data.errorCode) {
        //
      } else {
        handleErrorAutomatically && utils.alert(data.errorMsg || '服务器响应异常！');
      }
    }).fail(function () {
      handleErrorAutomatically && utils.alert('网络异常，请稍后再试！');
    }).always(function () {
      if (!silent) {
        countForAjaxWait--;
        if (countForAjaxWait === 0 && idxForLoad) {
          utils.load(false);
        }
      }
    })
  };

  // 获取url中查询参数的值
  utils.getQueryString = function (key) {
    var reg = new RegExp('(\\?|&)' + key + '=([^&]*)(&|$)');
    var r = window.location.search.match(reg);
    return r ? window.decodeURI(r[2]) : '';
  };

  // 移除文本中的空白
  utils.trimSpaces = function (val) {
    val = '' + val;
    return  val.replace(/\s/g, '');
  };

  // 判断是否有值：全部都是空格或其他诸如tab的话，也作为无值看待
  utils.hasValue = function (val) {
    return val !== '' && val !== null && val !== undefined && !/^\s+$/.test(val);
  };

  utils.getString = function (val) {
    return val === 0 ? '0' : (val ? '' + val : '');
  };

  utils.getInteger = function (val) {
    return val ? parseInt(val, 10) : 0;
  };

  function setSessionStorage (key, val) {
    window.sessionStorage.setItem(key, encodeURI(JSON.stringify(val)));
  };

  function getSessionStorage (key) {
    var val = window.sessionStorage.getItem(key);
    return val ? JSON.parse(val) : null;
  };

  var appName = 'video';
  var storageKey = window.location.hostname + ':' + appName;

  utils.getData = function (key) {
    var storageValue = getSessionStorage(storageKey) || {};
    return storageValue[key] || {};
  };

  utils.setData = function (key, options) {
    var storageValue = getSessionStorage(storageKey) || {};
    setSessionStorage(storageKey, merge(storageValue, {
      [key]: options || {}
    }));
  };

  utils.getUserData = function () {
    return utils.getData('user');
  };

  utils.setUserData = function (options) {
    utils.setData('user', options);
  };

  function toDouble (num) {
    return num < 10 ? '0' + num : '' + num;
  };
  utils.toDouble = toDouble;

  function getRelativeDateString (yDiff, mDiff, dDiff) {
    yDiff = yDiff || 0;
    mDiff = mDiff || 0;
    dDiff = dDiff || 0;
    var d = new Date();
    d.setFullYear(d.getFullYear + yDiff);
    d.setMonth(d.getMonth() + mDiff);
    d.setDate(d.getDate() + dDiff);
    return d.getFullYear() + '-' + toDouble(d.getMonth() + 1) + '-' + toDouble(d.getDate());
  };
  utils.getRelativeDateString = getRelativeDateString;

  function dateToString (d) {
    d = d || new Date();
    return d.getFullYear + '-' + toDouble(d.getMonth() + 1) + '-' + toDouble(d.getDate());
  };
  utils.dateToString = dateToString;

  function dateToFullString (d) {
    d = d || new Date();
    return d.getFullYear + '-' + toDouble(d.getMonth() + 1) + '-' + toDouble(d.getDate()) + ' ' + toDouble(d.getHours()) + ':' + toDouble(d.getMinutes()) + ':' + toDouble(d.getSeconds());
  };
  utils.dateToFullString = dateToFullString();

  function timestampToString (ts) {
    return dateToString(new Date(ts));
  };
  utils.timestampToString = timestampToString;

  function timestampToFullString (ts) {
    return dateToFullString(new Date(ts));
  };
  utils.timestampToFullString = timestampToFullString;

  function stringToDate (dateString) {
    if (dateString && dateString.length === 10) {
      var tempArr = dateString.split(/[-]/)
      // 部分IOS设备中new Date('yyyy-mm-dd hh:mm:ss')不会生成日期对象，如下这般处理适用于所有设备
      return new Date(tempArr[0], tempArr[1] - 1, tempArr[2]);
    }
    throw new Error('wrong dateString paramater for function stringToDate: ' + dateString);
  };
  utils.stringToDate = stringToDate;

  function fullStringToDate (dateString) {
    if (dateString && dateString.length === 19) {
      // Attention: there is a space between regular expression
      var tempArr = dateString.split(/[- :]/)
      // 部分IOS设备中new Date('yyyy-mm-dd hh:mm:ss')不会生成日期对象，如下这般处理适用于所有设备
      return new Date(tempArr[0], tempArr[1] - 1, tempArr[2], tempArr[3], tempArr[4], tempArr[5]);
    }
    throw new Error('wrong dateString paramater for function fullStringToDate: ' + dateString);
  };
  utils.fullStringToDate = fullStringToDate;

  utils.validatePhone = function (phone) {
    return /^1[3-8]\d{9}$/.test(phone);
  };

  utils.validateEmail = function (email) {
    return /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/.test(email);
  };

  function isIOS () {
    return (/iphone/i).test(navigator.userAgent.toLowerCase());
  };

  utils.getScreenOrientation = function () {
    // portrait竖屏，landscape横屏
    if (window.orientation === 180 || window.orientation === 0) {
      return isIOS() ? 'portrait' : 'landscape';
    } else if (window.orientation === 90 || window.orientation === -90) {
      return isIOS() ? 'landscape' : 'portrait';
    }
  };

  utils.payByWechat = function (opts, yes) {
    var opts = {
      appId: opts.appId || '',
      timeStamp: opts.timeStamp || '',
      nonceStr: opts.nonceStr || '',
      package: opts.package || '',
      signType: 'MD5',
      paySign: opts.paySign
    };
    if (typeof window.WeixinJSBridge === 'undefined') {
      if (window.document.addEventListener) {
        window.document.addEventListener('WeixinJSBridgeReady', onBridgeReady.bind(null, opts), false)
      } else if (window.document.attachEvent) {
        window.document.attachEvent('WeixinJSBridgeReady', onBridgeReady.bind(null, opts))
        window.document.attachEvent('onWeixinJSBridgeReady', onBridgeReady.bind(null, opts))
      }
    } else {
      onBridgeReady(opts)
    }

    function onBridgeReady (options, yes) {
      window.WeixinJSBridge.invoke(
        'getBrandWCPayRequest', options, function (data) {
          if (data && data.err_msg === 'get_brand_wcpay_request:ok') {
            utils.alert('支付成功', null, function () {
              yes && yes();
            });
          } else if (
            data &&
            (
              data.err_msg === 'get_brand_wcpay_request:cancel' ||
              data.err_msg === 'get_brand_wcpay_request:fail'
            )
          ) {
            utils.alert('未成功支付');
          } else if (data && data.err_desc) {
            utils.alert(data.err_desc);
          } else {
            utils.alert('支付失败');
          }
        }
      )
    }
  };

  win.utils = utils;
})(document, window);
