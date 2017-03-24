<?php

class Model
{
    /**
     * @param object $db A PDO database connection
     */
    function __construct($db)
    {
        try {
            $this->db = $db;
        } catch (PDOException $e) {
            exit('Database connection could not be established.');
        }
    }


    /**
     * fetch user from db with email
     * @param $email
     * @return mixed
     */
    public function findUserByEmail($email){

        $sql = "SELECT * FROM users WHERE email = :email LIMIT 1";
        $query = $this->db->prepare($sql);
        $parameters = array(':email' => $email);
        $query->execute($parameters);
        return $query->fetch();
    }

    /**
     * add new user
     */
    public function createUser($name, $surname, $email, $password)
    {
        $sql = "INSERT INTO users (name, surname, email , password) VALUES (:name, :surname, :email , :password)";
        $query = $this->db->prepare($sql);
        $parameters = array(':name' => $name, ':surname' => $surname, ':email' => $email , ':password'=>md5($password));
        $query->execute($parameters);
        return $this->db->lastInsertId();
    }


    /**
     * find connected users
     * @param $email
     * @return mixed
     */
    public function findConnectedUsers($email){

        $sql = "SELECT id,name,surname,email FROM users WHERE email != :email ";
        $query = $this->db->prepare($sql);
        $parameters = array(':email' => $email);
        $query->execute($parameters);
        return $query->fetchAll(PDO::FETCH_ASSOC);

    }


    /**
     * get list msgs of receiver and sender
     * @param $receiverId
     * @param $senderId
     * @return mixed
     */
    public function getMsgs($receiverId , $senderId){

        $sql = "SELECT DISTINCT id,body,sender_id,receiver_id,DATE_FORMAT(date, \"%d/%l/%Y %H:%i:%s\") AS date FROM  messages WHERE (sender_id = :sender_id  AND receiver_id = :receiver_id) OR (sender_id = :receiver_id  AND receiver_id = :sender_id) ORDER BY date ASC";
        $query = $this->db->prepare($sql);
        $parameters = array(':receiver_id' => $receiverId , ':sender_id' => $senderId );
        $query->execute($parameters);
        return $query->fetchAll(PDO::FETCH_ASSOC);

    }


    /**
     * add new msg
     */
    public function createMsg($receiver, $sender, $body)
    {
        $sql = "INSERT INTO messages (body, sender_id, receiver_id) VALUES (:body, :sender_id,:receiver_id)";
        $query = $this->db->prepare($sql);
        $parameters = array(':body' => $body, ':sender_id' => $sender, ':receiver_id' => $receiver );
        $query->execute($parameters);
        return $this->getLastMsg();
    }


    public function getLastMsg(){

        $sql = "SELECT id,body,sender_id,receiver_id,DATE_FORMAT(date, \"%d/%l/%Y %H:%i:%s\") AS date FROM messages WHERE id = :id LIMIT 1";
        $query = $this->db->prepare($sql);
        $parameters = array(':id' => $this->db->lastInsertId());
        $query->execute($parameters);
        return $query->fetch(PDO::FETCH_ASSOC);
    }
}
