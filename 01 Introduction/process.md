# Node.js `process` Object - Complete Interview Notes

The **`process`** object is a **global object** in Node.js.

> **It represents the currently running Node.js process and provides APIs to interact with the operating system and runtime environment.**

Unlike browser objects (`window`, `document`), the `process` object is available globally.

```js
console.log(process);
```

No import is required.

---

# Process Architecture

```text
Operating System

        │

        ▼

   Node.js Process

        │

        ▼

      process

        │

 ┌──────┼──────────────┐
 │      │              │
 ▼      ▼              ▼
argv    env          Events
 │       │              │
CLI    Environment   exit,
Args   Variables     nextTick...
```

---

# Commonly Used APIs

| API                     | Purpose                                      |
| ----------------------- | -------------------------------------------- |
| `process.argv`          | Command-line arguments                       |
| `process.env`           | Environment variables                        |
| `process.pid`           | Process ID                                   |
| `process.cwd()`         | Current working directory                    |
| `process.exit()`        | Exit application                             |
| `process.memoryUsage()` | Memory statistics                            |
| `process.uptime()`      | Running time                                 |
| `process.nextTick()`    | Execute callback before Event Loop continues |
| `process.on()`          | Listen for process events                    |

---

# 1. process.argv

## What is it?

> **`process.argv` is an array containing the command-line arguments passed to the Node.js process.**

Example

```bash
node app.js Nitish React 5
```

```js
console.log(process.argv);
```

Output

```js
["/usr/local/bin/node", "/Users/nitish/app.js", "Nitish", "React", "5"];
```

---

## Structure

| Index | Meaning              |
| ----- | -------------------- |
| `0`   | Node executable path |
| `1`   | Current script path  |
| `2`   | First user argument  |
| `3`   | Second user argument |
| `4`   | Third user argument  |

**Remember:** User arguments always start from **index 2**.

---

## Example

```bash
node app.js Nitish
```

```js
const name = process.argv[2];

console.log(name);
```

Output

```text
Nitish
```

---

## Calculator Example

```bash
node app.js 10 20
```

```js
const a = Number(process.argv[2]);
const b = Number(process.argv[3]);

console.log(a + b);
```

Output

```text
30
```

---

## Getting All User Arguments

```js
const args = process.argv.slice(2);

console.log(args);
```

Output

```js
["Nitish", "React", "Node"];
```

---

## Interview Points

✔ Returns an array

✔ Arguments start at index **2**

✔ All values are **strings**

✔ Used for CLI tools

---

# 2. process.env

## What is it?

> **`process.env` is an object containing all environment variables available to the current Node.js process.**

Example

```text
PORT=5000

NODE_ENV=production

DB_PASSWORD=password
```

Node makes them available through

```js
process.env;
```

---

## Access Variable

```js
console.log(process.env.PORT);
```

Output

```text
5000
```

---

## Example

```js
const PORT = process.env.PORT || 3000;

console.log(PORT);
```

If

```text
PORT=5000
```

Output

```text
5000
```

Otherwise

```text
3000
```

---

## .env File

```
PORT=5000

DB_HOST=localhost

JWT_SECRET=abcd123
```

```js
require("dotenv").config();

console.log(process.env.PORT);
```

---

## Important

Everything inside

```js
process.env;
```

is a

```text
String
```

Example

```text
PORT=5000
```

```js
typeof process.env.PORT;
```

Output

```text
string
```

Need Number?

```js
Number(process.env.PORT);
```

---

## Common Uses

- Database credentials
- API keys
- JWT secrets
- Server port
- Production/Development configuration

---

## Never Hardcode

❌

```js
const password = "mypassword";
```

✅

```js
const password = process.env.DB_PASSWORD;
```

---

## Interview Points

✔ Object

✔ Stores configuration

✔ Values are strings

✔ Used for secrets

✔ Different values for Dev/QA/Production

---

# process.argv vs process.env

| process.argv      | process.env               |
| ----------------- | ------------------------- |
| CLI arguments     | Environment variables     |
| Array             | Object                    |
| User input        | Application configuration |
| Runtime arguments | Secrets & settings        |
| Index-based       | Key-value pairs           |

---

## Example

Run

```bash
PORT=5000 node app.js Nitish React
```

Inside Node

```js
console.log(process.argv[2]);
```

Output

```text
Nitish
```

```js
console.log(process.env.PORT);
```

Output

```text
5000
```

---

# 3. process.pid

