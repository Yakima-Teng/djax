(function (doc, win) {
  const common = win.$utils.common;
  if (!common) {
    throw new Error('请先加载utils/common.js文件，再加载utils目录下的其他文件');
  }

  function ready (cb) {
    $(document).ready(function () {
      cb && cb();
    });
  };

  const output = {
    ready
  };

  if (win.$utils) {
    win.$utils.hook = output;
  } else {
    win.$utils = { hook: output };
  }
})(document, window);
