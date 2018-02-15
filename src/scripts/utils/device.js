export function isIphone () {
  return (/iphone/i).test(navigator.userAgent.toLowerCase());
}

export function isIpad () {
  return (/ipad/i).test(navigator.userAgent.toLowerCase());
}

export function isIOS () {
  return (isIphone() || isIpad());
}

export function getScreenOrientation () {
  // portrait竖屏，landscape横屏
  if (window.orientation === 180 || window.orientation === 0) {
    return isIOS() ? 'portrait' : 'landscape';
  } else if (window.orientation === 90 || window.orientation === -90) {
    return isIOS() ? 'landscape' : 'portrait';
  }
}
