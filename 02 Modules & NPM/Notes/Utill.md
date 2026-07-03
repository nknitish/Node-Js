# Node.js Util Module (`util`)

> **Interview Definition:**
> The **`util`** module is a built-in Node.js module that provides utility functions for debugging, formatting, object inspection, inheritance, and converting callback-based APIs into Promise-based APIs.

---

# Table of Contents

1. What is the `util` Module?
2. Why Do We Need It?
3. Importing the Module
4. `util.promisify()`
5. `util.callbackify()`
6. `util.format()`
7. `util.inspect()`
8. `util.types`
9. `util.parseArgs()`
10. Common Interview Questions
11. Quick Revision
12. Interview Answer

---

# 1. What is the `util` Module?

The `util` module provides helper functions that make working with Node.js easier.

It is a **Core Module**, so no installation is required.

```js
import util from "node:util";

// CommonJS
// const util = require("util");
```

---

# 2. Why Do We Need It?

The `util` module helps with:

- Converting callbacks to Promises
- Debugging objects
- Formatting strings
- Parsing CLI arguments
- Type checking

---

# 3. Common APIs

| Method               | Purpose                         |
| -------------------- | ------------------------------- |
| `util.promisify()`   | Convert callback API to Promise |
| `util.callbackify()` | Convert Promise API to callback |
| `util.format()`      | Format strings                  |
| `util.inspect()`     | Pretty-print objects            |
| `util.parseArgs()`   | Parse command-line arguments    |
| `util.types`         | Runtime type checks             |

---

# 4. `util.promisify()`

One of the most commonly asked interview topics.

Suppose we have:

```js
import fs from "node:fs";

fs.readFile("data.txt", "utf8", (err, data) => {
  console.log(data);
});
```

Using `promisify()`:

```js
import fs from "node:fs";
import util from "node:util";

const readFile = util.promisify(fs.readFile);

const data = await readFile("data.txt", "utf8");

console.log(data);
```

### Why use it?

It allows us to use modern `async/await` with older callback-based APIs.

---

# 5. `util.callbackify()`

Converts a Promise-based function into a callback-based one.

```js
import util from "node:util";

async function getUser() {
  return {
    name: "Nitish",
  };
}

const callbackFn = util.callbackify(getUser);

callbackFn((err, user) => {
  console.log(user);
});
```

---

# 6. `util.format()`

Formats strings similarly to `printf`.

```js
import util from "node:util";

console.log(util.format("Hello %s", "Nitish"));
```

Output

```text
Hello Nitish
```

More examples:

```js
util.format("%d", 100);
util.format("%j", { id: 1 });
util.format("%s %d", "Age", 25);
```

---

# 7. `util.inspect()`

Prints complex objects in a readable format.

```js
import util from "node:util";

const user = {
  id: 1,
  profile: {
    city: "Bangalore",
  },
};

console.log(util.inspect(user));
```

With colors:

```js
console.log(
  util.inspect(user, {
    colors: true,
    depth: null,
  }),
);
```

Useful for debugging deeply nested objects.

---

# 8. `util.types`

Provides type-checking helpers.

```js
import util from "node:util";

console.log(util.types.isDate(new Date()));
```

Output

```text
true
```

Another example:

```js
util.types.isPromise(Promise.resolve());
```

---

# 9. `util.parseArgs()`

Parses command-line arguments.

```js
import util from "node:util";

const { values } = util.parseArgs({
  options: {
    name: {
      type: "string",
    },
  },
});

console.log(values.name);
```

Run

```bash
node app.js --name Nitish
```

Output

```text
Nitish
```

---

# Real-world Examples

## Convert `fs.readFile` to Promise

```js
const readFile = util.promisify(fs.readFile);
```

---

## Debug API Response

```js
console.log(
  util.inspect(response, {
    depth: null,
  }),
);
```

---

## Parse CLI Arguments

```bash
node app.js --port 3000
```

---

# Common Interview Questions

### What is the `util` module?

A built-in Node.js module providing helper functions for debugging, formatting, type checking, CLI argument parsing, and converting between callback-based and Promise-based APIs.

---

### Why use `util.promisify()`?

To convert callback-style APIs into Promise-based APIs so they can be used with `async/await`.

---

### Difference between `promisify()` and `callbackify()`?

| `promisify()`      | `callbackify()`    |
| ------------------ | ------------------ |
| Callback → Promise | Promise → Callback |

---

### What is `util.inspect()` used for?

To print objects in a readable format, especially deeply nested objects during debugging.

---

# Quick Revision

| Method          | Purpose              |
| --------------- | -------------------- |
| `promisify()`   | Callback → Promise   |
| `callbackify()` | Promise → Callback   |
| `format()`      | Format strings       |
| `inspect()`     | Pretty-print objects |
| `parseArgs()`   | Parse CLI arguments  |
| `types`         | Runtime type checks  |

---

# Interview Answer

> **The `util` module is a built-in Node.js module that provides utility functions for debugging, formatting, type checking, and interoperability between callback-based and Promise-based code. One of its most commonly used APIs is `util.promisify()`, which converts traditional callback APIs into Promise-based functions, making them compatible with `async/await`. Other useful APIs include `util.inspect()` for debugging complex objects, `util.format()` for string formatting, and `util.parseArgs()` for parsing command-line arguments.**
