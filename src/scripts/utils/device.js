(function (doc, win) {
  var common = win.$utils.common;
  if (!common) {
    throw new Error('请先加载utils/common.js文件，再加载utils目录下的其他文件');
  }

  function isIOS () {
    return (/iphone/i).test(navigator.userAgent.toLowerCase());
  };

  function getScreenOrientation () {
    // portrait竖屏，landscape横屏
    if (window.orientation === 180 || window.orientation === 0) {
      return isIOS() ? 'portrait' : 'landscape';
    } else if (window.orientation === 90 || window.orientation === -90) {
      return isIOS() ? 'landscape' : 'portrait';
    }
  }

  var output = {
    isIOS: isIOS,
    getScreenOrientation: getScreenOrientation
  };

  if (win.$utils) {
    win.$utils.device = output;
  } else {
    win.$utils = { device: output };
  }
})(document, window);
