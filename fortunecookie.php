<?php

	include 'apikey.php';

	session_start();
	 
	$id = $_SESSION['steamId'];

	//$link =file_get_contents('http://api.steampowered.com/ISteamUser/GetPlayerSummaries/v0002/?key='.$apikey.'&steamids='.$id.'&format=json'); 
	//$json_decoded=json_decode($link, true);

	//$player = $json_decoded['response']['players'][0];
?>

<!DOCTYPE html>
<html ng-app='fortuneApp'>

<head>
	<title>DotA 2 Fortune Cookie</title>

	<meta content="text/html;charset=utf-8" http-equiv="Content-Type">
	<meta content="utf-8" http-equiv="encoding">
	<link rel='stylesheet' type='text/css' href='css/styles.css'>

	<script src='bower_components/jquery/dist/jquery.js'></script>
    <script src='bower_components/angular/angular.js'></script>
    <script src='bower_components/angular-animate/angular-animate.js'></script>
    <script src='bower_components/angular-resource/angular-resource.js'></script>
    <script src='js/fortuneApp.js'></script>
    <script src='js/fortuneDirectives.js'></script>
</head>

<body ng-controller='FortuneController' ng-init="userInit('<?php echo $_SESSION['steamId'] ?>')">
	<div class='container' my-show='cookieClicked' after-hide='afterHide()'>
		<p>HELLO! {{ result.response.players[0].personaname }} ! </p>
		
		<p>Your fortune is right here... </p>
		<img src='css/images/fortunecookie.jpg' ng-click='getFortune()'</img>
		
		<p>Click to open it... </p>
	</div>
	
	<div class='slip' ng-hide='!containerHidden'>
		<p id='message'>{{ message.message }}</p>
	</div>

</body>
</html>