Current Process ID.

```js
console.log(process.pid);
```

Example

```text
4512
```

Useful for debugging.

---

# 4. process.cwd()

Returns Current Working Directory.

```js
console.log(process.cwd());
```

Output

```text
/Users/nitish/projects/backend
```

---

Difference

| process.cwd()              | \_\_dirname               |
| -------------------------- | ------------------------- |
| Where command was executed | Directory of current file |

---

# 5. process.exit()

Stops Node immediately.

```js
console.log("Before");

process.exit();

console.log("After");
```

Output

```text
Before
```

---

Exit Codes

```js
process.exit(0);
```

Success

```js
process.exit(1);
```

Failure

---

# 6. process.memoryUsage()

Shows memory consumption.

```js
console.log(process.memoryUsage());
```

Output

```js
{
 heapUsed: ...,
 heapTotal: ...,
 rss: ...
}
```

Useful for memory leak detection.

---

# 7. process.uptime()

Returns how long the process has been running.

```js
console.log(process.uptime());
```

Output

```text
34.28
```

(seconds)

---

# 8. process.nextTick()

Runs a callback immediately after the current JavaScript execution completes, before Promise microtasks and before the Event Loop proceeds to the next phase.

```js
console.log("Start");

process.nextTick(() => {
  console.log("nextTick");
});

console.log("End");
```

Output

```text
Start

End

nextTick
```

Priority

```text
Current JS

↓

process.nextTick()

↓

Promise

↓

Event Loop
```

---

# 9. process.on()

Listens for process events.

```js
process.on("exit", () => {
  console.log("Exiting...");
});
```

Example

```js
process.on("SIGINT", () => {
  console.log("Graceful Shutdown");

  process.exit(0);
});
```

Useful for cleaning up resources before exiting.

---

# Real-World Uses

## CLI Tool

```bash
node app.js Nitish
```

```js
console.log(process.argv[2]);
```

---

## Read Environment Variables

```js
const PORT = process.env.PORT;
```

---

## Graceful Shutdown

```js
process.on("SIGINT", () => {
  server.close();

  process.exit(0);
});
```

---

## Exit Program

```js
if (!process.env.DB_URL) {
  process.exit(1);
}
```

---

## Performance Measurement

```js
const start = process.hrtime.bigint();

// Work

const end = process.hrtime.bigint();
```

---

# Interview Questions

### What is the process object?

A global Node.js object representing the current running process.

---

### Difference between process.argv and process.env?

| process.argv           | process.env           |
| ---------------------- | --------------------- |
| Command-line arguments | Environment variables |
| Array                  | Object                |
| User input             | Configuration         |
| Runtime values         | Secrets & settings    |

---

### Why do CLI arguments start from index 2?

Because:

- Index 0 → Node executable
- Index 1 → Script path
- Index 2 → First user argument

---

### Why are environment variables useful?

They separate configuration from code and keep secrets out of the source code.

---

### What is process.nextTick()?

Schedules a callback to run immediately after the current operation finishes, before Promise microtasks and before the Event Loop proceeds to the next phase.

---

# Quick Revision (1 Minute)

| API                     | Purpose                         | Returns          |
| ----------------------- | ------------------------------- | ---------------- |
| `process.argv`          | CLI arguments                   | Array            |
| `process.env`           | Environment variables           | Object           |
| `process.pid`           | Process ID                      | Number           |
| `process.cwd()`         | Current directory               | String           |
| `process.exit()`        | Exit application                | —                |
| `process.memoryUsage()` | Memory usage                    | Object           |
| `process.uptime()`      | Running time                    | Number (seconds) |
| `process.nextTick()`    | Schedule high-priority callback | —                |
| `process.on()`          | Listen to process events        | —                |

---

# ⭐ Interview Answer (2 Minutes)

> **The `process` object is a global object in Node.js that represents the currently running Node.js process. It provides information about the runtime and exposes APIs to interact with the operating system. Some commonly used properties include `process.argv`, which reads command-line arguments; `process.env`, which accesses environment variables; `process.pid`, which returns the process ID; and `process.cwd()`, which returns the current working directory. It also provides methods like `process.exit()` to terminate the application, `process.on()` to listen for lifecycle events such as `SIGINT` and `exit`, and `process.nextTick()` to schedule callbacks before the Event Loop continues. Together, these APIs are widely used for configuration, CLI tools, graceful shutdown, debugging, and performance monitoring in Node.js applications.**
