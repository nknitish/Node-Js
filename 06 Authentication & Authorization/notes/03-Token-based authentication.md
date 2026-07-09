# Token-Based Authentication

> **Interview Definition:**
> **Token-Based Authentication** is a **stateless authentication mechanism** where, after a successful login, the server generates a **token** (usually a JWT) and sends it to the client. The client stores the token and includes it in every subsequent request. The server verifies the token instead of storing session data.

---

# Table of Contents

1. What is Token-Based Authentication?
2. Why Do We Need Tokens?
3. How Token Authentication Works
4. Authentication Flow
5. Token Lifecycle
6. Where is the Token Stored?
7. Sending Tokens
8. Express Example
9. Advantages
10. Disadvantages
11. Token vs Session Authentication
12. Best Practices
13. Common Interview Questions
14. Quick Revision
15. Interview Answer

---

# 1. What is Token-Based Authentication?

In Token Authentication, the **server does not remember the user**.

Instead:

- User logs in.
- Server generates a token.
- Client stores the token.
- Client sends the token with every request.
- Server verifies the token.

---

# 2. Why Do We Need Tokens?

Without tokens

```text id="token001"
Login

↓

Next Request

↓

Who are you?

↓

Login Again
```

With tokens

```text id="token002"
Login

↓

Generate Token

↓

Store Token

↓

Send Token

↓

Authenticated
```

---

# 3. How Token Authentication Works

```text id="token003"
Client

      │

      ▼

POST /login

      │

      ▼

Server

      │

Verify Credentials

      ▼

Generate JWT

      ▼

Return Token

      ▼

Client Stores Token

      ▼

Future Requests

      ▼

Authorization Header

↓

Bearer Token

↓

Server Verifies Token
```

---

# 4. Authentication Flow

```text id="token004"
User Login

↓

Verify Password

↓

Generate Token

↓

Return Token

↓

Store Token

↓

Future Requests

↓

Verify Token

↓

Authenticated
```

---

# 5. Token Lifecycle

```text id="token005"
Login

↓

Generate Token

↓

Client Stores Token

↓

Multiple Requests

↓

Token Expires

↓

Login Again

(or Refresh Token)
```

---

# 6. Where is the Token Stored?

Common options

### Local Storage

```text id="token006"
Browser

↓

localStorage
```

---

### Session Storage

```text id="token007"
Browser

↓

sessionStorage
```

---

### HttpOnly Cookie (Recommended)

```text id="token008"
Browser

↓

Secure Cookie
```

We'll discuss these options in detail later when covering cookies and JWT best practices.

---

# 7. Sending Tokens

Most REST APIs send tokens using the **Authorization** header.

```http id="token009"
GET /profile

Authorization: Bearer eyJhbGciOi...
```

Server

```text id="token010"
Read Header

↓

Extract Token

↓

Verify

↓

Allow Request
```

---

# 8. Express Example

### Login Route

```javascript id="token011"
import jwt from "jsonwebtoken";

app.post("/login", async (req, res) => {
  // Assume credentials are valid

  const token = jwt.sign(
    {
      userId: 1,
      role: "user",
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "1h",
    },
  );

  res.json({
    token,
  });
});
```

---

### Authentication Middleware

```javascript id="token012"
import jwt from "jsonwebtoken";

function authenticate(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({
      message: "Token Missing",
    });
  }

  const token = authHeader.split(" ")[1];

  try {
    const user = jwt.verify(token, process.env.JWT_SECRET);

    req.user = user;

    next();
  } catch {
    res.status(401).json({
      message: "Invalid Token",
    });
  }
}
```

---

### Protected Route

```javascript id="token013"
app.get(
  "/profile",

  authenticate,

  (req, res) => {
    res.json({
      message: "Welcome",

      user: req.user,
    });
  },
);
```

---

# 9. Advantages

✅ Stateless

✅ Easy to scale

✅ Suitable for mobile applications

✅ Suitable for microservices

✅ No server-side session storage

---

# 10. Disadvantages

❌ Harder to invalidate before expiration.

❌ Requires secure storage on the client.

❌ Token theft can be a security risk if tokens are exposed.

---

# 11. Token vs Session Authentication

| Session                    | Token                                  |
| -------------------------- | -------------------------------------- |
| Stateful                   | Stateless                              |
| Server stores session      | Client stores token                    |
| Cookie contains Session ID | Header or cookie contains token        |
| Easy logout                | Requires a token invalidation strategy |
| Needs session storage      | No server-side session storage         |

---

# 12. Best Practices

✅ Use HTTPS.

✅ Use short-lived Access Tokens.

✅ Store tokens securely.

✅ Verify every token.

✅ Rotate Refresh Tokens.

✅ Never expose your JWT secret.

---

# 13. Common Interview Questions

### What is Token Authentication?

A stateless authentication system that uses a token to identify users.

---

### Where is the token stored?

Typically:

- HttpOnly Cookie
- Local Storage
- Session Storage

---

### Where is the token sent?

Usually in the `Authorization` header.

---

### Is Token Authentication Stateless?

Yes.

The server does not store authentication state for each user.

---

### Why is it good for microservices?

Each service can verify the token independently without relying on shared session storage.

---

# 14. Quick Revision

| Feature                   | Token Authentication |
| ------------------------- | -------------------- |
| Stateless                 | ✅                   |
| Server stores session     | ❌                   |
| Client stores token       | ✅                   |
| Uses Authorization Header | ✅                   |
| Good for APIs             | ✅                   |
| Easy to Scale             | ✅                   |

---

# 15. Interview Answer

> **Token-Based Authentication is a stateless authentication mechanism in which the server generates a token, typically a JSON Web Token (JWT), after successful user authentication. The client stores the token and includes it in subsequent requests, usually in the `Authorization` header using the Bearer scheme. The server verifies the token on every request instead of maintaining session data. This approach scales well because the server does not need to store authentication state for each user, making it popular for REST APIs, mobile applications, and microservices.**
