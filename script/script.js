$(document).ready(function(){
	// // Home Page top section animation
	// $('.slickFade1').slick({
	// 	dots: false,
	// 	infinite: true,
	// 	speed: 500,
	// 	fade: true,
	// 	cssEase: 'linear',
	// 	slidesToShow: 1,
	// 	slidesToScroll: 1,
	// 	autoplay: true,
	// 	autoplaySpeed: 4000,
	// });
	// // Home Page bottom section animation
	// $('.slickFade2').slick({
	// 	dots: false,
	// 	infinite: true,
	// 	speed: 500,
	// 	fade: true,
	// 	cssEase: 'linear',
	// 	slidesToShow: 1,
	// 	slidesToScroll: 1,
	// 	autoplay: true,
	// 	autoplaySpeed: 5000,
	// });

	// Main image slider
	$('.mainImages').slick({
		dots: false,
		infinite: false,
		centerMode: true,
		slidesToShow: 1,
		slidesToScroll: 1,
		variableWidth: true,
		arrows: true,

		responsive: [
			{
				breakpoint: 768,
				settings: {
					arrows: true,
					centerMode: true,
					centerPadding: '40px',
					slidesToShow: 1,
					slidesToScroll: 1,
				}
			},
			{
				breakpoint: 480,
				settings: {
					arrows: true,
					centerMode: true,
					centerPadding: '40px',
					slidesToShow: 1,
					slidesToScroll: 1,
				}
			}
		]
	});

	// General Image Navigation
	var imageNav = function(current) {
		var tempIndex = current.classList[0];
		$('.thumbNav .image').removeClass("selected");
		tempIndex = tempIndex.slice(5);
		var index = parseInt(tempIndex);
		$('.thumbNav .image'+index).addClass("selected");
		$('.mainImages').slickGoTo(index);
	};

	// Thumb image Navigation
	$('.thumbNav .image').click(function() {
		imageNav(this);
	});

	// Main image Navigation
	$('.mainImages .image').click(function() {
		imageNav(this);
	});
	

});