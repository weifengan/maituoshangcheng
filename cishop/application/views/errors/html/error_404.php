<?php
defined('BASEPATH') OR exit('No direct script access allowed');
?><!DOCTYPE html>

<!doctype html>
<html>
<head>
    <meta charset="utf-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1" />
    <title>唯样商城</title>
    <style>
        *{
            margin: 0;
            padding: 0;
        }
        a{
            text-decoration: none;
        }
        .wraper {
            margin: 0 auto;
            width: 1200px;
        }
        .unfind-page {
            height: 420px;
            margin: 10px auto;
            width: 926px;
        }
        .unfind-page .img404 {
            padding-top: 50px;
        }
        .unfind-page .img404 img {
            display: block;
            margin: 0 auto;
        }
        .unfind-page .msg {
            background-color: #fff;
            height: 60px;
            line-height: 28px;
            font-size: 12px;
            margin: 20px auto;
            padding-bottom: 25px;
            padding-top: 20px;
            text-align: center;
            color: #7c7e8f;
            width: 420px;
        }
        .unfind-page .msg a{
            text-decoration: underline;
            color: #0269c2;
        }
        .header_lg {
            height: 102px;
            font-size: 14px;
            border-bottom: 1px solid #d6d6d6;
        }
        .header_lg .logo {
            padding-top: 19px;
        }
        .logo {
            padding-left: 10px;
            width: 284px;
        }
        .logo img {
            display: block;
        }
        .color-blue {
            color: #0269c2;
        }
        .header_lg p {
            line-height: 102px;
        }
        .btm-banner {
            border-top: 1px solid #e55e30;
            padding: 22px 0 17px;
        }
        .btm-banner .banner {
            background: rgba(0, 0, 0, 0) url("/static/www/images/btmbanner.jpg") repeat scroll 0 0;
            height: 80px;
            margin: 0 auto;
            width: 1200px;
        }
        .footer_lg {
            padding: 0 0 15px;
            font-size: 14px;
        }
        .footer_lg p{
            line-height: 1.8em;
        }
        .footer_lg .footer-btm {
            color: #999;
        }
        .footer-btm {
            color: #fff;
            padding: 20px 0;
            text-align: center;
        }
        .footer-btm a {
            color: #fff;
            padding: 0 3px;
        }
        .footer_lg .footer-btm a {
            color: #666;
        }
        .fl{
            float: left;
        }
        .fr{
            float: right;
        }
    </style>
</head>
<body>
<div class="header_lg">
    <div class="wraper">
        <h1 class="logo fl">
            <a href="./" title="唯样商城">
                <img alt="唯样科技" src="/static/index/picture/head-logo.png">
            </a>
        </h1>
        <p class="fr">还没有账号？<a class="color-blue" href="./register">立即注册</a></p>
    </div>
</div>
<div class="wraper">
    <div class="unfind-page">
        <div class="img404">
            <img src="/static/index/images/404.png">
        </div>
        <p class="msg">
            很抱歉，此页面可能已被删除或您没有访问权限！<br/>
            您可以   <a href="/">返回首页</a>  或  <a href="javascript:history.back();">上一页</a>
        </p>
    </div>
</div>
<div class="btm-banner">
    <div class="banner">
    </div>
</div>
<div class="footer_lg">
    <div class="wraper footer-btm">
        <p>
            <a href="/help/1.html" target="_blank">新手上路</a>
            <span>|</span>
            <a href="/help/3.html" target="_blank">免责声明</a>
            <span>|</span>
            <a href="/help/13.html" target="_blank">销售条款</a>
            <span>|</span>
            <a href="/help/14.html" target="_blank">售后服务</a>
            <span>|</span>
            <a href="/help/16.html" target="_blank">联系我们</a>

        </p>
        <p>Copyright © 2018 厦门唯样科技有限公司&nbsp;&nbsp;闽ICP备17005748号-1</p>
    </div>
</div>
</body>
</html>
