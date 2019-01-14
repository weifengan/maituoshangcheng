<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Category extends CI_Controller {

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
		$this->load->model("CategoryModel");
		$catelist=$this->CategoryModel->GetAdminAll();
    $data["data"]=$catelist;
		$this->load->view('admin/category-index.html',$data);
	}

	public function edit($id){
			$this->load->model("CategoryModel");
			$cate=$this->CategoryModel->GetCategoryById($id);
			if(count($cate)<=0){
				exit('参数错误!');
			}else{
				$data['cate']=$cate[0];
				$catelist=$this->CategoryModel->GetIndexAll();
				$data['list']=$catelist;
			}
      $this->load->view("admin/category_edit.html",$data);
	}

	public function update(){
		$data=array(
			"cat_id"=>$this->input->post('cat_id'),
			"cat_name"=>$this->input->post("cat_name"),
			"cat_pid"=>$this->input->post("cat_pid"),
			"cat_enabled"=>$this->input->post("cat_enabled"),
			"cat_order"=>$this->input->post("cat_order"),
				"cat_icon"=>$this->input->post("cat_icon"),
		);

		$this->load->model("CategoryModel");
    $result=$this->CategoryModel->UpdateCategory($data);
 		$obj=array("result"=>$result);
		echo json_encode($obj);
	}

	public function delete(){
		$data=array(
			"cat_id"=>$this->input->post('cat_id'),
			"deleted"=>1
		);
		$this->load->model("CategoryModel");
		$result=$this->CategoryModel->UpdateCategory($data);
		$obj=array("result"=>$result);
		echo json_encode($obj);
	}

	public function addnew(){
		$this->load->model("CategoryModel");
		$catelist=$this->CategoryModel->GetIndexAll();
    $data["list"]=$catelist;
		$this->load->view("admin/category_new.html",$data);
	}


}
