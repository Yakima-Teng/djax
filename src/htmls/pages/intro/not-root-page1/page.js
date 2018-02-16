$utils.hook.ready(() => {
  const $startPlay = $('#startPlay')

  $startPlay.click(function (e) {
    $utils.modal.alert({
      content: '欢迎访问Djax项目，这是一个很纯粹的页面，请替换成你自己的页面，开始你的表演。'
    })
  })
})
