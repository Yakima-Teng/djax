(function (doc, win) {
  var common = win.$utils.common;
  if (!common) {
    throw new Error('请先加载utils/common.js文件，再加载utils目录下的其他文件');
  }

  function toDouble (num) {
    return num < 10 ? '0' + num : '' + num;
  };

  function getString (val) {
    return val === 0 ? '0' : (val ? '' + val : '');
  };

  // 移除文本中的空白
  function trimSpaces (val) {
    return ('' + val).replace(/\s/g, '');
  };

  var output = {
    toDouble: toDouble,
    getString: getString,
    trimSpaces: trimSpaces
  };

  if (win.$utils) {
    win.$utils.string = output;
  } else {
    win.$utils = { string: output };
  }
})(document, window);
