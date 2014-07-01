<!DOCTYPE html>
<html ng-app='loginApp'>

<head>
    <title>DotA 2 Fortune Cookie</title>
    <link rel='stylesheet' type='text/css' href='css/styles.css'>

    <script src="bower_components/jquery/dist/jquery.js"></script>
    <script src="bower_components/angular/angular.js"></script>
    <script src='js/loginApp.js'></script>
    <script src='js/loginDirectives.js'></script>
</head>

<body ng-controller='LoginController'>

    <h1> {{ indexMessage1 }}</h1>
    <h1> {{ indexMessage2 }}</h1>
    <div>
        <login-picture></login-picture>
    </div>
    <?php 
    	include 'apikey.php';
    	include 'openId.php';

        session_start();

    try 
    {
        $openid = new LightOpenID('http://localhost/');
        if(!$openid->mode) 
        {
            if(isset($_GET['login'])) 
            {
                $openid->identity = 'http://steamcommunity.com/openid/?l=english';    // This is forcing english because it has a weird habit of selecting a random language otherwise
                header('Location: ' . $openid->authUrl());
            }
    ?>

    <form action='?login' method='post'>
        <input type='image' src='http://cdn.steamcommunity.com/public/images/signinthroughsteam/sits_large_border.png'>
    </form>
    <?php
        } 
        elseif($openid->mode == 'cancel') 
        {
            echo 'User has canceled authentication!';
        } 
        else 
        {
            if($openid->validate()) 
            {
                $id = $openid->identity;
                // identity is something like: http://steamcommunity.com/openid/id/76561197960435530
                // we only care about the unique account ID at the end of the URL.
                $ptn = "/^http:\/\/steamcommunity\.com\/openid\/id\/(7[0-9]{15,25}+)$/";
                preg_match($ptn, $id, $matches);
                $steamId = $matches[1];
                header('LOCATION: http://localhost/dota2/fortunecookie.php#/message/' . $steamId);
            } 
            else 
            {
                    echo 'User is not logged in.\n';
            }
        }
    } 
    catch(ErrorException $e) 
    {
        echo $e->getMessage();
    }
    ?>
</body>
</html>