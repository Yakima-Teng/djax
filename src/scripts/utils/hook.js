export function ready (optionalScriptsDependencies, cb) {
  console.log(arguments.length);
  if (arguments.length === 1) {
    // 只有一个入参时，用户传的参数为cb，而非optionalScriptsDependencies
    cb = optionalScriptsDependencies;
    waitForReady(cb);
  } else if (arguments.length === 2) {
    loadScripts(optionalScriptsDependencies, () => {
      waitForReady(cb);
    });
  }
}

function waitForReady (cb) {
  $(document).ready(function () {
    cb && cb();
  });
}

// ajaxLoadedScripts要放到loadScripts外才能起到全局统计的作用
const ajaxLoadedScripts = {};
function loadScripts (scripts, callback) {
  $.ajaxPrefilter('script', (opts) => { opts.cache = true; });
  setTimeout(() => {
    function finishLoading () {
      typeof callback === 'function' && callback();
    }

    let deferredCount = 0;
    let resolved = 0;
    for (let i = 0; i < scripts.length; i++) {
      if (scripts[i]) {
        (() => {
          const scriptName = 'js-' + scripts[i].replace(/[^\w\d-]/g, '-').replace(/--/g, '-');
          ajaxLoadedScripts[scriptName] !== true && deferredCount++;
        })();
      }
    }

    function nextScript (index) {
      index += 1;
      if (index < scripts.length) {
        loadScript(index);
      } else {
        finishLoading();
      }
    }

    function loadScript (index) {
      index = index || 0;
      if (!scripts[index]) {
        return nextScript(index);
      }

      const scriptName = 'js-' + scripts[index].replace(/[^\w\d-]/g, '-').replace(/--/g, '-');
      // 只加载目前为止没有加载过的脚本
      if (ajaxLoadedScripts[scriptName] !== true) {
        $.getScript(scripts[index]).done(() => {
          ajaxLoadedScripts[scriptName] = true;
        }).complete(() => {
          ++resolved >= deferredCount ? finishLoading() : nextScript(index);
        });
      } else {
        nextScript(index);
      }
    }

    deferredCount > 0 ? loadScript() : finishLoading();
  }, 10);
}
