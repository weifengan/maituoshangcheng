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
		 echo 'Brand api';
	}


  public function GetAll(){
		$this->load->model("BrandModel");
	  $catelist=$this->BrandModel->GetAll();
		$data=array(
			"code"=>0,
			"msg"=>"",
			"count"=>count($catelist),
			"data"=>$catelist
		);
    echo json_encode($data,JSON_UNESCAPED_UNICODE);
  }

  public function Update(){
		$data=array(
			"brand_id"=>$this->input->post('brand_id'),
			"brand_name"=>$this->input->post("brand_name"),
			"brand_logo"=>$this->input->post("brand_logo"),
			"brand_website"=>$this->input->post("brand_website")
		);
		$this->load->model("BrandModel");
    $result=$this->BrandModel->UpdateBrand($data);
 		$obj=array("result"=>$result);
		echo json_encode($obj);
	}

  public function AddNew(){
		$data=array(
			"brand_name"=>$this->input->post("brand_name"),
			"brand_logo"=>$this->input->post("brand_logo"),
			"brand_website"=>$this->input->post("brand_website"),
		);

		$this->load->model("BrandModel");
    $result=$this->BrandModel->InsertNew($data);
 		$obj=array("result"=>$result);
		echo json_encode($obj);
	}
}
