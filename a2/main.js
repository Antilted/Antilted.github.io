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

// Music card play/pause logic
const musicCards = document.querySelectorAll(".my-music-card"); // Get all music cards

musicCards.forEach((card) => {
  const playBtn = card.querySelector(".my-music-card__play-btn");
  const likeBtn = card.querySelector(".my-music-card__like-btn");
  const audio = card.querySelector(".my-music-card__audio");
  const progress = card.querySelector(".my-music-card__progress");

  let isPlaying = false;

  playBtn.addEventListener("click", () => {
    if (!isPlaying) {
      audio.play();
      playBtn.textContent = "⏸️"; // Change to pause button
    } else {
      audio.pause();
      playBtn.textContent = "▶️"; // Change to play button
    }
    isPlaying = !isPlaying;
  });

  likeBtn.addEventListener("click", () => {
    likeBtn.textContent = likeBtn.textContent === "♡" ? "❤️" : "♡";
  });

  audio.addEventListener("timeupdate", () => {
    progress.value = (audio.currentTime / audio.duration) * 100;
  });

  progress.addEventListener("input", () => {
    audio.currentTime = (progress.value / 100) * audio.duration;
  });
});
