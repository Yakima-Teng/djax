(function (doc, win) {
  var common = win.$utils.common;
  if (!common) {
    throw new Error('请先加载utils/common.js文件，再加载utils目录下的其他文件');
  }

  function onReady (cb) {
    $(document).ready(function () {
      cb && cb();
    });
  };

  var output = {
    onReady: onReady
  };

  if (win.$utils) {
    win.$utils.hook = output;
  } else {
    win.$utils = { hook: output };
  }
})(document, window);
