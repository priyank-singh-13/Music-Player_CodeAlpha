let progress = document.getElementById("progress");
let song = document.getElementById("song");
let ctrlIcon = document.getElementById("ctrlIcon");

let updateTimer;
song.onloadedmetadata = function name(params) {
  progress.max = song.duration;
  progress.value = song.currentTime;
};
function playPause() {
  if (ctrlIcon.classList.contains("fa-pause")) {
    song.pause();
    ctrlIcon.classList.remove("fa-pause");
    ctrlIcon.classList.add("fa-play");
    clearInterval(updateTimer);
  } else {
    song.play();
    ctrlIcon.classList.remove("fa-play");
    ctrlIcon.classList.add("fa-pause");
    clearInterval(updateTimer);
    updateTimer = setInterval(() => {
      progress.value = song.currentTime;
    }, 500);
  }
}

progress.onchange = function () {
  song.play();
  song.currentTime = progress.value;
  ctrlIcon.classList.add("fa-pause");
  ctrlIcon.classList.remove("fa-play");
};

let currentTimeDisplay = document.getElementById("current-time");
let durationDisplay = document.getElementById("duration");

// Format seconds to MM:SS
function formatTime(time) {
  let minutes = Math.floor(time / 60);
  let seconds = Math.floor(time % 60);
  if (seconds < 10) seconds = "0" + seconds;
  return `${minutes}:${seconds}`;
}

// When metadata is loaded
song.onloadedmetadata = function () {
  progress.max = song.duration;
  progress.value = song.currentTime;
  durationDisplay.textContent = formatTime(song.duration);
};

// Inside your play section in playPause()
updateTimer = setInterval(() => {
  progress.value = song.currentTime;
  currentTimeDisplay.textContent = formatTime(song.currentTime);
}, 500);
