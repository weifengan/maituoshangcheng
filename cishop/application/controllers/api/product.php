<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Product extends CI_Controller {

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
		 echo 'Product api';
	}


  public function GetProductById($id){
     $catelist=$this->db->query("select * from sku,product,category where product.product_catid= category.cat_id and sku.sku_proid=".$id)->result();

    echo json_encode($catelist,JSON_UNESCAPED_UNICODE);
  }
}
