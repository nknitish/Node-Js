# Email Verification

> **Interview Definition:**
> **Email Verification** is the process of confirming that a user owns the email address they used during registration. After signup, the server generates a **verification token**, sends it to the user's email, and marks the account as verified only after the user successfully validates the token.

---

# Table of Contents

1. What is Email Verification?
2. Why Do We Need Email Verification?
3. Complete Email Verification Flow
4. Step 1 - User Registration
5. Step 2 - Generate Verification Token
6. Step 3 - Send Verification Email
7. Step 4 - Verify Email
8. Step 5 - Activate Account
9. Express + Mongoose Example
10. Database Design
11. Security Best Practices
12. Common Interview Questions
13. Quick Revision
14. Interview Answer

---

# 1. What is Email Verification?

Email Verification confirms that a user actually owns the email address used during registration.

Flow

```text id="email001"
User Registers

↓

Generate Verification Token

↓

Send Email

↓

User Clicks Link

↓

Verify Token

↓

Account Activated
```

Until verification is complete, the account is considered **unverified**.

---

# 2. Why Do We Need Email Verification?

Without verification:

- Fake email addresses can be registered.
- Users cannot receive password reset emails.
- Spam or bot accounts become easier to create.
- Email-based notifications won't reach the user.

Verified email ensures:

- Real user
- Valid email
- Better security
- Better user experience

---

# 3. Complete Email Verification Flow

```text id="email002"
User Registers

        │

        ▼

Hash Password

        │

        ▼

Generate Verification Token

        │

        ▼

Store Hashed Token + Expiry

        │

        ▼

Send Verification Email

        │

        ▼

User Clicks Link

        │

        ▼

Verify Token

        │

        ▼

Mark Email Verified

        │

        ▼

Delete Verification Token
```

---

# 4. Step 1 - User Registration

Request

```http id="email003"
POST /register
```

Body

```json id="email004"
{
  "name": "Nitish",
  "email": "nitish@gmail.com",
  "password": "Nitish@123"
}
```

Server

```text id="email005"
Validate Input

↓

Hash Password

↓

Create User

↓

Generate Verification Token

↓

Send Email
```

---

# 5. Step 2 - Generate Verification Token

Use Node's crypto module.

```javascript id="email006"
import crypto from "crypto";

const verificationToken = crypto.randomBytes(32).toString("hex");
```

Hash the token before storing it.

```javascript id="email007"
const hashedToken = crypto
  .createHash("sha256")
  .update(verificationToken)
  .digest("hex");
```

Store

```javascript id="email008"
user.emailVerificationToken = hashedToken;

user.emailVerificationExpire = Date.now() + 24 * 60 * 60 * 1000;

await user.save();
```

---

# 6. Step 3 - Send Verification Email

Example Email

```text id="email009"
Subject:

Verify Your Email


Body:

Click the link below:

https://example.com/verify-email/<token>
```

The email contains the **original token**, not the hashed version.

---

# 7. Step 4 - Verify Email

User opens

```http id="email010"
GET /verify-email/:token
```

Hash the received token.

```javascript id="email011"
const hashedToken = crypto
  .createHash("sha256")
  .update(req.params.token)
  .digest("hex");
```

Find user.

```javascript id="email012"
const user = await User.findOne({
  emailVerificationToken: hashedToken,

  emailVerificationExpire: {
    $gt: Date.now(),
  },
});
```

If no user is found:

```text id="email013"
Invalid Token

or

Expired Token
```

---

# 8. Step 5 - Activate Account

```javascript id="email014"
user.isEmailVerified = true;

user.emailVerificationToken = undefined;

user.emailVerificationExpire = undefined;

await user.save();
```

Account is now active.

---

# 9. Express + Mongoose Example

## Register

```javascript id="email015"
import crypto from "crypto";
import bcrypt from "bcrypt";

app.post("/register", async (req, res) => {
  const hashedPassword = await bcrypt.hash(
    req.body.password,

    10,
  );

  const verificationToken = crypto.randomBytes(32).toString("hex");

  const hashedToken = crypto
    .createHash("sha256")
    .update(verificationToken)
    .digest("hex");

  const user = await User.create({
    name: req.body.name,

    email: req.body.email,

    password: hashedPassword,

    isEmailVerified: false,

    emailVerificationToken: hashedToken,

    emailVerificationExpire: Date.now() + 24 * 60 * 60 * 1000,
  });

  // Send verification email here

  console.log(verificationToken);

  res.status(201).json({
    message: "Registration successful. Please verify your email.",
  });
});
```

---

## Verify Email

```javascript id="email016"
import crypto from "crypto";

app.get("/verify-email/:token", async (req, res) => {
  const hashedToken = crypto
    .createHash("sha256")
    .update(req.params.token)
    .digest("hex");

  const user = await User.findOne({
    emailVerificationToken: hashedToken,

    emailVerificationExpire: {
      $gt: Date.now(),
    },
  });

  if (!user) {
    return res.status(400).send("Invalid or Expired Token");
  }

  user.isEmailVerified = true;

  user.emailVerificationToken = undefined;

  user.emailVerificationExpire = undefined;

  await user.save();

  res.send("Email Verified Successfully");
});
```

---

# 10. Database Design

User document

```javascript id="email017"
{
    name: "Nitish",

    email: "nitish@gmail.com",

    password: "$2b$10$...",

    isEmailVerified: false,

    emailVerificationToken: "...",

    emailVerificationExpire: Date
}
```

After verification

```javascript id="email018"
{
    name: "Nitish",

    email: "nitish@gmail.com",

    password: "$2b$10$...",

    isEmailVerified: true,

    emailVerificationToken: null,

    emailVerificationExpire: null
}
```

---

# 11. Security Best Practices

✅ Generate cryptographically secure random tokens.

✅ Store only the hashed verification token.

✅ Set an expiration time.

✅ Delete the token after verification.

✅ Use HTTPS.

✅ Don't allow login until the email is verified (if your application's policy requires verification before access).

✅ Provide a **Resend Verification Email** feature.

---

# 12. Common Interview Questions

### Why verify email addresses?

To ensure the user owns the email address and to reduce fake or spam accounts.

---

### Why hash the verification token?

If the database is compromised, attackers cannot directly use the stored verification tokens.

---

### Should the verification token expire?

Yes.

Expired tokens reduce the risk of misuse.

---

### Can users log in before email verification?

That depends on the application's requirements. Many applications block access until verification is complete, while others allow limited access until the email is verified.

---

### Should verification tokens be reusable?

No.

They should be single-use and removed after successful verification.

---

# 13. Quick Revision

| Step | Action                      |
| ---- | --------------------------- |
| 1    | User registers              |
| 2    | Hash password               |
| 3    | Generate verification token |
| 4    | Store hashed token + expiry |
| 5    | Send verification email     |
| 6    | Verify token                |
| 7    | Mark email verified         |
| 8    | Delete verification token   |

---

# 14. Interview Answer

> **Email Verification is a process that confirms a user owns the email address provided during registration. After a user signs up, the server hashes the password, generates a secure random verification token, stores only the hashed version of the token with an expiration time, and sends the original token to the user's email in a verification link. When the user clicks the link, the server hashes the received token, verifies it against the stored value, checks that it has not expired, marks the account as verified, and removes the verification token. This process helps prevent fake accounts and ensures that important account-related emails reach a valid email address.**
