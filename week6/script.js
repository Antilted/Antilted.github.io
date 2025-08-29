// we can use window to find certain properties
let windowWith = window.innerWidth;
console.log(windowWith);
// find url location
console.log(window.location);
// document can use to find html elements
console.log(document.title);
// set the title
// document.title = "new title";
// find the body
// document.body.style.backgroundColor = "red";
// navigator can find more details of hardware/software
// console.log(window.navigator.userAgent);

const myImage = document.querySelector("#myImage");

console.log(myImage);

const helloParagraph = document.querySelector("#hello");

const myParagraphs = document.querySelectorAll("p");

console.log("myParagraphs");

myParagraphs.forEach(changeParaBG);

function changeParaBG(item) {
  console.log(item);
  item.style.backgroundColor = "red";
}

console.log(helloParagraph.textContent);

function updateCatName() {
  helloParagraph.textContent = `Hi my name is ${myImage.dataset.catname}`;
  // classList.add() adds a class
  // classList.remove() removes a class
  // classList.toggle() toggles a class
  myImage.classList.toggle("round");
}

// find outer section
const outerSection = document.querySelector(".outer");

const myButton = document.querySelector("#my-button");

// add event listener
myButton.addEventListener("click", function () {
  alert("button is clicked");
});
// could be written as an arrow function
// () => {}
// create element using document methods
const newPara = document.createElement("p");
newPara.textContent = "im a new paragraph";
newPara.classList.add("coral-box");
document.body.appendChild(newPara);
// outerSection.appendChild(newPara);
myButton.appendChild(newPara);
//
console.log(newPara);

// add new element to header
const myHeader = document.querySelector("header");
// find my cat name
let catName = myImage.dataset.catname;
myHeader.innerHTML += `<h2>I think ${catName} they're cool`;

// += works for maths too
let x = 0;
x = x + 2;
x = x += 4;

// add mouseenter eventlistener to img
myImage.addEventListener("mouseleave", addRoundClass);

function addRoundClass() {
  myImage.classList.remove("round");
}
