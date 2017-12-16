(function (doc, win) {
  // typeOf, return 'array', 'object', 'function', 'null', 'undefined', 'string', 'number'
  function typeOf (input) {
    return ({}).toString.call(input).slice(8, -1).toLowerCase();
  };

  // 判断是否有值：全部都是空格或其他诸如tab的话，也作为无值看待
  function hasValue (val) {
    return val !== '' && val !== null && val !== undefined && !/^\s+$/.test(val);
  };

  const output = {
    typeOf,
    hasValue
  };

  if (win.$utils) {
    win.$utils.common = output;
  } else {
    win.$utils = { common: output };
  }
})(document, window);
