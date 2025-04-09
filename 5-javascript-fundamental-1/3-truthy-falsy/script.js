// boolean is a primitive data type
// true and false are boolean values

let isTrue = true;
let isFalse = false;

console.log(isTrue); // true
console.log(Boolean(isTrue)); // true
console.log(typeof isTrue); // boolean
console.log(isFalse); // false
console.log(Boolean(isFalse)); // false
console.log(typeof isFalse); // boolean

// truthy and falsy values
// falsy values: false, 0, "", null, undefined, NaN

// 1. numbers
// 0 is falsy
let age = 0; // falsy
console.log(age);
console.log(typeof age); // number
console.log(Boolean(age));

let age2 = 1; // truthy
console.log(age2);
console.log(typeof age2); // number
console.log(Boolean(age2));

// 2. strings
// "" is falsy
let name = ""; // falsy
console.log(name);
console.log(typeof name); // string
console.log(Boolean(name));
let name2 = "John"; // truthy
console.log(name2);
console.log(typeof name2); // string
console.log(Boolean(name2));

// 3. Null, undefined, and NaN
let name3 = null; // falsy
console.log(name3);
console.log(typeof name3); // object
console.log(Boolean(name3));
let name4; // undefined
console.log(name4);
console.log(typeof name4); // undefined
console.log(Boolean(name4));
let name5 = NaN; // falsy
console.log(name5);
console.log(typeof name5); // number
console.log(Boolean(name5));
