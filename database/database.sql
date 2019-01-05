/*==============================================================*/
/* DBMS name:      MySQL 5.0                                    */
/* Created on:     2019-01-05 08:43:38                          */
/*==============================================================*/


drop table if exists AttributeValues;

drop table if exists Attributes;

drop table if exists Brands;

drop table if exists Category;

drop table if exists Product;

drop table if exists Sku;

/*==============================================================*/
/* Table: AttributeValues                                       */
/*==============================================================*/
create table AttributeValues
(
   attri_vid            bigint not null auto_increment comment '属性值编号',
   attr_value           varchar(50) comment '属性值',
   attr_attnid          bigint comment '属性名id',
   primary key (attri_vid)
);

alter table AttributeValues comment '属性值表';

/*==============================================================*/
/* Table: Attributes                                            */
/*==============================================================*/
create table Attributes
(
   attr_id              int not null auto_increment comment '属性名编号',
   attr_name            varchar(30) comment '属性名',
   attr_catid           bigint comment '商品分类编号',
   attr_pattrid         bigint default 0 comment '父属性编号',
   primary key (attr_id)
);

alter table Attributes comment '属性名表';

/*==============================================================*/
/* Table: Brands                                                */
/*==============================================================*/
create table Brands
(
   brand_id             bigint not null auto_increment comment '品牌ID',
   brand_name           varchar(150) comment '品牌名称',
   brand_logo           varchar(150) comment '品牌logo',
   brand_website        varchar(150) comment '品牌官网',
   brand_recommend      tinyint default 0 comment '是否推荐',
   primary key (brand_id)
);

alter table Brands comment '品牌表';

/*==============================================================*/
/* Table: Category                                              */
/*==============================================================*/
create table Category
(
   cat_id               bigint not null auto_increment comment '商品分类编号',
   cat_name             varchar(50) comment '分类名称',
   cat_pid              bigint default 0 comment '父级分类id',
   cat_icon             varchar(50) comment '分类图标',
   cat_order            int default 0 comment '分类排列顺序',
   cat_enabled          bool default 0 comment '是否启用',
   primary key (cat_id)
);

alter table Category comment '商品类别表';

/*==============================================================*/
/* Table: Product                                               */
/*==============================================================*/
create table Product
(
   product_id           bigint not null auto_increment comment '商品id',
   product_title        varchar(300) comment '商品名称',
   product_catid        bigint comment '商品分类编号',
   spu_salecount        bigint comment 'spu销量',
   product_commentcount bigint comment '评论数',
   primary key (product_id)
);

alter table Product comment '商品表';

/*==============================================================*/
/* Table: Sku                                                   */
/*==============================================================*/
create table Sku
(
   sku_id               bigint not null auto_increment comment 'sku编号',
   sku_proid            bigint comment '商品编号',
   sku_attris           varchar(500) comment 'sku属性',
   sku_price            decimal(20,2) comment '商品价格',
   sku_stock            int comment '商品库存',
   Column_6             char(10),
   primary key (sku_id)
);

alter table Sku comment 'SKU表';

