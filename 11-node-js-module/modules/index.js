const constants = require("./constant");
const formulas = require("./math");
const users = require("./users");

console.log(`The value of pi is ${constants.pi}`);
console.log(`The speed of light is ${constants.speedOfLight}`);
console.log(`The acceleration due to gravity is ${constants.gravity}`);

console.log(`Sum of 5 and 3 is ${formulas.sum(5, 3)}`);
console.log(`Difference of 5 and 3 is ${formulas.subtract(5, 3)}`);
console.log(`Product of 5 and 3 is ${formulas.multiply(5, 3)}`);
console.log(`Quotient of 5 and 3 is ${formulas.divide(5, 3)}`);

console.log("List of users:");
users.forEach((user) => {
  console.log(
    `Name: ${user.name}, Age: ${user.age}, Location: ${user.location}`
  );
});
console.log(`Total number of users: ${users.length}`);
