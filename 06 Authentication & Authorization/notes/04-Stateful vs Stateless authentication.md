# Stateful vs Stateless Authentication

> **Interview Definition:**
> **Stateful Authentication** means the **server stores the user's authentication state** (usually in a session). **Stateless Authentication** means the **server does not store any authentication state**; instead, the client sends a token (usually a JWT) with every request, and the server verifies it.

---

# Table of Contents

1. What is Stateful Authentication?
2. What is Stateless Authentication?
3. Why Do We Need These Approaches?
4. Stateful Authentication Flow
5. Stateless Authentication Flow
6. Stateful vs Stateless Comparison
7. Real-world Examples
8. Code Examples
9. When to Use Stateful
10. When to Use Stateless
11. Best Practices
12. Common Interview Questions
13. Quick Revision
14. Interview Answer

---

# 1. What is Stateful Authentication?

In Stateful Authentication, the server remembers the user.

After login:

- Server creates a session.
- Server stores user information.
- Client stores only a Session ID.
- Every request includes the Session ID.

Example

```text
User Login

↓

Server Creates Session

↓

Store Session

↓

Return Session ID

↓

Browser Stores Cookie

↓

Future Requests

↓

Session Verified
```

The server always knows who the user is because it stores the session.

---

# 2. What is Stateless Authentication?

In Stateless Authentication, the server does **not** remember the user.

Instead:

- User logs in.
- Server generates a JWT.
- Client stores the JWT.
- Client sends the JWT with every request.
- Server verifies the JWT.

```text
Login

↓

Generate JWT

↓

Client Stores JWT

↓

Future Requests

↓

Verify JWT

↓

Authenticated
```

No session is stored on the server.

---

# 3. Why Do We Need These Approaches?

Every request to an HTTP server is independent.

```text
Request 1

↓

Server Responds

↓

Request 2

↓

Server Doesn't Automatically Know
Who Sent Request 2
```

Authentication provides a way to identify the user on every request.

---

# 4. Stateful Authentication Flow

```text
Client

     │

POST /login

     ▼

Server

     │

Verify Password

     ▼

Create Session

     ▼

Store Session

     ▼

Return Session ID

     ▼

Browser Stores Cookie

     ▼

Future Requests

     ▼

Session ID

     ▼

Find Session

     ▼

Authenticated
```

---

# 5. Stateless Authentication Flow

```text
Client

      │

POST /login

      ▼

Server

      │

Verify Password

      ▼

Generate JWT

      ▼

Return JWT

      ▼

Client Stores JWT

      ▼

Future Requests

      ▼

Authorization Header

      ▼

Verify JWT

      ▼

Authenticated
```

---

# 6. Stateful vs Stateless

| Stateful                           | Stateless                                  |
| ---------------------------------- | ------------------------------------------ |
| Server stores session              | Server stores no session                   |
| Uses Session ID                    | Uses JWT/Token                             |
| Cookie usually contains Session ID | Header or Cookie contains JWT              |
| Requires session storage           | No session storage                         |
| Logout is simple                   | Logout needs a token invalidation strategy |
| Harder to scale                    | Easier to scale                            |

---

# 7. Real-world Example

## Stateful

Hotel Reception

```text
Check In

↓

Reception Stores Details

↓

Room Card

↓

Need Help?

↓

Reception Looks Up Record
```

The hotel keeps your information.

---

## Stateless

Airport Boarding Pass

```text
Check In

↓

Receive Boarding Pass

↓

Walk Through Airport

↓

Show Boarding Pass

↓

Verified
```

The boarding pass carries the information needed for verification.

---

# 8. Code Examples

## Stateful (Session)

```javascript
app.post("/login", (req, res) => {
  req.session.user = {
    id: 1,

    name: "Nitish",
  };

  res.send("Logged In");
});
```

Later

```javascript
app.get("/profile", (req, res) => {
  console.log(req.session.user);
});
```

---

## Stateless (JWT)

Login

```javascript
const token = jwt.sign(
  {
    id: user._id,
  },

  process.env.JWT_SECRET,
);
```

Verify

```javascript
const decoded = jwt.verify(
  token,

  process.env.JWT_SECRET,
);
```

---

# 9. When to Use Stateful

Good for:

- Traditional web applications
- Admin dashboards
- Internal company tools
- Applications where server-side session management is acceptable

Example

```text
Employee Portal

↓

Session Authentication
```

---

# 10. When to Use Stateless

Good for:

- REST APIs
- Mobile applications
- Microservices
- Public APIs
- Single Page Applications (SPAs)

Example

```text
React App

↓

Express API

↓

JWT Authentication
```

---

# 11. Best Practices

### Stateful

✅ Store sessions in Redis.

✅ Use secure cookies.

✅ Destroy sessions on logout.

---

### Stateless

✅ Use short-lived Access Tokens.

✅ Use Refresh Tokens.

✅ Always verify the token.

✅ Use HTTPS.

---

# 12. Common Interview Questions

### What is Stateful Authentication?

The server stores user session information.

---

### What is Stateless Authentication?

The server stores no authentication state.

Each request contains a token.

---

### Which is easier to scale?

Stateless Authentication.

---

### Why?

Because there is no shared session state that must be synchronized across servers.

---

### Which uses Sessions?

Stateful Authentication.

---

### Which uses JWT?

Stateless Authentication.

---

# 13. Quick Revision

| Feature       | Stateful | Stateless         |
| ------------- | -------- | ----------------- |
| Session       | ✅       | ❌                |
| JWT           | ❌       | ✅                |
| Server Memory | Required | Not Required      |
| Scalable      | Less     | More              |
| Logout        | Easy     | Requires strategy |
| REST API      | Possible | Common Choice     |

---

# 14. Interview Answer

> **Stateful Authentication stores user session information on the server. After login, the client receives a Session ID, which is sent with future requests so the server can identify the user. Stateless Authentication does not store authentication state on the server. Instead, the client stores a token, typically a JWT, and includes it with every request. The server verifies the token without looking up session data. Stateful authentication is commonly used in traditional web applications, while stateless authentication is widely used for REST APIs, mobile applications, and microservices because it scales more easily.**
