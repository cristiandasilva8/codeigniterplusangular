<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');
class Welcome extends CI_Controller {

    public function __construct() {
		parent::__construct ();
		// carregando o Model welcome
		$this->load->model ( "welcome_model" );
		
	}
	public function index()
	{
		$this->load->view('welcome_message');
    }
    
    public function get() {
		$res = $this->welcome_model->get();
		echo json_encode($res);

	}
    public function post() {
        
        $data = json_decode(file_get_contents("php://input")); 
        
        $res = $this->welcome_model->post($data);
        echo json_encode($res);
	}
}
