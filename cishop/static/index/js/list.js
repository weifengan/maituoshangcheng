// 被动选型搜索js
jQuery(function ($) {
  //筛选框
  var Filter = {
      curName: undefined,
    init: function () {
      // 初始化参数
      this.initSlcItm();
      this.initEvents();
      this.defaultFilterValue();
    },
    initEvents: function () { // 初始化按钮事件
      // 展开收缩参数条件
      $("#filter-resize").on("click", function () {
        $(this).toggleClass("is-folded");
        $("#filter-select-box").toggleClass("is-folded");
      });
      // 是否有库存、符合RoHS
      $("#filter-isInventory-input").on("click", this.toggleInventory.bind(this))
      $("#filter-isRosh-input").on("click", this.toggleRosh.bind(this));
      // 搜索按钮
      $("#filter-search-btn").on("click", this.subFilter);
    },
    initSlcItm: function () { // 初始化选择参数
      var filter = this
      var $keyWrds = $("#keyWrds")
      $("[data-id='select-item']").each(function (slcIndex) {
        var $item = $(this)
        var $search = $item.find("[data-id='select-srh']")
        var $list = $item.find("[data-id='select-list']")
        var $listlis = $list.find("li")
        $item.css({ width: ($list.width() + 20) + "px" })
        $listlis.each(function (liIndex) {
          var keyWrdId = "ky" + slcIndex + "-" + liIndex;
          $(this).on("click", function () {
            if ($(this).hasClass("is-disabled")&&!$(this).hasClass("is-selected")) return false;
            var value = $(this).data("value").toString()
            var arr = $item.data("value")
            var index = $.inArray(value, arr)
            var _this = this;
            if (index == -1) {
              arr.push(value);
              $(this).addClass("is-selected")
              var $keyword = $("<span class='filter-kwBtn' data-kyid='" + keyWrdId + "'>" + $(this).html() + "<i class='js-del'>X</i></span>")
              $keyword.find(".js-del").on('click', function () {
                $(_this).trigger('click')
              })
              $keyWrds.append($keyword)
                filter.curName = $item.data("name");
            } else {
              $("[data-kyid='" + keyWrdId + "']").remove()
              arr.splice(index, 1)
                if(arr.length<=0) filter.curName = undefined;
              $(this).removeClass("is-selected");
            }
            $item.data("value", arr);
            filter.filterSelectItem();
          });
        });
        $search.on("keyup", function () {
          for (var j = 0; j < $listlis.length; j++) {
            var $li = $listlis.eq(j),
              key = this.value;
            if (new RegExp("^" + key, "gi").test($li.text())) {
              $li.show();
            } else {
              $li.hide();
            }
          }
        });
      });
    },
    toggleInventory: function (e) {
      $(e.target).is(':checked') ? (dataForm.isInventory = $(e.target).val()) : (delete dataForm['isInventory'])
      this.filterSelectItem();
    },
    toggleRosh: function (e) {
      $(e.target).is(':checked') ? (dataForm.isRosh = $(e.target).val()) : (delete dataForm['isRosh'])
      this.filterSelectItem();
    },
    defaultFilterValue: function () {// 初始化页面默认值
        function renderDefault(el){
            if(!$(el)[0]) return;
            var $this = $(el)
            var value = $this.data("value").toString()
            var $item = $this.parents('[data-id="select-item"]');
            var arr = $item.data("value");
            var index = $.inArray(value, arr);
            var keyWrdId = "ky"+$item.index()+"-"+ $this.index();

            if (index == -1) {
                arr.push(value);
                $this.addClass("is-selected");
                var $keyword= $( "<span class='filter-kwBtn' data-kyid='"+keyWrdId+"'>"+$this.html()+"<i class='js-del'>X</i></span>");
                $keyword.find(".js-del").on('click',function(){
                    $this.trigger('click')
                })
                $("#keyWrds").append($keyword)
            } else {
                $("[data-kyid='"+keyWrdId+"']").remove()
                arr.splice(index,1)
                $this.removeClass("is-selected");
            }
            $item.data("value", arr);
        }
      // 品牌赋值
      var $brandSelectedItems = $("#brand-selected-filter").find("p");
      if ($brandSelectedItems) {
        var $select = $("[data-name='brand_id_filters']");
        $brandSelectedItems.each(function () {
          var result_value = $.trim($(this).text())
          renderDefault($select.find("[data-value='" + result_value + "']"));
          // $select.find("[data-value='" + result_value + "']").trigger("click");
        });
      }
      // 商品类型属性赋值
      var $selectedItems = $("#selected-filter-itme").find("p");
      $selectedItems.each(function () {
        var result_key = "attr_" + $(this).attr("class"),
          $result_values = $(this).find("span"), // data-value = '0.04W'
          $select = $("[data-name='" + result_key + "']"); // data-name = '功率（W）'
        $result_values.each(function () {
            renderDefault($select.find("[data-value='" + $(this).text() + "']"));
          // $select.find("[data-value='" + $(this).text() + "']").trigger("click")
        });
      });
      LoadData.getAggAttrResult();
    },
    subFilter: function () { // 提交过滤搜索
      var html = "";
      $("[data-id='select-item']").each(function () {
        var $item = $(this);
        var key = $item.data("name");
        var val = $item.data("value");
        for (var i = 0; i < val.length; i++) {
          html += "<input name='" + key + "[]'  value='" + val[i] + "' type='hidden' />";
        }
      });
      $("#my_params").html("");
      $("#my_params").append(html);
      $("#filterForm").submit();
    },
    filterSelectItem: function () { // 提交过滤搜索
      $("[data-id='select-item']").each(function () {
        var $item = $(this);
        var key = $item.data("name");
        var val = $item.data("value");
        if (val.length > 0) {
          var selectItem = [];
          for (var i = 0; i < val.length; i++) {
            selectItem.push(val[i]);
          }
          dataForm[key + "[]"] = selectItem;
        } else if (dataForm[key + "[]"] && dataForm[key + "[]"].length > 0) { // 删除取消选中的元素
          delete dataForm[key + "[]"];
        }
      });
      dataForm.page = 0;
      $("#proList").html("");
      $("#searchNotResult").hide();
      $("#loadP").hide();
      $("#fstLoading").show();

      LoadData.getAggAttrResult();
      LoadData.loadData("", "", "");
    }
  }

  var LoadData = {
    init: function () {
      this.initEvents();
    },
    initEvents: function () {
      $("#loadMore").on("click", this.loadData.bind(this, "", ""))
    },
    loadData: function (event, callback, eventType) {
      if (event) {
        var $loadMore = $(event.target);
      }
      var _this = this;
      var searchData = JSON.stringify(dataForm);
      $.ajax({
        url: searchApi,
        dataType: 'jsonp',
        type: "get",
        data: { paramsDTO: searchData },
        success: function (data) {
          _this.renderData(data, eventType);
          callback && callback(); //数据加载完成回调函数
          $("#fstLoading").hide();
        }
      });
    },
    getAggAttrResult: function () { //  传入相关的参数 获取属性聚合结果
      var searchData = JSON.stringify(dataForm);
      $.ajax({
        url: aggAttrApi,
        dataType: 'jsonp',
        type: "get",
        data: { paramsDTO: searchData },
        success: function (data) {
          var $brand = $(".js-filter-brand");
          var brands = data.brandIdFilters;
          if(Filter.curName!="brand_id_filters"){
              if (!brands) {
                $brand.find("[data-value]").removeClass("is-disabled");
              } else {
                $brand.find("[data-value]").addClass("is-disabled");
                for (var i = 0; i < brands.length; i++) {
                  $brand.find("[data-value='" + brands[i] + "']").removeClass("is-disabled")
                }
              }
          }
          var $cates = $(".js-filter-cate");
          $cates.each(function () {
              if(Filter.curName!=$(this).data("name")){
                  $(this).find("[data-value]").addClass("is-disabled");
              }
          })
          var obj = data.filterConditions;
          for (var key in obj){
            if(Filter.curName!="attr_" + key) {
                var $slcItm = $("[data-name='attr_" + key + "']").eq(0);
                for (var j = 0; j < obj[key].length; j++) {
                    $slcItm.find("[data-value='" + obj[key][j] + "']").removeClass("is-disabled");
                }
            }
          }
        }
      });
    },
    renderData: function (data, eventType) {
      var totalElements = data.page.totalElements;
      if (totalElements == 0) {
        $("#searchNotResult").show();
        $("#filter-result_1").text("-");
      } else {
        $("#searchNotResult").hide();
        $("#filter-result_1").text(totalElements);
      }
      var myHelpers = {
        mfrsAttrModelListFilter: function (attrList) {
          var attrNameArray = ["电阻", "阻值", "电压", "容值", "感值", "偏差", "封装/外壳", "电容", "功率（W）"];
          var html = "";
          for (var i = 0; i < attrList.length; i++) {
            for (var j = 0; j < attrNameArray.length; j++) {
              if (attrList[i].attrName == attrNameArray[j]) {
                html += '<p>' + attrList[i].attrName + ':&nbsp;&nbsp;' + attrList[i].attrValue + '</p>';
              }
            }
          }
          return html;
        }
      }
      // 加载数据
      // 商品列表
      var proListHtml = $.templates("#proListTmpl").render(data, myHelpers);
      $("#proList").append(proListHtml);

      if ("init" == eventType) {
        // 品牌过滤
        var filterHtml = $.templates("#filterTmpl").render(data);
        $("#selected_filter").prepend(filterHtml);
      }


      // 剩余数量
      if (data.remainQuantity > 0) {
        $("#remainQuantity").text(data.remainQuantity);
        $("#loadP").show();
        dataForm.page++
      } else {
        $("#loadP").hide();
      }
      dataForm.token = getSearchToken(data.requestParameters.supplierId, data.token);
      //图片懒加载
      $(".pro-list img.lazy").lazyload({
        placeholder: placeholderUrl, //用图片提前占位
        // placeholder,值为某一图片路径.此图片用来占据将要加载的图片的位置,待图片加载时,占位图则会隐藏
        effect: "fadeIn"
      });
    }
  }

  // 页面函数
  var PageObj = {
    init: function () {
      $("#filter-isInventory-input").is(':checked') ? (dataForm.isInventory = $("#filter-isInventory-input").val()) : (delete dataForm['isInventory'])
      $("#filter-isRosh-input").is(':checked') ? (dataForm.isRosh = $("#filter-isRosh-input").val()) : (delete dataForm['isRosh'])
      this.initSearchParam();
      LoadData.init();
      LoadData.loadData("", function () {
        Filter.init();
      }, "init");
      this.initEvent();
    },
    initEvent: function () {
      $("#sortGroup>[data-order]").on("click", function () {
        var orderBy = $(this).data("order");
        if (orderBy == 'default') {
          if (dataForm.orderBy == 'default') {
            return false;
          } else {
            delete dataForm['orderBy'];
            delete dataForm['sort'];
            $(this).addClass("is-active").siblings(".is-active").removeClass("is-active");
            $(this).siblings("[data-order='inventory']").addClass("is-declining");
              $(this).siblings("[data-order='minPrice']").addClass("is-declining");
          }
        } else {
          if (dataForm.orderBy == orderBy) {
            dataForm.sort = dataForm.sort == 'asc' ? 'desc' : 'asc';
            dataForm.sort == 'asc' ? $(this).removeClass("is-declining") : $(this).addClass("is-declining");
          } else {
            if (orderBy == 'minPrice') {
              dataForm.sort = 'asc';
              $(this).siblings(".is-active").addClass("is-declining");
            } else {
              dataForm.sort = 'desc';
              $(this).siblings(".is-active").removeClass("is-declining");
            }
            dataForm.orderBy = orderBy;
            $(this).addClass("is-active").siblings(".is-active").removeClass("is-active");
          }
        }
        $("#proList").html('');
        dataForm.page = 0;
        $("#proList").html("");
        $("#searchNotResult").hide();
        $("#loadP").hide();
        $("#fstLoading").show();
        LoadData.loadData();
      });
    },
    initSearchParam: function () { // 初始化搜索参数
    },

  }
  PageObj.init();
})