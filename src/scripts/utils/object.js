import { typeOf } from './common';

// 合并对象属性（在原始对象上进行修改）
export function merge (obj1, obj2) {
  if (typeOf(obj1) === 'object' && typeOf(obj2) === 'object') {
    for (let p in obj2) {
      if (obj2.hasOwnProperty(p)) {
        if (typeOf(obj1[p]) === 'object' && typeOf(obj2[p]) === 'object') {
          merge(obj1[p], obj2[p]);
        } else {
          obj1[p] = obj2[p];
        }
      }
    }
  }
  return obj1;
};
