# `__dirname` and `__filename` (Node.js Interview Notes)

`__dirname` and `__filename` are special variables available in **CommonJS (CJS)** modules.

They help you work with file and directory paths.

> **Important:** They are **not available in ES Modules (ESM)** by default.

---

# What is `__dirname`?

> **`__dirname` returns the absolute path of the directory containing the current JavaScript file.**

Example project:

```text
project/
│
├── app.js
└── utils/
    └── helper.js
```

`helper.js`

```js
console.log(__dirname);
```

Output:

```text
/Users/nitish/project/utils
```

Notice:

It returns the directory **where the current file is located**, not where Node was started.

---

# What is `__filename`?

> **`__filename` returns the absolute path of the current JavaScript file.**

Example:

```js
console.log(__filename);
```

Output:

```text
/Users/nitish/project/utils/helper.js
```

---

# Visual Representation

```text
project/
│
├── app.js
└── utils/
    └── helper.js
```

Inside `helper.js`:

```text
__dirname

↓

/Users/nitish/project/utils
```

```text
__filename

↓

/Users/nitish/project/utils/helper.js
```

---

# Example

```js
console.log(__dirname);

console.log(__filename);
```

Output

```text
/Users/nitish/project

/Users/nitish/project/app.js
```

---

# Why do we need them?

Suppose you want to read a file.

```text
project/
│
├── app.js
└── data/
    └── users.json
```

Without `__dirname`:

```js
const fs = require("fs");

fs.readFileSync("data/users.json");
```

This only works if your **current working directory** is the project root.

If you execute the script from another location, it may fail.

---

## Correct Way

```js
const fs = require("fs");
const path = require("path");

const filePath = path.join(__dirname, "data", "users.json");

const data = fs.readFileSync(filePath);
```

Now it works regardless of where you run the command from.

---

# `__dirname` vs `process.cwd()`

This is a very common interview question.

Project:

```text
project/
│
├── app.js
└── utils/
    └── helper.js
```

Suppose you're inside the `project` folder and run:

```bash
node utils/helper.js
```

Inside `helper.js`:

```js
console.log(process.cwd());

console.log(__dirname);
```

Output:

```text
process.cwd()

↓

/Users/nitish/project
```

```text
__dirname

↓

/Users/nitish/project/utils
```

---

## Difference

| `process.cwd()`                                    | `__dirname`                        |
| -------------------------------------------------- | ---------------------------------- |
| Current working directory (where Node was started) | Directory of the current file      |
| Can change depending on where the command is run   | Always points to the file's folder |
| Available in CJS and ESM (`process` is global)     | Available only in CommonJS         |

---

# `__filename` vs `__dirname`

| `__dirname`      | `__filename`               |
| ---------------- | -------------------------- |
| Directory path   | Full file path             |
| `/project/utils` | `/project/utils/helper.js` |

---

# Using the `path` Module

```js
const path = require("path");

console.log(path.basename(__filename));
```

Output:

```text
helper.js
```

Directory name:

```js
console.log(path.dirname(__filename));
```

Output:

```text
/Users/nitish/project/utils
```

Extension:

```js
console.log(path.extname(__filename));
```

Output:

```text
.js
```

---

# Why Not Use Relative Paths?

Suppose:

```text
project/
│
├── app.js
└── data/
    └── users.json
```

Bad:

```js
fs.readFileSync("./data/users.json");
```

If someone runs the program from a different directory:

```bash
cd ..
node project/app.js
```

The relative path may resolve incorrectly.

Using `__dirname` makes the path relative to the file itself:

```js
const file = path.join(__dirname, "data", "users.json");
```

This is much more reliable.

---

# ES Modules

In ES Modules:

```js
console.log(__dirname);
```

Output:

```text
ReferenceError: __dirname is not defined
```

Why?

Because `__dirname` and `__filename` are CommonJS features.

Equivalent approach:

```js
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log(__dirname);
console.log(__filename);
```

---

# Real-world Uses

### Reading Files

```js
const filePath = path.join(__dirname, "data.json");
```

---

### Serving Static Files

```js
app.use(express.static(path.join(__dirname, "public")));
```

---

### Sending HTML

```js
res.sendFile(path.join(__dirname, "index.html"));
```

---

### Loading Config Files

```js
const config = require(path.join(__dirname, "config.js"));
```

---

# Interview Questions

### What is `__dirname`?

It returns the absolute path of the directory containing the current CommonJS module.

---

### What is `__filename`?

It returns the absolute path of the current CommonJS file.

---

### Difference between `__dirname` and `process.cwd()`?

| `__dirname`              | `process.cwd()`                   |
| ------------------------ | --------------------------------- |
| Current file's directory | Current working directory         |
| Fixed for that file      | Depends on where Node was started |

---

### Are `__dirname` and `__filename` available in ES Modules?

No. They are CommonJS-specific. In ES Modules, use `import.meta.url` with `fileURLToPath()` to derive equivalent values.

---

# Quick Revision

| Variable        | Returns                                |
| --------------- | -------------------------------------- |
| `__dirname`     | Directory of the current CommonJS file |
| `__filename`    | Full path of the current CommonJS file |
| `process.cwd()` | Current working directory              |

---

# Visual Summary

```text
Project
│
├── app.js
└── utils
    └── helper.js
```

Run:

```bash
node utils/helper.js
```

| Expression      | Output                                  |
| --------------- | --------------------------------------- |
| `process.cwd()` | `/Users/nitish/project`                 |
| `__dirname`     | `/Users/nitish/project/utils`           |
| `__filename`    | `/Users/nitish/project/utils/helper.js` |

---

# ⭐ Interview Answer (45 Seconds)

> \*\*`__dirname` and `__filename` are special variables available in CommonJS modules. `__dirname` returns the absolute path of the directory containing the current file, while `__filename` returns the absolute path of the current file itself. They are commonly used to build reliable file paths for reading files, serving static assets, or loading configuration. Unlike `process.cwd()`, which depends on where the Node.js process was started, `__dirname` is always tied to the location of the current module. In ES Modules, these variables are not available directly and are typically recreated using `import.meta.url` and `fileURLToPath()`.`
