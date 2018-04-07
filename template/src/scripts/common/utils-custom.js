(function (doc, win) {
  function swiper (elem) {
    if (!window.Swiper) {
      throw new Error('请先引入Swiper插件')
    }
    /* eslint-disable no-new */
    new window.Swiper(elem, {
      direction: 'horizontal',
      loop: true,
      autoplay: 2000,
      // 用户操作swiper之后，是否禁止autoplay。默认为true：停止。
      autoplayDisableOnInteraction: false,
      // 如果需要分页器
      pagination: {
        el: '.swiper-pagination'
      }
    })
  }

  const output = {
    swiper
  }

  if (win.$utils) {
    win.$utils.custom = output
  } else {
    win.$utils = { custom: output }
  }
})(document, window)
