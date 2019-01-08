<?php

class Coupon extends CI_Model
{
    function __construct()
    {
        parent::__construct();
        $this->load->database();
    }


    public function test(){
      echo "hello test";
    }
}
?>
