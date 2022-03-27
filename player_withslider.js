

$( document ).ready(function() {
    console.log( "ready!" );
     $('.play-button').trigger("click");
   
  //   let command = {
  //       "event": "command",
  //       "func": "playVideo",
  //       "args":""
  //     };      
  //   $('iframe').each(function(){
  //      $(this)[0].contentWindow.postMessage(JSON.stringify(command), "*");
  //  });
   
});

$('.play-button').on('click', function () {
    $(this).hide();
    $(this).parent().fadeOut();
    //console.log( $(this).parent().siblings('.slider-video')[0]);  
    //$(this).parent().siblings('.slider-video')[0].play();
});


// Additionnal code for the slider
var pos = 0,
    slides = $('.slide'),
    numOfSlides = slides.length;
    //console.log(numOfSlides);

function nextSlide(){
    console.log('next slide clicked')
    stopCurrentVideo();
    console.log(slides.eq(pos));
    slides.eq(pos).animate({left:'-100%'},500);
    pos = pos >= numOfSlides-1 ? 0 : ++pos;
    console.log(pos);
    slides.eq(pos).css({left:'100%'}).animate({left:0},500);   
    // var dataId = $('.slide').attr("data-id"); 
    // console.log(dataId); 
    readNextVideo(pos)
}

function previousSlide(){
    console.log('previous slide clicked')
    stopCurrentVideo();
    slides.eq(pos).animate({left:'100%'},500);
    pos = pos == 0 ? numOfSlides-1 : --pos;
    console.log(pos);
    slides.eq(pos).css({left:'-100%'}).animate({left:0},500);
    // var dataId = $('.slide').attr("data-id"); 
    // console.log(dataId); 
    readNextVideo(pos)
}

function playCurrentVideo(player){
    let command = {
        "event": "command",
        "func": "playVideo",
        "args":""
      };      
    if(player != undefined)
    {
        player.h.contentWindow.postMessage(JSON.stringify(command), "*")
    }
}
//Playlistimiz
const youtubeIds = ["-U10Z41byGk","zBY5bVTxOAw", "8ZspunA4HlM"];

function readNextVideo(data)
{
    $('#resconsole').html(data)
    var videoId = youtubeIds[data]    
    player = ReturnPlayer('player'+data,videoId);    
   playCurrentVideo(player);

   /* let commandpause = {
        "event": "command",
        "func": "pauseVideo",
        "args": ""
      }
    $("#"+data+"iframe").each(function(){
        console.log(this);
       // $(this)[0].contentWindow.postMessage(JSON.stringify(commandpause), "*");
   });
  */
}

function stopCurrentVideo(){
    //stopVideo();
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



  // 2. This code loads the IFrame Player API code asynchronously.
  var tag = document.createElement('script');

  tag.src = "https://www.youtube.com/iframe_api";
  var firstScriptTag = document.getElementsByTagName('script')[0];
  firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

  // 3. This function creates an <iframe> (and YouTube player)
  //    after the API code downloads.
  var player;
  //ilk yüklemede bu videoyu yükle
  function onYouTubeIframeAPIReady() {
    player = ReturnPlayer('player0','-U10Z41byGk');        
  }


  function ReturnPlayer(id,videoId)
  {
     player = new YT.Player(id, {
        height: '390',
        width: '640',
        videoId: videoId,
        playerVars: {
          'playsinline': 1,
          'enablejsapi' :1,
          'controls':1,
          'rel':0,
          'autoplay':1,
          //'listType ':'user_uploads',
          //'list':'UUyUv3WsP8WH5kRWHSTe9sug'
        },
        events: {
          'onReady': onPlayerReady,
          'onStateChange': onPlayerStateChange
        }
      });
      return player;
  }

  // 4. The API will call this function when the video player is ready.
  function onPlayerReady(event) {
      //console.log(event.target.showVideoInfo());
    console.log(event.target.playerInfo)
    $('#resTitle').html(event.target.playerInfo.videoData.title)
    //event.target.playVideo()
  }

  // 5. The API calls this function when the player's state changes.
  //    The function indicates that when playing a video (state=1),
  //    the player should play for six seconds and then stop.
  var done = false;
  function onPlayerStateChange(event) {
      console.log(event.data);
     console.log(event)
     $('#resTitle').html(event.target.playerInfo.videoData.title)
    // if (event.data == YT.PlayerState.PLAYING && !done) {
    //   setTimeout(stopVideo, 6000);
    //   done = true;
    // }
  }
  function stopVideo() {
    if(player != undefined)
      {
        player.stopVideo();
    }


  }
