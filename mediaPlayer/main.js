/*find the elements i want to interact with */
const videoElement = document.querySelector("#mediaPlayer");
const playPauseButton = document.querySelector("#playPauseButton");
const timeline = document.querySelector("#timelineProgress");

/* when js loads remove default controls */
videoElement.removeAttribute("controls");

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
    playPauseButton.textContent = "⏸";
  } else {
    videoElement.pause();
    playPauseButton.textContent = "▶";
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
videoElement.addEventListener("timeupdate", updateTimeline);
