// Frontly Scripts

// Frontly Nav
// The scripts below are required to ensure that the Fronlty Nav works in 
// responsive conditions.

$(function(){
	$('.frontly-nav__menu-link').click(function(e){
		$(this).siblings('ul').slideToggle(function(){
			$('.frontly-nav__menu-link').addClass('active');
		});
		e.preventDefault();
	});
});

// Panel Notifications

$(function(){
	$('.panel--can-close:visible', function(){
		$('.panel--can-close').append('<a href="#" class="panel--can-close__btn"><i class="fa fa-fw fa-times-circle-o"></i></a>');
	});

	$('body').on('click', '.panel--can-close__btn', function(e){
		$(this).parent().fadeOut('.25s');
		e.preventDefault();
	});
});