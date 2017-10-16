define(['avalon', 'text!../template/register.html'], function (avalon, regDom) {
  var vm = avalon.define({
    $id: 'loginCtrl',
    dom: '',
    phone: '',
    change: function () {
      console.log(this.phone)
    }
  })
  vm.dom = regDom
  avalon.scan(document.body)
})
