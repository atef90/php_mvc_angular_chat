<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <title>Chat</title>
    <meta name="description" content="">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <link href="<?php echo URL; ?>bower_components/bootstrap/dist/css/bootstrap.css" rel="stylesheet">
    <link href="<?php echo URL; ?>css/login.css" rel="stylesheet">
    <link href="<?php echo URL; ?>css/chat.css" rel="stylesheet">
    <link href="<?php echo URL; ?>css/style.css" rel="stylesheet">
</head>
<body ng-app="chatApp">
<span class="hide baseUrl"> <?php echo URL; ?> </span>
<div class="container-fluid">
    <nav class="navbar navbar-default">
        <div class="container-fluid">
            <div class="navbar-header">
                <a class="navbar-brand" href="">
                   Chat app
                </a>
            </div>

            <div class="nav navbar-nav navbar-right">
                <button ng-if="currentUser" ng-click="logout()" class="navbar-brand"><strong>Logout</strong></button>
            </div>
        </div>
    </nav>
