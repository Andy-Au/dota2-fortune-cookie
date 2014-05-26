$(document).ready(function() {
	$('.slip').hide();
	$('.loading').hide();
	$('#1').hide().fadeIn(2000);
	$('#avatar').hide().fadeIn(3000);
	$('#2').hide().fadeIn(4000);
	$('#cookie').hide().fadeIn(5000);
	$('#3').hide().fadeIn(6000, function() {
		initializeButton();
	});

	var loop;	
	$(document).ajaxStart(function () {
        loop = setInterval(onLoading);
    }).ajaxStop(function () {
        clearInterval(loop);
    });

	function initializeButton() {
		postConsole('initializing!');
		$('#cookie').one('click', function() {
			$('.container').fadeOut(2000, function() {
				getFortune();
			});
		});
	}

	function getFortune() {
		$.post('services.php', 
		{
			action : 'get',
			id : STEAM_ID 
		}, function(response) {
			$('#message').text(response);
			$('.slip').fadeIn(2000);
		});
	}

	function onLoading() {
		$('.loading').fadeIn('slow', function() {
        		$('.loading').fadeOut('slow');
    	});
	}

	//testing purposes
	function postConsole(message) {
		$('.console').html( $('.console').html() + "<br>=> " + message);
		$('.console').animate({ scrollTop: $(document).height() }, "slow"); 
	}
});