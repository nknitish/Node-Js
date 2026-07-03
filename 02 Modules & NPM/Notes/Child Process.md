# Node.js Child Process Module (`child_process`)

> **Interview Definition:**
> The **`child_process`** module is a built-in Node.js module that allows a Node.js application to create and manage additional operating system processes. It is commonly used to execute shell commands, run external programs, offload CPU-intensive work, and communicate with other processes.

---

# Table of Contents

1. What is the `child_process` Module?
2. Why Do We Need It?
3. Parent Process vs Child Process
4. How Child Processes Work
5. Importing the Module
6. `exec()`
7. `execFile()`
8. `spawn()`
9. `fork()`
10. Communication Between Processes
11. Events
12. Real-world Examples
13. `exec()` vs `spawn()` vs `fork()`
14. Common Interview Questions
15. Quick Revision
16. Interview Answer

---

# 1. What is the `child_process` Module?

Node.js is **single-threaded** for JavaScript execution.

Sometimes we need to:

- Run Linux/Windows commands
- Execute Python scripts
- Compress files
- Process videos
- Perform CPU-intensive work
- Run another Node.js application

For these cases, Node.js provides the **`child_process`** module.

```js
import { exec } from "node:child_process";

// CommonJS
// const { exec } = require("child_process");
```

---

# 2. Why Do We Need It?

Imagine your application needs to:

```text
Upload Video

↓

Resize Video

↓

Compress Video

↓

Return Response
```

Doing everything in the main Node.js process could block useful work.

Instead:

```text
Node.js

↓

Create Child Process

↓

Video Processing

↓

Return Result
```

---

# 3. Parent Process vs Child Process

```text
Node.js App (Parent)

        │

        ├──────────────┐
        │              │
        ▼              ▼

Child Process 1   Child Process 2

Python Script     FFmpeg
```

The parent process creates and manages child processes.

---

# 4. How Child Processes Work

```text
Parent Process

↓

Create Child

↓

OS Creates Process

↓

Child Executes

↓

Output Sent Back

↓

Parent Receives Result
```

---

# 5. `exec()`

Runs a shell command and buffers the entire output in memory.

```js
import { exec } from "node:child_process";

exec("node -v", (err, stdout, stderr) => {
  if (err) {
    console.error(err);
    return;
  }

  console.log(stdout);
});
```

Output

```text
v24.x.x
```

### Best for

- Small output
- Simple shell commands

Examples:

- `node -v`
- `git status`
- `ls`
- `dir`

---

# 6. `execFile()`

Runs an executable directly **without a shell**.

```js
import { execFile } from "node:child_process";

execFile("node", ["--version"], (err, stdout) => {
  console.log(stdout);
});
```

### Advantages

- More secure
- Faster
- Avoids shell interpretation

---

# 7. `spawn()`

Starts a new process and streams its output.

```js
import { spawn } from "node:child_process";

const child = spawn("node", ["--version"]);

child.stdout.on("data", (data) => {
  console.log(data.toString());
});
```

Unlike `exec()`, `spawn()` **does not buffer the entire output**.

### Best for

- Large output
- Long-running processes
- Continuous logs

Examples:

- FFmpeg
- Git clone
- Docker logs

---

# 8. `fork()`

Creates another **Node.js process**.

```js
import { fork } from "node:child_process";

const child = fork("./worker.js");
```

`worker.js`

```js
console.log("Worker Started");
```

Unlike `spawn()`, `fork()` creates a Node.js process with a built-in communication channel.

---

# 9. Communication Between Parent and Child

`parent.js`

```js
import { fork } from "node:child_process";

const child = fork("./worker.js");

child.send({
  task: "calculate",
});

child.on("message", (message) => {
  console.log(message);
});
```

`worker.js`

```js
process.on("message", (message) => {
  console.log(message);

  process.send({
    result: "Done",
  });
});
```

Output

```text
{ task: 'calculate' }

{ result: 'Done' }
```

---

# 10. Child Process Events

### `exit`

```js
child.on("exit", (code) => {
  console.log(code);
});
```

---

### `close`

```js
child.on("close", (code) => {
  console.log(code);
});
```

---

### `error`

```js
child.on("error", (err) => {
  console.log(err);
});
```

---

### `message`

Only for `fork()`.

```js
child.on("message", (msg) => {
  console.log(msg);
});
```

---

# Real-world Examples

## Run Git

```js
exec("git status");
```

---

## Execute Python

```js
spawn("python", ["app.py"]);
```

---

## Video Compression

```js
spawn("ffmpeg", [...]);
```

---

## Image Processing

```text
Node.js

↓

spawn()

↓

ImageMagick

↓

Output
```

---

## Background Worker

```text
Main App

↓

fork()

↓

Worker Process

↓

Database
```

---

# `exec()` vs `spawn()` vs `fork()`

| Feature                    | `exec()`       | `spawn()`          | `fork()`         |
| -------------------------- | -------------- | ------------------ | ---------------- |
| Uses shell                 | ✅ Yes         | ❌ No (by default) | ❌ No            |
| Buffers output             | ✅ Yes         | ❌ Streams output  | ❌ Streams + IPC |
| Large output               | ❌ Poor choice | ✅ Excellent       | ✅ Good          |
| Starts Node.js process     | ❌ No          | ❌ Not necessarily | ✅ Yes           |
| IPC (`send()` / `message`) | ❌ No          | ❌ No              | ✅ Yes           |

---

# Child Process vs Worker Threads

| Child Process               | Worker Threads                 |
| --------------------------- | ------------------------------ |
| Separate OS process         | Thread within the same process |
| Separate memory             | Shared memory is possible      |
| Higher overhead             | Lower overhead                 |
| Can run any executable      | Runs JavaScript only           |
| Ideal for external programs | Ideal for CPU-intensive JS     |

---

# Common Interview Questions

### What is the `child_process` module?

A built-in Node.js module used to create and manage additional operating system processes.

---

### Difference between `exec()` and `spawn()`?

| `exec()`                | `spawn()`             |
| ----------------------- | --------------------- |
| Buffers complete output | Streams output        |
| Best for small output   | Best for large output |

---

### When should you use `fork()`?

Use `fork()` when you want to create another Node.js process and communicate with it using IPC (`send()` and `message`).

---

### Why not use `exec()` for large output?

Because it stores the entire output in memory before returning it, which can consume significant memory for large outputs.

---

### Difference between Worker Threads and Child Processes?

Worker Threads are better for CPU-intensive JavaScript tasks, while Child Processes are useful for running external programs or completely isolated processes.

---

# Quick Revision

| API              | Purpose                          |
| ---------------- | -------------------------------- |
| `exec()`         | Execute shell command            |
| `execFile()`     | Execute a binary without a shell |
| `spawn()`        | Stream output from a new process |
| `fork()`         | Start another Node.js process    |
| `child.send()`   | Send message to child            |
| `process.send()` | Send message to parent           |

---

# Interview Answer

> **The `child_process` module is a built-in Node.js module that allows applications to create additional operating system processes. It provides APIs such as `exec()`, `execFile()`, `spawn()`, and `fork()`. `exec()` is suitable for simple shell commands with small outputs, `spawn()` is preferred for long-running commands or large streamed output, and `fork()` is specifically designed to create new Node.js processes with built-in inter-process communication. The module is commonly used to execute external tools like Git, Python, FFmpeg, or ImageMagick and to isolate work into separate processes when appropriate.**
