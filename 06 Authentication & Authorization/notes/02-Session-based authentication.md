# Session-Based Authentication

> **Interview Definition:**
> **Session-Based Authentication** is a stateful authentication mechanism where the **server stores the user's session data**, and the client stores only a **Session ID** (usually in a cookie). On every request, the browser sends the Session ID, and the server uses it to identify the authenticated user.

---

# Table of Contents

1. What is Session-Based Authentication?
2. Why Do We Need Sessions?
3. How Session Authentication Works
4. Authentication Flow
5. Session Lifecycle
6. Cookies & Session IDs
7. Session Storage
8. Express Session Example
9. Login & Logout Flow
10. Advantages
11. Disadvantages
12. Session vs JWT
13. Best Practices
14. Common Interview Questions
15. Quick Revision
16. Interview Answer

---

# 1. What is Session-Based Authentication?

In Session Authentication, the server remembers the logged-in user.

After successful login:

- Server creates a Session.
- Server stores session data.
- Server sends a Session ID to the client.
- Client stores the Session ID inside a cookie.
- Every future request automatically sends the cookie.

---

# 2. Why Do We Need Sessions?

Imagine a user logs in.

```text id="session001"
Email

↓

Password

↓

Login Successful
```

Without sessions:

```text id="session002"
Next Request

↓

Who are you?

↓

Login Again
```

The user would need to log in on every request.

Sessions solve this problem.

---

# 3. How Session Authentication Works

```text id="session003"
Client

      │

      ▼

POST /login

      │

      ▼

Server

      │

Verify Email & Password

      │

      ▼

Create Session

      │

Store Session in Memory/Redis/DB

      │

      ▼

Generate Session ID

      │

      ▼

Set Cookie

      │

      ▼

Browser Stores Cookie
```

Next request

```text id="session004"
GET /profile

↓

Cookie Sent Automatically

↓

Server Reads Session ID

↓

Find Session

↓

User Authenticated
```

---

# 4. Authentication Flow

```text id="session005"
Login Request

↓

Verify Credentials

↓

Create Session

↓

Store Session

↓

Return Cookie

↓

Future Requests

↓

Session Verified
```

---

# 5. Session Lifecycle

```text id="session006"
User Logs In

↓

Session Created

↓

Session Stored

↓

Multiple Requests

↓

Logout

↓

Session Destroyed
```

---

# 6. Cookies & Session IDs

The browser stores only the Session ID.

Example Cookie

```text id="session007"
connect.sid=s%3Aabc123xyz
```

The actual user information stays on the server.

Server

```javascript id="session008"
Session ID

↓

abc123

↓

{

    userId: "123",

    role: "admin"

}
```

---

# 7. Where Are Sessions Stored?

During development

```text id="session009"
Express Memory Store
```

Production

```text id="session010"
Redis

MongoDB

Database

Other Session Stores
```

Never use the default Memory Store in production because it isn't designed for scalability or long-running production workloads.

---

# 8. Express Session Example

Install

```bash id="session011"
pnpm add express-session
```

Basic setup

```javascript id="session012"
import express from "express";
import session from "express-session";

const app = express();

app.use(
  session({
    secret: "my-secret-key",
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 60 * 60 * 1000,
    },
  }),
);
```

---

## Creating a Session

After login

```javascript id="session013"
app.post("/login", (req, res) => {
  req.session.user = {
    id: 1,
    name: "Nitish",
  };

  res.send("Logged In");
});
```

---

## Reading a Session

```javascript id="session014"
app.get("/profile", (req, res) => {
  if (!req.session.user) {
    return res.status(401).send("Login Required");
  }

  res.json(req.session.user);
});
```

---

## Destroying a Session

Logout

```javascript id="session015"
app.post("/logout", (req, res) => {
  req.session.destroy(() => {
    res.send("Logged Out");
  });
});
```

---

# 9. Login & Logout Flow

Login

```text id="session016"
Email

↓

Password

↓

Verify

↓

Create Session

↓

Cookie Sent
```

Logout

```text id="session017"
Logout Request

↓

Destroy Session

↓

Cookie Invalid

↓

User Logged Out
```

---

# 10. Advantages

✅ Simple to implement

✅ Browser automatically sends cookies

✅ Sensitive user data stays on the server

✅ Easy to invalidate by deleting the session

---

# 11. Disadvantages

❌ Server must store every user's session.

❌ Harder to scale across multiple servers without a shared session store.

❌ Additional infrastructure (such as Redis) is commonly required for scalable deployments.

---

# 12. Session vs JWT

| Session                  | JWT                                         |
| ------------------------ | ------------------------------------------- |
| Stateful                 | Stateless                                   |
| Server stores session    | Client stores token                         |
| Easy logout              | Logout requires token invalidation strategy |
| Requires session storage | No server-side session storage              |

---

# 13. Best Practices

✅ Store sessions in Redis or another production-ready session store.

✅ Use HTTPS in production.

✅ Set cookies as `HttpOnly`.

✅ Use the `Secure` flag in production.

✅ Use `SameSite` to reduce CSRF risk.

✅ Destroy the session on logout.

---

# 14. Common Interview Questions

### What is Session Authentication?

A stateful authentication system where the server stores session data.

---

### Where is the Session stored?

On the server.

---

### What is stored in the browser?

Only the Session ID inside a cookie.

---

### Is Session Authentication Stateful?

Yes.

The server maintains authentication state.

---

### Why use Redis?

To share session data across multiple application servers and provide fast session access.

---

# 15. Quick Revision

| Feature                  | Session Authentication |
| ------------------------ | ---------------------- |
| Stateful                 | ✅                     |
| Server stores session    | ✅                     |
| Client stores Session ID | ✅                     |
| Uses Cookies             | ✅                     |
| Easy Logout              | ✅                     |
| Requires Session Store   | ✅                     |

---

# 16. Interview Answer

> **Session-Based Authentication is a stateful authentication mechanism where the server stores user session information and the client stores only a Session ID, typically in a cookie. After a successful login, the server creates a session, stores user-related data, and sends the Session ID to the browser. On subsequent requests, the browser automatically includes the cookie, allowing the server to identify the user. Session-based authentication is simple to implement and makes logout straightforward because the server can invalidate the stored session. In production environments, sessions are commonly stored in Redis or another shared session store rather than the default in-memory store.**
