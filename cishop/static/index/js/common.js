/* global jQuery:false, layer:false , Image:false */
(function ($, window, layer) {
  // 默认图片
  window.staic = {
    DEFAULT_IMG: '/static/www/images/default-pro.png'
  }
  var restArguments = function(func, startIndex) {
    startIndex = startIndex == null ? func.length - 1 : +startIndex;
    return function() {
      var length = Math.max(arguments.length - startIndex, 0),
        rest = Array(length),
        index = 0;
      for (; index < length; index++) {
        rest[index] = arguments[index + startIndex];
      }
      switch (startIndex) {
        case 0: return func.call(this, rest);
        case 1: return func.call(this, arguments[0], rest);
        case 2: return func.call(this, arguments[0], arguments[1], rest);
      }
      var args = Array(startIndex + 1);
      for (index = 0; index < startIndex; index++) {
        args[index] = arguments[index];
      }
      args[startIndex] = rest;
      return func.apply(this, args);
    };
  };
  window.utils={};
  utils.now = Date.now || function() {
    return new Date().getTime();
  };
  utils.delay = restArguments(function(func, wait, args) {
    return setTimeout(function() {
      return func.apply(null, args);
    }, wait);
  });
  utils.throttle= function(func, wait, options) {
    var timeout, context, args, result;
    var previous = 0;
    if (!options) options = {};
    var later = function() {
      previous = options.leading === false ? 0 : utils.now();
      timeout = null;
      result = func.apply(context, args);
      if (!timeout) context = args = null;
    };
    var throttled = function() {
      var now = utils.now();
      if (!previous && options.leading === false) previous = now;
      var remaining = wait - (now - previous);
      context = this;
      args = arguments;
      if (remaining <= 0 || remaining > wait) {
        if (timeout) {
          clearTimeout(timeout);
          timeout = null;
        }
        previous = now;
        result = func.apply(context, args);
        if (!timeout) context = args = null;
      } else if (!timeout && options.trailing !== false) {
        timeout = setTimeout(later, remaining);
      }
      return result;
    };
    throttled.cancel = function() {
      clearTimeout(timeout);
      previous = 0;
      timeout = context = args = null;
    };
    return throttled;
  };
  utils.debounce = function(func, wait, immediate) {
    var timeout, result;
    var later = function(context, args) {
      timeout = null;
      if (args) result = func.apply(context, args);
    };
    var debounced = restArguments(function(args) {
      if (timeout) clearTimeout(timeout);
      if (immediate) {
        var callNow = !timeout;
        timeout = setTimeout(later, wait);
        if (callNow) result = func.apply(this, args);
      } else {
        timeout = utils.delay(later, wait, this, args);
      }
      return result;
    });
    debounced.cancel = function() {
      clearTimeout(timeout);
      timeout = null;
    };
    return debounced;
  };

  if (!window.console) {
    window.console = {log: function () {}}
  };

  function initTopHeader () {
    if (!$('#fixedheader')[0]) return false;

    var flag = ''
    if ($(window).scrollTop() > 50) {
      $('#fixedheader').show()
      $('#headerCon').appendTo('#fixedheader')
      flag = 'fixed'
    } else {
      $('#fixedheader').hide()
      $('#headerCon').appendTo('#header')
      flag = 'static'
    }
    // 右侧bar事件开始
    $(window).on('scroll', utils.throttle(
      function(){
        var sctop = $(window).scrollTop();
        if (sctop > 50) {
          if (flag !== 'fixed') {
            $('#fixedheader').show();
            $('#headerCon').appendTo('#fixedheader')
            flag = 'fixed'
          }
        } else {
          if (flag !== 'static') {
            $('#fixedheader').hide();
            $('#headerCon').appendTo('#header');
            flag = 'static';
          }
        }
      },200)
    )
  }

  // 定义查看大图的方法
  $.extend({
    showBigPic: function (img) {
      var $img = $(img)
      var imgSrc = $img.attr('src') ? $img.attr('src') : window.staic.DEFAULT_IMG
      var imgObj = new Image()
      var styDia = ''
      var styImg = ''
      imgObj.src = imgSrc
      var rate = imgObj.height / imgObj.width
      if (imgObj.width >= 778) {
        imgObj.width = 778
        imgObj.height = imgObj.width * rate
      }
      if (imgObj.height < 380) {
        styDia = 'position:relative;'
        styImg = 'position: absolute;top:50%;margin-top:-' + imgObj.height / 2 + 'px;left:50%;margin-left:-' + imgObj.width / 2 + 'px;'
      } else {
        styImg = 'margin:15px auto;display:block;'
      }
      var style = '<style>.bigpic-dia{margin:10px;height:100%;border:1px solid #ccc;max-height:380px;overflow-y:auto;' +
        styDia + '}.bigpic-dia img{max-width:100%;' + styImg + '}</style>'
      layer.open({
        type: 1,
        title: '查看大图',
        content: style + "<div class='bigpic-dia'><img src='" + imgSrc + "'/></div>",
        area: ['800px', '500px'],
        btn: ['关闭'],
        yes: function (index) {
          layer.close(index)
        }
      })
    },
    isIE: function (ver) {
      var b = document.createElement('b')
      b.innerHTML = '<!--[if IE ' + ver + ']><i></i><![endif]-->'
      return b.getElementsByTagName('i').length === 1
    },
    parseTernary: function (arg) {
      var num = arg
      try {
        num = parseFloat(num)
        if (isNaN(num)) {
          return arg
        }
        var numArr = num.toString().split('.')
        numArr[0] = numArr[0].split('').reverse().join('').replace(/(\d{3})/g, '$1,').replace(/,$/, '').split('').reverse().join('')
        return numArr.length === 1 ? numArr[0] : numArr[0] + '.' + numArr[1]
      } catch (e) {
        return arg
      }
    },
    fmtDate: function (obj) {
      var date = new Date(obj)
      var y = date.getFullYear()
      var m = date.getMonth() + 1
      m = m < 10 ? ('0' + m) : m
      var d = date.getDate()
      d = d < 10 ? ('0' + d) : d
      var h = date.getHours()
      h = h < 10 ? ('0' + h) : h
      var minute = date.getMinutes()
      //   var second = date.getSeconds()
      minute = minute < 10 ? ('0' + minute) : minute
      //   second = second < 10 ? ('0' + second) : second
      return y + '-' + m + '-' + d + ' ' + h + ':' + minute
    }
  })

  // 搜索select
  $.fn.srhSelect = function () {
    function setSrhSlc (ele) {
      var $this = $(ele)
      var $select = $this.find("[data-id='select-dom']")
      var options = $select[0].options
      var $srh = $this.find("[data-id='select-srh']")
      var $show = $('<div  class="m-select-show"></div> ')
      var $ul = $("<ul class='slc-ul'></ul>")
      var width = $select.outerWidth() + 20

      $this.css({minWidth: width + 'px'})
      $this.append($ul)
      $this.prepend($show)
      $ul.css({width: width + 'px'})
      $show.css({width: width + 'px'})
      $select.css({width: '0px'})
      $srh.css({width: width + 'px'})

      // 添加ul列表
      for (var i = 0; i < options.length; i++) {
        (function () {
          var curI = i
          var $li = $('<li data-value="' + options[curI].value + '">' + options[curI].text + '</li>')
          //   var $option = $(options[curI])
          $ul.append($li)
        })()
      };

      function show () {
        $srh.css({display: 'block'}).focus()
        $ul.css({display: 'block'})
      }
      function hide () {
        $srh.css({display: 'none'})
        $ul.css({display: 'none'})
      }
      $ul.on('click', 'li', function (e) {
        options[$(this).index()].selected = true
        $select.trigger('change')
        $('body').trigger('click')
        e.stopPropagation()
      })

      // 渲染ul列表
      var $liList = $ul.find('li')
      function changeEv () {
          $ul.find('.is-active').removeClass('is-active')
          $select.find('option:selected').each(function () {
              $liList.eq(this.index).addClass('is-active')
          })
          var $slcLis = $ul.find('.is-active')
          $show.text($slcLis.length === 0 ? $ul.find('li').eq(0).text() : $slcLis.eq(0).text())
      }
      $select.on('change', changeEv)
      // 第一次渲染
      changeEv();

      // 设置搜索
      if ($srh.length !== 0) {
        $srh.on('keyup', function () {
          for (var j = 0; j < $liList.length; j++) {
            var $li = $liList.eq(j)
            var key = this.value
            if (new RegExp(key, 'gi').test($li.text())) {
              $li.removeClass('is-hidden')
            } else {
              $li.addClass('is-hidden')
            }
          }
        })
      }
      //
      $show.on('click', function () {
        show()
        $select.click()
        $('body').one('click', function (e) {
          hide()
        })
      })
      $this.on('click', function (e) {
        e.stopPropagation()
      })
    }
    this.each(function () {
      setSrhSlc(this)
    })
    return this
  }

  // 优化select
  $.fn.modSelect = function () {
    function setModSlc (ele) {
      var $this = $(ele)
      var $select = $this.find("[data-id='select-dom']")
      //   var options = $select[0].options
      var $show = $('<div class="m-select-show"></div>')
      var width = $select.outerWidth() + 2
      $this.css({minWidth: width + 'px'})
      $this.prepend($show)
      $show.css({width: width + 'px'})

      $show.html($select.find('option:selected').val() || '')
      // 渲染ul列表
      $select.on('change', function () {
        $show.html($select.find('option:selected').val() || '')
      })
    }
    this.each(function () {
      setModSlc(this)
    })
    return this
  }

  // 初始化页面的事件
  function initPageEvents () {
    // tips层;
    $('[w-tips]').each(function () {
      var tipOptions = {tips: '这是一个tips层！',
        type: 1,
        bgcolor: '#0269c2'
      }
      var $this = $(this)
      var attr = $this.attr('w-tips')
      var args = {}
      var layerIndex = 0

      attr = attr.replace(/\n/g, '<br/>')
      attr = attr.replace(/\t|\r/g, '&nbsp;')
      args = eval('(' + attr + ')')
      args = $.extend(true, tipOptions, args)

      $this.on('mouseover', function () {
        layerIndex = layer.open({
          type: 4,
          closeBtn: 0,
          content: [args.tips, this],
          shade: 0,
          tips: [args.type, args.bgcolor]
        })
      })
      $this.on('mouseleave', function () {
        layer.close(layerIndex)
      })
    })
  }

  // 定义组件的命名空间
  window.wyComponent = {
    GetPin: function (obj) {
      var ele = obj.ele
      var callback = obj.callback || function () {}
      var verify = obj.verify || function () { return true }
      var clock = 0
      var _this = this

      this.count = obj.count || 10
      $(ele).on('click', function () {
        var count = _this.count
        if (!verify()) return false
        $(ele).addClass('is-sending').html(count + '秒后重新发送').attr({'disabled': 'disabled'})
        callback()
        clock = setInterval(function () {
          if (count <= 0) {
            $(ele).removeAttr('disabled').removeClass('is-sending').html('发送验证码')
            clearInterval(clock)
          } else {
            count--
            $(ele).html(count + '秒后重新发送')
          }
        }, 1000)
      })
    }
  }

  // jquery验证码倒计时
  ;(function (factory) {
    if (typeof define === 'function' && define.amd) {
      define(['jquery'], factory);
    } else {
      factory(window.jQuery || window.$);
    };
  }(function ($) {
    function setCount(ele, opt) {
      if( $(ele).attr("count-init") ){
        return false;
      }

      var $element = $(ele);
      var defaults = {
        "time": 60,
        "tipBefore": "",
        "tipAfter": "秒后重新发送",
        "countClass": "is-counting",
        "countBefore": function(){},
        "countAfter": function(){},
        "srcWrd": $element.html()
      };

      var options = $.extend({}, defaults, opt);

      var clock = 0;

      function count(second){
        var count = second || options.time;
        clearInterval(clock);
        $element.addClass(options.countClass).html( options.tipBefore+ count + options.tipAfter)
        options.countBefore();
        clock = setInterval(function () {
          if (count <= 0) {
            $element.removeClass(options.countClass).html(options.srcWrd)
            clearInterval(clock)
            options.countAfter();
          } else {
            count--;
            $element.html( options.tipBefore+ count + options.tipAfter)
          }
        }, 1000)
      }
      $element.on("count:reset",function(){
        $element.removeClass(options.countClass).html(options.srcWrd);
        clearInterval(clock); 
      })
      $element.on("count:start",function(event, second){ count(second); })
      $element.attr("count-init","true")
    }

    jQuery.fn.extend({
      countDown: function (opt) {
        return this.each(function () {
          setCount(this, opt)
          return this
        })
      }
    })
  }));

  // jquery插件添加验证规则
  $.validator.addMethod('phone', function (value, element) {
    return this.optional(element) || /^(1[0-9][0-9]{9})$/i.test(value)
  }, '手机号码格式不正确！')
  $.validator.addMethod('wyemail', function (value, element) {
    return this.optional(element) || /^[a-zA-Z0-9._%-]+@([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,4}$/i.test(value)
  }, '邮箱格式不正确！')
  $.validator.addMethod('unEqualTo', function (value, element, param) {
    var target = $(param)
    if (this.settings.onfocusout && target.not('.validate-equalTo-blur').length) {
      target.addClass('validate-equalTo-blur').on('blur.validate-equalTo', function () {
        $(element).valid()
      })
    }
    return !(value === target.val())
  }, '请输入不同的值!')
    //税务登记号，只能是英文或者数字
    $.validator.addMethod('vatNumber', function (value, element) {
        return this.optional(element) || /^[0-9a-zA-Z]+$/.test(value)
    }, '税务登记号格式不正确！')
    //收票人不能纯英文（/^[A-z]+$/）
    $.validator.addMethod('peopleNameCheck', function (value, element) {
        return this.optional(element) || !(/^[A-z]+$/.test(value))
    }, '不能全是英文字母！')

  // 设置placeholder
  function setPlaceHolder () {
    var isOperaMini = Object.prototype.toString.call(window.operamini) === '[object OperaMini]'
    var isInputSupported = 'placeholder' in document.createElement('input') && !isOperaMini
    var isTextareaSupported = 'placeholder' in document.createElement('textarea') && !isOperaMini
    if (isInputSupported && isTextareaSupported) {
      $.fn.placeholder = function () {
        return this
      }
    } else {
      $.fn.placeholder = function () {
        return this.filter((isInputSupported ? 'textarea' : ':input') + '[placeholder]')
          .not(':radio, :checkbox, [type=hidden]')
          .each(function () {
            var $this = $(this)
            var text = $this.attr('placeholder')
            var $tip = $("<span class='ie-inputTip' data-content='" + text + "'></span>")
            $this.before($tip)
            var top = ($this.outerHeight() - 20) / 2
            var fontSize = parseFloat($this.css('fontSize').replace('px', ''))
            if ($this.is(':hidden')) {
              top = ($this.height() - 20) / 2
            }
            if ($this.prop('nodeName') === ('TEXTAREA')) {
              top = parseFloat($this.css('paddingTop').replace('px', ''))
            }
            $tip.css({
              'fontSize': fontSize + 'px',
              'left': $this.css('paddingLeft'),
              'float': 'left',
              'top': top + 'px'
            })
            $tip.on('click', function () {
              $this.focus()
            })
            $this.on('focus', function () {
              $tip.addClass('is-focus')
            })
            $this.on('blur', function () {
              $this.val() !== '' ? $tip.addClass('is-focus') : $tip.removeClass('is-focus')
            })
            $this.on('change', function () {
              $this.val() !== '' ? $tip.addClass('is-focus') : $tip.removeClass('is-focus')
            })
            $this.val() !== '' ? $tip.addClass('is-focus') : $tip.removeClass('is-focus')
          })
      }
    }
  }

  // 添加数字格式化方法，每三位整数添加一个逗号
  $(function () {
    initTopHeader() // 头部滚动 header
    initPageEvents()
    setPlaceHolder()
    if ($.isIE(8) || $.isIE(9)) {
      setTimeout(function(){$('input, textarea').placeholder()},30)
    }
  })
})(jQuery, window, layer)
// 银行小图标
var app_bankImagesJson = {
  '中国银行': '/static/mobile/images/bank/bank-01.png',
  '工商银行': '/static/mobile/images/bank/bank-02.png',
  '建设银行': '/static/mobile/images/bank/bank-03.png',
  '农业银行': '/static/mobile/images/bank/bank-04.png',
  '兴业银行': '/static/mobile/images/bank/bank-05.png',
  '招商银行': '/static/mobile/images/bank/bank-06.png',
  '交通银行': '/static/mobile/images/bank/bank-07.png',
  '平安银行': '/static/mobile/images/bank/bank-08.png',
  '民生银行': '/static/mobile/images/bank/bank-09.png',
  '中信银行': '/static/mobile/images/bank/bank-10.png',
  '光大银行': '/static/mobile/images/bank/bank-11.png',
  '浦发银行': '/static/mobile/images/bank/bank-12.png',
  '邮储银行': '/static/mobile/images/bank/bank-13.png',
  '华夏银行': '/static/mobile/images/bank/bank-14.png',
  '北京银行': '/static/mobile/images/bank/bank-16.png',
  '宁波银行': '/static/mobile/images/bank/bank-17.png',
  '广发银行': '/static/mobile/images/bank/bank-20.png'
}
