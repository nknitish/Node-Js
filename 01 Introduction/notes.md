# What is Node.js and the V8 engine

Node.js is a JavaScript runtime built on Google's V8 engine that runs JavaScript outside the browser. Ryan Dahl created Node.js to run JavaScript on servers.

In short: Node enables server-side JavaScript and exposes OS-level APIs.

Common uses:

- Backend APIs
- Microservices
- CLI tools
- Automation scripts
- Desktop apps
- IoT
- Streaming servers

# What does Node provide?

Browser-only APIs (not available in Node):

- window
- document
- alert()
- fetch()
- localStorage
- DOM

Node provides server and OS APIs:

- File system (`fs`)
- HTTP server
- TCP / UDP
- Streams and buffers
- Crypto
- OS access
- Path utilities
- Child processes

Example:

```js
const fs = require("fs");
const data = fs.readFileSync("hello.txt", "utf8");
console.log(data);
```

Browsers cannot access the file system directly.

# V8 engine

https://www.youtube.com/watch?v=2WJL19wDH68

# How V8 executes JavaScript

Example:

```js
function add(a, b) {
  return a + b;
}
add(2, 3);
```

Execution steps:

1. Parser — tokenizes input and builds the AST (Abstract Syntax Tree).
2. Ignition — generates bytecode from the AST.
3. Bytecode execution — the interpreter runs the bytecode.
4. Profiler — detects hot (frequently executed) functions.
5. TurboFan — compiles hot functions to optimized machine code.

# Why V8 is fast

- JIT compilation — compiles hot code to machine code.
- Hidden classes — optimize object shape access.
- Inline caching — speeds up property access.
- Efficient garbage collection — reclaims memory quickly.
- Optimized machine code via TurboFan.

# Node architecture

Flow:

- JavaScript (V8) → Node APIs → libuv (event loop + thread pool) → Operating system

Key parts:

- `V8`: executes JavaScript
- `Node APIs`: `fs`, `http`, etc.
- `libuv`: event loop, async I/O, thread pool
- Operating system: performs actual I/O and system calls

# What is libuv?

`libuv` is a C library that provides:

- Event loop
- Thread pool
- Async I/O
- File operations
- Networking
- Timers

libuv handles low-level operations that Node delegates (file reads, network, DNS, timers, sockets).

# Why Node is single-threaded

- JavaScript runs on a single main thread (one call stack).
- Node uses the event loop and `libuv`'s thread pool to perform asynchronous operations without blocking the main thread.
- Result: Node can handle many concurrent connections by delegating blocking I/O to libuv.
