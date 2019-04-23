function cb(){return}
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
  	$('.header-nav').slideToggle(400)
  	});
  $('#hMenu').focusout(function(){
  	$('.header-nav').slideToggle(400)
  	});
  $('.header-nav a').click(function(){
  	$('#hMenu').triggerHandler('focusout')
  })
  $('#tbMenu').click(function(){
  	$('.top-bar ul').slideToggle(400)
  	});
  $('#tbMenu').focusout(function(){
  	$('.top-bar ul').slideToggle(400)
  	});
  $('#scroll').click(function(){
  	$(window).scrollTop(0)
  	});
});