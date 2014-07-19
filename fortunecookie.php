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
    <script src='bower_components/angular-route/angular-route.js'></script>
    <script src='js/fortuneApp.js'></script>
    <script src='js/fortuneDirectives.js'></script>
    <script src='js/fortuneControllers.js'></script>
    <script src='js/detailsControllers.js'></script>
    <script src='js/dota2Services.js'></script>
</head>
<body>

	<div ng-controller='AppCtrl'>
        <img src='css/images/loading.gif' ng-show='loading'></img>
        <ng-view></ng-view>
    </div>

</body>
</html>