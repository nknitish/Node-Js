# Session Stores (Memory, Redis, MongoDB)

> **Interview Definition:**  
> A **Session Store** is the place where `express-session` stores session data. The browser only stores the **Session ID**, while the actual user session is stored on the server inside a session store. Different session stores provide different levels of performance, scalability, persistence, and reliability.

---

# Table of Contents

1. What is a Session Store?
2. Why Do We Need a Session Store?
3. Session Storage Flow
4. Memory Store
5. Redis Store
6. MongoDB Store
7. Comparing Session Stores
8. Express.js Examples
9. Production Architecture
10. Best Practices
11. Common Interview Questions
12. Quick Revision
13. Interview Answer

---

# 1. What is a Session Store?

When using `express-session`,

the browser only stores

```text
connect.sid
```

The actual session data is stored in a **Session Store**.

```text
Browser

↓

connect.sid

↓

Server

↓

Session Store

↓

User Session Data
```

---

# 2. Why Do We Need a Session Store?

Suppose a user logs in.

```text
Login

↓

Create Session

↓

Store User Data

↓

Return Session ID
```

Future requests

```text
Session ID

↓

Find Session

↓

Authenticate User
```

Without a Session Store,

the server would have nowhere to retrieve the user's session.

---

# 3. Session Storage Flow

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

        │

        ▼

Memory / Redis / MongoDB

        │

        ▼

Browser Receives Cookie

(connect.sid)

        │

        ▼

Next Request

        │

        ▼

Session ID

        │

        ▼

Find Session

        │

        ▼

Authenticated
```

---

# 4. Memory Store

Default store used by `express-session`.

```text
Express

↓

Memory

↓

Sessions
```

Example

```javascript
app.use(
  session({
    secret: process.env.SESSION_SECRET,
  }),
);
```

No extra configuration is required because the default Memory Store is used.

---

## Advantages

✅ Easy

✅ No setup

✅ Good for learning

---

## Disadvantages

❌ Sessions disappear after server restart.

❌ Doesn't work with multiple servers.

❌ Memory leaks.

❌ Not suitable for production.

---

Example

```text
Server Restart

↓

Memory Cleared

↓

All Users Logged Out
```

---

# 5. Redis Store

Most popular production session store.

```text
Express

↓

Redis

↓

Session Data
```

Redis is an **in-memory database** optimized for speed.

---

## Advantages

✅ Extremely fast

✅ Shared across multiple servers

✅ Supports automatic expiration (TTL)

✅ Highly scalable

---

## Disadvantages

❌ Requires Redis server

❌ Additional infrastructure

---

## Express Example

Install

```bash
pnpm add connect-redis redis
```

```javascript
import session from "express-session";
import RedisStore from "connect-redis";
import { createClient } from "redis";

const redisClient = createClient();

await redisClient.connect();

app.use(
  session({
    store: new RedisStore({
      client: redisClient,
    }),

    secret: process.env.SESSION_SECRET,

    resave: false,

    saveUninitialized: false,
  }),
);
```

---

## Redis TTL

```text
Session Created

↓

30 Minutes

↓

Automatically Deleted
```

Redis removes expired sessions automatically.

---

# 6. MongoDB Store

Sessions are stored inside MongoDB.

```text
Express

↓

MongoDB

↓

Sessions Collection
```

Usually implemented using

```text
connect-mongo
```

---

Install

```bash
pnpm add connect-mongo
```

Example

```javascript
import MongoStore from "connect-mongo";

