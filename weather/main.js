// find my elements
const appBody = document.querySelector("body");
const tempInput = document.querySelector("#tempInput");
const tempReturnText = document.querySelector("#tempReturn");
function interpretTemp() {
  //   console.log(tempInput.value);
  let inputTemp = tempInput.value;
  if (inputTemp < 10) {
    tempReturnText.textContent = "Cold ahhh";
    appBody.style.backgroundColor = "skyblue";
  } else if (inputTemp < 18) {
    tempReturnText.textContent = "ice cream level";
    appBody.style.backgroundColor = "blue";
  } else if (inputTemp < 26) {
    tempReturnText.textContent = "Mild";
    appBody.style.backgroundColor = "yellow";
  } else if (inputTemp < 30) {
    tempReturnText.textContent = "cold roasted chicken";
    appBody.style.backgroundColor = "tomato";
  } else {
    tempReturnText.textContent = "I let the world burn";
    appBody.style.backgroundColor = "red";
  }
  // temp 0-10: Cold ahhh
  // temp 10-18: ice cream level
  // temp 18-26: Mild
  // temp 26 - 30: cold roasted chicken
  // temp 30 + :I let the world burn
}
// this is a function call
// interpretTemp();
