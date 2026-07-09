# JWT (JSON Web Token) Structure

> **Interview Definition:**
> A **JSON Web Token (JWT)** is a compact, URL-safe token used to securely transmit information between a client and a server. A JWT consists of **three parts**: **Header**, **Payload**, and **Signature**, separated by dots (`.`). The server verifies the signature to ensure the token has not been tampered with.

---

# Table of Contents

1. What is JWT?
2. Why Do We Need JWT?
3. JWT Structure
4. Header
5. Payload
6. Signature
7. Complete JWT Example
8. How JWT is Created
9. How JWT is Verified
10. JWT Flow
11. JWT Claims
12. Best Practices
13. Common Interview Questions
14. Quick Revision
15. Interview Answer

---

# 1. What is JWT?

JWT stands for **JSON Web Token**.

It is commonly used for:

- Authentication
- Authorization
- Secure API communication

Instead of storing a session on the server, the server sends a signed token to the client.

---

# 2. Why Do We Need JWT?

Without JWT

```text
Client

↓

Login

↓

Server Creates Session

↓

Server Stores Session
```

With JWT

```text
Client

↓

Login

↓

Server Creates JWT

↓

Client Stores JWT

↓

Future Requests

↓

Server Verifies JWT
```

The server doesn't need to maintain session state for every user.

---

# 3. JWT Structure

A JWT has **three parts**.

```text
HEADER.PAYLOAD.SIGNATURE
```

Example

```text
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.
eyJ1c2VySWQiOiIxMjMiLCJyb2xlIjoiYWRtaW4ifQ.
X7wM3N2Q1kQjzKqkYxK4sL9Lh6R4QvD9mJcF7P2A9Y
```

Structure

```text
Header
   .
Payload
   .
Signature
```

---

# 4. Header

The Header contains metadata about the token.

Decoded Header

```json
{
  "alg": "HS256",
  "typ": "JWT"
}
```

Meaning

| Field | Description       |
| ----- | ----------------- |
| `alg` | Signing algorithm |
| `typ` | Token type (JWT)  |

Common algorithms

- HS256
- HS384
- HS512
- RS256

---

# 5. Payload

The Payload contains **claims**.

Example

```json
{
  "userId": "68723abc",
  "name": "Nitish",
  "role": "admin"
}
```

The payload stores information about the user.

⚠️ **Important:** The payload is **Base64URL encoded, not encrypted**.

Anyone who has the token can decode the payload.

Never store:

- Passwords
- Credit card numbers
- API secrets
- Sensitive personal data

---

# 6. Signature

The Signature protects the JWT from tampering.

Conceptually

```text
HMACSHA256(

Header

+

Payload,

Secret Key
)
```

If someone modifies the Header or Payload:

```text
Signature

↓

Invalid

↓

JWT Rejected
```

---

# 7. Complete JWT Example

JWT

```text
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.
eyJ1c2VySWQiOiIxMjMiLCJyb2xlIjoiYWRtaW4ifQ.
X7wM3N2Q1kQjzKqkYxK4sL9Lh6R4QvD9mJcF7P2A9Y
```

Breaking it apart

### Header

```json
{
  "alg": "HS256",
  "typ": "JWT"
}
```

↓

### Payload

```json
{
  "userId": "123",
  "role": "admin"
}
```

↓

### Signature

```text
Secure Hash Generated Using Secret Key
```

---

# 8. How JWT is Created

```text
Header

      │

      ▼

Payload

      │

      ▼

Secret Key

      │

      ▼

Generate Signature

      │

      ▼

JWT
```

Node.js Example

```javascript
import jwt from "jsonwebtoken";

const token = jwt.sign(
  {
    userId: "123",
    role: "admin",
  },
  process.env.JWT_SECRET,
  {
    expiresIn: "1h",
  },
);

console.log(token);
```

---

# 9. How JWT is Verified

Client sends

```http
GET /profile

Authorization: Bearer <jwt-token>
```

Server

```javascript
import jwt from "jsonwebtoken";

const decoded = jwt.verify(token, process.env.JWT_SECRET);

console.log(decoded);
```

Flow

```text
Receive JWT

↓

Verify Signature

↓

Valid?

↓

Yes

↓

Extract Payload
```

---

# 10. JWT Authentication Flow

```text
User Login

      │

      ▼

Verify Credentials

      │

      ▼

Generate JWT

      │

      ▼

Return JWT

      │

      ▼

Client Stores JWT

      │

      ▼

Future Requests

      │

      ▼

Authorization Header

      │

      ▼

Verify JWT

      │

      ▼

Authenticated
```

---

# 11. JWT Claims

JWT Payload contains **claims**.

### Registered Claims

| Claim | Meaning           |
| ----- | ----------------- |
| `sub` | Subject (User ID) |
| `iss` | Issuer            |
| `aud` | Audience          |
| `iat` | Issued At         |
| `exp` | Expiration Time   |
| `nbf` | Not Before        |
| `jti` | JWT ID            |

Example

```json
{
  "sub": "68723abc",
  "exp": 1783200000,
  "iat": 1783196400
}
```

---

### Public Claims

Defined by applications.

Example

```json
{
  "role": "admin",
  "department": "engineering"
}
```

---

### Private Claims

Custom application data.

Example

```json
{
  "userId": "123",
  "subscription": "premium"
}
```

---

# 12. Best Practices

✅ Store only necessary information in the payload.

✅ Never store passwords or secrets in a JWT.

✅ Use HTTPS.

✅ Use short-lived access tokens.

✅ Keep the signing secret secure.

✅ Always verify JWT signatures on the server.

---

# 13. Common Interview Questions

### What are the three parts of a JWT?

- Header
- Payload
- Signature

---

### Is JWT encrypted?

No.

JWT is **signed**, not encrypted.

The payload can be decoded.

---

### What is the purpose of the Signature?

It ensures the token has not been modified.

---

### Where is user information stored?

Inside the Payload as claims.

---

### Can users modify the payload?

They can decode and modify it locally, but if they change the payload, the signature becomes invalid and the server rejects the token.

---

# 14. Quick Revision

| Part      | Purpose                |
| --------- | ---------------------- |
| Header    | Algorithm & token type |
| Payload   | Claims & user data     |
| Signature | Prevents tampering     |

---

# 15. Interview Answer

> **A JSON Web Token (JWT) consists of three parts: Header, Payload, and Signature. The Header contains metadata such as the signing algorithm and token type. The Payload contains claims like the user ID, role, and token expiration time. The Signature is generated using the Header, Payload, and a secret key or private key, ensuring that the token has not been modified. JWTs are signed—not encrypted—so the payload can be decoded by anyone who has the token, which is why sensitive information such as passwords should never be stored inside a JWT.**
