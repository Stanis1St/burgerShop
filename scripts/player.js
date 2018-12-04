  // Load the IFrame Player API code asynchronously.

/*
  var player;
  function onYouTubePlayerAPIReady() {
    player = new YT.Player('yt-player', {
      height: '360',
      width: '640',
      videoId: 'iM_KMYulI_s',
      playerVars: {
        'autoplay': 0,
        'controls': 0,
        'rel': 0,
        'modestbranding': 0,
        'showinfo': 0,
    },
    events: {
         'onReady': onPlayerReady,
        // 'onStateChange': onPlayerStateChange
       }
    });
  }

player.getPlayerState():Number
  Возвращает состояние проигрывателя. Возможные значения:
  -1 – воспроизведение видео не началось
  0 – воспроизведение видео завершено
  1 – воспроизведение
  2 – пауза
  3 – буферизация
  5 – видео находится в очереди

  

$('.player__start-btn').on('click',e =>{
    const playerStatus=player.getPlayerState();



    $('.player__start').toggleClass('paused');
                                                       ///кнопка старт-стоп

    if(playerStatus!=1){
       player.playVideo(); 

    }else {
        player.pauseVideo();
 
    }
    
})


$('.player__playback').on('click',function(e) {                          
    const bar = $(this);
    //console.log(bar)
    const newBtnPos = e.pageX - bar.offset().left;
    const clickPerc = (newBtnPos/ bar.width())*100;
    percentWidth(clickPerc);

    const newPlayerTime =(player.getDuration()/100)*clickPerc;


    player.seekTo(newPlayerTime);
});



function percentWidth (percent){


    $('.player__playback-button').css({
        left:`${percent}%`
    })

}


function onPlayerReady (){
    let interval;
    const duration =player.getDuration();
    clearInterval(interval);
    interval=setInterval(()=>{
         
        const completed =player.getCurrentTime();

        const percent = (completed/duration)*100;

        percentWidth(percent);

    },900)

   

}

*/


let videoEl =document.querySelector('video');

const playBtn = $('.player__start');
let wrapeVideo=$('.player__wrapper')
//let buttonScroll = document.querySelector('.player__playback-button');
//let panelScroll =document.querySelector('.player__playback');


  playBtn.on('click', function()  {
    playVideo();
  });
  
  // play video 
  
  
    function  playVideo(){
    if (videoEl.paused) {
        videoEl.play();
      } else {
        videoEl.pause();
      }
      playBtn.toggleClass('paused');
    }

    videoEl.oncanplay = function() {
        
        let duration = videoEl.duration;
        
        videoEl.onplay = function() {
          let interval;
          clearInterval(interval);
          
          interval = setInterval(() => {
            const completed = videoEl.currentTime;
            const percent = (completed / duration) * 100;
            $('.player__playback-button').css('left', percent + '%');
          }, 100);
        }
      };

      $('.player__playback').on('click', function(e) {
        const bar = $(this);

        let newPos = e.pageX - bar.offset().left;
        const clickPerc = (newPos/ bar.width())*100;
        $('.player__playback-button').css('left',  clickPerc * 100 + '%');
          newDuration = (videoEl.duration / 100) * clickPerc;
          videoEl.currentTime = newDuration;

      });

    
/*
videoEl.addEventListener('timeupdate',function(e){


    interval = setInterval(() => {
        clearInterval(interval);
         duration = videoEl.duration;
        const completed = videoEl.currentTime;
        const percent = (completed / duration) * 100;
        buttonScroll.style.left = `${percent}%`;
   
    }, 1000);



})

*/






/*



videoEl.addEventListener('canplaythrough', function () {
    vidControls.classList.remove('hidden');
    videoEl.volume = volumeControl.value;
}, false);

playBtn.addEventListener('click', function () {
    if (videoEl.paused) {
        videoEl.play();
    } else {
        videoEl.pause();
    }
}, false);

volumeControl.addEventListener('input', function () {
         
    videoEl.volume = volumeControl.value;
}, false);


 */


