<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class CategoryModel extends CI_Model {
    //获取商城分类列表 for Index
    public function GetIndexAll(){
      $catelist=$this->db->query("select * from category where cat_pid=0 order by 'desc'")->result();
    foreach($catelist as $k=>$v){
         $subs=$this->db->query("select * from category where cat_pid=".$v->cat_id." order by 'desc'")->result();
         $v->children=$subs;
         if(count($subs)>0){
               $v->ishaveChild=TRUE;
           }else{
             $v->ishaveChild=FALSE;
         }
    }
      return $catelist;
    }

    public function GetAdminAll(){
      $list=array();
      $catelist=$this->db->query("select * from category where cat_pid=0 order by 'desc'")->result();
      foreach ($catelist as $key => $value) {
        $value->sub=0;
        array_push($list,$value);
        $subs=$this->db->query("select * from category where cat_pid=".$value->cat_id." order by 'desc'")->result();
        foreach ($subs as $skey => $svalue) {
          $svalue->sub=1;
          array_push($list,$svalue);
        }
      }
      return $list;
    }

    public function GetCategoryById($id){
      $cat=$this->db->query("select * from category where cat_id=".$id." order by 'desc'")->result();
      return $cat;
    }


    public function UpdateCategory($data){
      $query = $this->db->where(array('cat_id'=>$data["cat_id"]))->update('category',$data);
      return $query;
    }

    public function InsertNew($data){
      return $this->db->insert('category',$data);
    }
}


?>
