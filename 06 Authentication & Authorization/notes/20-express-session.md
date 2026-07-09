# express-session

> **Interview Definition:**  
> **express-session** is an Express.js middleware used to implement **server-side session management**. It creates a unique **Session ID**, stores session data on the server, and sends only the Session ID to the client inside a cookie. On every request, the browser automatically sends the Session ID cookie, allowing the server to retrieve the user's session data.

---

# Table of Contents

1. What is express-session?
2. Why Do We Need Sessions?
3. How express-session Works
4. Session Lifecycle
5. Installing express-session
6. Basic Setup
7. Creating a Session
8. Reading Session Data
9. Destroying a Session (Logout)
10. Session Flow
11. express-session Options
12. Default Memory Store
13. Session ID vs Session Data
14. express-session vs JWT
15. Best Practices
16. Common Interview Questions
17. Quick Revision
18. Interview Answer

---

# 1. What is express-session?

`express-session` is middleware that enables **server-side sessions**.

Instead of storing user information in the browser,

the browser stores only a **Session ID**.

```text
Browser

↓

Session ID Cookie

↓

Server

↓

Session Data
```

---

# 2. Why Do We Need Sessions?

Suppose a user logs in.

Without sessions

```text
Login

↓

Next Request

↓

Server Doesn't Know User
```

With sessions

```text
Login

↓

Session Created

↓

Session ID Cookie

↓

Future Requests

↓

User Identified
```

---

# 3. How express-session Works

```text
User Login

        │

        ▼

Server Creates Session

        │

        ▼

Generate Session ID

        │

        ▼

Store Session Data

(Server)

        │

        ▼

Send Session ID Cookie

        │

        ▼

Browser Stores Cookie

        │

        ▼

Next Request

        │

        ▼

Browser Sends Session ID

        │

        ▼

Server Looks Up Session

        │

        ▼

Authenticated
```

---

# 4. Session Lifecycle

```text
User Visits Site

↓

No Session

↓

Login

↓

Create Session

↓

Store Session Data

↓

Session Cookie

↓

Multiple Requests

↓

Logout

↓

Destroy Session
```

---

# 5. Installing express-session

Install

```bash
pnpm add express-session
```

Import

```javascript
import session from "express-session";
```

---

# 6. Basic Setup

```javascript
import express from "express";
import session from "express-session";

const app = express();

app.use(
  session({
    secret: process.env.SESSION_SECRET,

    resave: false,

    saveUninitialized: false,

    cookie: {
      maxAge: 30 * 60 * 1000,
    },
  }),
);
```

---

## What do these options mean?

### secret

Used to sign the Session ID cookie.

```javascript
secret: process.env.SESSION_SECRET;
```

Always use a long random secret.

---

### resave

```javascript
resave: false;
```

Prevents saving an unchanged session back to the store on every request.

Recommended:

```javascript
false;
```

---

### saveUninitialized

```javascript
saveUninitialized: false;
```

Don't create an empty session until something is actually stored in it.

Recommended:

```javascript
false;
```

---

### cookie

Controls session cookie settings.

```javascript
cookie: {
  maxAge: 30 * 60 * 1000;
}
```

---

# 7. Creating a Session

Login Example

```javascript
app.post("/login", (req, res) => {
  req.session.user = {
    id: 123,

    name: "Nitish",

    role: "admin",
  };

  res.send("Login Successful");
});
```

Now

```text
Server Session

↓

{

    user: {

        id:123,

        role:"admin"

    }

}
```

---

# 8. Reading Session Data

```javascript
app.get("/profile", (req, res) => {
  console.log(req.session.user);

  res.json(req.session.user);
});
```

---

# 9. Destroying a Session (Logout)

```javascript
app.post("/logout", (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.sendStatus(500);
    }

    res.clearCookie("connect.sid");

    res.send("Logged Out");
  });
});
```

---

# 10. Session Flow

```text
Login

↓

Create Session

↓

Store User Data

↓

Generate Session ID

↓

Browser Stores Cookie

↓

API Request

↓

Session ID

↓

Server Looks Up Session

↓

Authenticated
```

---

# 11. express-session Options

| Option            | Purpose                            |
| ----------------- | ---------------------------------- |
| secret            | Signs Session ID                   |
| resave            | Save unchanged sessions            |
| saveUninitialized | Save empty sessions                |
| cookie            | Cookie settings                    |
| name              | Cookie name                        |
| rolling           | Reset expiration on every response |

