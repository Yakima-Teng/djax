(function (doc, win) {
  var common = win.$utils.common;
  if (!common) {
    throw new Error('请先加载utils/common.js文件，再加载utils目录下的其他文件');
  }

  var output = {};

  if (win.$utils) {
    win.$utils.array = output;
  } else {
    win.$utils = { array: output };
  }
})(document, window);
