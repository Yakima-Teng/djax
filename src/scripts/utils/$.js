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

const output = window.$ || $$;
window.$ = output;
// 若本地已加载有jQuery或zepto，则使用这些工具库提供的$
export default output;
