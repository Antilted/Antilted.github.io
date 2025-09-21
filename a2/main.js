// Note that i chose to do the right hand side of a piano rather than the full piano because saving and labeling the music notes in can be quite messy and confusing for me
//  This code creates an interactive virtual piano that can be played with both mouse clicks and keyboard keys.
// Each piano key element is linked to an audio file through a data-note attribute, and pressing a key (either on the screen
// or via mapped keyboard keys like z, x, c for white keys and s, d, g for black keys) triggers the corresponding sound. When a note is played, the audio restarts from the beginning to allow rapid pressing,
// and the key is visually highlighted with an "active" class until the sound finishes. This provides both audio feedback (the note sound) and visual feedback (key animation), making the piano feel responsive and realistic.
const WHITE_KEYS = ["z", "x", "c", "v", "b", "n", "m"];
const BLACK_KEYS = ["s", "d", "g", "h", "j"];

const keys = document.querySelectorAll(".key");
const whiteKeys = document.querySelectorAll(".key.white");
const blackKeys = document.querySelectorAll(".key.black");

keys.forEach((key) => {
  key.addEventListener("click", () => playNote(key));
});

document.addEventListener("keydown", (e) => {
  if (e.repeat) return;
  const key = e.key;
  const whiteKeyIndex = WHITE_KEYS.indexOf(key);
  const blackKeyIndex = BLACK_KEYS.indexOf(key);

  if (whiteKeyIndex > -1) playNote(whiteKeys[whiteKeyIndex]);
  if (blackKeyIndex > -1) playNote(blackKeys[blackKeyIndex]);
});

function playNote(key) {
  const noteAudio = document.getElementById(key.dataset.note);
  noteAudio.currentTime = 0;
  noteAudio.play();
  key.classList.add("active");
  noteAudio.addEventListener("ended", () => {
    key.classList.remove("active");
  });
}

// This code makes a bunch of music cards on a page work like mini music players. Each card has its own play button,
// like button, progress bar, and audio track. When you hit play, it first stops any other songs that might be playing,
// so only one track runs at a time. The play button switches between ▶️ and ⏸️ depending on whether the song is
// playing or paused. The like button just flips between a white heart 🤍 and a red heart ❤️ whenever you click it.
// The progress bar moves along as the song plays, and you can also drag it to skip to a different part of the track.
// Basically, it’s a simple setup for interactive music cards that feel like little Spotify-style players.
// Music card play/pause logic
const musicCards = document.querySelectorAll(".my-music-card"); // Get all music cards

// Function to stop all music cards
function stopAllMusic() {
  musicCards.forEach((card) => {
    const audio = card.querySelector(".my-music-card__audio");
    const playBtn = card.querySelector(".my-music-card__play-btn");

    audio.pause();
    audio.currentTime = 0; // Reset to the start of the track
    playBtn.textContent = "▶️"; // Reset play button to play icon
  });
}

musicCards.forEach((card) => {
  const playBtn = card.querySelector(".my-music-card__play-btn");
  const likeBtn = card.querySelector(".my-music-card__like-btn");
  const audio = card.querySelector(".my-music-card__audio");
  const progress = card.querySelector(".my-music-card__progress");

  let isPlaying = false;

  // Play/Pause button part
  playBtn.addEventListener("click", () => {
    // This here stop all other music tracks before playing the current one
    stopAllMusic();
    // For the play/pause and heart icons I have taken them from this website: https://getemoji.com
    if (!isPlaying) {
      audio.play();
      playBtn.textContent = "⏸️"; // Change to pause button
    } else {
      audio.pause();
      playBtn.textContent = "▶️"; // Change to play button
    }

    isPlaying = !isPlaying;
  });

  // THe simple like button functionality
  likeBtn.addEventListener("click", () => {
    likeBtn.textContent = likeBtn.textContent === "🤍" ? "❤️" : "🤍";
  });

  // Updating progress bar
  audio.addEventListener("timeupdate", () => {
    progress.value = (audio.currentTime / audio.duration) * 100;
  });

  // This here change audio position when user interacts with progress bar
  progress.addEventListener("input", () => {
    audio.currentTime = (progress.value / 100) * audio.duration;
  });
});
