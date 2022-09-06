let playNum = 0;
const tracks = document.querySelectorAll('audio');
const cover = document.querySelector('.cover'); 
const songs = ["Don't start now", "Don't hurt yourself"];
const musicians = ["Dua Lipa", "Beyonce"];

const playBtn = document.querySelector('.play-btn');
const prevBtn = document.querySelector('.prev');
const nextBtn = document.querySelector('.next');

const progress = document.querySelector('.progress');
const progressContainer = document.querySelector('.progress_container');



let isPlay = false;

function playNext(){
  cover.classList.toggle('second');
  if(isPlay){
    playBtn.classList.remove('pause');
    isPlay = false;
    tracks[playNum].pause();
  }
  playNum++;
  if(playNum > tracks.length - 1)
  playNum = 0;
  tracks[playNum].currentTime = 0;
  playAudio();
  document.querySelector('.song').innerHTML = songs[playNum];
  document.querySelector('.musician').innerHTML = musicians[playNum];
}

function playPrev(){
  cover.classList.toggle('second');
  if(isPlay){
      playBtn.classList.remove('pause')
      isPlay = false;
      tracks[playNum].pause();

  }
  playNum--;
  if(playNum < 0)
  playNum = tracks.length - 1;
  tracks[playNum].currentTime = 0;
  playAudio();
  document.querySelector('.song').innerHTML = songs[playNum];
  document.querySelector('.musician').innerHTML = musicians[playNum];
  
}


function playAudio() {
  if(!isPlay){
  playBtn.classList.add('pause');
  isPlay = true;
  tracks[playNum].play();
  let mins = ('0' + Math.round((tracks[playNum].duration / 60))).slice(-2);
  let secs = ('0' + Math.round((tracks[playNum].duration % 60))).slice(-2);
  document.querySelector('.duration').innerHTML = mins + ":" + secs;
  updateProgress();
  }
  else {
  playBtn.classList.remove('pause')
  isPlay = false;
  tracks[playNum].pause();
  }
}

function updateProgress(){
  const duration = tracks[playNum].duration;
  const currentTime = tracks[playNum].currentTime;
  const progressPercent = (currentTime / duration) * 100;
  progress.style.width = `${progressPercent}%`
  let mins = ('0' + Math.round((currentTime / 60))).slice(-2);
  let secs = ('0' + Math.round((currentTime % 60))).slice(-2);
  document.querySelector('.current').innerHTML = mins + ":" + secs;
  }

function setProgress(e){
  const width = this.clientWidth;
  const clickX = e.offsetX;
  const duration = tracks[playNum].duration;

  tracks[playNum].currentTime = (clickX / width) * duration;
}
  
for(let item of tracks){
item.addEventListener('timeupdate', updateProgress);
}
progressContainer.addEventListener('click', setProgress)

playBtn.addEventListener('click', playAudio);
prevBtn.addEventListener('click', playPrev);
nextBtn.addEventListener('click', playNext);

for(let item of tracks){
item.addEventListener('ended', playNext);
}