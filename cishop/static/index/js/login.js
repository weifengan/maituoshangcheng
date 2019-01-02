(function(){
    if(!window.wyComponent){
        window.wyComponent={};
    }
    function generalLogin(userName, password, $msg, callback) {
        $.ajax({
            url:"/login_asynchronous?"+aliyun_afs.login_afs_with_password.data,
            datatype:"json",
            type:"post",
            data:{
                userName:userName,
                password:password
            },
            success:function (data) {
                if(data.code==200){
                    dealAfterSuccess($msg, data, callback);
                }else{
                    $msg.html(data.message);
                    aliyun_afs.login_afs_with_password.reset();
                }
            }
        });
    }
    function dynamicLogin(mobile, vecode, $msg, callback) {
        $.ajax({
            url:"/login/dynamic_login_asynchronous",
            datatype:"json",
            type:"post",
            data:{
                mobile:mobile,
                vecode:vecode
            },
            success:function (data) {
                if(data.code==200){
                    dealAfterSuccess($msg, data, callback);
                }else{
                    $msg.html(data.message);
                }
            }
        });
    }
    function dealAfterSuccess($msg, data, callback) {
        $msg.html("登录成功！");
        layer.closeAll();
        $("#loginDialogIsLogin").val("true");
        showHeaderTopBarLoginInfo(data.userName);
        if(callback) callback();
    }
    window.wyComponent.login={
        callback:null,
        initEvent:function(){
            var state=this.state,
                $box=state=='dialog'?this.dialogEle:this.pageEle,
                $tabInx=$box.find("[js-tab-inx]"),
                $tabCon=$box.find("[js-tab-con]");
            //tabs
            $tabInx.find("[js-tab-item]").on("click",function(){
                var $this=$(this),
                    index=$this.attr("js-tab-item");
                $this.addClass("is-active").siblings(".is-active").removeClass("is-active");
                $tabCon.find("[js-tab-item='"+index+"']").addClass("is-active").siblings(".is-active").removeClass("is-active");
                if (index == 1) {
                    aliyun_afs.login_afs_with_password.init();
                } else if (index == 2) {
                    aliyun_afs.login_afs_with_message.init();
                }
            });
            //IE8、9,placeholder
            if( $.isIE(8) || $.isIE(9) ){
                $box.find("input").placeholder();
            }
        },
        initForm:function(){
            var _this=this,
                comState=this.state,
                $box=this.dialogEle,
                $formDynamicLogin=$box.find("[data-id='dynamicLoginForm']"),
                formDynamicLogin=$formDynamicLogin[0],
                $formGeneralLogin=$box.find("[data-id='generalLoginForm']"),
                formGeneralLogin=$formGeneralLogin[0],
                $msg=$box.find(".lg-msg");
            // 普通登录
            $("#generalLogin").on("click",function(){
                if ( !Boolean(formGeneralLogin.userName.value) ) {
                    $msg.html("手机号/用户名不能为空！");
                    return false;
                };
                if( !Boolean(formGeneralLogin.password.value) ){
                    $msg.html("密码不能为空!");
                    return false;
                }
                if (!aliyun_afs.login_afs_with_password.complete) {
                    $msg.html("请先拖动滑块!");
                    return false;
                }
                $msg.html("登陆中...");
                generalLogin(formGeneralLogin.userName.value, formGeneralLogin.password.value, $msg, _this.callback?_this.callback:null);
                return false;
            });
            // 发送验证码 和 滑块
            var pinIcn = $("#getPinIcn");
            pinIcn.countDown({
                srcWrd: pinIcn.html(),
                countAfter: function(){
                    delete pinIcn.send;
                    aliyun_afs.login_afs_with_message.reset();
                }
            });
            pinIcn.on("click", function () {
                if (pinIcn.send) {
                    return;
                }

                var phoneRegExp = /^(1[0-9][0-9]{9})$/;
                var errTip = $('[data-id="errTip"]');
                var mobile = $('#login_mobile').val();
                if( !Boolean(mobile) ){
                    errTip.html("请输入手机号！");
                    return false;
                } else if (!phoneRegExp.test(mobile)) {
                    errTip.html("请输入正确手机号！");
                    return false;
                }else if (!aliyun_afs.login_afs_with_message.complete){
                    errTip.html("请先拖动滑块!");
                    return false;
                }

                pinIcn.html("发送中");
                pinIcn.send = "sending";
                //发送请求到手机
                $.ajax({
                    url: "/login/create_vcode",
                    dataType: "json",
                    type: "get",
                    data: "mobile=" + mobile +"&codeType=ASYNCHRONOUS&" + aliyun_afs.login_afs_with_message.data,
                    success: function (data) {
                        // 滑块验证失败
                        if (data.afs_error || data['case'] == "fail") {
                            aliyun_afs.login_afs_with_message.reset();
                            delete pinIcn.send;
                            pinIcn.trigger("count:reset");
                        } else {
                            // 开始倒计时
                            pinIcn.trigger("count:start");
                            pinIcn.send = "sent";
                        }
                        // 弹出后台信息
                        errTip.html(data.msg);
                    }
                });
            });
            // 动态密码登录
            $("#dynamicLogin").on("click",function(){
                if ( !Boolean(formDynamicLogin.mobile.value) ) {
                    $msg.html("手机号不能为空");
                    return false;
                };
                if ( !Boolean(formDynamicLogin.vecode.value) ) {
                    $msg.html("验证码不能为空");
                    return false;
                };
                $msg.html("登陆中...");
                dynamicLogin(formDynamicLogin.mobile.value, formDynamicLogin.vecode.value, $msg, _this.callback?_this.callback:null);
                return false;
            });
        },
        show:function (callback) {
            var isLogin = $("#loginDialogIsLogin").val();
            if (isLogin != 'true') {
                var _this=this;
                this.state="dialog";
                this.dialogEle=$("#loginBox");
                if( !this.isInit ){
                    this.isInit=true;
                    this.initEvent();
                    this.initForm();
                };
                if( callback ) this.callback=callback;
                layer.open({
                    type:1,
                    content:_this.dialogEle,
                    title:"",
                    area:['370px','405px']
                });
            }else{
                if(callback) callback();
            }
        }
    }
})(window);