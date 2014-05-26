<?php

	include 'apikey.php';

	if(isset($_POST['action'])) 
	{
		$userSteamID = $_POST['id'];
		$link = file_get_contents('http://dota2fortunecookie.herokuapp.com/'.$userSteamID); 
		echo $link;
	}
?>