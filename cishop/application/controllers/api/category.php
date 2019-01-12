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
		 echo 'category api';
	}


  public function getcategory($page,$limit){

	}
  public function GetAdminAll(){
		$this->load->model("CategoryModel");
	  $catelist=$this->CategoryModel->GetAdminAll();
		$data=array(
			"code"=>0,
			"msg"=>"",
			"count"=>count($catelist),
			"data"=>$catelist
		);
    echo json_encode($data,JSON_UNESCAPED_UNICODE);
  }

	public function GetEditById($id){

	}
}
