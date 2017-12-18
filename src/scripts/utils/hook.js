export function ready (cb) {
  $(document).ready(function () {
    cb && cb();
  });
};
