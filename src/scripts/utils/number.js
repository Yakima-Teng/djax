(function (doc, win) {
  const common = win.$utils.common;
  if (!common) {
    throw new Error('请先加载utils/common.js文件，再加载utils目录下的其他文件');
  }

  function getInteger (val) {
    return val ? parseInt(val, 10) : 0;
  }

  const output = {
    getInteger
  };

  if (win.$utils) {
    win.$utils.number = output;
  } else {
    win.$utils = { number: output };
  }
})(document, window);
