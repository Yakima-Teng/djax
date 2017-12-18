import * as ajax from './ajax';
import * as array from './array';
import * as common from './common';
import * as config from './config';
import * as date from './date';
import * as device from './device';
import * as hook from './hook';
import * as modal from './modal';
import * as number from './number';
import * as object from './object';
import * as route from './route';
import * as storage from './storage';
import * as string from './string';
import * as validate from './validate';
import * as wechat from './wechat';

const output = {
  ajax,
  array,
  common,
  config,
  date,
  device,
  hook,
  modal,
  number,
  object,
  route,
  storage,
  string,
  validate,
  wechat
};

export default output;

// 挂载到window对象上，页面里可以直接通过访问$utils调用相关方法
window.$utils = output;
