export function alert ({ title = '', content = '', callback = function () {} }) {
  const html = `
    <div class="djax-alert" id="djaxAlertHtml">
      <div class="djax-alert-wrapper">
        <div class="djax-alert-title">
          ${title || '信息'}
          <div class="djax-alert-btn-close">X</div>
        </div>
        <div class="djax-alert-content">${content}</div>
        <div class="djax-alert-footer">
          <button class="djax-alert-btn-ok">确定</button>
        </div>
      </div>
    </div>
  `;
  const style = `
    <style id="djaxAlertStyle">
      .djax-alert {
        position: fixed;
        z-index: 100;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, .3);
        opacity: 1;
      }
      .djax-alert-wrapper {
        position: absolute;
        top: 200px;
        left: 50%;
        width: 360px;
        margin-left: -180px;
        background-color: #fff;
        box-shadow: 1px 1px 50px rgba(0, 0, 0, .3);
      }
      .djax-alert-title {
        position: relative;
        padding: 0 80px 0 20px;
        height: 42px;
        line-height: 42px;
        border-bottom: 1px solid #eee;
        font-size: 14px;
        color: #333;
        overflow: hidden;
        background-color: #F8F8F8;
        border-radius: 2px 2px 0 0;
      }
      .djax-alert-btn-close {
        position: absolute;
        height: 20px;
        line-height: 20px;
        text-align: center;
        width: 20px;
        border-radius: 50%;
        top: 50%;
        right: 10px;
        margin-top: -10px;
        color: #333;
        cursor: pointer;
        user-select: none;
      }
      .djax-alert-content {
        position: relative;
        padding: 20px;
        line-height: 24px;
        word-break: break-all;
        overflow: hidden;
        font-size: 14px;
        overflow-x: hidden;
        overflow-y: auto;
      }
      .djax-alert-footer {
        text-align: right;
        padding: 0 15px 12px;
        pointer-events: auto;
        -webkit-user-select: none;
        user-select: none;
      }
      .djax-alert-btn-ok {
        height: 28px;
        line-height: 28px;
        margin: 5px 5px 0;
        padding: 0 15px;
        border: 1px solid #1E9FFF;;
        background-color: #1E9FFF;
        color: #fff;
        border-radius: 2px;
        font-weight: 400;
        cursor: pointer;
        text-decoration: none;
        transition: 300ms all linear 0ms;
      }
      .djax-alert-btn-ok:focus {
        outline: none;
      }
      .djax-alert-btn-ok:active {
        border-color: #0079d6;
        background-color: #0079d6;
      }
    </style>
  `;
  const $html = $(html);
  const $style = $(style);
  const $body = $('body');
  $body.append($style);
  $body.append($html);
  $body.one('click', '.djax-alert-btn-ok', function (e) {
    $html.remove();
    $style.remove();
    callback && callback();
  });
  $body.one('click', '.djax-alert-btn-close', function (e) {
    $html.remove();
    $style.remove();
  });
};

export function confirm (content, options, yes, cancel) {
  options = options || {};
  yes = yes || function () {};
  cancel = cancel || function () {};
  layer.confirm(content, options, function (idx) {
    yes();
    layer.close(idx);
  }, function (idx) {
    cancel();
    layer.close(idx);
  });
};

// 提示组件，默认3秒后自动关系
export function msg (content, options, end) {
  options = options || {};
  end = end || function () {};
  layer.msg(content, options, end);
};

let idxForLoad = null;

// 供ajax模块使用
export function getIdxForload () {
  return idxForLoad;
};

export function load (boolean) {
  boolean = boolean || false;
  if (boolean) {
    if (idxForLoad !== null) {
      layer.close(idxForLoad);
    }
    idxForLoad = layer.load(0);
  } else {
    if (idxForLoad === null) {
      layer.close(idxForLoad);
    }
  }
};
