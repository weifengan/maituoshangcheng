/*
Navicat MySQL Data Transfer

Source Server         : localhost_3306
Source Server Version : 50553
Source Host           : localhost:3306
Source Database       : eshop

Target Server Type    : MYSQL
Target Server Version : 50553
File Encoding         : 65001

Date: 2019-01-09 03:32:09
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
-- Table structure for `attributes`
-- ----------------------------
DROP TABLE IF EXISTS `attributes`;
CREATE TABLE `attributes` (
  `attr_id` int(11) NOT NULL AUTO_INCREMENT COMMENT '属性名编号',
  `attr_name` varchar(30) DEFAULT NULL COMMENT '属性名',
  `attr_catid` bigint(20) DEFAULT NULL COMMENT '商品分类编号',
  `attr_pattrid` bigint(20) DEFAULT '0' COMMENT '父属性编号',
  PRIMARY KEY (`attr_id`)
) ENGINE=MyISAM AUTO_INCREMENT=3 DEFAULT CHARSET=utf8 COMMENT='属性名表';

-- ----------------------------
-- Records of attributes
-- ----------------------------
INSERT INTO `attributes` VALUES ('1', '颜色', '11', '0');
INSERT INTO `attributes` VALUES ('2', '尺码', '11', '0');

-- ----------------------------
-- Table structure for `attributevalues`
-- ----------------------------
DROP TABLE IF EXISTS `attributevalues`;
CREATE TABLE `attributevalues` (
  `attri_vid` bigint(20) NOT NULL AUTO_INCREMENT COMMENT '属性值编号',
  `attr_value` varchar(50) DEFAULT NULL COMMENT '属性值',
  `attr_attnid` bigint(20) DEFAULT NULL COMMENT '属性名id',
  PRIMARY KEY (`attri_vid`)
) ENGINE=MyISAM AUTO_INCREMENT=6 DEFAULT CHARSET=utf8 COMMENT='属性值表';

-- ----------------------------
-- Records of attributevalues
-- ----------------------------
INSERT INTO `attributevalues` VALUES ('1', '红色', '1');
INSERT INTO `attributevalues` VALUES ('2', '白色', '1');
INSERT INTO `attributevalues` VALUES ('3', 'L', '2');
INSERT INTO `attributevalues` VALUES ('4', 'XL', '2');

-- ----------------------------
-- Table structure for `brands`
-- ----------------------------
DROP TABLE IF EXISTS `brands`;
CREATE TABLE `brands` (
  `brand_id` bigint(20) NOT NULL AUTO_INCREMENT COMMENT '品牌ID',
  `brand_name` varchar(150) DEFAULT NULL COMMENT '品牌名称',
  `brand_logo` varchar(150) DEFAULT NULL COMMENT '品牌logo',
  `brand_website` varchar(150) DEFAULT NULL COMMENT '品牌官网',
  `brand_recommend` tinyint(1) DEFAULT '0' COMMENT '是否推荐',
  PRIMARY KEY (`brand_id`)
) ENGINE=MyISAM AUTO_INCREMENT=6 DEFAULT CHARSET=utf8 COMMENT='品牌表';

-- ----------------------------
-- Records of brands
-- ----------------------------
INSERT INTO `brands` VALUES ('1', 'tdk', '/static/index/images/brand/tdk-logo.png', null, '0');
INSERT INTO `brands` VALUES ('2', 'isnd', '/static/index/images/brand/isnd-logo.png', null, '0');
INSERT INTO `brands` VALUES ('3', 'avx', '/static/index/images/brand/avx-logo.png', null, '0');
INSERT INTO `brands` VALUES ('4', 'sitime', '/static/index/images/brand/sitime-logo.png', null, '0');
INSERT INTO `brands` VALUES ('5', '优衣库', null, null, '0');

-- ----------------------------
-- Table structure for `category`
-- ----------------------------
DROP TABLE IF EXISTS `category`;
CREATE TABLE `category` (
  `cat_id` bigint(20) NOT NULL AUTO_INCREMENT COMMENT '商品分类编号',
  `cat_name` varchar(50) DEFAULT NULL COMMENT '分类名称',
  `cat_pid` bigint(20) DEFAULT '0' COMMENT '父级分类id',
  `cat_icon` varchar(50) DEFAULT NULL COMMENT '分类图标',
  `cat_order` int(11) DEFAULT '0' COMMENT '分类排列顺序',
  `cat_enabled` tinyint(1) DEFAULT '0' COMMENT '是否启用',
  `createdate` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`cat_id`)
) ENGINE=MyISAM AUTO_INCREMENT=15 DEFAULT CHARSET=utf8 COMMENT='商品类别表';

-- ----------------------------
-- Records of category
-- ----------------------------
INSERT INTO `category` VALUES ('1', '电阻', '0', 'icon-cateId-1208', '0', '1', '2019-01-09 01:00:03');
INSERT INTO `category` VALUES ('2', '电容', '0', 'icon-cateId-1208', '0', '1', '2019-01-09 01:00:03');
INSERT INTO `category` VALUES ('3', '集成电路', '0', 'icon-cateId-1208', '0', '1', '2019-01-09 01:00:03');
INSERT INTO `category` VALUES ('4', '电源', '0', 'icon-cateId-1208', '0', '1', '2019-01-09 01:00:03');
INSERT INTO `category` VALUES ('5', 'LED照明', '0', 'icon-cateId-1208', '0', '1', '2019-01-09 01:00:03');
INSERT INTO `category` VALUES ('6', '传感器', '0', 'icon-cateId-1208', '0', '1', '2019-01-09 01:00:03');
INSERT INTO `category` VALUES ('7', '压敏电阻', '1', 'icon-cateId-1208', '0', '1', '2019-01-09 01:00:03');
INSERT INTO `category` VALUES ('8', '贴片电阻', '1', 'icon-cateId-1208', '0', '1', '2019-01-09 01:00:03');
INSERT INTO `category` VALUES ('9', '陶瓷电容', '2', 'icon-cateId-1208', '0', '1', '2019-01-09 01:00:03');
INSERT INTO `category` VALUES ('10', '钽电容', '2', 'icon-cateId-1208', '0', '1', '2019-01-09 01:00:03');
INSERT INTO `category` VALUES ('11', '服装', '0', null, '0', '1', '2019-01-09 01:00:03');
INSERT INTO `category` VALUES ('12', '上衣', '11', null, '0', '1', '2019-01-09 01:00:03');
INSERT INTO `category` VALUES ('13', '裤子', '11', null, '0', '1', '2019-01-09 01:00:03');
INSERT INTO `category` VALUES ('14', '外套', '11', null, '0', '1', '2019-01-09 01:00:03');

-- ----------------------------
-- Table structure for `product`
-- ----------------------------
DROP TABLE IF EXISTS `product`;
CREATE TABLE `product` (
  `product_id` bigint(20) NOT NULL AUTO_INCREMENT COMMENT '商品id',
  `product_title` varchar(300) DEFAULT NULL COMMENT '商品名称',
  `product_catid` bigint(20) DEFAULT NULL COMMENT '商品分类编号',
  `spu_salecount` bigint(20) DEFAULT NULL COMMENT 'spu销量',
  `product_commentcount` bigint(20) DEFAULT '0' COMMENT '评论数',
  PRIMARY KEY (`product_id`)
) ENGINE=MyISAM AUTO_INCREMENT=2 DEFAULT CHARSET=utf8 COMMENT='商品表';

-- ----------------------------
-- Records of product
-- ----------------------------
INSERT INTO `product` VALUES ('1', '测试衬衣', '12', '0', '0');

-- ----------------------------
-- Table structure for `sku`
-- ----------------------------
DROP TABLE IF EXISTS `sku`;
CREATE TABLE `sku` (
  `sku_id` bigint(20) NOT NULL AUTO_INCREMENT COMMENT 'sku编号',
  `sku_proid` bigint(20) DEFAULT NULL COMMENT '商品编号',
  `sku_attris` varchar(500) DEFAULT NULL COMMENT 'sku属性',
  `sku_price` decimal(20,2) DEFAULT NULL COMMENT '商品价格',
  `sku_stock` int(11) DEFAULT NULL COMMENT '商品库存',
  PRIMARY KEY (`sku_id`)
) ENGINE=MyISAM AUTO_INCREMENT=101 DEFAULT CHARSET=utf8 COMMENT='SKU表';

-- ----------------------------
-- Records of sku
-- ----------------------------
INSERT INTO `sku` VALUES ('1', '1', '[{“type\":1,\"value:1},{\"type\":2,\"value\":3}]', '30.00', '100');
INSERT INTO `sku` VALUES ('2', '1', '[{“type\":1,\"value:1},{\"type\":2,\"value\":4}]', '60.00', '32');
INSERT INTO `sku` VALUES ('3', '1', '[{“type\":1,\"value:2},{\"type\":2,\"value\":3}]', '65.00', '48');
INSERT INTO `sku` VALUES ('4', '1', '[{“type\":1,\"value:2},{\"type\":2,\"value\":4}]', '64.00', '50');
