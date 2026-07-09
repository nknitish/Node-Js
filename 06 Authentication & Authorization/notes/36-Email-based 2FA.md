# Email-based 2FA (Two-Factor Authentication)

> **Interview Definition:**  
> **Email-based Two-Factor Authentication (2FA)** is a security mechanism where, after successfully verifying the user's password, the server generates a **One-Time Password (OTP)** or **verification code** and sends it to the user's registered email address. The user must enter this code to complete the login process.

> **One-line Interview Answer:**  
> **Email-based 2FA adds an additional verification step by sending a temporary OTP to the user's registered email after password verification.**

---

# Table of Contents

1. What is Email-based 2FA?
2. Why Do We Need It?
3. How Email 2FA Works
4. Email 2FA Flow
5. Components
6. OTP Generation
7. Sending Email
8. OTP Verification
9. Express.js Implementation
10. Email Providers
11. Email 2FA vs SMS vs TOTP
12. Security Considerations
13. Best Practices
14. Common Interview Questions
15. Quick Revision
16. Interview Answer

---

# 1. What is Email-based 2FA?

Email-based 2FA adds a second authentication factor.

Instead of

```text
Password

↓

Login
```

It becomes

```text
Password

↓

Email OTP

↓

Login
```

---

# 2. Why Do We Need It?

Suppose an attacker steals a user's password.

Without Email 2FA

```text
Password

↓

Login

✔
```

With Email 2FA

```text
Password

↓

OTP Sent

↓

No Email Access

↓

Login Failed
```

---

# 3. How Email 2FA Works

```text
User

↓

Enter Email

↓

Enter Password

↓

Password Verified

↓

Generate OTP

↓

Send Email

↓

User Receives OTP

↓

Enter OTP

↓

Verify

↓

Login Success
```

---

# 4. Email 2FA Flow

```text
User Login

↓

Verify Password

↓

Generate OTP

↓

Store OTP

↓

Send Email

↓

User Opens Email

↓

Enter OTP

↓

Verify

↓

Issue JWT / Create Session
```

---

# 5. Components

| Component        | Purpose      |
| ---------------- | ------------ |
| User             | Login        |
| Backend          | Generate OTP |
| Redis / Database | Store OTP    |
| Email Service    | Deliver OTP  |
| User Mailbox     | Receive OTP  |

---

# 6. OTP Generation

Generate a random OTP.

```javascript
const otp = Math.floor(100000 + Math.random() * 900000);

console.log(otp);
```

Example

```text
812547
```

OTP validity

```text
5 Minutes
```

---

# 7. Sending Email

Popular package

```bash
pnpm add nodemailer
```

Example

```javascript
import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",

  auth: {
    user: process.env.EMAIL,

    pass: process.env.EMAIL_PASSWORD,
  },
});

await transporter.sendMail({
  from: process.env.EMAIL,

  to: user.email,

  subject: "Your OTP",

  text: `Your OTP is ${otp}`,
});
```

Production systems often use providers like:

- SendGrid
- Amazon SES
- Mailgun
- Postmark
- Resend

---

# 8. OTP Verification

```text
Entered OTP

↓

Stored OTP

↓

Match?

↓

YES

↓

Delete OTP

↓

Generate JWT
```

Example

```javascript
if (otp !== storedOtp) {
  return res.status(401).json({
    message: "Invalid OTP",
  });
}
```

Delete OTP immediately after verification.

---

# 9. Express.js Implementation

### Login

```javascript
app.post("/login", async (req, res) => {
  // Verify password
  // Generate OTP
  // Save OTP
  // Send Email
});
```

---

### Verify OTP

```javascript
app.post("/verify-email-otp", async (req, res) => {
  // Verify OTP
  // Issue JWT
});
```

---

# 10. Email Providers

Common providers

- Gmail SMTP
- SendGrid
- Amazon SES
- Mailgun
- Postmark
- Resend

