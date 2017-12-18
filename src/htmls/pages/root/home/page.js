$utils.hook.ready(() => {
  $utils.modal.alert({
    content: 'text',
    callback () {
      console.log('callback');
    }
  });
});
