<?php

/**
 *  Home Controller
 */
class Home extends Controller
{
    /**
     *  index page
     */
    public function index()
    {
        // load views
        require APP . 'view/_templates/header.php';
        require APP . 'view/home/index.php';
        require APP . 'view/_templates/footer.php';
    }

}
