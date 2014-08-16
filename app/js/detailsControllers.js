'use strict';

var app = angular.module('detailControllers', []);

app.controller('DetailCtrl', [
	'$scope', 
	'$resource', 
	'$routeParams',
	'DetailMessage',
	'PlayerSummary',
	'Heroes', function($scope, $resource, $routeParams, 
		DetailMessage, PlayerSummary, Heroes) {

	//get resolved data from services
	$scope.summary = PlayerSummary;
	$scope.message = DetailMessage.message;
	var heroes = Heroes;

    //Globals
    $scope.myChartOptions = {

        // Boolean - Whether the scale should stick to integers, not floats even if drawing space is there
        scaleIntegersOnly: true,

        // Boolean - Whether the scale should start at zero, or an order of magnitude down from the lowest value
        scaleBeginAtZero: true,

        // Boolean - Determines whether to draw tooltips on the canvas or not
        showTooltips: true,

        // Array - Array of string names to attach tooltip events
        tooltipEvents: ["mousemove", "touchstart", "touchmove"],

        // String - Tooltip background colour
        tooltipFillColor: "rgba(0,0,0,0.8)",

        // String - Tooltip label font declaration for the scale label
        tooltipFontFamily: "'Helvetica Neue', 'Helvetica', 'Arial', sans-serif",

        // Number - Tooltip label font size in pixels
        tooltipFontSize: 14,

        // String - Tooltip font weight style
        tooltipFontStyle: "normal",

        // String - Tooltip label font colour
        tooltipFontColor: "#fff",

        // String - Tooltip title font declaration for the scale label
        tooltipTitleFontFamily: "'Helvetica Neue', 'Helvetica', 'Arial', sans-serif",

        // Number - Tooltip title font size in pixels
        tooltipTitleFontSize: 14,

        // String - Tooltip title font weight style
        tooltipTitleFontStyle: "bold",

        // String - Tooltip title font colour
        tooltipTitleFontColor: "#fff",

        // Number - pixel width of padding around tooltip text
        tooltipYPadding: 6,

        // Number - pixel width of padding around tooltip text
        tooltipXPadding: 6,

        // Number - Size of the caret on the tooltip
        tooltipCaretSize: 8,

        // Number - Pixel radius of the tooltip border
        tooltipCornerRadius: 6,

        // Number - Pixel offset from point x to tooltip edge
        tooltipXOffset: 10,
    };

	var killsEachGameLabels = [];
	var killsEachGame = [];

	var heroesPlayed = {};
	var heroesPlayedLabels = [];
	var heroesPlayedData =[];

	console.log(DetailMessage.data);

	for (var i = 0; i < DetailMessage.data.length; i++) {

		//Kills each game line graph
		killsEachGameLabels.push('');
		killsEachGame.push(DetailMessage.data[i].kills);

		//Heroes played
		if (heroesPlayed[DetailMessage.data[i].heroId] == undefined) {
			heroesPlayed[DetailMessage.data[i].heroId] = 1;
		} else {
			heroesPlayed[DetailMessage.data[i].heroId]++;
		}
	}	


	

	for (var i in heroesPlayed) {		
		var heroName = 	heroes.filter(function(e) {
				return e.id === parseInt(i);
			});
		console.log(heroName);
		heroesPlayedLabels.push(heroName[0].localized_name);
		heroesPlayedData.push(heroesPlayed[i]);
	}

	$scope.HeroesPlayedBarChart = {
		labels: heroesPlayedLabels,
		datasets: [
			{
				fillColor: "rgba(0,200,255,0.3)",
				strokeColor : "rgba(255,0,0,1)",
				highlightFill: "rgba(220,220,220,0.75)",
            	highlightStroke: "rgba(220,220,220,1)",
            	data: heroesPlayedData
			}
		],
	};


	$scope.KillsEachGameLineChart = {
	    labels : killsEachGameLabels,
	    datasets : [
	        {
	            fillColor : "rgba(0,200,255,0.3)",
	            strokeColor : "rgba(255,0,0,1)",
	            pointColor : "rgba(255,0,0,0.3)",
	            pointStrokeColor : "#e67e22",
	            data : killsEachGame,
	        },
	    ], 
	};



}]);