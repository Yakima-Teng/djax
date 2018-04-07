const doc = document

function $$ (selector) {
  return new $$.prototype.Init(selector)
}

$$.prototype = {
  constructor: $$,
  length: 0,
  // 原型上具有splice属性后，我们的对象就会变成一个类数组对象
  splice: [].splice,
  selector: '',
  Init (selector) {
    this.doms = doc.querySelectorAll(selector)
    for (let i = 0, len = this.doms.length; i < len; i++) {
      this[i] = this.doms[i]
    }
    this.length = this.doms.length
  }
}

// 手动把Init的prototype指向$$.prototype
$$.prototype.Init.prototype = $$.prototype

// ajax静态方法
$$.ajax = () => {}

$$.hasClass = (cls) => {
  const reg = new RegExp(`(\\s|^)${cls}(\\s|$)`)
  for (let i = 0, len = this.length; i < len; i++) {
    if (this[i].className.match(reg)) {
      return true
    }
  }
  return false
}

$$.addClass = (cls) => {
  if (doc.getElementsByTagName('body')[0].classList) {
    for (let i = 0, len = this.length; i < len; i++) {
      this[i].classList.add(cls)
    }
    return this
  }
  const reg = new RegExp(`(\\s|&)${cls}(\\s|$)`)
  for (let i = 0, len = this.length; i < len; i++) {
    if (!this[i].className.match(reg)) {
      this[i].className += ' ' + cls
    }
  }
  return this
}

$$.removeClass = (cls) => {
  if (doc.getElementsByTagName('body')[0].classList) {
    for (let i = 0, len = this.length; i < len; i++) {
      this[i].classList.remove(cls)
    }
    return this
  }
  const reg = new RegExp(`(\\s|^)${cls}(\\s|$)`)
  for (let i = 0, len = this.length; i < len; i++) {
    if (this[i].className.match(reg)) {
      this[i].className = this[i].className.replace(reg, '')
    }
  }
  return this
}

$$.toggleClass = (cls) => {
  if (doc.getElementsByTagName('body')[0].classList) {
    for (let i = 0, len = this.length; i < len; i++) {
      this[i].classList.toggle(cls)
    }
    return this
  }
  const reg = new RegExp(`(\\s|^)${cls}(\\s|$)`)
  for (let i = 0, len = this.length; i < len; i++) {
    if (this[i].className.match(reg)) {
      this[i].className = this[i].className.replace(reg, '')
    } else {
      this[i].className += ' ' + cls
    }
  }
}

// TODO: 支持传入对象，支持自动添加厂商前缀
$$.css = (attr, val) => {
  for (let i = 0, len = this.length; i < len; i++) {
    if (arguments.length === 1) {
      return window.getComputedStyle(this[i], null)[attr]
    }
    this[i].style[attr] = val
  }
  return this
}

function sibling (cur, dir) {
  // 如果节点是元素节点，则nodeType属性将返回1（注意node节点不存在时值为null，直接null.nodeType会报错）
  while ((cur = cur[dir]) && cur && cur.nodeType !== 1) {}
  return cur
}

// nextSibling 属性返回指定节点之后紧跟的节点，在相同的树层级中。被返回的节点以 Node 对象返回。如果没有 nextSibling 节点，则返回值为 null。
$$.next = () => sibling(this[0], 'nextElementSibling')

// previousSibling 属性返回同一树层级中指定节点的前一个节点。被返回的节点以 Node 对象的形式返回。如果没有 previousSibling 节点，则返回值是 null。
$$.prev = () => sibling(this[0], 'previousElementSibling')

$$.parent = () => this[0].parentNode

// TODO: 实现一个parents方法

$$.toArray = () => [].slice.call(this)

$$.get = (num) => {
  if (!num) {
    return [].slice.call(this)
  }
  return num < 0 ? this[num + this.length] : this[num]
}

// TODO: 支持事件委托
$$.on = (eventName, eventListener) => {
  [].forEach.call(this, (elem) => {
    elem.addEventListener(eventName, () => {
      eventListener()
    }, false)
  })
  return this
}

// TODO: 支持传入对象
$$.prop = (key, val) => {
  if (arguments.length === 1) {
    return this[0].getAttribute(key)
  }
  for (let i = 0, len = this.length; i < len; i++) {
    this[i].setAttribute(key, val)
  }
  return this
}

const output = window.$ || $$
// window.$ = output
// 若本地已加载有jQuery或zepto，则使用这些工具库提供的$
export default output
