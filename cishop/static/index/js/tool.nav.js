$(function(){
  //足迹
  var Zuji={
    domElement:$("#toolConZj"),
    show:function(){
      this.render();
      this.domElement.addClass("is-show");
    },
    hide:function(){
      this.domElement.removeClass("is-show");
    },
    render:function(){
      var $ul=this.domElement.find(".js-zujiCon")
      var data=localStorage.getItem("historyData")
      $ul.html("");
      if(!data){
        $ul.html("<li><p class='txtc mt40 fs-14'>暂无浏览足迹</p></li>");
      }else{
        $.ajax({
          url:'/history/history_ajax',
          type:'POST',
          dataType:"html",
          data:{ids:data},
          success:function(result){
            $ul.append(result);
          }
        });
      }
    },
    init:function(){
      var _this=this;
      $("#zujiClose").on("click",function(){
        _this.hide();
      });
    }
  }

  //2017.10.19,对比栏,限制3个,localStorage.getItem("compareData")
  var Compare={
    domElement:$("#proCompare"),
    addItem:function(proinfo){
      var _this=this;
      //处理localStorage
      if( !proinfo ) return false;
      if( !localStorage.getItem("compareData") ){
        localStorage.setItem("compareData",'['+JSON.stringify(proinfo)+']');
      }else{
        var data=eval("("+localStorage.getItem("compareData")+")");//获取localStorage的compareData并转化为数组
        for(var i=0;i<data.length;i++){
          if(data[i].proid==proinfo.proid){
            layer.alert("对比栏已存在该商品！",{icon:5});
            _this.initDoms();
            return;
          };
        };
        if(data.length >= 3) {
          layer.alert("对比栏已满，请删除对比栏商品再添加！",{icon:5});
          _this.initDoms();
          return;
        }
        data.push(proinfo);
        var dataStr="[";
        for(var j=0;j<data.length-1;j++){
          dataStr+=JSON.stringify(data[j])+",";
        }
        dataStr+=JSON.stringify(data[data.length-1]);
        dataStr+="]";
        localStorage.setItem("compareData",dataStr);
      }
      //处理localStorage完毕
      //render到页面;
      this.initDoms();
    },
    delItem:function(ele){ //删除对比
      var $item=$(ele),
        proid=$item.find(".pro-compare-item").eq(0).data("proid"),
        data=eval("("+localStorage.getItem("compareData")+")") || [];
      //处理localStorage
      for(var i=0;i<data.length;i++){
        if(data[i].proid==proid){
          if(i!=data.length-1){
            for(var j=i;j<data.length-1;j++){
              data[j]=$.extend(true,data[j],data[j+1]);
            };
          }
          data.pop();
          break;
        };
      }
      if(data.length==0){
        localStorage.setItem("compareData","[]");
      }else{
        var dataStr="[";
        for(var k=0;k<data.length-1;k++){
          dataStr+=JSON.stringify(data[k])+",";
        }
        dataStr+=JSON.stringify(data[data.length-1]);
        dataStr+="]";
        localStorage.setItem("compareData",dataStr);
      }
      //处理localStorage,end
      this.initDoms();
      //render到页面
    },
    delAll:function(){
      //清空localStorage
      if(!localStorage.getItem("compareData")){  return;}
      localStorage.removeItem("compareData");
      this.initDoms();
    },
    initDoms:function(){
      if(!localStorage.getItem("compareData")) localStorage.setItem("compareData","[]");
      var _this=this,
        $ul=_this.domElement.find("ul"),
        data=eval("("+localStorage.getItem("compareData")+")");
      $ul.html("");
      for(var i=0;i<data.length;i++){
        (function(){
          var proinfo=data[i];
          var $li=$('<li><div data-proid="'+proinfo.proid+'" class="pro-compare-item media">'
            +'<a class="media-left" href="'+proinfo.link+'"><img height="83" width="83" src="'+proinfo.imgsrc+'"/></a>'
            +'<div class="media-body fs-12">'
            +'<p><a class="text-link" href="'+proinfo.link+'">'+proinfo.title+'</a></p>'
            +'<p class="text-muted mt5">'+proinfo.desc+'</p>'
            +'<a class="delete js-del" href="javascript:void(0);">删除</a>'
            +'</div></li>');
          $ul.append($li);
          $li.find(".js-del").on("click",function(){
            _this.delItem($li);
          });
        })()
      }
      for(var j=i;j<3;j++){
        var $li=$('<li><div class="pro-compare-item media" ><a class="media-left" href="javascript:void(0);"><img height="83" width="83" src="http://static.cdn.oneyac.com/static/www/images/default-pro.png"/></a><div class="media-body"><p class="mt30">你还可以继续添加</p></div></div></li>');
        $ul.append($li);
      }
    },
    hide:function(){
      this.domElement.addClass("is-hidden");
    },
    show:function(){
      this.domElement.removeClass("is-hidden");
    },
    init:function(){
      var _this=this,
        $dom=_this.domElement;
      $dom.on("compare:change",function(event,proinfo){ //绑定事件，产品详情页添加对比使用。
        _this.show();
        _this.addItem(proinfo);
      });
      $("#clearCompare").on("click",function(){
        _this.delAll();
      });
      $("#linkToCompare").on("click",function(){//链接到对比的页面
        var proidArr=[];
        if( !!localStorage.getItem("compareData") ){
          var data=eval("("+localStorage.getItem("compareData")+")");
          if (data.length < 2) {
            layer.alert('至少选择两种商品进行对比！', {icon: 2});
          }else{
            for(var i=0;i<data.length;i++){
              proidArr.push(data[i].proid);
            };
            window.location.href = "/product/compare.html?productIds="+proidArr;
          }
        };
      });
      $("#closeCompare").on("click",function(){
        _this.hide();
      });
    }
  }

  $(function(){
    var $toolBox=$("#toolBox")
    var $fold=$toolBox.find(".toolbox-fold")
    var $unfold=$toolBox.find(".toolbox-unfold")
    var $tdCon=$toolBox.find(".js-tdCon")
    $toolBox.on("click",".js-showIcn",function(){
      $unfold.show()
      $fold.hide()
    })
    $toolBox.on("click",".js-hideIcn",function(){
      $fold.show()
      $unfold.hide()
    })
    $toolBox.find(".js-showTd").on("mouseover",function(){
      $tdCon.show()
    }).on("mouseleave",function(){
      $tdCon.hide()
    })
    $toolBox.find(".js-goTop").on("click",function(){
      $("body,html").stop().animate({scrollTop:0},500);
    });

    //2017.10.19,对比
    $(".js-showCompare").on("click",function(){
      Compare.initDoms();
      Compare.show();
    });
    Compare.init();
    //足迹
    $(".js-showZuji").on("click",function(e){
      Zuji.show();
      $("body").one("click",function(e){
        Zuji.hide();
      });
      e.stopPropagation();
    });
    Zuji.init();
  });
});