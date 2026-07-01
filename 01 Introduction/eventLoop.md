The **Event Loop** is the most important concept in Node.js. It explains how Node handles many requests with a single-threaded JavaScript runtime.

# What is the Event Loop?

- The Event Loop checks whether the JavaScript Call Stack is empty.
- If the stack is empty, it moves ready async callbacks into the Call Stack.

Main responsibilities:

- Execute JavaScript on the main thread
- Keep the app responsive
- Process completed async operations

# High-Level Architecture

```text
JavaScript code
   │
   ▼
Call stack
   │
   ▼
Node APIs / libuv
   │
   ▼
Async operation (timer, file, network)
   │
   ▼
OS / thread pool
   │
   ▼
Operation completes
   │
   ▼
Ready callback queues
   │
   ▼
Event loop
   │
   ▼
Call stack
```

# Components

## 1. Call Stack

- Runs synchronous JavaScript
- Only one function executes at a time

Example:

```js
function c() {
  console.log("C");
}

function b() {
  c();
}

function a() {
  b();
}

a();
```

Call stack flow:

- a()
- b()
- c()
- console.log()

## 2. Async APIs

When JavaScript sees an async call like:

```js
fs.readFile("data.txt", callback);
```

- JavaScript does not read the file directly
- Node passes the operation to `libuv`
- The call stack is freed immediately

Flow:

- JS
- libuv
- OS / thread pool

## 3. Callback Queues

- Completed async operations place callbacks into queues
- Node uses multiple queues with different priorities

# Event Loop Phases

The Event Loop runs in a cycle through these phases:

- Timers
- Pending callbacks
- Idle / prepare
- Poll
- Check
- Close callbacks

# Phase 1: Timers

- Runs callbacks for `setTimeout(...)` and `setInterval(...)`

Example:

```js
setTimeout(() => {
  console.log("Timer");
}, 1000);
```

# Phase 2: Pending Callbacks

- Executes some system-level callbacks
- Most code does not interact with this phase directly

# Phase 3: Idle / Prepare

- Internal Node phase used before polling for I/O

# Phase 4: Poll

- Receives completed I/O events
- Executes I/O callbacks
- Waits for new I/O if nothing else is ready

Example:

```js
fs.readFile("test.txt", () => {
  console.log("File Read");
});
```

# Phase 5: Check

- Runs callbacks scheduled with `setImmediate(...)`

Example:

```js
setImmediate(() => {
  console.log("Immediate");
});
```

# Phase 6: Close Callbacks

- Runs callbacks like `socket.on('close', ...)`

# Where do Promises fit?

- Promises use the microtask queue
- Microtasks run after the current JavaScript finishes
- Microtasks run before the Event Loop moves to the next phase

Example:

```js
console.log(1);

Promise.resolve().then(() => {
  console.log(2);
});

console.log(3);
```

Output:

```text
1
3
2
```

# Node's `process.nextTick()`

- `process.nextTick()` has higher priority than Promises

Example:

```js
process.nextTick(() => console.log("nextTick"));

Promise.resolve().then(() => console.log("Promise"));

console.log("Hello");
```

Output:

```text
Hello
nextTick
Promise
```

Priority (simplified):

- Current JavaScript
- `process.nextTick` queue
- Promise microtask queue
- Event Loop phase

# Complete Example

```js
const fs = require("fs");

console.log("Start");

setTimeout(() => console.log("Timeout"), 0);

setImmediate(() => console.log("Immediate"));

Promise.resolve().then(() => console.log("Promise"));

process.nextTick(() => console.log("nextTick"));

fs.readFile(__filename, () => {
  console.log("File");
});

console.log("End");
```

Possible output:

```text
Start
End
nextTick
Promise
Timeout
Immediate
File
```

Note:

- `setTimeout(..., 0)` and `setImmediate()` order is not guaranteed in every case
- Inside an I/O callback, `setImmediate()` usually runs before `setTimeout(..., 0)`

Example:

```js
const fs = require("fs");

fs.readFile(__filename, () => {
  setTimeout(() => console.log("timeout"), 0);
  setImmediate(() => console.log("immediate"));
});
```

Output:

```text
immediate
timeout
```

# How the Event Loop thinks

A simplified view:

```text
while (application is running) {
  process timers
  process pending callbacks
  process idle / prepare
  poll for I/O
  process check callbacks
  process close callbacks
}
```

    Execute synchronous JavaScript

    Process process.nextTick queue

    Process Promise microtask queue

    Run Timers phase

    Process nextTick and microtasks

    Run Pending Callbacks

    Process nextTick and microtasks

    Run Poll phase

    Process nextTick and microtasks

    Run Check phase

    Process nextTick and microtasks

    Run Close Callbacks

    Process nextTick and microtasks

}

```

This isn't the exact implementation, but it's a good mental model.

---

# Interview Definition

> **The Node.js Event Loop is a mechanism implemented by libuv that continuously cycles through phases (Timers, Pending Callbacks, Poll, Check, Close Callbacks). It executes asynchronous callbacks when the JavaScript Call Stack is empty. Between these phases, Node processes the `process.nextTick()` queue first, then the Promise microtask queue, allowing JavaScript to remain single-threaded while efficiently handling many concurrent asynchronous operations.**
```
