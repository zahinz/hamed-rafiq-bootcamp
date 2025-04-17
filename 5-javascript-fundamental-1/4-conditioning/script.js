// console.log("conditioning javascript");

// check the weather, if it is raining, take an umbrella, if not, take a hat

const isRaining = false;
if (isRaining) {
  // true scope
  console.log("Take an umbrella");
} else {
  // false scope
  console.log("Take a hat");
}

// check the student grade, if the student's grade is 100, print "Congratulations!", if not, print "Try again"

const studentGrade = 99;

// common operator precedence
// 1. comparison operators
//  - "==" is equal to WE DO NOT USE THIS
//  - "===" is strictly equal to MODERN JAVASCRIPT PREFERRED
//  - "!=" is not equal to DO NOT USE THIS
//  - "!==" is strictly not equal to MODERN JAVASCRIPT PREFERRED
// - "<" is less than
// - "<=" is less than or equal to
// - ">" is greater than
// - ">=" is greater than or equal to

if (studentGrade === 100) {
  // true scope
  console.log("Congratulations!");
} else {
  // false scope
  console.log("Try again");
}

// check the student grade and classify them into A, B, C
// A is 90 and above
// B is 80 until 89
// C is 79 and below

// if the student grade is 90 and above, print "A"
// studentGrade >= 90 print "A" - 1
// if the student grade is 80 until 89, print "B"
// studentGrade >= 80 && studentGrade < 90 print "B" - 2
// if the student grade is 79 and below, print "C"
// studentGrade < 80 print "C" - 3

// && and || operator precedence
// 1. && is AND operator - both conditions must be true
// 2. || is OR operator - at least one condition must be true

const studentGrade2 = 95;

// IF ELSE IF STATEMENT
if (studentGrade2 >= 90) {
  // true for condition 1
  console.log("A");
} else if (studentGrade2 >= 80 && studentGrade2 < 90) {
  // true for condition 2
  console.log("B");
} else {
  // false for both condition 1 and condition 2
  console.log("C");
}

// SWITCH STATEMENT
// switch statement is used to evaluate a variable against multiple cases
// switch statement is more readable than if else if statement
// but it not relevant to compare range of values
// switch statement is used to compare exact values

const number = 4;
switch (number) {
  case 1:
    console.log("One");
    break;
  case 2:
    console.log("Two");
    break;
  case 3:
    console.log("Three");
    break;
  default:
    console.log("Not a number or not in the range");
    break;
}
