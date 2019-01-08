<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Home extends CI_Controller {

	public function index()
	{
		//获取分类
		$this->load->model("CategoryModel");
		$catelist=$this->CategoryModel->GetAll();

    $data["catelist"]=$catelist;
		//var_dump($catelist);

    //$this->load->view("index/header.html");
		$this->load->view('index/index.html',$data);
	}
}
