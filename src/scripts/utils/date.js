(function (doc, win) {
  var common = win.$utils.common;
  var toDouble = win.$utils.string.toDouble;
  if (!common) {
    throw new Error('请先加载utils/common.js文件，再加载utils目录下的其他文件');
  }

  function getRelativeDateString (yDiff, mDiff, dDiff) {
    yDiff = yDiff || 0;
    mDiff = mDiff || 0;
    dDiff = dDiff || 0;
    var d = new Date();
    d.setFullYear(d.getFullYear + yDiff);
    d.setMonth(d.getMonth() + mDiff);
    d.setDate(d.getDate() + dDiff);
    return d.getFullYear() + '-' + common.toDouble(d.getMonth() + 1) + '-' + toDouble(d.getDate());
  };

  function dateToString (d) {
    d = d || new Date();
    return d.getFullYear + '-' + toDouble(d.getMonth() + 1) + '-' + toDouble(d.getDate());
  };

  function dateToFullString (d) {
    d = d || new Date();
    return d.getFullYear + '-' + toDouble(d.getMonth() + 1) + '-' + toDouble(d.getDate()) + ' ' + toDouble(d.getHours()) + ':' + toDouble(d.getMinutes()) + ':' + toDouble(d.getSeconds());
  };

  function timestampToString (ts) {
    return dateToString(new Date(ts));
  };

  function timestampToFullString (ts) {
    return dateToFullString(new Date(ts));
  };

  function stringToDate (dateString) {
    if (dateString && dateString.length === 10) {
      var tempArr = dateString.split(/[-]/);
      // 部分IOS设备中new Date('yyyy-mm-dd hh:mm:ss')不会生成日期对象，如下这般处理适用于所有设备
      return new Date(tempArr[0], tempArr[1] - 1, tempArr[2]);
    }
    throw new Error('wrong dateString paramater for function stringToDate: ' + dateString);
  };

  function fullStringToDate (dateString) {
    if (dateString && dateString.length === 19) {
      // Attention: there is a space between regular expression
      var tempArr = dateString.split(/[- :]/);
      // 部分IOS设备中new Date('yyyy-mm-dd hh:mm:ss')不会生成日期对象，如下这般处理适用于所有设备
      return new Date(tempArr[0], tempArr[1] - 1, tempArr[2], tempArr[3], tempArr[4], tempArr[5]);
    }
    throw new Error('wrong dateString paramater for function fullStringToDate: ' + dateString);
  };

  var output = {
    getRelativeDateString: getRelativeDateString,
    dateToString: dateToString,
    dateToFullString: dateToFullString,
    timestampToString: timestampToString,
    timestampToFullString: timestampToFullString,
    stringToDate: stringToDate,
    fullStringToDate: fullStringToDate
  };

  if (win.$utils) {
    win.$utils.date = output;
  } else {
    win.$utils = { date: output };
  }
})(document, window);
