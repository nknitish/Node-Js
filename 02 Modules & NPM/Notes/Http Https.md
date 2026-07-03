# HTTP and HTTPS in Node.js

> **Interview Definition:**
> **HTTP (HyperText Transfer Protocol)** is the protocol used for communication between clients and servers on the web. **HTTPS (HTTP Secure)** is the secure version of HTTP that encrypts communication using SSL/TLS.

---

# Table of Contents

1. What is HTTP?
2. Why do we need HTTP?
3. How HTTP Works
4. HTTP Request Structure
5. HTTP Response Structure
6. HTTP Methods
7. HTTP Status Codes
8. Headers
9. Stateless Nature of HTTP
10. What is HTTPS?
11. HTTP vs HTTPS
12. HTTP Module in Node.js
13. Creating an HTTP Server
14. Handling Routes
15. Request Object
16. Response Object
17. Common Interview Questions
18. Quick Revision
19. Interview Answer

---

# 1. What is HTTP?

HTTP stands for **HyperText Transfer Protocol**.

It is the communication protocol used between:

```text
Browser (Client)

        │

        ▼

HTTP Request

        │

        ▼

Server

        │

        ▼

HTTP Response

        │

        ▼

Browser
```

HTTP follows the **Client-Server Architecture**.

---

# 2. Why Do We Need HTTP?

Without HTTP, browsers and servers wouldn't know how to communicate.

Example:

```text
Open Browser

↓

Visit

https://google.com

↓

Browser sends HTTP Request

↓

Server processes request

↓

Server sends HTTP Response

↓

Browser renders page
```

---

# 3. How HTTP Works

Example:

```text
Client

↓

GET /users

↓

Server

↓

Database

↓

Users Data

↓

HTTP Response

↓

Client
```

Flow:

1. Client sends request.
2. Server receives request.
3. Server processes it.
4. Server sends response.
5. Connection completes.

---

# 4. HTTP Request Structure

```http
GET /users HTTP/1.1
Host: example.com
Authorization: Bearer token
Content-Type: application/json
```

A request contains:

- Method
- URL
- Headers
- Body (optional)

---

# 5. HTTP Response Structure

```http
HTTP/1.1 200 OK

Content-Type: application/json

{
   "name":"Nitish"
}
```

A response contains:

- Status Code
- Headers
- Body

---

# 6. HTTP Methods

## GET

Retrieve data.

```http
GET /users
```

---

## POST

Create data.

```http
POST /users
```

---

## PUT

Replace an existing resource.

```http
PUT /users/1
```

---

## PATCH

Update part of a resource.

```http
PATCH /users/1
```

---

## DELETE

Delete a resource.

```http
DELETE /users/1
```

---

# 7. HTTP Status Codes

### 2xx Success

| Code | Meaning    |
| ---- | ---------- |
| 200  | OK         |
| 201  | Created    |
| 204  | No Content |

---

### 3xx Redirection

| Code | Meaning            |
| ---- | ------------------ |
| 301  | Permanent Redirect |
| 302  | Temporary Redirect |

---

### 4xx Client Errors

| Code | Meaning      |
| ---- | ------------ |
| 400  | Bad Request  |
| 401  | Unauthorized |
| 403  | Forbidden    |
| 404  | Not Found    |

---

### 5xx Server Errors

| Code | Meaning               |
| ---- | --------------------- |
| 500  | Internal Server Error |
| 502  | Bad Gateway           |
| 503  | Service Unavailable   |

---

# 8. HTTP Headers

Headers carry metadata.

Example:

```http
Content-Type: application/json

Authorization: Bearer token

Accept: application/json
```

Common headers:

- Authorization
- Content-Type
- Accept
- Cache-Control
- User-Agent
- Cookie

---

# 9. HTTP is Stateless

HTTP **does not remember previous requests**.

Example:

```text
Request 1

↓

Server

↓

Response

Connection Ends
```

Next request:

```text
Request 2

↓

Server

↓

Server does NOT remember Request 1
```

To maintain user sessions, applications use:

- Cookies
- Sessions
- JWT Tokens

---

# 10. What is HTTPS?

HTTPS stands for

**HyperText Transfer Protocol Secure**

HTTPS = HTTP + SSL/TLS Encryption

```text
Browser

↓

Encrypted Request

↓

Server

↓

Encrypted Response
```

Data cannot be easily read if intercepted.

---

# SSL/TLS

SSL/TLS encrypts data.

Without HTTPS:

```text
Browser

↓

Password

↓

Internet

↓

Server
```

Anyone intercepting traffic could potentially read it.

With HTTPS:

```text
Browser

↓

Encrypted Password

↓

Internet

↓

Server
```

Only the server can decrypt it.

---

# 11. HTTP vs HTTPS

| HTTP          | HTTPS                      |
| ------------- | -------------------------- |
| Not encrypted | Encrypted                  |
| Port 80       | Port 443                   |
| Less secure   | Secure                     |
| No SSL/TLS    | Uses SSL/TLS               |
| Faster setup  | Slight encryption overhead |

---

# 12. HTTP Module in Node.js

Node provides a built-in module:

```js
import http from "node:http";
```

No installation required.

---

# 13. Creating an HTTP Server

```js
import http from "node:http";

const server = http.createServer((req, res) => {
  res.end("Hello World");
});

server.listen(3000, () => {
  console.log("Server Running");
});
```

Visit:

```
http://localhost:3000
```

Output:

```
Hello World
```

---

# Architecture

```text
Browser

↓

Request

↓

Node HTTP Server

↓

Response

↓

Browser
```

---

