<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class BrandModel extends CI_Model {
  //获取商城分类列表 for Index
  public function GetAll(){
    $catelist=$this->db->query("select * from brands order by 'desc'")->result();
    return $catelist;
  }
  public function GetBrandById($id){
    $cat=$this->db->query("select * from brands where brand_id=".$id." order by 'desc'")->result();
    return $cat;
  }

  public function UpdateBrand($data){
    $query = $this->db->where(array('brand_id'=>$data["brand_id"]))->update('brands',$data);
    return $query;
  }

  public function InsertNew($data){
    return $this->db->insert('brands',$data);
  }
}
?>
