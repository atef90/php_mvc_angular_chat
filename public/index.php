<?php


// ROOT folder
define('ROOT', dirname(__DIR__) . DIRECTORY_SEPARATOR);
// application folder
define('APP', ROOT . 'application' . DIRECTORY_SEPARATOR);

// auto-loader for Composer-dependencies (to load tools into your project).
if (file_exists(ROOT . 'vendor/autoload.php')) {
    require ROOT . 'vendor/autoload.php';
}

// load application config
require APP . 'config/config.php';

// load application class
require APP . 'core/application.php';
require APP . 'core/controller.php';

// start the application
$app = new Application();