# 14. Handling Routes

```js
import http from "node:http";

const server = http.createServer((req, res) => {
  if (req.url === "/") {
    res.end("Home");
  } else if (req.url === "/about") {
    res.end("About");
  } else {
    res.statusCode = 404;
    res.end("Not Found");
  }
});

server.listen(3000);
```

---

# 15. Request Object (`req`)

Useful properties:

```js
req.url;

req.method;

req.headers;
```

Example:

```js
console.log(req.url);

console.log(req.method);

console.log(req.headers);
```

---

# 16. Response Object (`res`)

Useful methods:

```js
res.write();

res.end();

res.statusCode;

res.setHeader();
```

Example:

```js
res.statusCode = 200;

res.setHeader("Content-Type", "application/json");

res.end(
  JSON.stringify({
    success: true,
  }),
);
```

---

# Real-world Example

Client

```text
GET /products
```

Server

```js
if (req.url === "/products") {
  res.end(products);
}
```

---

# Common Interview Questions

### What is HTTP?

A protocol for communication between clients and servers.

---

### Difference between HTTP and HTTPS?

HTTPS encrypts communication using SSL/TLS, while HTTP sends data in plain text.

---

### Why is HTTP called Stateless?

Because every request is independent, and the server does not automatically remember previous requests.

---

### Difference between GET and POST?

| GET                 | POST                       |
| ------------------- | -------------------------- |
| Retrieve data       | Create data                |
| Parameters in URL   | Data in request body       |
| Safe and idempotent | Not necessarily idempotent |

---

### What does `http.createServer()` do?

It creates an HTTP server that listens for incoming requests and sends responses.

---

### Difference between `req` and `res`?

| req                  | res                   |
| -------------------- | --------------------- |
| Incoming request     | Outgoing response     |
| URL, headers, method | Status, headers, body |

---

# Quick Revision

| Concept               | Description                          |
| --------------------- | ------------------------------------ |
| HTTP                  | Client-server communication protocol |
| HTTPS                 | Secure HTTP using SSL/TLS            |
| GET                   | Read data                            |
| POST                  | Create data                          |
| PUT                   | Replace data                         |
| PATCH                 | Update data                          |
| DELETE                | Delete data                          |
| Status Code           | Response status                      |
| Headers               | Metadata                             |
| Request               | Client → Server                      |
| Response              | Server → Client                      |
| `http.createServer()` | Creates HTTP server                  |
| `req`                 | Request object                       |
| `res`                 | Response object                      |

---

# Interview Answer

> **HTTP is the protocol used for communication between clients and servers on the web. It follows a request-response model where the client sends a request and the server returns a response. HTTP is stateless, meaning each request is independent. HTTPS is the secure version of HTTP that encrypts communication using SSL/TLS, protecting sensitive data such as passwords and payment information. In Node.js, the built-in `http` module allows us to create web servers using `http.createServer()`, where the `req` object contains request information and the `res` object is used to send responses back to the client.**

## Creating an HTTPS Server

Unlike the **`http`** module, the **`https`** module requires an **SSL/TLS certificate** to establish a secure connection.

```javascript
import https from "node:https";
import fs from "node:fs";

// Read SSL certificate and private key
const options = {
  key: fs.readFileSync("key.pem"),
  cert: fs.readFileSync("cert.pem"),
};

// Create HTTPS server
const server = https.createServer(options, (req, res) => {
  res.writeHead(200, {
    "Content-Type": "text/plain",
  });

  res.end("Secure Server");
});

// Start server on HTTPS port
server.listen(443, () => {
  console.log("HTTPS Server is running on https://localhost:443");
});
```

### Explanation

- `https.createServer()` creates a secure HTTPS server.
- `key.pem` contains the server's **private key**.
- `cert.pem` contains the server's **SSL/TLS certificate**.
- The browser verifies the certificate before establishing a secure connection.
- All data exchanged between the client and server is encrypted.

### Request Flow

```text
Browser
    │
    ▼
HTTPS Request
    │
    ▼
SSL/TLS Handshake
    │
    ▼
Node HTTPS Server
    │
    ▼
Response
    │
    ▼
Browser
```

### Why are `key.pem` and `cert.pem` required?

- **Private Key (`key.pem`)**
  - Secret key owned by the server.
  - Used to decrypt data and prove the server's identity.
  - Must never be shared.

- **Certificate (`cert.pem`)**
  - Public certificate issued by a Certificate Authority (CA) or self-signed.
  - Contains the server's public key and identity information.
  - Sent to the browser during the SSL/TLS handshake.

### Real-World Deployment

In production, the HTTPS server often looks like this:

```text
Browser
      │
 HTTPS Request
      │
      ▼
Nginx / Load Balancer
      │
      ▼
Node.js Application
```

In many deployments:

- Nginx or a cloud load balancer handles SSL/TLS.
- Node.js receives normal HTTP requests from the reverse proxy.
- This improves performance and simplifies certificate management.

### Interview Questions

**Why do we need `key.pem` and `cert.pem`?**

Because HTTPS requires SSL/TLS encryption. The private key is used by the server to establish a secure connection, while the certificate is used by the client to verify the server's identity.

**Can an HTTPS server run without certificates?**

No. An HTTPS server requires a private key and a certificate. Without them, it cannot establish a secure SSL/TLS connection.

**Why do many production applications use Nginx with Node.js instead of `https.createServer()`?**

Because Nginx (or a cloud load balancer) can terminate SSL/TLS, manage certificates, handle load balancing, serve static files efficiently, and forward requests to the Node.js application over HTTP.

```

```
