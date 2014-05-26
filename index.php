<!DOCTYPE html>
<html>

<head>
    <title>DotA 2 Fortune Cookie</title>
    <link rel='stylesheet' type='text/css' href='css/styles.css'>

    <script type='text/javascript' src='http://code.jquery.com/jquery-1.8.0.min.js'></script>
    <script type='text/javascript' src='js/login.js'></script>
</head>

<body>

    <h1>What does a hero truly need?</h1>
    <h1>A fortune cookie.</h1>
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
                $_SESSION['steamId'] = $steamId;
                header('LOCATION: http://localhost/dota2/fortunecookie.php');
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