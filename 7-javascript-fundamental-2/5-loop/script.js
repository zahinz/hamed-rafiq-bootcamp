console.log("Looping through an array of numbers");

// what is an array?
// an array is a collection of items
// the array is establish with square bracker [ and end with ]
// the item inside the array is called element
// the position of the element is called index
// the first element is at index 0

// array of numbers
// has 5 elements
// element 1 is at index 0
const numbers = [1, 2, 3, 4, 5, 6, 9];

// array of strings
// has 4 elements
const animals = ["cat", "dog", "fish", "bird", "elephant"];

// get an element from an array
// use the index to get the element
const firstNumber = numbers[0];
console.log(firstNumber); // 1

// get the length of an array
// use the length property to get the length of the array
const numbersLength = numbers.length;
console.log(numbersLength); // 5

// get the last element of an array
// use the length property to get the last element of the array
const lastNumber = numbers[numbersLength - 1];
console.log(lastNumber); // 7

// iterate through an array
// use a for loop to iterate through the array

// 1. FOR LOOP

// HARD CODED
// manual iteration
// const sentence1 = "I love " + animals[0];
// console.log(sentence1); // I love cat
// const sentence2 = "I love " + animals[1];
// console.log(sentence2); // I love dog
// const sentence3 = "I love " + animals[2];
// console.log(sentence3); // I love fish
// const sentence4 = "I love " + animals[3];
// console.log(sentence4); // I love bird

// DYNAMIC'
// first let i=0, means start from the first element
// second i < animals.length, means stop when i is equal to the length of the array
// third i++, means add 1 to i, increment i by 1 for each iteration
for (let i = 0; i < animals.length; i++) {
  const element = animals[i];
  console.log("I hava a " + element);
}

// WHILE LOOP
// while loop is used when you don't know how many times to loop

let i = 0; // start from the first element
// stop when i is equal to the length of the array
// increment i by 1 for each iteration
// i < animals.length is the condition to stop the loop
// i++ is the increment
// while loop will run until the condition is false
while (i < animals.length) {
  const element = animals[i];
  console.log("I hava a " + element);
  i++;
}

// create an interesting * pattern

// create a left sided right angled triangle
// *
// **
// ***
// ****
// *****
// ******

// nested loop
// outer loop is for the number of rows
// inner loop is for the number of columns
// i will increment in 1 unit after complete the j loop
for (let i = 1; i <= 6; i++) {
  let pattern = "";
  for (let j = 1; j <= i; j++) {
    pattern += "*";
  }
  console.log(pattern);
}
