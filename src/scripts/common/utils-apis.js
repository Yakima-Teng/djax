(function (doc, win) {
  const output = {
    // 在这里将接口api方法进行导出
    // api: function
  };

  if (win.$utils) {
    win.$utils.apis = output;
  } else {
    win.$utils = { apis: output };
  }
})(document, window);
