# Authentication vs Authorization

> **Interview Definition:**
> **Authentication** is the process of verifying **who a user is**, while **Authorization** is the process of determining **what an authenticated user is allowed to do**.

---

# Table of Contents

1. What is Authentication?
2. What is Authorization?
3. Authentication Flow
4. Authorization Flow
5. Authentication vs Authorization
6. Real-world Example
7. Authentication in Node.js
8. Authorization in Node.js
9. Common Authentication Methods
10. Common Authorization Models
11. Best Practices
12. Common Interview Questions
13. Quick Revision
14. Interview Answer

---

# 1. What is Authentication?

Authentication verifies a user's identity.

It answers the question:

> **"Who are you?"**

Examples:

- Username & Password
- OTP
- Fingerprint
- Face ID
- Google Login
- GitHub Login
- JWT Token
- Session Login

Example

```text id="auth001"
User

↓

Enter Email

↓

Enter Password

↓

Verify Credentials

↓

Authenticated ✅
```

---

# 2. What is Authorization?

Authorization determines what an authenticated user is allowed to access.

It answers the question:

> **"What are you allowed to do?"**

Example

```text id="auth002"
User Logged In

↓

Check Role

↓

Admin?

↓

Yes → Access Admin Dashboard

No → Access Denied
```

---

# 3. Authentication Flow

```text id="auth003"
Client

      │

      ▼

Login Request

      │

      ▼

Server

      │

      ▼

Verify Credentials

      │

 ┌───────────────┐
 │               │
 ▼               ▼

Valid         Invalid

 │               │

 ▼               ▼

Generate      Return
Token         Error

 │

 ▼

Authenticated
```

---

# 4. Authorization Flow

```text id="auth004"
Authenticated User

        │

        ▼

Protected Route

        │

        ▼

Check Permission

        │

 ┌───────────────┐
 │               │
 ▼               ▼

Allowed      Denied

 │               │

 ▼               ▼

Access      403 Forbidden
```

---

# 5. Authentication vs Authorization

| Authentication    | Authorization                |
| ----------------- | ---------------------------- |
| Verifies identity | Verifies permissions         |
| "Who are you?"    | "What can you do?"           |
| Happens first     | Happens after authentication |
| Login process     | Access control               |
| Uses credentials  | Uses roles or permissions    |

---

# 6. Real-world Example

Imagine entering an office.

### Authentication

Security Guard

```text id="auth005"
Show ID Card

↓

Verify Identity

↓

Allowed Inside
```

The guard confirms **who you are**.

---

### Authorization

Once inside:

```text id="auth006"
Employee

↓

Meeting Room ✅

Server Room ❌

CEO Office ❌
```

Although you're inside the building, you can't access every room.

---

# 7. Authentication in Node.js

Typical login flow.

```text id="auth007"
POST /login

↓

Find User

↓

Compare Password

↓

Generate JWT

↓

Return Token
```

Example

```javascript id="auth008"
const user = await User.findOne({
  email: req.body.email,
});

const isValid = await bcrypt.compare(req.body.password, user.password);

if (!isValid) {
  return res.status(401).json({
    message: "Invalid Credentials",
  });
}

const token = jwt.sign(
  {
    id: user._id,
  },
  process.env.JWT_SECRET,
);

res.json({
  token,
});
```

---

# 8. Authorization in Node.js

Protect admin route.

```javascript id="auth009"
function isAdmin(req, res, next) {
  if (req.user.role !== "admin") {
    return res.status(403).json({
      message: "Access Denied",
    });
  }

  next();
}
```

Usage

```javascript id="auth010"
router.get(
  "/admin",

  authenticate,

  isAdmin,

  adminController,
);
```

Flow

```text id="auth011"
JWT Verified

↓

User Role

↓

Admin?

↓

Yes

↓

Continue
```

---

# 9. Common Authentication Methods

| Method                 | Description                    |
| ---------------------- | ------------------------------ |
| Username & Password    | Most common                    |
| Session Authentication | Server stores session          |
| JWT Authentication     | Client stores token            |
| OAuth                  | Google, GitHub, Facebook login |
| OTP                    | Email/SMS verification         |
| Biometrics             | Fingerprint, Face ID           |

---

# 10. Common Authorization Models

## Role-Based Access Control (RBAC)

```text id="auth012"
Admin

↓

Manage Users

↓

Delete Posts

↓

View Reports
```

---

```text id="auth013"
User

↓

Create Posts

↓

Edit Own Posts
```

---

## Permission-Based

```text id="auth014"
canCreatePost

canDeleteUser

canEditProfile

canViewAnalytics
```

More flexible than roles.

---

# 11. Best Practices

✅ Always authenticate before authorizing.

✅ Never trust client-side roles.

✅ Store passwords as hashes, never plain text.

✅ Return **401 Unauthorized** when authentication fails.

✅ Return **403 Forbidden** when the user is authenticated but lacks permission.

---

# 12. Common Interview Questions

### What is Authentication?

Authentication verifies a user's identity.

---

### What is Authorization?

Authorization determines what actions an authenticated user can perform.

---

### Which comes first?

Authentication.

Only after the user is authenticated should authorization checks be performed.

---

### Can a user be authenticated but not authorized?

Yes.

Example:

A normal user logs in successfully but attempts to access an admin-only page.

The user is authenticated but not authorized.

---

### HTTP Status Codes

| Status | Meaning                                      |
| ------ | -------------------------------------------- |
| 200    | Success                                      |
| 401    | Authentication failed or missing credentials |
| 403    | Authenticated but not permitted              |

---

# 13. Quick Revision

| Authentication | Authorization     |
| -------------- | ----------------- |
| Identity       | Permissions       |
| Login          | Access Control    |
| Password/JWT   | Roles/Permissions |
| 401            | 403               |

---

# 14. Interview Answer

> **Authentication is the process of verifying the identity of a user, ensuring they are who they claim to be. This is commonly done using credentials such as passwords, OTPs, sessions, or JWTs. Authorization is the process of determining what an authenticated user is allowed to access or perform, typically based on roles or permissions. Authentication always happens before authorization. For example, a user may successfully log in (authentication) but still be prevented from accessing an admin dashboard if they lack the required permissions (authorization).**
