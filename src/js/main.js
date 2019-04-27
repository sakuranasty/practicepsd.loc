function removeDisplay(){
	if($(this).css('display')=='none'){
  		console.log(1)
		$(this).removeAttr("style")
  	}
  	$(this).stop(true)
	// console.log(1)
}
$(document).ready(function(){
  $('.sliderMain').slick({
    accessibility: true,
    adaptiveHeight: false,
    autoplay:true,
    draggable:true,
    infinite:true,
    arrows:false,
    dots:true,
    slidesToShow:1,
    responsive:true
  });
  $('#hMenu').click(function(){
  	$('.header-nav').slideToggle(400,removeDisplay);
  	});
  $('#hMenu').focusout(function(){
  	$('.header-nav').slideUp(400,removeDisplay)
  	});
  $('#tbMenu').click(function(){
  	$('.top-bar ul').slideToggle(400,removeDisplay)
  	});
  $('#tbMenu').focusout(function(){
  	$('.top-bar ul').slideUp(400,removeDisplay)
  	});
  $('#scroll').click(function(){
  	$(window).scrollTop(0)
  	});
  $('.shops h3').click(function(){
  	$('.shops ul').slideToggle(400,removeDisplay)
  	});
  $('.shops h3').focusout(function(){
  	$('.shops ul').slideUp(400,removeDisplay)
  	});
  $('.information h3').click(function(){
  	$('.information ul').slideToggle(400,removeDisplay)
  	});
  $('.information h3').focusout(function(){
  	$('.information ul').slideUp(400,removeDisplay)
  	});
  $('.service h3').click(function(){
  	$('.service ul').slideToggle(400,removeDisplay)
  	});
  $('.service h3').focusout(function(){
  	$('.service ul').slideUp(400,removeDisplay)
  	});


});