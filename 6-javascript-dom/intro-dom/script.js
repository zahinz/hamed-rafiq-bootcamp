// const html = document.querySelector("html");
// console.log(html);
// console.dir(html);

// console.log(body);
// console.dir(body);

// const fullName = prompt("What is your full name?");
// console.log(fullName);

// reassigning the innerText
// h1.innerText = "Testing 123";

// if no dot is used, it will select the first element with that tag name
const body = document.querySelector("body");
const h1 = document.querySelector("h1");
const allH1 = document.querySelectorAll("h1");
// dot is used to select class
const divClassDown = document.querySelector(".down");
const divClassUp = document.querySelector(".up");
// hashtag is used to select id
const divId = document.querySelector("#username");

console.log(allH1);

console.log(h1.innerText);

// h1.innerText = fullName ? `Hello ${fullName}` : "Hello stranger!";

// by any other way try to avoid using innerHTML because it can lead to XSS attacks
// h1.innerHTML = `<div><h2>Test DOM manipulation</h2><p>This is a test of DOM manipulation using JavaScript.</p></div>`;

// CHANGING PROPERTIES OF THE ELEMENTS OR NODE
// changing the style of the h1 element using JavaScript
console.dir(h1);
h1.style.color = "white";
h1.style.backgroundColor = "black";
h1.style.padding = "10px";
h1.style.borderRadius = "5px";
h1.style.fontSize = "2rem";
h1.style.textAlign = "center";

// changing the style using all h1 elements
// allH1 is a NodeList. NodeList can be treated like an array
allH1[0].style.color = "green";
allH1[1].style.color = "pink";
