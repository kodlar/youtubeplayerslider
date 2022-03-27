
  var tag = document.createElement('script');
  tag.src = "https://www.youtube.com/iframe_api";
  var firstScriptTag = document.getElementsByTagName('script')[0];
  firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);


  var player;
  //ilk yüklemede bu videoyu yükle
  function onYouTubeIframeAPIReady() {
    player = ReturnPlayer('player0','-U10Z41byGk','UUyUv3WsP8WH5kRWHSTe9sug');        
  }

  function ReturnPlayer(id,videoId,playlistId)
  {
     player = new YT.Player(id, {
        height: '100%',
        width: '100%',
        videoId: videoId,
        playerVars: {
          'playsinline': 1,
          'enablejsapi' :1,
          'controls':1,
          'rel':0,
          'autoplay':1,
          'listType ':'user_uploads',
          'list':playlistId
        },
        events: {
          'onReady': onPlayerReady,
          'onStateChange': onPlayerStateChange
        }
      });
      return player;
  }

  function onPlayerReady(event) {
    //console.log(event.target.showVideoInfo());
    //console.log(event.target.playerInfo)
    $('#resTitle h1').html(event.target.playerInfo.videoData.title)
    //event.target.playVideo()
  }
  var done = false;
  function onPlayerStateChange(event) {
     //console.log(event.data);
     //console.log(event)
     $('#resTitle h1').html(event.target.playerInfo.videoData.title)
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