Production applications generally avoid Gmail SMTP due to rate limits and reliability.

---

# 11. Email 2FA vs SMS vs TOTP

| Email                     | SMS                     | TOTP                       |
| ------------------------- | ----------------------- | -------------------------- |
| Internet Required         | Mobile Network Required | Offline                    |
| Free / Low Cost           | SMS Charges             | Free                       |
| Slower                    | Faster                  | Instant                    |
| Depends on Email Security | SIM Swap Risk           | Most Secure                |
| Easy to Implement         | Easy                    | Requires Authenticator App |

---

# 12. Security Considerations

OTP

```text
↓

Expire

↓

5 Minutes
```

Never

- Reuse OTP
- Store forever
- Log OTP

Limit

```text
Maximum Attempts

↓

5
```

Rate-limit resend requests.

---

# 13. Best Practices

✅ Expire OTP within 3–5 minutes.

✅ Store OTP in Redis with TTL.

✅ Delete OTP after successful verification.

✅ Hash OTP for highly secure applications.

✅ Limit resend requests.

✅ Rate-limit verification attempts.

✅ Use HTTPS.

---

# 14. Common Interview Questions

### Should OTP be stored permanently?

No.

Use Redis or temporary storage.

---

### Which is more secure?

```text
TOTP

>

SMS

>

Email
```

Generally, TOTP offers the strongest security because it doesn't depend on external communication channels.

---

### Why use Redis?

Automatic expiration using TTL.

---

### Should OTP be reused?

Never.

Delete it after verification.

---

### Which status code for invalid OTP?

```text
401 Unauthorized
```

(or **400 Bad Request**, depending on the API design.)

---

# 15. Quick Revision

| Component     | Purpose                 |
| ------------- | ----------------------- |
| Password      | First Factor            |
| Email OTP     | Second Factor           |
| Redis         | Temporary Storage       |
| Email Service | Send OTP                |
| JWT           | Authentication Complete |

---

# 16. Interview Answer

> **Email-based Two-Factor Authentication is a security mechanism where, after verifying the user's password, the backend generates a temporary OTP and sends it to the user's registered email address. The OTP is stored temporarily, typically in Redis with a TTL, and the user must enter it to complete authentication. Once verified, the OTP is deleted and the application issues a JWT or creates a session. While Email 2FA is easy to implement and widely supported, it depends on the security of the user's email account and is generally considered less secure than TOTP.**

---

# ⭐ Interview Tips

## Email 2FA Flow

```text
Password

↓

Verified

↓

Generate OTP

↓

Redis

↓

Email Provider

↓

User Inbox

↓

Enter OTP

↓

Verify

↓

JWT
```

---

## Authentication Flow

```text
Email

↓

Password

↓

Email OTP

↓

JWT
```

---

## OTP Lifecycle

```text
Generate

↓

Store

↓

Email

↓

Verify

↓

Delete
```

---

# ⭐ Most Asked Interview Questions

### Q1. Why is Email 2FA less secure than TOTP?

Because if an attacker gains access to the user's email account,

```text
Password

+

Email

↓

Account Compromised
```

TOTP stores the secret on a separate authenticator device, providing better isolation.

---

### Q2. Why use Redis for Email OTP?

Redis provides:

- Very fast access
- Automatic expiration (TTL)
- Automatic cleanup
- High scalability

---

### Q3. Can Email OTP replace passwords?

No.

Email OTP is generally used as a **second authentication factor**, not a replacement for the password.

---

### Q4. How do production applications implement Email 2FA?

```text
Password

↓

Verified

↓

Generate OTP

↓

Store in Redis

↓

Send Email

↓

User Enters OTP

↓

Verify

↓

Delete OTP

↓

Issue JWT / Create Session
```

This pattern is commonly used by SaaS applications, banking portals, and enterprise systems that require an additional verification step without requiring users to install an authenticator app.
