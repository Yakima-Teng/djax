$utils.hook.ready(() => {
  $utils.modal.msg({
    title: 'title',
    content: '欢迎访问',
    end () {
      console.log('confirmed');
    }
  });
});
