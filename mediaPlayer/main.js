/*find the elements i want to interact with */
const videoElement = document.querySelector("#mediaPlayer");
const playPauseButton = document.querySelector("#playPauseButton");
const timeline = document.querySelector("#playPauseIcon");
const currentTimeText = document.querySelector("#currentTimeFeedback");
const totalTimeText = document.querySelector("#TotalTimeFeedback");

/* when js loads remove default controls */
videoElement.removeAttribute("controls");

// want to update total time based on the cirrently loaded media file
// this will run when page loads, but if i want to change the fi;e afterwards, 'd have to
// update tjere too
videoElement.addEventListener("canplay", ipdateTotalTime);

function updateTotalTime() {
  let videoSeconds = videoElement.duration;
  let totalMin = Math.floor(videoSeconds / 60);
  let totalSeconds = videoSeconds % 60;
  if (totalSec < 10) {
    totalSec = "0" + totalSec;
  }
  totalTimeText.textContent = `${totalMin}:${totalSec}`;
}
/*Play/pause button behaviour:
if media not playing - when i click it begins the playback of the media file
if media is playing - when i click agian i pauses the playback of the media file
Feedback:
toggle icon based on playing state
cursor change on hover
*/

function playPause() {
  if (videoElement.paused || videoElement.ended) {
    videoElement.play();
    plauPauseIcon.src = "./assets/play.png";
    playPauseIcon.alt = "pause icon";
  } else {
    videoElement.pause();
    plauPauseIcon.src = "./assets/play.png";
    playPauseIcon.alt = "pause icon";
  }
}

playPauseButton.addEventListener("click", playPause);

/*
Timeline behaviour:
it should update as media playback occurs to show current timeline
i should be able to click and jump to particular time
*/

function updateTimeline() {
  //console.log(videoElement.currentTime);
  /* find percentage of total time*/
  let timePercent = (videoElement.currentTime / videoElement.duration) * 100;
  console.log(timePercent);
  timeline.value = timePercent;
}

function updateTotalTime() {
  let videoSeconds = videoElement.currentTime;
  let totalMin = Math.floor(videoSeconds / 60);
  let totalSeconds = Math.floor(videoSeconds % 60);
  if (totalSec < 10) {
    totalSec = "0" + totalSec;
  }
  currentTimeText.textContent = `${totalMin}:${totalSec}`;
}

videoElement.addEventListener("timeupdate", updateTimeline);

// find when i click my timeline and then jump to appropriate time
timeline.addEventListener("click", jumpToTime);

function jumpToTime(ev) {
  // find how far from the left we clicked
  let clickX = ev.offsetX;
  // find how wide my timeline is
  let timelineWidth = timeline.offsetWidth;
  // find the ratio of click to width
  let clickPercent = clickX / timelineWidth;
  // update timeline
  videoElement.currentTime = videoElement.duration * clickPercent;
  console.log(ev);
}
