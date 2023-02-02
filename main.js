'use strict';

//VARIABLES
const player = document.querySelector('.js-player');
const video = player.querySelector('.js-video');
const progress = player.querySelector('.js-progress');
const progressBar = player.querySelector('.js-progress-fill');
const playBtn = player.querySelector('.js-play-btn');
const skipButtons = player.querySelectorAll('.js-skip');
const ranges = player.querySelectorAll('.js-slider');
const fullScreenBtn = player.querySelector('.js-fullScreen-btn');

//FUNCTIONS

function handlePlayBtn() {
    //paused property
    const method = video.paused ? 'play' : 'pause';
    video[method]();
}

function updateBtnContent() {
    const icon = this.paused ? '►' : '❚ ❚';
    playBtn.textContent = icon;
}

//Advance or reverse video with skip buttons
function handleSkipBtn() {
    //dataset object with skip property, attribute from HTML
    //turn string into number
    video.currentTime += parseFloat(this.dataset.skip);
}

//Volume and range
function handleRangeUpdate() {
    //Hook name attribute from HTML equal to property name, volume and playback range
    video[this.name] = this.value;

}

function handleProgress() {
    //Use properties from video to obtain the percentage
    const percent = (video.currentTime / video.duration) * 100;
    progressBar.style.flexBasis = `${percent}%`;
}

function scrub(ev) {
    //If offset width 100 % then complete duration, for offsetX ?
    const scrubTime = (ev.offsetX / progress.offsetWidth) * video.duration;
    video.currentTime = scrubTime;
}

function handleFullScreenBtn(){
    player.classList.toggle('fullScreen');
}

//EVENT LISTENER
//Start or pause the video when clicking start button or video screen
playBtn.addEventListener('click', handlePlayBtn);
video.addEventListener('click', handlePlayBtn);
//Update content of play or pause button
video.addEventListener('play', updateBtnContent);
video.addEventListener('pause', updateBtnContent);
//Progress bar
video.addEventListener('timeupdate', handleProgress);
//Flag variable to control mouse event
let mousedown = false;
progress.addEventListener('click', scrub);
progress.addEventListener('mousemove', (ev) => mousedown && scrub(ev));
progress.addEventListener('mousedown', () => mousedown = true);
progress.addEventListener('mouseup', () => mousedown = false);
//Skip buttons
skipButtons.forEach(btn => btn.addEventListener('click', handleSkipBtn))
//Range inputs for volume and playback rate
ranges.forEach(range => range.addEventListener('change', handleRangeUpdate));
ranges.forEach(range => range.addEventListener('mousemove', handleRangeUpdate));
//Full screen mode
fullScreenBtn.addEventListener('click', handleFullScreenBtn);