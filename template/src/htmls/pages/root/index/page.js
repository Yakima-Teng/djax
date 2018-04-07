$utils.hook.ready(() => {
  const $startPlay = $('#startPlay')

  $startPlay.click(function (e) {
    $utils.modal.confirm({
      content: '欢迎访问Djax项目，这是一个很纯粹的模板，请替换成你自己的内容。<br />温馨提示：点击确定按钮可到源码页面查看详细文档！',
      yes () { window.location.href = 'https://github.com/Yakima-Teng/djax' }
    })
  })
})
