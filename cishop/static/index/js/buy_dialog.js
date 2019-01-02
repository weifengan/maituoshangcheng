/* global jQuery:false, layer:false */
(function ($, window, layer) {
  function getProductDetail (stkCode, callback) {
    $.ajax({
      url: '/product/buy_dialog/detail.html',
      dataType: 'html',
      data: {
        stkCode: stkCode
      },
      success: function (result) {
        if (callback.constructor === Function) callback(result)
      }
    })
  }
   
  function showBuyDialog(obj) {
        var $this = $(obj);
        var stkCode = encodeURI($this.data('proid'))
        var iconfont = $this.data('iconshow')
        var $purchaseWrap = $this.siblings('.purchase-wrap')
        $.ajax({
            url: '/product/buy_dialog/judgeCanBuy',
            datatype: 'json',
            type: 'post',
            data: {
                stkCode: stkCode
            },
            success: function (data) {
                if (data.success) {
                    $this.html("请求中<img src='/static/www/images/loading-2.gif'>").attr('disabled')
                    getProductDetail(stkCode, function (purchaseDiv) {
                        var divEle = document.createElement('div')
                        divEle.innerHTML = purchaseDiv
                        $purchaseWrap.append(divEle)
                        if (iconfont === 'iconfont') {
                            $this.html('<i class="iconfont icon-cart_simple"></i>').removeAttr('disabled')
                        } else {
                            $this.html('加入购物车').removeAttr('disabled')
                        }
                    })
                } else {
                    layer.alert(data.message)
                }
            }
        })
  }
  window.showBuyDialog=showBuyDialog;
})(jQuery, window, layer)
