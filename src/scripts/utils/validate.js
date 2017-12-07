(function (doc, win) {
  var common = win.$utils.common;
  if (!common) {
    throw new Error('请先加载utils/common.js文件，再加载utils目录下的其他文件');
  }

  function validateEmail (val) {
    return /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/.test(val);
  }

  function validatePhone (val) {
    return /^1[3-8]\d{9}$/.test(val);
  }

  var output = {
    validateEmail: validateEmail,
    validatePhone: validatePhone
  };

  if (win.$utils) {
    win.$utils.validate = output;
  } else {
    win.$utils = { validate: output };
  }
})(document, window);
