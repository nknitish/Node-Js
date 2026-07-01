//

console.log(process.platform);

// Read command line arguments
// node 01_process.js Nitish React 5
console.log(process.argv);
console.log(process.argv[2]); // Nitish

// Enviorment

console.log(process.env);

// Access and use environment variables
// PORT=5000 node 01_process.js
console.log("Port", process.env.PORT);
