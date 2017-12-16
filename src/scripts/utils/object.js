(function (doc, win) {
  const common = win.$utils.common;
  const typeOf = common.typeOf;
  if (!common) {
    throw new Error('请先加载utils/common.js文件，再加载utils目录下的其他文件');
  }

  // 合并对象属性（在原始对象上进行修改）
  function merge (obj1, obj2) {
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

  const output = {
    merge
  };

  if (win.$utils) {
    win.$utils.object = output;
  } else {
    win.$utils = { object: output };
  }
})(document, window);
