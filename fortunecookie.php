<?php

	include 'apikey.php';

	session_start();
	 
	$id = $_SESSION['steamId'];

	$link =file_get_contents('http://api.steampowered.com/ISteamUser/GetPlayerSummaries/v0002/?key='.$apikey.'&steamids='.$id.'&format=json'); 
	$json_decoded=json_decode($link, true);

	$player = $json_decoded['response']['players'][0];
?>

<!DOCTYPE html>
<html>

<head>
	<title>DotA 2 Fortune Cookie</title>
	<link rel='stylesheet' type='text/css' href='css/styles.css'>

	<script type='text/javascript' src='http://code.jquery.com/jquery-1.8.0.min.js'></script>
	<script type='text/javascript'>var STEAM_ID = '<?= $id ?>';</script>
	<script type='text/javascript' src='js/fortunecookie.js'></script>
</head>

<body>
	<div class='container'>
		<p id='1'>HELLO! <? echo $player['personaname']; ?> ! </p>
		<img id='avatar' src='<? echo $player['avatarfull']; ?>'</p>
		<p id='2'>Your fortune is right here... </p>
		<img id='cookie' src='css/images/fortunecookie.jpg'</img>
		
		<p id='3'>Click to open it... </p>
	</div>
	
	<div class='slip'>
		<p id='message'></p>
	</div>

	<div class='loading'>
		<p>Opening your cookie..</p>
	</div>

	<div class='console' />

</body>
</html>