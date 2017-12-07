(function (doc, win) {
  var common = win.$utils.common;
  if (!common) {
    throw new Error('请先加载utils/common.js文件，再加载utils目录下的其他文件');
  }

  function serializeParams (params) {
    var str = '';
    for (var p in params) {
      if (params.hasOwnProperty(p)) {
        str += '&' + p + '=' + params[p];
      }
    }
    return str.replace(/^&/, '');
  }

  // eg. '/index.html?key1=value1&key2=value2' => opts = { path: '/index', query: { key1: value1, key2: value2 } }
  function go (opts) {
    var location = window.location;
    const path = opts.path || '/index';
    const query = opts.query || {};
    var str = location.origin + location.pathname.replace(/\/[a-z-]+\.html$/, '') + path + '.html' + '?' + serializeParams(query);
    location.href = str;
  }

  function getQueryObj () {
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
  };

  // 获取url中查询参数的值
  function getQueryKeyVal (key) {
    var reg = new RegExp('(\\?|&)' + key + '=([^&]*)(&|$)');
    var r = window.location.search.match(reg);
    return r ? window.decodeURI(r[2]) : '';
  };

  // 获取当前路由对象的属性
  function getRoute () {
    var location = window.location;
    return {
      path: location.pathname.replace(/^.*(\/[a-z-]+)\.html/, '$1'),
      query: getQueryObj()
    };
  }

  var output = {
    serializeParams: serializeParams,
    go: go,
    getRoute: getRoute,
    getQueryObj: getQueryObj,
    getQueryKeyVal: getQueryKeyVal
  };

  if (win.$utils) {
    win.$utils.route = output;
  } else {
    win.$utils = { route: output };
  }
})(document, window);
