// jQuery
(function ($) {

  "use strict";

    // PRE LOADER
    $(window).load(function() {
      $('.preloader').fadeOut(1000); // set duration in brackets    
    });

    // BACKGROUND SLIDER
    $('body').vegas({
        slides: [
            { src: 'images/slides/1.jpg'  },
            { src: 'images/slides/2.jpg'  },
            { src: 'images/slides/3.jpg'  },
            { src: 'images/slides/5.jpg'  },
            { src: 'images/slides/6.jpg'  },
            { src: 'images/slides/7.jpg'  },
            { src: 'images/slides/8.jpg'  },
            { src: 'images/slides/10.jpg'  },
            { src: 'images/slides/12.jpg'  },
            { src: 'images/slides/13.jpg'  },
        ],
        delay: 7000, // delay between slide transition
        timer: false, // disable timer
        shuffle: false, // shuffle images
        firstTransition: 'fade', // fade into first slide
        firstTransitionDuration: 5000, // ^ lasts five seconds
        transition: 'blur', // blur transition for rest of slides
        transitionDuration: 2000 // ^ lasts two seconds
    });

    // MUSIC
    $('#music').prop('volume', 0.1); // set music volume

    // MUSIC INTERACTION EVENT
    $(document).one('click', function() {
      $('#track-selector').css({'display': ''});
      startPlayer();
    });

    // PARALLAX
    /*$('.home-info').tilt({
      maxTilt: 20, // max tilt
      scale: 1.3, // zoom scale
      perspective: 700, // tilt agressiveness
      speed: 3000, // enter/exit anim speed
    });*/
})(jQuery);

// COPY DISCORD TO CLIPBOARD
function copyDiscord() {
  navigator.clipboard.writeText('purple.team');
  alert('Copied! purple.team');
}

// MUSIC PLAYER
const song_locations = [
  'music/Righteous.mp3',
  'music/fly_me_to_the_moon_lofi_cover.mp3',
  'music/powfu_death_bed.mp3',
  'music/d4vd_romantic_homicide.mp3'
];
const song_titles = [
  'Mo Beats - Righteous',
  'Frank Sinatra - Fly Me To The Moon (Lofi Cover)',
  'Powfu - Death Bed',
  'd4vd - Romantic Homicide'
];
let currentSongIndex = 0;
let now_playing = document.getElementById('now-playing');
let music = document.getElementById('music');

function playNextSong() {
  // don't skip into oblivion
  if (!(currentSongIndex < song_locations.length)) {
    return;
  }

  // set now playing
  now_playing.innerHTML = '<h4><b>Now Playing:</b> ' + song_titles[currentSongIndex] + '</h4>';

  // replay animation
  now_playing.style.animation = 'none';
  now_playing.offsetHeight;
  now_playing.style.animation = null;

  // play song
  music.src =  song_locations[currentSongIndex];
  music.currentTime = 0;
  music.play();
  currentSongIndex++;
};

function playPrevSong() {
  // don't skip into oblivion
  if (currentSongIndex == 1) {
    return;
  }

  // set now playing
  now_playing.innerHTML = '<h4><b>Now Playing:</b> ' + song_titles[currentSongIndex-=2] + '</h4>';

  // replay animation
  now_playing.style.animation = 'none';
  now_playing.offsetHeight;
  now_playing.style.animation = null;

  // play song
  music.src =  song_locations[currentSongIndex];
  music.currentTime = 0;
  music.play();
  currentSongIndex++;
};

function playPauseSong() {
  if (!music.paused) {
    music.pause();
  } else {
    music.play();
  }
}

function startPlayer() {
  if (song_locations.length) {  
    playNextSong();

    music.addEventListener('ended', function() {
      if (currentSongIndex < song_locations.length) {
        playNextSong();
      }
    });
  }
}
