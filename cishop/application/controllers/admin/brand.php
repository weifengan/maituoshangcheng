<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Brand extends CI_Controller {

	/**
	 * Index Page for this controller.
	 *
	 * Maps to the following URL
	 * 		http://example.com/index.php/welcome
	 *	- or -
	 * 		http://example.com/index.php/welcome/index
	 *	- or -
	 * Since this controller is set as the default controller in
	 * config/routes.php, it's displayed at http://example.com/
	 *
	 * So any other public methods not prefixed with an underscore will
	 * map to /index.php/welcome/<method_name>
	 * @see https://codeigniter.com/user_guide/general/urls.html
	 */
	public function index()
	{
		$this->load->view('admin/brand-index.html');
	}


	public function edit($id){
			$this->load->model("BrandModel");
			$cate=$this->BrandModel->GetBrandById($id);
			if(count($cate)<=0){
				exit('参数错误!');
			}else{
				$data['brand']=$cate[0];
			}
      $this->load->view("admin/brand-edit.html",$data);
	}

	public function delete(){
		$data=array(
			"brand_id"=>$this->input->post('brand_id')
		);
		$this->load->model("BrandModel");
		$result=$this->CategoryModel->delete_brand($data);
		$obj=array("result"=>$result);
		echo json_encode($obj);
	}
	public function addnew(){
		$this->load->view("admin/brand-new.html");
	}
}
