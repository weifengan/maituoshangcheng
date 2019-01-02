<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Register extends CI_Controller {

	public function index()
	{
		//获取分类
		$this->load->model("Category");
		$catelist=$this->Category->GetAll();

    $data["catelist"]=$catelist;
		//var_dump($catelist);

		$this->load->view('index/register.html',$data);
		
 	}
}
