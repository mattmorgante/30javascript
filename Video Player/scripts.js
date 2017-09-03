// get the elements
const player = document.querySelector('.player');
const video = player.querySelector('.viewer');
const progress = player.querySelector('.progress');
const progressBar = player.querySelector('.progress__filled');
const toggle = player.querySelector('.toggle');
const skipButtons = player.querySelectorAll('[data-skip]');
const ranges = player.querySelectorAll('.player__slider');

// functionality

function togglePlay() {
    if (video.paused) {
        video.play();
    } else {
        video.pause();
    }
}

function updateButton() {
    // THIS is the video element
    const icon = this.paused ? '►' : '❚ ❚';
    // toggle class on the play button
    toggle.textContent = icon;
}

function skip () {
    // anything with a data-skip attribute
    console.log(this.dataset);
    video.currentTime += parseFloat(this.dataset.skip);
}

function handleRangeUpdate() {
    // name is either playback rate or volume
    // value is grabbed from the slider
    video[this.name] = this.value;
    console.log(this.name);
    console.log(this.value);
}

// when the video has the event timeupdate
// update the progress bar with the percent of the total time that has passed
// use that percent to update the style
function handleProgress() {
    console.log(video.currentTime);
    // times 100 to get percentage
    const percent = (video.currentTime / video.duration) * 100;
    // flexBasis is CSS, basically width in flexbox
    progressBar.style.flexBasis = `${percent}%`;
}

// when you click on the video progress bar
// move the video length % to the width at which the click was made
function scrubProgressBar(e) {
    // event gives us an OFFSET X
    console.log(e)
    // percentage * length of video
    // 50% * 6 minutes = move to 3 minutes
    const scrubtime = (e.offsetX / progress.offsetWidth) * video.duration;
    video.currentTime = scrubtime;
}

// event listeners
video.addEventListener('click', togglePlay);
// triggered every time
video.addEventListener('play', updateButton);
video.addEventListener('pause', updateButton);
video.addEventListener('timeupdate', handleProgress);
toggle.addEventListener('click', togglePlay);
skipButtons.forEach(button => button.addEventListener('click', skip));
ranges.forEach(range => range.addEventListener('change', handleRangeUpdate));
ranges.forEach(range => range.addEventListener('mousemove', handleRangeUpdate));

// listen for a mousemove event, but only run the function when something is clicked on
let mousedown = false;
progress.addEventListener('click', scrubProgressBar);
// when someone moves their mouse, run scrub BUT only when mousedown is true
// if mousedown is false, will just return and not run
progress.addEventListener('mousemove', (e) => mousedown && scrubProgressBar(e));
progress.addEventListener('mousedown', () => mousedown = true);
progress.addEventListener('mouseup', () => mousedown = false);