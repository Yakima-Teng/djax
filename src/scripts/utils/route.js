export function serializeParams (params) {
  let str = '';
  for (let p in params) {
    if (params.hasOwnProperty(p)) {
      str += '&' + p + '=' + params[p];
    }
  }
  return str.replace(/^&/, '');
}

// eg. '/index.html?key1=value1&key2=value2' => opts = { path: '/index', query: { key1: value1, key2: value2 } }
export function go (opts) {
  const location = window.location;
  const path = opts.path || '/index';
  const query = opts.query || {};
  const str = location.origin + location.pathname.replace(/\/[a-z-]+\.html$/, '') + path + '.html' + '?' + serializeParams(query);
  location.href = str;
}

export function getQueryObj () {
  const search = location.search.replace(/^\?/, '');
  if (!search) {
    return {};
  }
  const obj = {};
  search.split('&').forEach(function (item) {
    const arr = item.split('=');
    obj[arr[0]] = arr[1];
  });
  return obj;
};

// 获取url中查询参数的值
export function getQueryKeyVal (key) {
  const reg = new RegExp('(\\?|&)' + key + '=([^&]*)(&|$)');
  const r = window.location.search.match(reg);
  return r ? window.decodeURI(r[2]) : '';
};

// 获取当前路由对象的属性
export function getRoute () {
  return {
    path: location.pathname.replace(/^.*(\/[a-z-]+)\.html/, '$1'),
    query: getQueryObj()
  };
}
