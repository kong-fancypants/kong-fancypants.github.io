

var tag = document.createElement('script');

      tag.src = "https://www.youtube.com/iframe_api";
      var firstScriptTag = document.getElementsByTagName('script')[0];
      firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);


      var tv;
      function onYouTubeIframeAPIReady() {
        tv = new YT.Player('tv', {
          height: '9',
          width: '16',

          playerVars: {
            'controls': 0,           
            'showinfo': 0,
            'rel': 0,
            'loop': 1

          },
          videoId: 'xg5t1iN5TEE',
          events: {
            'onReady': onPlayerReady,
            'onStateChange': onPlayerStateChange
          }
        });
      }
function onPlayerReady(event) {
    if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) 
    {
      $('.tv').empty();
      $('.tv').addClass('mobile-bg');
    }
    else
    { 
      event.target.setLoop(true);
      event.target.playVideo();
      tv.mute();
    }
    
  }

function onPlayerStateChange(event){
    if (event.data === YT.PlayerState.ENDED) {
        tv.playVideo(); 
    }
    else if (event.data == YT.PlayerState.PLAYING && !$('#tv').hasClass('active-trailer'))
    {
      $('#tv').addClass('active-trailer');
    }
}

function vidRescale(){

  var w = $(window).width(),
    h = $(window).height();

  if (w/h > 16/9){
    tv.setSize(w, w/16*9);
    /*$('.tv .screen').css({'left': '0px'});*/
  } else {
    tv.setSize(h/9*16, h);
    /*$('.tv .screen').css({'left': -($('.tv .screen').outerWidth()-w)/2});*/
  }
}

$(window).on('load resize', function(){
  vidRescale();
});

$('.hi').on('click', function(){
  $('#tv').toggleClass('mute');
  $('.hi em:first-of-type').toggleClass('hidden');
  if($('#tv').hasClass('mute')){
    tv.mute();
  } else {
    tv.unMute();
  }
});