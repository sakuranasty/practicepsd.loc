function removeDisplay(){
	if($(this).css('display')=='none'){
  		console.log(1)
		$(this).removeAttr("style")
  	}
  	$(this).stop(true)
	// console.log(1)
}
function toggleinteractive(target,state2){
    $(target).toggleClass(state2)
};
  let mq=window.matchMedia('(max-width: 540px)')
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
  if(mq.matches){
  $('.shops h3').click(function(){
  	$('.shops ul').slideToggle(400,removeDisplay)
    $(this).toggleClass('catheadhide')
  	});
  $('.information h3').click(function(){
  	$('.information ul').slideToggle(400,removeDisplay)
    toggleinteractive(this,'catheadhide')
  	});
   $('.service h3').click(function(){
  	$('.service ul').slideToggle(400,removeDisplay)
    toggleinteractive(this,'catheadhide')
  	});
 };
$(window).resize(function(){
  console.log("resize")
  if(!(mq.matches)){
  $('.shops h3').unbind('click')
  $('.shops h3').removeAttr('class')
  $('.shops ul').removeAttr('style')
  $('.information h3').unbind('click')
  $('.information h3').removeAttr('class')
  $('.information ul').removeAttr('style')
  $('.service h3').unbind('click')
  $('.service h3').removeAttr('class')
  $('.service ul').removeAttr('style')
}else{
  $('.shops h3').click(function(){
    $('.shops ul').slideToggle(400,removeDisplay)
    $(this).toggleClass('catheadhide')
    })
    $('.information h3').click(function(){
    $('.information ul').slideToggle(400,removeDisplay)
    toggleinteractive(this,'catheadhide')
    })
    $('.service h3').click(function(){
    $('.service ul').slideToggle(400,removeDisplay)
    toggleinteractive(this,'catheadhide')
    })
}
})

 
 


});