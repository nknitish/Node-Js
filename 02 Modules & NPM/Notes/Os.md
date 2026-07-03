# Node.js OS Module (`os`)

> **Interview Definition:**
> The **`os`** module is a built-in Node.js module that provides information about the operating system, including CPU details, memory usage, platform, architecture, hostname, network interfaces, and user information.

---

# Table of Contents

1. What is the `os` Module?
2. Why Do We Need It?
3. Importing the Module
4. Common Methods
5. System Information
6. CPU Information
7. Memory Information
8. User Information
9. Network Information
10. OS Constants
11. Real-world Examples
12. Common Interview Questions
13. Quick Revision
14. Interview Answer

---

# 1. What is the `os` Module?

The **`os`** module provides APIs to retrieve information about the operating system on which the Node.js application is running.

It is a **Core Module**, so no installation is required.

```js
import os from "node:os";

// CommonJS
// const os = require("os");
```

---

# 2. Why Do We Need It?

Applications often need information about the machine they are running on.

Examples:

- Detect available CPU cores
- Check free memory
- Get hostname
- Determine operating system
- Build monitoring dashboards
- Log server information

---

# Architecture

```text
Node.js Application

        │

        ▼

      os Module

        │

        ▼

Operating System APIs

        │

        ▼

CPU / Memory / Network / User
```

---

# 3. Common Methods

| Method                   | Description               |
| ------------------------ | ------------------------- |
| `os.platform()`          | Operating system platform |
| `os.arch()`              | CPU architecture          |
| `os.hostname()`          | Computer hostname         |
| `os.type()`              | OS name                   |
| `os.release()`           | OS version                |
| `os.version()`           | Detailed OS version       |
| `os.cpus()`              | CPU information           |
| `os.totalmem()`          | Total system memory       |
| `os.freemem()`           | Available memory          |
| `os.uptime()`            | System uptime             |
| `os.userInfo()`          | Current user details      |
| `os.networkInterfaces()` | Network interfaces        |
| `os.homedir()`           | Home directory            |
| `os.tmpdir()`            | Temporary directory       |
| `os.endianness()`        | Byte order (`LE` or `BE`) |

---

# 4. System Information

## Platform

```js
console.log(os.platform());
```

Output (example)

```text
darwin
```

Possible values:

```text
win32
linux
darwin
```

---

## Architecture

```js
console.log(os.arch());
```

Output

```text
x64
```

Other possible values:

```text
arm64
ia32
```

---

## Hostname

```js
console.log(os.hostname());
```

Output

```text
Nitish-MacBook-Pro
```

---

## OS Type

```js
console.log(os.type());
```

Output

```text
Linux
```

or

```text
Darwin
```

or

```text
Windows_NT
```

---

## OS Version

```js
console.log(os.version());
```

Example

```text
Darwin Kernel Version ...
```

---

# 5. CPU Information

```js
const cpus = os.cpus();

console.log(cpus);
```

Each CPU object contains:

- Model
- Speed
- Times

Example

```js
[
  {
    model: "Apple M2",
    speed: 2400,
    times: {
      user: 1000,
      idle: 5000,
    },
  },
];
```

### Number of CPU Cores

```js
console.log(os.cpus().length);
```

Example

```text
8
```

Useful for:

- Worker Threads
- Cluster Module
- Performance optimization

---

# 6. Memory Information

## Total Memory

```js
console.log(os.totalmem());
```

Output (bytes)

```text
17179869184
```

Convert to GB

```js
const totalGB = (os.totalmem() / 1024 / 1024 / 1024).toFixed(2);

console.log(`${totalGB} GB`);
```

---

## Free Memory

```js
console.log(os.freemem());
```

Example

```text
8053063680
```

Convert to GB

```js
const freeGB = (os.freemem() / 1024 / 1024 / 1024).toFixed(2);

console.log(`${freeGB} GB`);
```

---

# 7. Uptime

Returns how long the operating system has been running.

```js
console.log(os.uptime());
```

Output

```text
86400
```

(seconds)

---

# 8. User Information

```js
console.log(os.userInfo());
```

Example

```js
{
  username: "nitish",
  homedir: "/Users/nitish",
  shell: "/bin/zsh"
}
```

---

## Home Directory

```js
console.log(os.homedir());
```

Example

```text
/Users/nitish
```

---

## Temporary Directory

```js
console.log(os.tmpdir());
```

Example

```text
/tmp
```

---

# 9. Network Interfaces

```js
console.log(os.networkInterfaces());
```

Returns information about:

- Wi-Fi
- Ethernet
- Loopback
- IPv4
- IPv6

Example

```js
{
  lo0: [...],
  en0: [...]
}
```

---

# 10. Endianness

```js
console.log(os.endianness());
```

Output

```text
LE
```

Meaning:

- LE → Little Endian
- BE → Big Endian

---

# Real-world Examples

## Show System Information

```js
import os from "node:os";

console.log({
  platform: os.platform(),
  arch: os.arch(),
  hostname: os.hostname(),
  cpuCores: os.cpus().length,
  totalMemory: os.totalmem(),
  freeMemory: os.freemem(),
});
```

---

## Check Available Memory

```js
if (os.freemem() < 1024 * 1024 * 500) {
  console.log("Low Memory");
}
```

---

## Scale Based on CPU Cores

```js
const cpuCount = os.cpus().length;

console.log(`Available CPUs: ${cpuCount}`);
```

This value is commonly used with the **Cluster** module or **Worker Threads**.

---

# Common Interview Questions

### What is the `os` module?

A built-in Node.js module that provides information about the operating system.

---

### Why is the `os` module useful?

It helps applications gather system information such as CPU, memory, platform, architecture, hostname, and network interfaces.

---

### How do you get the number of CPU cores?

```js
os.cpus().length;
```

---

### How do you get the total system memory?

```js
os.totalmem();
```

---

### How do you get free memory?

```js
os.freemem();
```

---

### Difference between `os.uptime()` and `process.uptime()`?

| `os.uptime()`                           | `process.uptime()`                     |
| --------------------------------------- | -------------------------------------- |
| Time since the operating system started | Time since the Node.js process started |

---

# Quick Revision

| Method                   | Returns                   |
| ------------------------ | ------------------------- |
| `os.platform()`          | Operating system platform |
| `os.arch()`              | CPU architecture          |
| `os.hostname()`          | Hostname                  |
| `os.type()`              | Operating system type     |
| `os.version()`           | Operating system version  |
| `os.cpus()`              | CPU information           |
| `os.totalmem()`          | Total memory              |
| `os.freemem()`           | Free memory               |
| `os.uptime()`            | System uptime             |
| `os.userInfo()`          | User details              |
| `os.homedir()`           | Home directory            |
| `os.tmpdir()`            | Temporary directory       |
| `os.networkInterfaces()` | Network interfaces        |
| `os.endianness()`        | Byte order                |

---

# Interview Answer

> **The `os` module is a built-in Node.js module that provides information about the operating system. It exposes APIs to retrieve details such as the platform, CPU architecture, hostname, memory usage, uptime, user information, and network interfaces. It is commonly used for monitoring, logging, scaling applications based on CPU cores, and collecting environment-specific information. For example, `os.cpus().length` is often used to determine how many worker processes or worker threads should be created for better CPU utilization.**