Example

```javascript
app.use(
  session({
    secret: process.env.SESSION_SECRET,

    resave: false,

    saveUninitialized: false,

    name: "session",

    rolling: true,
  }),
);
```

---

# 12. Default Memory Store

By default

```text
express-session

↓

Memory Store
```

Good for

```text
Development
```

Bad for

```text
Production
```

Reasons

- Memory leak
- Lost after restart
- Doesn't work across multiple servers

Production uses

- Redis
- MongoDB
- SQL Database

---

# 13. Session ID vs Session Data

Browser

```text
Cookie

↓

connect.sid

↓

abc123xyz
```

Server

```text
Session Store

↓

abc123xyz

↓

{

    userId:123,

    role:"admin"

}
```

The browser never receives the actual session data.

---

# 14. express-session vs JWT

| express-session            | JWT                                                            |
| -------------------------- | -------------------------------------------------------------- |
| Stateful                   | Stateless                                                      |
| Stores data on server      | Stores claims inside token                                     |
| Cookie contains Session ID | Token contains user info                                       |
| Server lookup required     | No lookup required (unless app needs additional data)          |
| Easy logout                | Logout often requires refresh-token revocation or token expiry |

---

# 15. Best Practices

✅ Store sessions in Redis in production.

✅ Use HTTPS.

✅ Use HttpOnly cookies.

✅ Set Secure flag.

✅ Set SameSite.

✅ Destroy sessions during logout.

✅ Rotate Session ID after login to prevent session fixation.

---

# 16. Common Interview Questions

### What is express-session?

Middleware for server-side session management.

---

### What is stored in the browser?

Only the Session ID.

---

### Where is user data stored?

On the server.

---

### Does express-session use cookies?

Yes.

Cookies store the Session ID.

---

### Is express-session stateful?

Yes.

---

# 17. Quick Revision

| Feature             | express-session |
| ------------------- | --------------- |
| Stateful            | ✅              |
| Uses Cookies        | ✅              |
| Stores Session Data | Server          |
| Stores Session ID   | Browser         |
| Production Store    | Redis           |

---

# 18. Interview Answer

> **express-session is an Express.js middleware that provides server-side session management. When a user logs in, the server creates a session, stores user-related data in a session store, generates a unique Session ID, and sends that Session ID to the browser inside a cookie. On every subsequent request, the browser automatically sends the Session ID cookie, allowing the server to retrieve the corresponding session data and authenticate the user. By default, express-session uses an in-memory store, which is suitable only for development. In production, session data should be stored in a shared store such as Redis.**

---

# ⭐ Interview Tips

## express-session Flow

```text
User Login

      │

      ▼

Create Session

      │

      ▼

Generate Session ID

      │

      ▼

Store Session

(Server)

      │

      ▼

Send Cookie

(connect.sid)

      │

      ▼

Browser Stores Cookie

      │

      ▼

Future Request

      │

      ▼

Session ID

      │

      ▼

Lookup Session

      │

      ▼

Authenticated
```

---

## Browser vs Server

```text
Browser

↓

connect.sid

↓

abc123


Server

↓

abc123

↓

User Data
```

---

## Session Architecture

```text
Client

↓

Session Cookie

↓

Express

↓

Session Store

↓

User Data
```

---

# ⭐ Most Asked Interview Questions

### Q1. Why doesn't the browser store the entire session?

Because the session data stays on the server.

The browser only stores:

```text
Session ID

↓

connect.sid
```

This keeps sensitive data off the client.

---

### Q2. What happens if the server restarts while using the default Memory Store?

```text
Server Restart

↓

Memory Cleared

↓

All Sessions Lost
```

This is why the default Memory Store should **never** be used in production.

---

### Q3. Why is Redis commonly used with express-session?

Redis is:

- Extremely fast (in-memory)
- Shared across multiple application servers
- Supports session expiration (TTL)
- Survives application restarts (depending on Redis persistence settings)

This makes it ideal for scalable session management.

---

### Q4. How does express-session differ from JWT authentication?

**express-session**

```text
Browser

↓

Session ID

↓

Server

↓

Lookup Session
```

**JWT**

```text
Browser

↓

JWT

↓

Server

↓

Verify Signature
```

With `express-session`, the server stores session state.

With JWT authentication, the token carries claims and the server verifies the token instead of looking up session data (though applications may still query a database for additional user information).
