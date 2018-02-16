$utils.hook.ready(() => {
  const $startPlay = $('#startPlay')

  $startPlay.click(function (e) {
    $utils.modal.alert({
      content: '欢迎访问Djax项目，这是一个很纯粹模板，请替换成你自己的内容，开始你的表演。'
    })
  })
})
