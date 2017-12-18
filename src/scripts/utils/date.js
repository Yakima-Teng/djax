import { toDouble } from './string';

export function getRelativeDateString (yDiff, mDiff, dDiff) {
  yDiff = yDiff || 0;
  mDiff = mDiff || 0;
  dDiff = dDiff || 0;
  const d = new Date();
  d.setFullYear(d.getFullYear + yDiff);
  d.setMonth(d.getMonth() + mDiff);
  d.setDate(d.getDate() + dDiff);
  return d.getFullYear() + '-' + toDouble(d.getMonth() + 1) + '-' + toDouble(d.getDate());
};

export function dateToString (d) {
  d = d || new Date();
  return d.getFullYear + '-' + toDouble(d.getMonth() + 1) + '-' + toDouble(d.getDate());
};

export function dateToFullString (d) {
  d = d || new Date();
  return d.getFullYear + '-' + toDouble(d.getMonth() + 1) + '-' + toDouble(d.getDate()) + ' ' + toDouble(d.getHours()) + ':' + toDouble(d.getMinutes()) + ':' + toDouble(d.getSeconds());
};

export function timestampToString (ts) {
  return dateToString(new Date(ts));
};

export function timestampToFullString (ts) {
  return dateToFullString(new Date(ts));
};

export function stringToDate (dateString) {
  if (dateString && dateString.length === 10) {
    const tempArr = dateString.split(/[-]/);
    // 部分IOS设备中new Date('yyyy-mm-dd hh:mm:ss')不会生成日期对象，如下这般处理适用于所有设备
    return new Date(tempArr[0], tempArr[1] - 1, tempArr[2]);
  }
  throw new Error('wrong dateString paramater for function stringToDate: ' + dateString);
};

export function fullStringToDate (dateString) {
  if (dateString && dateString.length === 19) {
    // Attention: there is a space between regular expression
    const tempArr = dateString.split(/[- :]/);
    // 部分IOS设备中new Date('yyyy-mm-dd hh:mm:ss')不会生成日期对象，如下这般处理适用于所有设备
    return new Date(tempArr[0], tempArr[1] - 1, tempArr[2], tempArr[3], tempArr[4], tempArr[5]);
  }
  throw new Error('wrong dateString paramater for function fullStringToDate: ' + dateString);
};
