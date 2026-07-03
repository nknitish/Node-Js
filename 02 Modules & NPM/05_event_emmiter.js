/**
 * ===========================================
 * Node.js EventEmitter Demo
 * ===========================================
 *
 * This file demonstrates:
 *
 * 1. Creating an EventEmitter
 * 2. Registering an Event Listener (on)
 * 3. Emitting an Event (emit)
 * 4. Passing Arguments
 * 5. Multiple Listeners
 * 6. once()
 * 7. Removing Listeners (off)
 * 8. listenerCount()
 * 9. eventNames()
 */

import EventEmitter from "node:events";

// Create EventEmitter instance
const emitter = new EventEmitter();

console.log("\n=================================");
console.log("1. Basic Event");
console.log("=================================");

/**
 * Register a listener
 */
emitter.on("greet", () => {
  console.log("Hello Nitish 👋");
});

/**
 * Emit the event
 */
emitter.emit("greet");

console.log("\n=================================");
console.log("2. Passing Arguments");
console.log("=================================");

function printUser(name, age) {
  console.log(`Name : ${name}`);
  console.log(`Age  : ${age}`);
}

emitter.on("userCreated", printUser);

emitter.emit("userCreated", "Nitish", 25);

console.log("\n=================================");
console.log("3. Multiple Listeners");
console.log("=================================");

emitter.on("orderPlaced", () => {
  console.log("📧 Email Sent");
});

emitter.on("orderPlaced", () => {
  console.log("🧾 Invoice Generated");
});

emitter.on("orderPlaced", () => {
  console.log("📦 Inventory Updated");
});

emitter.emit("orderPlaced");

console.log("\n=================================");
console.log("4. once()");
console.log("=================================");

emitter.once("login", () => {
  console.log("User Logged In (Only Once)");
});

emitter.emit("login");
emitter.emit("login");
emitter.emit("login");

console.log("\n=================================");
console.log("5. Removing Listener");
console.log("=================================");

function welcome(name) {
  console.log(`Welcome ${name}`);
}

emitter.on("signup", welcome);

console.log("Before removing listener:");
emitter.emit("signup", "Nitish");

emitter.off("signup", welcome);

console.log("After removing listener:");
emitter.emit("signup", "Nitish");

console.log("\n=================================");
console.log("6. Listener Count");
console.log("=================================");

console.log("Listeners for orderPlaced:", emitter.listenerCount("orderPlaced"));

console.log("\n=================================");
console.log("7. Registered Events");
console.log("=================================");

console.log(emitter.eventNames());

console.log("\n=================================");
console.log("Program Finished");
console.log("=================================");
