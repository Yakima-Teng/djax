export function alert ({ title = '信息', content = '', callback = function () {} }) {
  const html = `
    <div class="djax-alert" id="djaxAlertHtml">
      <div class="djax-alert-wrapper">
        <div class="djax-alert-title">
          ${title}
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
        z-index: 2000;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, .3);
        opacity: 1;
      }
      .djax-alert-wrapper {
        position: absolute;
        top: 55%;
        left: 50%;
        width: 360px;
        transform: translate(-50%, -50%);
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

export function confirm ({ title = '信息', content = '', yes = function () {}, cancel = function () {} }) {
  const html = `
    <div class="djax-confirm" id="djaxConfirmHtml">
      <div class="djax-confirm-wrapper">
        <div class="djax-confirm-title">
          ${title}
          <div class="djax-confirm-btn-close">X</div>
        </div>
        <div class="djax-confirm-content">${content}</div>
        <div class="djax-confirm-footer">
          <button class="djax-confirm-btn-ok">确定</button>
          <button class="djax-confirm-btn-cancel">取消</button>
        </div>
      </div>
    </div>
  `;
  const style = `
    <style id="djaxConfirmStyle">
      .djax-confirm {
        position: fixed;
        z-index: 2000;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, .3);
        opacity: 1;
      }
      .djax-confirm-wrapper {
        position: absolute;
        top: 55%;
        left: 50%;
        width: 360px;
        transform: translate(-50%, -50%);
        background-color: #fff;
        box-shadow: 1px 1px 50px rgba(0, 0, 0, .3);
      }
      .djax-confirm-title {
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
      .djax-confirm-btn-close {
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
      .djax-confirm-content {
        position: relative;
        padding: 20px;
        line-height: 24px;
        word-break: break-all;
        overflow: hidden;
        font-size: 14px;
        overflow-x: hidden;
        overflow-y: auto;
      }
      .djax-confirm-footer {
        text-align: right;
        padding: 0 15px 12px;
        pointer-events: auto;
        -webkit-user-select: none;
        user-select: none;
      }
      .djax-confirm-btn-ok {
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
      .djax-confirm-btn-ok:focus {
        outline: none;
      }
      .djax-confirm-btn-ok:active {
        border-color: #0079d6;
        background-color: #0079d6;
      }
      .djax-confirm-btn-cancel {
        height: 28px;
        line-height: 28px;
        margin: 5px 5px 0;
        padding: 0 15px;
        border: 1px solid #dedede;;
        background-color: #fff;
        color: #333;
        border-radius: 2px;
        font-weight: 400;
        cursor: pointer;
        text-decoration: none;
        transition: 300ms all linear 0ms;
      }
      .djax-confirm-btn-cancel:focus {
        outline: none;
      }
      .djax-confirm-btn-cancel:active {
        color: #000;
      }
    </style>
  `;
  const $html = $(html);
  const $style = $(style);
  const $body = $('body');
  $body.append($style);
  $body.append($html);
  $body.one('click', '.djax-confirm-btn-ok', function (e) {
    $html.remove();
    $style.remove();
    yes && yes();
  });
  $body.one('click', '.djax-confirm-btn-cancel', function (e) {
    $html.remove();
    $style.remove();
    cancel && cancel();
  });
  $body.one('click', '.djax-confirm-btn-close', function (e) {
    $html.remove();
    $style.remove();
  });
};

// 提示组件，默认3秒后自动关系
export function msg ({ content = '', callback = function () {} }) {
  const html = `
    <div class="djax-msg" id="djaxMsgHtml">${content}</div>
  `;
  const style = `
    <style id="djaxMsgStyle">
      .djax-msg {
        position: fixed;
        z-index: 2000;
        top: 55%;
        left: 50%;
        transform: translate(-50%, -50%);
        padding: 12px 25px;
        text-align: center;
        line-height: 24px;
        word-break: break-all;
        overflow: hidden;
        font-size: 14px;
        color: #fff;
        min-width: 260px;
        background-color: rgba(0, 0, 0, .6);
        border-radius: 3px;
      }
    </style>
  `;
  const $html = $(html);
  const $style = $(style);
  const $body = $('body');
  $body.append($style);
  $body.append($html);
  setTimeout(() => {
    $html.remove();
    $style.remove();
    callback && callback();
  }, 3000);
  $html.click((e) => {
    e.stopPropagation();
  });
  $body.one('click', () => {
    $html.remove();
    $style.remove();
  });
};

// 供ajax模块使用
export function getLoadStatus () {
  return $('#djaxLoadHtml').length === 1;
};

// 提示组件，默认3秒后自动关系
export function load (bool = false) {
  if (bool) {
    if ($('#djaxLoadHtml').length === 0) {
      const html = `
        <div class="djax-load" id="djaxLoadHtml">
          <div class="djax-load-wrapper">
            <div class="djax-load-box"></div>
            <div class="djax-load-box"></div>
          </div>
        </div>
      `;
      const style = `
        <style id="djaxLoadStyle">
          .djax-load {
            position: fixed;
            z-index: 2000;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(0, 0, 0, .6);
          }
          .djax-load-wrapper {
            position: absolute;
            top: 55%;
            left: 50%;
            transform: translate(-50%, -50%);
          }
          .djax-load-box {
            -webkit-animation-fill-mode: both;
            animation-fill-mode: both;
            position: absolute;
            left: 0px;
            top: 0px;
            border: 2px solid #fff;
            border-bottom-color: transparent;
            border-top-color: transparent;
            border-radius: 100%;
            height: 35px;
            width: 35px;
            -webkit-animation: djaxRotate 1s 0s ease-in-out infinite;
            animation: djaxRotate 1s 0s ease-in-out infinite;
          }
          .djax-load-box:last-child {
            display: inline-block;
            top: 10px;
            left: 10px;
            width: 15px;
            height: 15px;
            -webkit-animation-duration: 0.5s;
            animation-duration: 0.5s;
            border-color: #fff transparent #fff transparent;
            -webkit-animation-direction: reverse;
            animation-direction: reverse;
          }
          @-webkit-keyframes djaxRotate {
            0% {
              -webkit-transform: rotate(0deg);
              transform: rotate(0deg);
            }
            50% {
              -webkit-transform: rotate(180deg);
              transform: rotate(180deg);
            }
            100% {
              -webkit-transform: rotate(360deg);
              transform: rotate(360deg);
            }
          }
          @keyframes djaxRotate {
            0% {
              -webkit-transform: rotate(0deg);
              transform: rotate(0deg);
            }
            50% {
              -webkit-transform: rotate(180deg);
              transform: rotate(180deg);
            }
            100% {
              -webkit-transform: rotate(360deg);
              transform: rotate(360deg);
            }
          }
        </style>
      `;
      const $html = $(html);
      const $style = $(style);
      const $body = $('body');
      $body.append($style);
      $body.append($html);
    }
  } else {
    $('#djaxLoadHtml').remove();
    $('#djaxLoadStyle').remove();
  }
};