app.use(
  session({
    store: MongoStore.create({
      mongoUrl: process.env.MONGO_URI,
    }),

    secret: process.env.SESSION_SECRET,

    resave: false,

    saveUninitialized: false,
  }),
);
```

---

Example Session Document

```javascript
{
    "_id": "...",

    "session": {

        "userId": "123"

    },

    "expires": "2026-08-01"
}
```

---

## Advantages

✅ Easy if already using MongoDB

✅ Persistent

✅ Survives server restart

---

## Disadvantages

❌ Slower than Redis

❌ Not optimized specifically for sessions

---

# 7. Comparing Session Stores

| Feature          | Memory | Redis                        | MongoDB        |
| ---------------- | ------ | ---------------------------- | -------------- |
| Development      | ✅     | ⚠️                           | ⚠️             |
| Production       | ❌     | ✅                           | ✅             |
| Fast             | ⚠️     | ✅                           | ❌             |
| Persistent       | ❌     | Depends on Redis persistence | ✅             |
| Multiple Servers | ❌     | ✅                           | ✅             |
| Auto Expiration  | ❌     | ✅                           | ✅ (TTL Index) |

---

# 8. Express.js Examples

## Default Memory Store

```javascript
app.use(
  session({
    secret: process.env.SESSION_SECRET,
  }),
);
```

---

## Redis

```javascript
store: new RedisStore({
  client: redisClient,
});
```

---

## MongoDB

```javascript
store: MongoStore.create({
  mongoUrl: process.env.MONGO_URI,
});
```

---

# 9. Production Architecture

```text
                User

                  │

                  ▼

             Express App

                  │

                  ▼

          express-session

                  │

                  ▼

             Redis Store

                  │

                  ▼

           Session Data

                  │

                  ▼

              Database
```

Multiple Servers

```text
          Load Balancer

         /      |      \

       App1   App2   App3

          \      |      /

             Redis Store
```

All application servers share the same session store.

---

# 10. Best Practices

✅ Never use Memory Store in production.

✅ Use Redis for large-scale applications.

✅ Use MongoDB only if Redis isn't available.

✅ Configure session expiration.

✅ Use HTTPS.

✅ Enable HttpOnly.

✅ Use Secure cookies.

---

# 11. Common Interview Questions

### Why shouldn't Memory Store be used in production?

Because:

- Sessions disappear after restart.
- Doesn't scale.
- Memory leaks.

---

### Why is Redis preferred?

Because it is:

- Fast
- Shared
- Supports TTL
- Scalable

---

### Can MongoDB store sessions?

Yes.

Using

```text
connect-mongo
```

---

### Does the browser store session data?

No.

Only

```text
connect.sid
```

---

### Can multiple servers share sessions?

Yes.

Using Redis or MongoDB.

---

# 12. Quick Revision

| Store   | Usage                  |
| ------- | ---------------------- |
| Memory  | Development            |
| Redis   | Production             |
| MongoDB | Production Alternative |

---

# 13. Interview Answer

> **A Session Store is the backend storage used by `express-session` to keep user session data. The browser stores only the Session ID in a cookie, while the actual session information is stored on the server. The default Memory Store is useful only for development because sessions are lost after a server restart and it doesn't scale across multiple instances. In production, Redis is the most common session store because it is fast, supports automatic expiration (TTL), and allows multiple application servers to share sessions. MongoDB is another option, especially when the application already uses MongoDB, but Redis is generally preferred for high-performance session management.**

---

# ⭐ Interview Tips

## Session Storage

```text
Browser

↓

connect.sid

↓

Express

↓

Session Store

↓

User Data
```

---

## Memory Store

```text
Server Restart

↓

Memory Cleared

↓

Sessions Lost
```

---

## Redis

```text
Express

↓

Redis

↓

TTL

↓

Automatic Cleanup
```

---

## Production Architecture

```text
Load Balancer

      │

 ┌────┴────┐

 ▼         ▼

App1     App2

  \       /

   \     /

    Redis

      │

 Sessions
```

---

# ⭐ Most Asked Interview Questions

### Q1. Why is Redis faster than MongoDB for sessions?

Redis stores data **in memory (RAM)**, making reads and writes extremely fast.

MongoDB stores data on disk (with caching), which is excellent for persistence but generally slower for frequent session lookups.

---

### Q2. Why can't multiple servers use the Memory Store?

Example

```text
Request 1

↓

App Server A

↓

Session Created
```

Next request

```text
↓

App Server B

↓

Session Missing
```

Each server has its own memory, so sessions are not shared.

Redis solves this by providing a **centralized session store**.

---

### Q3. What is TTL?

TTL stands for **Time To Live**.

Example

```text
Session

↓

30 Minutes

↓

Automatically Deleted
```

Redis supports TTL natively, while MongoDB can achieve similar behavior using **TTL indexes**.

---

### Q4. Which session store is used by most companies?

For Node.js and Express applications, the most common choice is:

```text
express-session

↓

Redis

↓

Session Data
```

because it provides excellent performance, scalability, automatic expiration, and supports distributed applications behind load balancers.
