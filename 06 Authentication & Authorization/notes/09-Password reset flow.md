# Password Reset Flow

> **Interview Definition:**
> A **Password Reset Flow** is a secure process that allows users to reset a forgotten password without knowing their current password. The server generates a **temporary, time-limited reset token**, sends it to the user's verified email, validates the token when it's returned, and allows the user to set a new password.

---

# Table of Contents

1. What is Password Reset?
2. Why Do We Need It?
3. Complete Password Reset Flow
4. Step 1 - Forgot Password
5. Step 2 - Generate Reset Token
6. Step 3 - Send Email
7. Step 4 - Verify Reset Token
8. Step 5 - Reset Password
9. Express + Mongoose Example
10. Database Design
11. Security Best Practices
12. Common Interview Questions
13. Quick Revision
14. Interview Answer

---

# 1. What is Password Reset?

Password Reset allows users to recover access to their account when they forget their password.

Typical flow:

```text
Forgot Password

↓

Receive Email

↓

Click Reset Link

↓

Enter New Password

↓

Login Again
```

---

# 2. Why Do We Need It?

Imagine:

```text
User

↓

Forgot Password

↓

Cannot Login
```

Without a reset flow, the user permanently loses access.

---

# 3. Complete Password Reset Flow

```text
User Clicks

Forgot Password

        │

        ▼

POST /forgot-password

        │

        ▼

Server Finds User

        │

        ▼

Generate Secure Token

        │

        ▼

Store Hashed Token + Expiry

        │

        ▼

Send Email

        │

        ▼

User Clicks Link

        │

        ▼

POST /reset-password

        │

        ▼

Verify Token

        │

        ▼

Hash New Password

        │

        ▼

Update Password

        │

        ▼

Delete Reset Token
```

---

# 4. Step 1 - Forgot Password

Request

```http
POST /forgot-password
```

Body

```json
{
  "email": "nitish@gmail.com"
}
```

Server

```text
Find User

↓

Generate Token

↓

Store Token

↓

Send Email
```

---

# 5. Step 2 - Generate Reset Token

Use Node's crypto module.

```javascript
import crypto from "crypto";

const resetToken = crypto.randomBytes(32).toString("hex");

console.log(resetToken);
```

Example

```text
7a84f36fd924bbf26d...
```

Store a **hashed version** of the token.

```javascript
const hashedToken = crypto
  .createHash("sha256")
  .update(resetToken)
  .digest("hex");
```

Store

```javascript
user.resetPasswordToken = hashedToken;

user.resetPasswordExpire = Date.now() + 15 * 60 * 1000;
```

The reset token expires in 15 minutes.

---

# 6. Step 3 - Send Email

Email

```text
Subject:

Reset Your Password


Body:

Click the link below:

https://example.com/reset-password/<token>
```

The email contains the **original token**, not the hashed version.

---

# 7. Step 4 - Verify Reset Token

When the user clicks the link:

```text
GET

/reset-password/:token
```

Hash the received token.

```javascript
const hashedToken = crypto
  .createHash("sha256")
  .update(req.params.token)
  .digest("hex");
```

Find the user.

```javascript
const user = await User.findOne({
  resetPasswordToken: hashedToken,

  resetPasswordExpire: {
    $gt: Date.now(),
  },
});
```

If no user is found:

```text
Invalid

or

Expired Token
```

---

# 8. Step 5 - Reset Password

Hash the new password.

```javascript
user.password = await bcrypt.hash(req.body.password, 10);
```

Remove reset fields.

```javascript
user.resetPasswordToken = undefined;

user.resetPasswordExpire = undefined;
```

Save

```javascript
await user.save();
```

The user can now log in with the new password.

---

# 9. Express + Mongoose Example

## Forgot Password

```javascript
import crypto from "crypto";

app.post("/forgot-password", async (req, res) => {
  const user = await User.findOne({
    email: req.body.email,
  });

  if (!user) {
    return res.status(404).send("User not found");
  }

  const resetToken = crypto.randomBytes(32).toString("hex");

  user.resetPasswordToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  user.resetPasswordExpire = Date.now() + 15 * 60 * 1000;

  await user.save();

  // Send Email

  console.log(resetToken);

  res.send("Reset email sent");
});
```

---

## Reset Password

```javascript
app.post("/reset-password/:token", async (req, res) => {
  const hashedToken = crypto
    .createHash("sha256")
    .update(req.params.token)
    .digest("hex");

  const user = await User.findOne({
    resetPasswordToken: hashedToken,

    resetPasswordExpire: {
      $gt: Date.now(),
    },
  });

  if (!user) {
    return res.status(400).send("Invalid Token");
  }

  user.password = await bcrypt.hash(
    req.body.password,

    10,
  );

  user.resetPasswordToken = undefined;

  user.resetPasswordExpire = undefined;

  await user.save();

  res.send("Password Updated");
});
```

---

# 10. Database Design

User document

```javascript
{
    email: "nitish@gmail.com",

    password: "$2b$10$...",

    resetPasswordToken: "...",

    resetPasswordExpire: Date
}
```

After reset

```javascript
{
    email: "nitish@gmail.com",

    password: "$2b$10$...",

    resetPasswordToken: null,

    resetPasswordExpire: null
}
```

---

# 11. Security Best Practices

✅ Generate cryptographically secure random tokens.

✅ Store only the **hashed reset token** in the database.

✅ Set a short expiration time (10–15 minutes is common).

✅ Remove the token after successful reset.

✅ Hash the new password using bcrypt.

✅ Use HTTPS.

✅ Consider invalidating existing sessions or refresh tokens after a password change.

---

# 12. Common Interview Questions

### Why store a hashed reset token?

If the database is compromised, attackers cannot directly use stored reset tokens.

---

### Why should reset tokens expire?

To reduce the window in which a stolen or leaked token can be abused.

---

### Why delete the token after use?

To ensure the reset link can only be used once.

---

### Should the reset token be a JWT?

It can be, but many applications use a secure random token generated with `crypto.randomBytes()` because it is simple and well-suited for one-time password reset links.

---

### Should the new password be hashed?

Yes.

Always hash passwords before storing them.

---

# 13. Quick Revision

| Step | Action                        |
| ---- | ----------------------------- |
| 1    | User clicks "Forgot Password" |
| 2    | Generate secure token         |
| 3    | Store hashed token + expiry   |
| 4    | Send reset email              |
| 5    | Verify token                  |
| 6    | Hash new password             |
| 7    | Delete token                  |
| 8    | Save user                     |

---

# 14. Interview Answer

> **A Password Reset Flow allows users to securely reset a forgotten password without knowing the current one. When a user requests a reset, the server generates a cryptographically secure random token, stores only a hashed version of that token along with an expiration time, and sends the original token to the user's email in a reset link. When the user submits a new password using the link, the server hashes the received token, verifies it against the stored value, checks that it has not expired, hashes the new password with bcrypt, removes the reset token, and updates the user's password. This approach protects against token theft from the database and limits the time during which a reset link can be used.**
