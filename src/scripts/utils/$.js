const doc = document;

function $$ (selector) {
  return new $$.prototype.Init(selector);
};

$$.prototype = {
  constructor: $$,
  length: 0,
  // 原型上具有splice属性后，我们的对象就会变成一个类数组对象
  splice: [].splice,
  selector: '',
  Init (selector) {
    this.doms = doc.querySelectorAll(selector);
    for (let i = 0, len = this.doms.length; i < len; i++) {
      this[i] = this.doms[i];
    }
    this.length = this.doms.length;
  }
};

// 手动把Init的prototype指向$$.prototype
$$.prototype.Init.prototype = $$.prototype;

// ajax静态方法
$$.ajax = () => {};

$$.hasClass = (cls) => {
  const reg = new RegExp(`(\\s|^)${cls}(\\s|$)`);
  for (let i = 0, len = this.length; i < length; i++) {
    if (this[i].className.match(reg)) {
      return true;
    }
  }
  return false;
}

$$.addClass = (cls) => {
  const reg = new RegExp(`(\\s|&)${cls}(\\s|$)`);
  for (let i = 0, len = this.length; i < len; i++) {
    if (!this[i].className.match(reg)) {
      this[i].className += ' ' + cls;
    }
  }
  return this;
};

$$.removeClass = (cls) => {
  const reg = new RegExp(`(\\s|^)${cls}(\\s|$)`);
  for (let i = 0, len = this.length; i < len; i++) {
    if (this[i].className.match(reg)) {
      this[i].className = this[i].className.replace(reg, '');
    }
  }
  return this;
};

$$.css = (attr, val) => {
  for (let i = 0, len = this.length; i < len; i++) {
    if (arguments.length === 1) {
      return window.getComputedStyle(this[i], null)[attr];
    }
    this[i].style[attr] = val;
  }
  return this;
};

function sibling (cur, dir) {
  // 如果节点是元素节点，则nodeType属性将返回1；如果节点是属性节点，则nodeType
  while ((cur = cur[dir]) && cur.nodeType !== 1) {}
  return cur;
}

const output = window.$ || $$;
window.$ = output;
// 若本地已加载有jQuery或zepto，则使用这些工具库提供的$
export default output;
