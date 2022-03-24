
$( document ).ready(function() {
    console.log( "ready!" );
     $( '.play-button' ).trigger( "click" );
     playCurrentVideo();
});

$('.play-button').on('click', function () {
    $(this).hide();
    $(this).parent().fadeOut();
    //console.log( $(this).parent().siblings('.slider-video')[0]);
   /*
    let command = {
          "event": "command",
          "func": "playVideo",
          "args":""
        };
        console.log(JSON.stringify(command));
	 $('iframe').each(function(){
        $(this)[0].contentWindow.postMessage(JSON.stringify(command), "*");
    });
    */
    
     /*
     $('iframe').each(function(){
     //console.log($(this)[0]);
       var r = $(this)[0].contentWindow.postMessage('{"event":"command","func":"playVideo","args":""}', '*');
    
    });*/
    //$(this).parent().siblings('.slider-video')[0].play();
});


// Additionnal code for the slider
var pos = 0,
    slides = $('.slide'),
    numOfSlides = slides.length;
    console.log(numOfSlides);

function nextSlide(){
    stopCurrentVideo();
    console.log(slides.eq(pos));
    slides.eq(pos).animate({left:'-100%'},500);
    pos = pos >= numOfSlides-1 ? 0 : ++pos;
    slides.eq(pos).css({left:'100%'}).animate({left:0},500);    
}

function previousSlide(){
    stopCurrentVideo();
    slides.eq(pos).animate({left:'100%'},500);
    pos = pos == 0 ? numOfSlides-1 : --pos;
    slides.eq(pos).css({left:'-100%'}).animate({left:0},500);
    
}
function playCurrentVideo(){
    let command = {
        "event": "command",
        "func": "playVideo",
        "args":""
      };      
   $('iframe').each(function(){
      $(this)[0].contentWindow.postMessage(JSON.stringify(command), "*");
  });
}
function stopCurrentVideo(){

    let commandpause = {
          "event": "command",
          "func": "pauseVideo",
          "args": ""
        }
        $('iframe').each(function(){
             $(this)[0].contentWindow.postMessage(JSON.stringify(commandpause), "*");
        });
}

$('.left').click(previousSlide);
$('.right').click(nextSlide);

