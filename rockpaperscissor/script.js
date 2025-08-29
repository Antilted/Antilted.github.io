// keep track of possible selections
const options = ["ROCK", "PAPER", "SCISSORS"];
const rockButton = document.querySelector("#rock-button");
const paperButton = document.querySelector("#paper-button");
const scissorsButton = document.querySelector("#scissors-button");
// find selection and result sections
const selection = document.querySelector("#selection");
const result = document.querySelector("#result");

// write event listeners for user selection
// when they click we want to send the correct array index
rockButton.addEventListener("click", function () {
  checkResult(0);
});
paperButton.addEventListener("click", function () {
  checkResult(1);
});
scissorsButton.addEventListener("click", function () {
  checkResult(2);
});
function checkResult(mySelection) {
  let userSelection = options[mySelection];
  console.log(mySelection);
  // find computer selection
  // random select generates random number between 0 - 1, then multiplies by 3, then rounds down
  randomSelect = Math.floor(Math.random() * 3);
  console.log(randomSelect);
  let computerSelection = options[randomSelect];
  // display both user and computers selection in the DOM
  selection.innerHTML = `
    <p id="my-choice">
    <span class="${userSelection.toLocaleLowerCase()}">You picked: ${userSelection} </span>
    </p>

     <p id="computer-choice">
    <span class="${computerSelection.toLocaleLowerCase()}">Computer picked: ${computerSelection} </span>
    </p>
    `;
  if (userSelection === computerSelection) {
    // this happens if there is a tie
    result.innerHTML = `<p class="tie"> It was a tie :| </p>`;
  } else if (
    (userSelection === "ROCK" && computerSelection === "SCISSORS") ||
    (userSelection === "PAPER" && computerSelection === "ROCK") ||
    (userSelection === "SCISSORS" && computerSelection === "PAPER")
  ) {
    // this happens if you win
    result.innerHTML = `<p class="win"> Winner winner chicken dinner :| </p>`;
  } else {
    // this happens if i lose
    result.innerHTML = `<p class="lose"> ur dumb :| </p>`;
  }
}
