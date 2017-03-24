<?php


class Users extends Controller
{

    public function login()
    {

        $email = $_GET['email'];
        $password = $_GET['password'];
        $user=$this->model->findUserByEmail($email);

        header('Content-Type: application/json');
        try {
            if ($user) {
                if (!$this->checkPassword($user, $password))
                    throw new Exception("wrong password", 403);
                echo $this->getSuccessResponse([ "id"=>$user->id,"email" => $email, "password" => $password]);
            } else {
                throw new Exception("user not found for email : " . $email, 403);
            }
        }catch (Exception $e){

            echo $this->getFailureResponse($e->getMessage(),$e->getCode());
        }
    }

    private function checkPassword($user,$password){
        return $user->password === md5($password);
    }



    public function register()
    {
        try {

            $this->validateParams();

            $name = $_POST['name'];
            $surname = $_POST['surname'];
            $email = $_POST['email'];
            $password = $_POST['password'];
            $this->validEmail($email);

            $user=$this->model->findUserByEmail($email);

            header('Content-Type: application/json');

            if ($user) {
                throw new Exception("user already exist form email : ".$email, 403);
            } else {
                $id=$this->model->createUser($name,$surname,$email,$password);

                echo $this->getSuccessResponse(["id"=>$id,"email" => $email, "password" => $password]);
            }

        }catch (Exception $e){
            echo $this->getFailureResponse($e->getMessage(),$e->getCode());
        }
    }

    private function validateParams(){

        if(!isset( $_POST['name']) || !isset( $_POST['surname']) || !isset($_POST['email']) || !isset($_POST['password'])){
            throw new Exception("some params are missing ",422 );
        }
    }

    private function validEmail($email){

        if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
            throw new Exception ( "Invalid email format" );
        }
    }

    public function connectedUsers()
    {

        try {
            header('Content-Type: application/json');

            if(!isset($_GET['email']))
                throw new Exception("email param required");

            $email = $_GET['email'];
            $users=$this->model->findConnectedUsers($email);
            echo $this->getSuccessResponse($users);
        }catch (Exception $e){

            echo $this->getFailureResponse($e->getMessage(),$e->getCode());
        }
    }


    public function getMsgs()
    {

        try {
            header('Content-Type: application/json');

            if(!isset($_GET['receiver']) || !isset($_GET['sender']))
                throw new Exception("params missings");

            $receiver = $_GET['receiver'];
            $sender = $_GET['sender'];

            $msgs=$this->model->getMsgs($receiver,$sender);
            echo $this->getSuccessResponse($msgs);
        }catch (Exception $e){

            echo $this->getFailureResponse($e->getMessage(),$e->getCode());
        }
    }




    public function sendMsg()
    {
        try {

            if(!isset($_POST['receiver']) || !isset($_POST['sender'])|| !isset($_POST['body']))
                throw new Exception("params missings");

            $receiver = $_POST['receiver'];
            $sender = $_POST['sender'];
            $body = $_POST['body'];

            header('Content-Type: application/json');

            $msg=$this->model->createMsg($receiver,$sender,$body);
            echo $this->getSuccessResponse($msg);

        }catch (Exception $e){
            echo $this->getFailureResponse($e->getMessage(),$e->getCode());
        }
    }


}
