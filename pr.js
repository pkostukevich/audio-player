let playNum = 0;
const tracks = document.querySelectorAll('audio');

const playBtn = document.querySelector('.play-btn');
const prevBtn = document.querySelector('.prev');
const nextBtn = document.querySelector('.next');

let isPlay = false;

function playNext(){
  if(isPlay){
    playBtn.classList.remove('pause')
    isPlay = false;
    tracks[playNum].pause();
  }
  playNum++;
  if(playNum > tracks.length - 1)
  playNum = 0;
  playAudio();
}

function playPrev(){
  if(isPlay){
      playBtn.classList.remove('pause')
      isPlay = false;
      tracks[playNum].pause();
  }
  playNum--;
  if(playNum < 0)
  playNum = tracks.length - 1;
  playAudio();
}


function playAudio() {
  if(!isPlay){;
  playBtn.classList.add('pause');
  isPlay = true;
  tracks[playNum].currentTime = 0;
  tracks[playNum].play();
  }
  else {
  playBtn.classList.remove('pause')
  isPlay = false;
  tracks[playNum].pause();
  }
}

playBtn.addEventListener('click', playAudio);
prevBtn.addEventListener('click', playPrev);
nextBtn.addEventListener('click', playNext);

