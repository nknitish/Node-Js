# Node.js Streams

> **Interview Definition:**
> A **Stream** is a way to process data **piece by piece (chunks)** instead of loading the entire data into memory at once. Streams make Node.js highly memory-efficient and are commonly used for handling large files, network communication, video streaming, and file uploads.

---

# Table of Contents

1. What are Streams?
2. Why Do We Need Streams?
3. How Streams Work
4. Types of Streams
5. Readable Streams
6. Writable Streams
7. Duplex Streams
8. Transform Streams
9. Stream Events
10. Piping Streams
11. Backpressure
12. Real-world Examples
13. Common Interview Questions
14. Quick Revision
15. Interview Answer

---

# 1. What are Streams?

A **Stream** is a continuous flow of data.

Instead of loading an entire file into memory:

```text
5 GB File

↓

Memory

↓

Process
```

Node.js reads the file in **small chunks**.

```text
5 GB File

↓

Chunk 1

↓

Chunk 2

↓

Chunk 3

↓

Chunk 4

↓

Output
```

This makes streams extremely memory efficient.

---

# 2. Why Do We Need Streams?

Imagine a **5 GB video file**.

### Without Streams

```text
Read Entire File

↓

5 GB RAM Used

↓

Send Response
```

Problems:

- High memory usage
- Slow startup
- Poor scalability

---

### With Streams

```text
Read Chunk

↓

Send Chunk

↓

Read Next Chunk

↓

Send Next Chunk
```

Benefits:

- Low memory usage
- Faster response
- Better performance
- Ideal for large files

---

# 3. How Streams Work

```text
Large File

↓

Readable Stream

↓

Chunks

↓

Writable Stream

↓

Destination
```

---

# 4. Types of Streams

Node.js has four types of streams.

| Type      | Purpose             |
| --------- | ------------------- |
| Readable  | Read data           |
| Writable  | Write data          |
| Duplex    | Read and write      |
| Transform | Read, modify, write |

---

# 5. Readable Stream

Used for reading data.

Example:

```js
import fs from "node:fs";

const stream = fs.createReadStream("video.mp4");

stream.on("data", (chunk) => {
  console.log(chunk.length);
});
```

Output

```text
65536
65536
65536
...
```

The file is read in chunks.

---

# Common Readable Stream Events

### `data`

Triggered when a chunk is available.

```js
stream.on("data", (chunk) => {
  console.log(chunk);
});
```

---

### `end`

Triggered after reading finishes.

```js
stream.on("end", () => {
  console.log("Reading Completed");
});
```

---

### `error`

Triggered when an error occurs.

```js
stream.on("error", (err) => {
  console.log(err);
});
```

---

# 6. Writable Stream

Used for writing data.

```js
import fs from "node:fs";

const stream = fs.createWriteStream("output.txt");

stream.write("Hello ");

stream.write("World");

stream.end();
```

Output

```text
Hello World
```

---

# Writable Stream Events

### `finish`

```js
stream.on("finish", () => {
  console.log("Write Completed");
});
```

---

### `error`

```js
stream.on("error", console.error);
```

---

# 7. Duplex Stream

A stream that can both **read and write**.

Examples:

- TCP Socket
- WebSocket
- HTTP/2 streams

```text
Client

⇄

Duplex Stream

⇄

Server
```

---

# 8. Transform Stream

A special Duplex stream that modifies data while passing it through.

Examples:

- Compression
- Encryption
- Decryption
- Data conversion

```text
Input

↓

Transform

↓

Output
```

Example:

```text
hello

↓

UPPERCASE

↓

HELLO
```

---

# 9. Stream Events

| Event  | Description        |
| ------ | ------------------ |
| data   | New chunk received |
| end    | Reading finished   |
| finish | Writing finished   |
| error  | Error occurred     |
| close  | Stream closed      |

---

# 10. Piping Streams

One of the most important stream features.

Instead of manually reading and writing:

```js
readStream.on("data", (chunk) => {
  writeStream.write(chunk);
});
```

Use:

```js
readStream.pipe(writeStream);
```

Complete example:

```js
import fs from "node:fs";

const readStream = fs.createReadStream("input.txt");

const writeStream = fs.createWriteStream("output.txt");

readStream.pipe(writeStream);
```

Architecture

```text
Input File

↓

Readable Stream

↓

pipe()

↓

Writable Stream

↓

Output File
```

---

# 11. Backpressure

Imagine:

```text
Readable Stream

↓

100 MB/sec

↓

Writable Stream

↓

20 MB/sec
```

The writer cannot keep up.

This problem is called **Backpressure**.

The `pipe()` method automatically manages backpressure by pausing and resuming the readable stream as needed.

---

# 12. Real-world Examples

## File Download

```text
Large File

↓

Readable Stream

↓

Browser
```

---

## Video Streaming

```text
Movie

↓

Chunks

↓

Browser
```

---

## File Upload

```text
Browser

↓

Readable Stream

↓

Server

↓

Disk
```

---

## Copy File

```js
import fs from "node:fs";

fs.createReadStream("source.txt").pipe(fs.createWriteStream("destination.txt"));
```

---

# Streams vs readFile()

| readFile()           | Streams              |
| -------------------- | -------------------- |
| Reads entire file    | Reads chunk by chunk |
| High memory usage    | Low memory usage     |
| Good for small files | Best for large files |

---

# Common Interview Questions

### What is a Stream?

A Stream is a way of processing data in chunks instead of loading everything into memory at once.

---

### Why are Streams memory efficient?

Because only a small chunk of data is kept in memory at any given time.

---

### Types of Streams?

- Readable
- Writable
- Duplex
- Transform

---

### What does `pipe()` do?

It connects a readable stream to a writable stream and automatically manages the flow of data, including backpressure.

---

### What is Backpressure?

Backpressure occurs when the writable stream processes data more slowly than the readable stream produces it. `pipe()` helps handle this automatically.

---

### Difference between `createReadStream()` and `readFile()`?

| createReadStream()   | readFile()           |
| -------------------- | -------------------- |
| Reads in chunks      | Reads entire file    |
| Low memory usage     | High memory usage    |
| Best for large files | Best for small files |

---

# Quick Revision

| Stream Type | Purpose                     |
| ----------- | --------------------------- |
| Readable    | Read data                   |
| Writable    | Write data                  |
| Duplex      | Read and write              |
| Transform   | Modify data while streaming |

| Method                | Purpose              |
| --------------------- | -------------------- |
| `createReadStream()`  | Read file in chunks  |
| `createWriteStream()` | Write file in chunks |
| `pipe()`              | Connect streams      |

| Event    | Description       |
| -------- | ----------------- |
| `data`   | Chunk received    |
| `end`    | Reading completed |
| `finish` | Writing completed |
| `error`  | Error occurred    |
| `close`  | Stream closed     |

---

# Interview Answer

> **Streams are one of the most important features of Node.js. A stream allows data to be processed chunk by chunk instead of loading the entire dataset into memory. This makes applications more memory-efficient and scalable, especially when working with large files, video streaming, file uploads, and network communication. Node.js provides four types of streams: Readable, Writable, Duplex, and Transform. Methods like `createReadStream()`, `createWriteStream()`, and `pipe()` are commonly used to build efficient data pipelines, while `pipe()` also helps manage backpressure automatically.**
