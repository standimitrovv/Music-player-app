'use strict';

const body = document.querySelector('.body');

const songImg = document.querySelector('.img');
const songPerformer = document.querySelector('.app-functions__text-performer');
const songTitle = document.querySelector('.app-functions__text-song');
const songCurrentTime = document.querySelector(
  '.app-functions__duration--current'
);
let songLength = document.querySelector('.app-functions__duration--total');

const audio = document.querySelector('#audio');

let progress = document.querySelector('.app-functions__duration--progress');

const btnPrevious = document.querySelector('.btn-previous');
const btnPlay = document.querySelector('.btn-play');
const btnNext = document.querySelector('.btn-next');

const trackData = [
  {
    track: 'Gold',
    performer: 'Chet Faker',
    Image: 'gold.jpg',
    path: 'gold.mp3',
  },
  {
    track: 'Skyfall',
    performer: 'Adele',
    Image: 'skyfall.jpg',
    path: 'skyfall.mp3',
  },
  {
    track: 'No Good',
    performer: 'Kaleo',
    Image: 'nogood.jpg',
    path: 'nogood.mp3',
  },
];

let trackIndex = 0;
let isPlaying = false;

const generateRandomBackgroundColor = function () {
  const randomHex1 = Math.floor(Math.random() * 16777216).toString(16);
  const randomHex2 = Math.floor(Math.random() * 16777216).toString(16);
  body.style.backgroundImage = `linear-gradient(to right bottom, #${randomHex1}, #${randomHex2}`;
};

// Loading the track data
const loadTrack = function (trackI) {
  songTitle.textContent = trackData[trackI].track;
  songPerformer.textContent = trackData[trackI].performer;
  songImg.src = trackData[trackI].Image;
  audio.src = trackData[trackI].path;
};

// This way we always start with the first song
loadTrack(trackIndex);

const playSong = function () {
  isPlaying = true;
  btnPlay.querySelector('i.fas').classList.remove('fa-play');
  btnPlay.querySelector('i.fas').classList.add('fa-pause');
  audio.play();
};

const pauseSong = function () {
  isPlaying = false;
  btnPlay.querySelector('i.fas').classList.remove('fa-pause');
  btnPlay.querySelector('i.fas').classList.add('fa-play');
  audio.pause();
};

const playOrPauseCurrentSong = function () {
  if (!isPlaying) playSong();
  else pauseSong();
};

const playNextSong = function () {
  if (trackIndex < trackData.length - 1) trackIndex++;
  else trackIndex = 0;
  loadTrack(trackIndex);
  playSong();
  generateRandomBackgroundColor();
};

const playPreviousSong = function () {
  if (trackIndex > 0) trackIndex--;
  else trackIndex = trackData.length - 1;
  loadTrack(trackIndex);
  playSong();
  generateRandomBackgroundColor();
};

const progressTo = function () {
  let progressto = audio.duration * (progress.value / 100);

  // Set the current track position to the calculated seek position
  audio.currentTime = progressto;
};

const progressUpdate = function (e) {
  let seekPosition = 0;

  // Check if the current track duration is a number
  if (!isNaN(audio.duration)) {
    seekPosition = audio.currentTime * (100 / audio.duration);

    progress.value = seekPosition;

    let currentMinutes = Math.floor(audio.currentTime / 60);
    let currentSeconds = Math.floor(audio.currentTime - currentMinutes * 60);
    // Minutes and Seconds of the song duration
    let [minutes, seconds] = (audio.duration / 60).toFixed(2).split('.');

    if (currentSeconds < 10) currentSeconds = '0' + currentSeconds;
    if (seconds > 60) {
      seconds = seconds - 60;
      minutes++;
    }

    songCurrentTime.textContent = currentMinutes + ':' + currentSeconds;
    songLength.textContent = minutes + ':' + seconds;
  }
};

btnPlay.addEventListener('click', playOrPauseCurrentSong);

btnNext.addEventListener('click', playNextSong);

btnPrevious.addEventListener('click', playPreviousSong);

progress.addEventListener('change', progressTo);

audio.addEventListener('timeupdate', progressUpdate);

audio.addEventListener('ended', playNextSong);
