# Node.js Events Module (`events`) & EventEmitter

> **Interview Definition:**
> The **`events`** module is a built-in Node.js module that provides the **EventEmitter** class, which allows objects to emit named events and register listeners to respond when those events occur. It is one of the core building blocks of Node.js.

---

# Table of Contents

1. What is the Events Module?
2. What is EventEmitter?
3. Why Do We Need It?
4. How EventEmitter Works
5. Creating an EventEmitter
6. Registering Event Listeners
7. Emitting Events
8. Passing Arguments
9. Multiple Listeners
10. `once()`
11. Removing Listeners
12. Common EventEmitter Methods
13. Real-world Examples
14. Common Interview Questions
15. Quick Revision
16. Interview Answer

---

# 1. What is the Events Module?

The **`events`** module is a built-in Node.js module that enables **event-driven programming**.

Import it using:

```js
import EventEmitter from "node:events";

// CommonJS
// const EventEmitter = require("events");
```

---

# 2. What is EventEmitter?

`EventEmitter` is a class that lets us:

- Register event listeners
- Emit events
- Execute callbacks when an event occurs

Think of it like a notification system.

```text
Event Happens
      │
      ▼
EventEmitter
      │
      ▼
All Registered Listeners Execute
```

---

# 3. Why Do We Need It?

Imagine an e-commerce application.

When a user places an order:

- Save order
- Send email
- Update inventory
- Generate invoice
- Notify admin

Instead of writing:

```text
Place Order

↓

Send Email

↓

Update Inventory

↓

Generate Invoice

↓

Notify Admin
```

We can emit one event:

```text
orderPlaced

↓

EventEmitter

↓

Email Service

↓

Inventory Service

↓

Invoice Service

↓

Notification Service
```

Each service listens independently.

---

# 4. How EventEmitter Works

Three steps:

```text
Create EventEmitter

↓

Register Listener

↓

Emit Event
```

---

# 5. Creating an EventEmitter

```js
import EventEmitter from "node:events";

const emitter = new EventEmitter();
```

---

# 6. Registering Event Listeners

Use `on()`.

```js
emitter.on("greet", () => {
  console.log("Hello!");
});
```

Nothing happens yet.

---

# 7. Emitting Events

```js
emitter.emit("greet");
```

Output

```text
Hello!
```

Flow

```text
emit("greet")

↓

EventEmitter

↓

Listener

↓

Console Output
```

---

# Complete Example

```js
import EventEmitter from "node:events";

const emitter = new EventEmitter();

emitter.on("login", () => {
  console.log("User Logged In");
});

emitter.emit("login");
```

Output

```text
User Logged In
```

---

# 8. Passing Arguments

Events can pass data.

```js
emitter.on("userCreated", (name, age) => {
  console.log(name);
  console.log(age);
});

emitter.emit("userCreated", "Nitish", 25);
```

Output

```text
Nitish

25
```

---

# 9. Multiple Listeners

One event can have multiple listeners.

```js
emitter.on("payment", () => {
  console.log("Email Sent");
});

emitter.on("payment", () => {
  console.log("Invoice Generated");
});

emitter.on("payment", () => {
  console.log("Inventory Updated");
});

emitter.emit("payment");
```

Output

```text
Email Sent

Invoice Generated

Inventory Updated
```

---

# 10. once()

Runs only one time.

```js
emitter.once("login", () => {
  console.log("First Login");
});

emitter.emit("login");

emitter.emit("login");
```

Output

```text
First Login
```

---

# 11. Removing Listeners

```js
function greet() {
  console.log("Hello");
}

emitter.on("greet", greet);

emitter.off("greet", greet);

// Older Node versions:
// emitter.removeListener("greet", greet);
```

Now

```js
emitter.emit("greet");
```

Output

```text
Nothing
```

---

# 12. Common EventEmitter Methods

## `on()`

Register listener.

```js
emitter.on("event", callback);
```

---

## `once()`

Run only once.

```js
emitter.once("event", callback);
```

---

## `emit()`

Trigger event.

```js
emitter.emit("event");
```

---

## `off()`

Remove listener.

```js
emitter.off("event", callback);
```

---

## `removeAllListeners()`

Remove every listener.

```js
emitter.removeAllListeners("event");
```

---

## `listenerCount()`

Number of listeners.

```js
console.log(emitter.listenerCount("login"));
```

---

## `eventNames()`

Returns all registered events.

```js
console.log(emitter.eventNames());
```

---

# EventEmitter Architecture

```text
Application

      │

      ▼

EventEmitter

      │

────────┼───────────

      │

      ▼

Email Listener

Inventory Listener

Notification Listener

Analytics Listener
```

---

# Real-world Examples

## Order Placed

```js
emitter.emit("orderPlaced");
```

Listeners

```text
Send Email

Generate Invoice

Update Inventory

Notify Warehouse
```

---

## User Signup

```js
emitter.emit("signup", user);
```

Listeners

```text
Welcome Email

Analytics

Reward Points

CRM Sync
```

---

## Chat Application

```text
messageReceived

↓

Save Message

↓

Notify Receiver

↓

Update Last Seen
```

---

# Node.js Uses EventEmitter Internally

Many built-in Node.js modules are based on EventEmitter.

Examples:

- Streams
- HTTP Server
- HTTP Request
- File Streams
- Process (many lifecycle events)
- Readline

Example:

```js
server.on("request", () => {});

stream.on("data", () => {});

process.on("exit", () => {});
```

---

# Common Interview Questions

### What is EventEmitter?

A class that enables event-driven programming by allowing objects to emit events and register listeners.

---

### Difference between `on()` and `once()`?

| `on()`              | `once()`           |
| ------------------- | ------------------ |
| Executes every time | Executes only once |

---

### What does `emit()` do?

Triggers an event and executes all listeners registered for that event.

---

### Can one event have multiple listeners?

Yes.

All registered listeners execute in the order they were registered.

---

### Does `emit()` execute asynchronously?

No.

By default, `emit()` calls listeners **synchronously** in registration order. If asynchronous behavior is needed, the listener itself can schedule work using timers, Promises, or other async APIs.

---

# Quick Revision

| Method                 | Purpose                    |
| ---------------------- | -------------------------- |
| `on()`                 | Register listener          |
| `once()`               | Register one-time listener |
| `emit()`               | Trigger event              |
| `off()`                | Remove listener            |
| `removeAllListeners()` | Remove all listeners       |
| `listenerCount()`      | Number of listeners        |
| `eventNames()`         | List all events            |

---

# Interview Answer

> **The `events` module is a built-in Node.js module that provides the `EventEmitter` class for implementing event-driven programming. An `EventEmitter` allows us to register listeners using methods like `on()` or `once()` and trigger them using `emit()`. This pattern helps decouple different parts of an application. Many Node.js core modules, including streams, HTTP servers, and process events, are built on top of `EventEmitter`, making it a fundamental concept in the Node.js runtime.**
