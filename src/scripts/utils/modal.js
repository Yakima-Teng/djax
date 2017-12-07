(function (doc, win) {
  var common = win.$utils.common;
  if (!common) {
    throw new Error('请先加载utils/common.js文件，再加载utils目录下的其他文件');
  }

  function customAlert (content, options, yes) {
    options = options || {};
    yes = yes || function () {};
    layui.use('layer', function () {
      var layer = layui.layer;
      layer.ready(function () {
        layer.alert(content, options, function (idx) {
          yes();
          layer.close(idx);
        });
      });
    });
  };

  function customConfirm (content, options, yes, cancel) {
    options = options || {};
    yes = yes || function () {};
    cancel = cancel || function () {};
    layui.use('layer', function () {
      var layer = layui.layer;
      layer.ready(function () {
        layer.confirm(content, options, function (idx) {
          yes();
          layer.close(idx);
        }, function (idx) {
          cancel();
          layer.close(idx);
        });
      });
    });
  };

  // 提示组件，默认3秒后自动关系
  function msg (content, options, end) {
    options = options || {};
    end = end || function () {};
    layui.use('layer', function () {
      var layer = layui.layer;
      layer.ready(function () {
        layer.msg(content, options, end);
      });
    });
  };

  var idxForLoad = null;

  // 供ajax模块使用
  function getIdxForload () {
    return idxForLoad;
  };

  function load (boolean) {
    boolean = boolean || false;
    if (boolean) {
      layui.use('layer', function () {
        var layer = layui.layer;
        layer.ready(function () {
          if (idxForLoad) {
            layer.close(idxForLoad);
          }
          idxForLoad = layer.load(0);
        });
      });
    } else {
      layui.use('layer', function () {
        var layer = layui.layer;
        layer.ready(function () {
          if (idxForLoad) {
            layer.close(idxForLoad);
          }
        });
      });
    }
  };

  var output = {
    alert: customAlert,
    confirm: customConfirm,
    msg: msg,
    load: load,
    getIdxForload
  };

  if (win.$utils) {
    win.$utils.modal = output;
  } else {
    win.$utils = { modal: output };
  }
})(document, window);
