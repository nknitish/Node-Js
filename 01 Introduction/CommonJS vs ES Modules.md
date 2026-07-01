# CommonJS vs ES Modules (Interview Notes)

---

# What are Modules?

A **module** is simply a JavaScript file that contains reusable code.

Without modules:

```js
function add() {}
function subtract() {}
function multiply() {}
```

Everything is in one file, making it difficult to:

- Maintain
- Reuse
- Test
- Avoid variable conflicts

Modules solve this by splitting code into multiple files.

```
project/
│
├── app.js
├── math.js
├── user.js
└── package.json
```

Each module has its own scope.

---

# Module Systems in JavaScript

There are two major module systems:

| CommonJS (CJS)           | ES Modules (ESM)             |
| ------------------------ | ---------------------------- |
| Node.js (legacy/default) | Official JavaScript standard |
| `require()`              | `import`                     |
| `module.exports`         | `export`                     |
| Dynamic loading          | Static module analysis       |

---

# CommonJS (CJS)

CommonJS was introduced by Node.js before JavaScript had an official module system.

## Import

```js
const math = require("./math");
```

or

```js
const { add } = require("./math");
```

## Export

```js
function add(a, b) {
  return a + b;
}

module.exports = add;
```

Multiple exports:

```js
module.exports = {
  add,
  subtract,
};
```

---

# ES Modules (ESM)

Introduced in ES6 (2015).

Uses:

- `import`
- `export`

## Named Export

```js
export function add(a, b) {
  return a + b;
}
```

Import

```js
import { add } from "./math.js";
```

---

## Default Export

```js
export default function add(a, b) {
  return a + b;
}
```

Import

```js
import add from "./math.js";
```

---

# require() vs import

## require()

```js
const math = require("./math");
```

### Characteristics

- CommonJS
- Function call
- Loads synchronously
- Can be called anywhere
- Can be dynamic

Example

```js
const moduleName = "./math";

const math = require(moduleName);
```

✅ Works

---

## import

```js
import { add } from "./math.js";
```

### Characteristics

- ES Modules
- Static syntax
- Imports are resolved before execution
- Enables tree shaking
- Better optimization

Example

```js
import { add } from "./math.js";
```

---

## Dynamic Import

Need runtime import?

```js
const math = await import("./math.js");
```

Unlike `require()`, normal `import` statements cannot use variables:

```js
// ❌ Invalid
import math from moduleName;
```

---

# require() vs import (Comparison)

| require()             | import                  |
| --------------------- | ----------------------- |
| CommonJS              | ES Modules              |
| Function              | Language syntax         |
| Synchronous           | Static module structure |
| Can be dynamic        | Static by default       |
| Used in older Node.js | Modern JavaScript       |

---

# module.exports vs exports

This confuses almost everyone.

Understanding one line solves it.

```
exports -----> module.exports
```

Initially:

```js
exports = module.exports;
```

Both reference the same object.

---

## Using exports

```js
exports.add = add;

exports.subtract = subtract;
```

Equivalent to

```js
module.exports.add = add;

module.exports.subtract = subtract;
```

Both work.

---

## Using module.exports

```js
module.exports = add;
```

Perfectly valid.

You are replacing the exported object.

---

# Why does this fail?

```js
exports = add;
```

❌ Doesn't work.

Why?

Because

```js
exports;
```

is only another variable pointing to

```js
module.exports;
```

When you do

```js
exports = add;
```

you're only changing the local variable.

```
Before

exports  ─────► {}

module.exports ─► {}
```

After

```
exports ─────► add()

module.exports ─► {}
```

Node always returns

```js
module.exports;
```

not

```js
exports;
```

---

# Correct Usage

### Export single value

```js
module.exports = add;
```

---

### Export multiple values

```js
exports.add = add;
exports.subtract = subtract;
```

or

```js
module.exports = {
  add,
  subtract,
};
```

---

# Module Wrapper

Node internally wraps every CommonJS file like this:

```js
(function (exports, require, module, __filename, __dirname) {
  // Your code
});
```

That's why these are available automatically:

```js
require;

module;

exports;

__dirname;

__filename;
```

---

# Module Caching

A CommonJS module executes only once.

```js
// counter.js

console.log("Loaded");

module.exports = {};
```

```js
require("./counter");
require("./counter");
require("./counter");
```

Output

```
Loaded
```

Subsequent `require()` calls return the cached module.

---

# Tree Shaking

Suppose

```js
export function add() {}

export function subtract() {}

export function multiply() {}
```

Import

```js
import { add } from "./math.js";
```

Bundlers can remove unused exports like `subtract` and `multiply`.

This optimization is called **Tree Shaking**.

CommonJS cannot be optimized as effectively because `require()` is dynamic.

---

# package.json

To use ES Modules

```json
{
  "type": "module"
}
```

Otherwise Node treats `.js` files as CommonJS by default.

---

# CommonJS vs ES Modules

| Feature                | CommonJS         | ES Modules    |
| ---------------------- | ---------------- | ------------- |
| Syntax                 | `require()`      | `import`      |
| Export                 | `module.exports` | `export`      |
| Default in old Node    | ✅               | ❌            |
| JavaScript Standard    | ❌               | ✅            |
| Tree Shaking           | ❌               | ✅            |
| Dynamic Import         | ✅ `require()`   | ✅ `import()` |
| Static Analysis        | ❌               | ✅            |
| Better for Modern Apps | ❌               | ✅            |

---

# Interview Questions

### What is CommonJS?

A module system introduced by Node.js before JavaScript had native modules. It uses `require()` and `module.exports`.

---

### What are ES Modules?

The official JavaScript module system introduced in ES6. It uses `import` and `export`.

---

### Difference between `require()` and `import`?

| require     | import                               |
| ----------- | ------------------------------------ |
| CommonJS    | ES Modules                           |
| Function    | Static syntax                        |
| Dynamic     | Static (by default)                  |
| Synchronous | Statically analyzed before execution |

---

### Difference between `module.exports` and `exports`?

- `exports` is initially a reference to `module.exports`.
- Adding properties to `exports` updates `module.exports`.
- Reassigning `exports` does **not** change what gets exported.
- Reassign `module.exports` when exporting a single function, class, or object.

```js
// ✅ Correct
module.exports = add;

// ✅ Correct
exports.add = add;

// ❌ Incorrect
exports = add;
```

---

# ⭐ Interview Answer (1 Minute)

> **CommonJS and ES Modules are two JavaScript module systems. CommonJS, used traditionally in Node.js, imports modules using `require()` and exports them using `module.exports` or `exports`. ES Modules are the official JavaScript standard and use `import` and `export`. ES Modules support static analysis, enabling optimizations like tree shaking, while CommonJS loads modules synchronously and caches them after the first load. Also, `exports` is just a reference to `module.exports`, so reassigning `exports` doesn't change the exported value—only `module.exports` does.**
