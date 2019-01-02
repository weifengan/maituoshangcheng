<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Category extends CI_Model {
    //获取商城分类列表
    public function GetAll(){
       $catelist=$this->db->query("select * from category where parent=0 order by 'desc'")->result();
       foreach($catelist as $k=>$v){
            $subs=$this->db->query("select * from category where parent=".$v->id." order by 'desc'")->result();
            $v->children=$subs;
            if(count($subs)>0){
                  $v->ishaveChild=TRUE;
              }else{
                $v->ishaveChild=FALSE;
            }

       }
     return $catelist;
    }
}


?>
