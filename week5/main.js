// variables
const documentBody = document.querySelector("body");
console.log(documentBody);
const myName = "Alan";
let myHungriness = 0.3;
console.log(myHungriness);
myHungriness = 0.5;
console.log(myHungriness);

// console.log() sends message to browser console
console.log("You dumb bih");

let stepNumber = 4;
console.log("Taking Step:", stepNumber, "...hehe");

// let name = prompt("Whats your name?");

// strings
let firstName = "Alan";
let surName = "Chau";
let quote = "This is a 'quote'";
console.log(quote);
let nameString = `My full name is ${firstName} ${surName}`;
console.log(nameString);

// type conversion
let myAge = 18;
let timePass = "5";
let updatedAge = myAge + parseInt(timePass);

// math operators + - + / *

console.log(updatedAge);

// arrays
let myPets = ["spot", "Bones", "Lmfao", "Burrito"];

console.log(myPets);
console.log(myPets.length);

// conditionals
if (myAge < 40) {
  documentBody.style.backgroundColor = "red";
} else {
  documentBody.style.backgroundColor = "blue";
}

let hiddenVariable = "?";

/// functions
function tellMeHowHungryIAm() {
  console.log("Im not sure");
}

console.log(hiddenVariable);
