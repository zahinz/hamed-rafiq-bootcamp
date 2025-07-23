// core module in node.js
const crypto = require("node:crypto");

const randomIntiger = crypto.randomInt(1, 100);
console.log("Random Integer:", randomIntiger);
const randomUUID = crypto.randomUUID();
console.log("Random UUID:", randomUUID);
