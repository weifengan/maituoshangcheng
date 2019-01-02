/*
Navicat MySQL Data Transfer

Source Server         : localhost
Source Server Version : 50553
Source Host           : localhost:3306
Source Database       : eshop

Target Server Type    : MYSQL
Target Server Version : 50553
File Encoding         : 65001

Date: 2019-01-03 07:43:30
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for `account`
-- ----------------------------
DROP TABLE IF EXISTS `account`;
CREATE TABLE `account` (
  `accId` int(11) NOT NULL AUTO_INCREMENT COMMENT '账号id',
  `accName` char(10) DEFAULT NULL COMMENT '账户名称',
  `accNick` varchar(50) DEFAULT NULL COMMENT '账号呢称',
  `accPwd` varchar(30) DEFAULT NULL COMMENT '账号密码',
  `accAdmin` tinyint(1) DEFAULT NULL COMMENT '是否为管理员',
  `accMobile` varchar(20) DEFAULT NULL COMMENT '手机号',
  `accRegDate` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '注册日期',
  `accWXOpenid` varbinary(50) DEFAULT NULL COMMENT '微信OpenId',
  `accAvatar` varchar(500) DEFAULT NULL COMMENT '账户头像URL',
  PRIMARY KEY (`accId`)
) ENGINE=MyISAM AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of account
-- ----------------------------
INSERT INTO `account` VALUES ('1', 'admin', 'admin', 'admin', '1', '17746514110', '2018-09-26 22:31:39', null, null);

-- ----------------------------
-- Table structure for `attrinames`
-- ----------------------------
DROP TABLE IF EXISTS `attrinames`;
CREATE TABLE `attrinames` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '属性名编号',
  `att_name` varchar(50) DEFAULT NULL COMMENT '属性名称',
  `att_catid` int(11) DEFAULT NULL COMMENT '商品分类编号',
  `att_pattid` int(50) DEFAULT '0' COMMENT '父属性编号',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of attrinames
-- ----------------------------
INSERT INTO `attrinames` VALUES ('1', '颜色', '2', null);
INSERT INTO `attrinames` VALUES ('2', '电压', '12', '0');

-- ----------------------------
-- Table structure for `attrivalues`
-- ----------------------------
DROP TABLE IF EXISTS `attrivalues`;
CREATE TABLE `attrivalues` (
  `id` int(11) NOT NULL DEFAULT '0' COMMENT '属性值编号',
  `att_value` varchar(50) DEFAULT NULL COMMENT '属性值',
  `att_nameid` int(11) DEFAULT NULL COMMENT '属性名编号',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of attrivalues
-- ----------------------------

-- ----------------------------
-- Table structure for `brand`
-- ----------------------------
DROP TABLE IF EXISTS `brand`;
CREATE TABLE `brand` (
  `brand_id` smallint(5) unsigned NOT NULL AUTO_INCREMENT COMMENT '商品品牌ID',
  `brand_name` varchar(30) NOT NULL DEFAULT '' COMMENT '商品品牌名称',
  `brand_desc` varchar(255) NOT NULL DEFAULT '' COMMENT '商品品牌描述',
  `url` varchar(100) NOT NULL DEFAULT '' COMMENT '商品品牌网址',
  `logo` varchar(50) NOT NULL DEFAULT '' COMMENT '品牌logo',
  `order` tinyint(3) unsigned NOT NULL DEFAULT '50' COMMENT '商品品牌排序依据',
  `show` tinyint(4) NOT NULL DEFAULT '1' COMMENT '是否显示，默认显示',
  PRIMARY KEY (`brand_id`)
) ENGINE=MyISAM AUTO_INCREMENT=8 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of brand
-- ----------------------------
INSERT INTO `brand` VALUES ('1', 'tdk', '', '', '/static/index/images/brand/tdk-logo.png', '50', '1');
INSERT INTO `brand` VALUES ('2', 'isnd', '', '', '/static/index/images/brand/isnd-logo.png', '50', '1');
INSERT INTO `brand` VALUES ('3', 'lrc', '', '', '/static/index/images/brand/lrc-logo.png', '50', '1');
INSERT INTO `brand` VALUES ('4', 'avx', '', '', '/static/index/images/brand/avx-logo.png', '50', '1');
INSERT INTO `brand` VALUES ('5', 'sitime', '', '', '/static/index/images/brand/sitime-logo.png', '50', '1');
INSERT INTO `brand` VALUES ('6', 'torex', '', '', '/static/index/images/brand/torex-logo.png', '50', '1');
INSERT INTO `brand` VALUES ('7', 'yageo', '', '', '/static/index/images/brand/yageo-logo.png', '50', '1');

-- ----------------------------
-- Table structure for `category`
-- ----------------------------
DROP TABLE IF EXISTS `category`;
CREATE TABLE `category` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '商品分类编号',
  `title` varchar(40) DEFAULT NULL COMMENT '商品分类名称',
  `icon` varchar(30) DEFAULT '' COMMENT '商品分类图标',
  `parent` int(11) DEFAULT '0' COMMENT '父分类编号',
  `order` int(11) DEFAULT '0' COMMENT '显示顺序',
  `createdate` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '创建时间',
  `enable` tinyint(4) DEFAULT '1' COMMENT '是否启用',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=37 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of category
-- ----------------------------
INSERT INTO `category` VALUES ('1', '电阻', 'icon-cateId-1208', '0', '0', '2018-12-04 21:05:55', '1');
INSERT INTO `category` VALUES ('2', '压敏电阻', '', '1', '0', '2018-12-04 21:08:08', '1');
INSERT INTO `category` VALUES ('3', '贴片电阻', '', '1', '0', '2018-12-04 21:08:09', '1');
INSERT INTO `category` VALUES ('4', '可调电阻', '', '1', '0', '2018-12-04 21:08:10', '1');
INSERT INTO `category` VALUES ('5', '热敏电阻', '', '1', '0', '2018-12-04 21:08:21', '1');
INSERT INTO `category` VALUES ('6', '电容', 'icon-cateId-1207', '0', '0', '2018-12-04 21:08:31', '1');
INSERT INTO `category` VALUES ('7', '钽电容', '', '6', '0', '2018-12-04 21:08:49', '1');
INSERT INTO `category` VALUES ('8', '铝电解电容', '', '6', '0', '2018-12-04 21:09:05', '1');
INSERT INTO `category` VALUES ('9', '陶瓷电容', '', '6', '0', '2018-12-04 21:09:18', '1');
INSERT INTO `category` VALUES ('10', '薄膜电容', '', '6', '0', '2018-12-04 21:09:42', '1');
INSERT INTO `category` VALUES ('11', '贴片电容', '', '6', '0', '2018-12-04 21:09:39', '1');
INSERT INTO `category` VALUES ('12', '电源', 'icon-cateId-1089', '0', '0', '2018-12-04 21:12:00', '1');
INSERT INTO `category` VALUES ('13', '变压器', '', '12', '0', '2018-12-04 21:12:36', '1');
INSERT INTO `category` VALUES ('14', '电池', '', '12', '0', '2018-12-04 21:12:37', '1');
INSERT INTO `category` VALUES ('15', '逆变器及其配件', '', '12', '0', '2018-12-04 21:12:42', '1');
INSERT INTO `category` VALUES ('16', '反相器', '', '12', '0', '2018-12-04 21:12:45', '1');
INSERT INTO `category` VALUES ('17', '传感器', 'icon-cateId-958', '0', '0', '2018-12-04 21:14:09', '1');
INSERT INTO `category` VALUES ('18', '温度传感器', '', '17', '0', '2018-12-04 21:15:00', '1');
INSERT INTO `category` VALUES ('19', '电流传感器', '', '17', '0', '2018-12-04 21:15:02', '1');
INSERT INTO `category` VALUES ('20', '热传感器', '', '17', '0', '2018-12-04 21:15:03', '1');
INSERT INTO `category` VALUES ('21', '光电传感器', '', '17', '0', '2018-12-04 21:15:04', '1');
INSERT INTO `category` VALUES ('22', '压力传感器', '', '17', '0', '2018-12-04 21:15:06', '1');
INSERT INTO `category` VALUES ('23', '连接器', 'icon-cateId-1102', '0', '0', '2018-12-04 21:17:03', '1');
INSERT INTO `category` VALUES ('24', '端子及附件', '', '23', '0', '2018-12-04 21:15:56', '1');
INSERT INTO `category` VALUES ('25', '接口', '', '23', '0', '2018-12-04 21:16:15', '1');
INSERT INTO `category` VALUES ('26', '板对板与夹层连接器', '', '23', '0', '2018-12-04 21:16:22', '1');
INSERT INTO `category` VALUES ('27', '晶振', 'icon-cateId-1209', '0', '0', '2018-12-04 21:18:06', '1');
INSERT INTO `category` VALUES ('28', 'LED照明', 'icon-cateId-953', '0', '0', '2018-12-04 21:18:36', '1');
INSERT INTO `category` VALUES ('29', '晶体振荡器', '', '27', '0', '2018-12-04 21:19:48', '1');
INSERT INTO `category` VALUES ('30', 'LED灯珠', '', '28', '0', '2018-12-04 21:20:02', '1');
INSERT INTO `category` VALUES ('31', ' 工业自动化', 'icon-cateId-1029', '0', '0', '2018-12-04 21:20:51', '1');
INSERT INTO `category` VALUES ('32', '继电器', '', '31', '0', '2018-12-04 21:25:15', '1');
INSERT INTO `category` VALUES ('33', '集成电路', 'icon-cateId-1000', '0', '0', '2018-12-04 21:26:05', '1');
INSERT INTO `category` VALUES ('34', 'IC', '', '33', '0', '2018-12-04 21:26:41', '1');
INSERT INTO `category` VALUES ('35', 'RF集成电路', '', '33', '0', '2018-12-04 21:26:42', '1');
INSERT INTO `category` VALUES ('36', '放大器', '', '33', '0', '2018-12-04 21:26:49', '1');
