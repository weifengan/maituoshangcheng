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
   attri_vid            bigint not null auto_increment comment '����ֵ���',
   attr_value           varchar(50) comment '����ֵ',
   attr_attnid          bigint comment '������id',
   primary key (attri_vid)
);

alter table AttributeValues comment '����ֵ��';

/*==============================================================*/
/* Table: Attributes                                            */
/*==============================================================*/
create table Attributes
(
   attr_id              int not null auto_increment comment '���������',
   attr_name            varchar(30) comment '������',
   attr_catid           bigint comment '��Ʒ������',
   attr_pattrid         bigint default 0 comment '�����Ա��',
   primary key (attr_id)
);

alter table Attributes comment '��������';

/*==============================================================*/
/* Table: Brands                                                */
/*==============================================================*/
create table Brands
(
   brand_id             bigint not null auto_increment comment 'Ʒ��ID',
   brand_name           varchar(150) comment 'Ʒ������',
   brand_logo           varchar(150) comment 'Ʒ��logo',
   brand_website        varchar(150) comment 'Ʒ�ƹ���',
   brand_recommend      tinyint default 0 comment '�Ƿ��Ƽ�',
   primary key (brand_id)
);

alter table Brands comment 'Ʒ�Ʊ�';

/*==============================================================*/
/* Table: Category                                              */
/*==============================================================*/
create table Category
(
   cat_id               bigint not null auto_increment comment '��Ʒ������',
   cat_name             varchar(50) comment '��������',
   cat_pid              bigint default 0 comment '��������id',
   cat_icon             varchar(50) comment '����ͼ��',
   cat_order            int default 0 comment '��������˳��',
   cat_enabled          bool default 0 comment '�Ƿ�����',
   primary key (cat_id)
);

alter table Category comment '��Ʒ����';

/*==============================================================*/
/* Table: Product                                               */
/*==============================================================*/
create table Product
(
   product_id           bigint not null auto_increment comment '��Ʒid',
   product_title        varchar(300) comment '��Ʒ����',
   product_catid        bigint comment '��Ʒ������',
   spu_salecount        bigint comment 'spu����',
   product_commentcount bigint comment '������',
   primary key (product_id)
);

alter table Product comment '��Ʒ��';

/*==============================================================*/
/* Table: Sku                                                   */
/*==============================================================*/
create table Sku
(
   sku_id               bigint not null auto_increment comment 'sku���',
   sku_proid            bigint comment '��Ʒ���',
   sku_attris           varchar(500) comment 'sku����',
   sku_price            decimal(20,2) comment '��Ʒ�۸�',
   sku_stock            int comment '��Ʒ���',
   Column_6             char(10),
   primary key (sku_id)
);

alter table Sku comment 'SKU��';

