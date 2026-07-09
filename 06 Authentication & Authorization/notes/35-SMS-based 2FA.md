# SMS-based 2FA (Two-Factor Authentication)

> **Interview Definition:**  
> **SMS-based Two-Factor Authentication (2FA)** is a security mechanism where, after successfully verifying the user's password, the server generates a **One-Time Password (OTP)** and sends it to the user's registered mobile number via SMS. The user must enter the OTP to complete the login process.

> **One-line Interview Answer:**  
> **SMS-based 2FA adds a second layer of security by sending a temporary OTP to the user's registered mobile number after password verification.**

---

# Table of Contents

1. What is SMS-based 2FA?
2. Why Do We Need SMS 2FA?
3. How SMS 2FA Works
4. SMS 2FA Flow
5. Components
6. OTP Generation
7. OTP Verification
8. Express.js Implementation
9. OTP Storage
10. SMS Providers
11. SMS 2FA vs TOTP
12. Security Considerations
13. Best Practices
14. Common Interview Questions
15. Quick Revision
16. Interview Answer

---

# 1. What is SMS-based 2FA?

SMS-based 2FA adds another verification step after password authentication.

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

SMS OTP

↓

Login
```

---

# 2. Why Do We Need SMS 2FA?

Suppose an attacker steals a user's password.

Without 2FA

```text
Password

↓

Login

✔
```

With SMS 2FA

```text
Password

↓

Send OTP

↓

Attacker Doesn't Have Phone

↓

Login Failed
```

---

# 3. How SMS 2FA Works

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

Send SMS

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

# 4. SMS 2FA Flow

```text
User Login

↓

Verify Password

↓

Generate 6-digit OTP

↓

Save OTP

↓

Send SMS

↓

User Enters OTP

↓

Compare OTP

↓

Match?

↓

YES

↓

Issue JWT / Create Session
```

---

# 5. Components

| Component      | Purpose        |
| -------------- | -------------- |
| User           | Requests Login |
| Backend        | Generates OTP  |
| Database/Redis | Stores OTP     |
| SMS Gateway    | Sends SMS      |
| User Phone     | Receives OTP   |

---

# 6. OTP Generation

Generate a random 6-digit OTP.

Example

```javascript
const otp = Math.floor(100000 + Math.random() * 900000);

console.log(otp);
```

Example OTP

```text
583921
```

OTP should expire after a short time.

Example

```text
5 Minutes
```

---

# 7. OTP Verification

Flow

```text
User OTP

↓

Database/Redis OTP

↓

Match?

↓

YES

↓

Delete OTP

↓

Login Success
```

Example

```javascript
if (userOtp !== storedOtp) {
  return res.status(401).json({
    message: "Invalid OTP",
  });
}
```

---

# 8. Express.js Implementation

### Login Route

```javascript
app.post("/login", async (req, res) => {
  // Verify password

  const otp = generateOTP();

  // Save OTP

  // Send SMS
});
```

---

### Verify OTP

```javascript
app.post("/verify-otp", async (req, res) => {
  // Compare OTP
  // Generate JWT
});
```

---

### Twilio Example

Install

```bash
pnpm add twilio
```

Example

```javascript
import twilio from "twilio";

const client = twilio(
  process.env.ACCOUNT_SID,

  process.env.AUTH_TOKEN,
);

await client.messages.create({
  body: `Your OTP is ${otp}`,

  from: process.env.TWILIO_NUMBER,

  to: user.phone,
});
```

---

# 9. OTP Storage

Never store OTP permanently.

Better options

## Redis

```text
OTP

↓

Redis

↓

TTL

↓

5 Minutes

↓

Deleted Automatically
```

---

## Database

```text
OTP

↓

Created At

↓

Expires At
```

Delete immediately after successful verification.

---

# 10. SMS Providers

Popular providers

- Twilio
- AWS SNS
- Vonage (Nexmo)
- MessageBird
- Plivo
- Textlocal (India)

---

# 11. SMS 2FA vs TOTP

| SMS OTP                 | TOTP                             |
| ----------------------- | -------------------------------- |
| Server generates OTP    | Both server and app generate OTP |
| Requires mobile network | Works offline                    |
| SMS charges             | Free after setup                 |
| Vulnerable to SIM swap  | More secure                      |
| Easy to use             | Requires Authenticator App       |

---

# 12. Security Considerations

Limit OTP attempts.

Example

```text
Maximum Attempts

↓

5

↓

Account Locked
```

Rate limit OTP requests.

```text
Max

3 OTPs

↓

10 Minutes
```

Never log OTPs.

Always expire OTPs quickly.

---

# 13. Best Practices

✅ OTP expires in 3–5 minutes.

✅ Delete OTP after successful verification.

✅ Limit verification attempts.

✅ Rate-limit OTP generation.

✅ Store OTPs in Redis with TTL.

✅ Use HTTPS.

✅ Never reuse OTPs.

---

# 14. Common Interview Questions

### How long should an OTP be valid?

Usually

```text
3–5 Minutes
```

---

### Where should OTP be stored?

Prefer

```text
Redis
```

because of built-in TTL support.

---

### Should OTP be reused?

No.

Delete it immediately after successful verification.

---

### Which is more secure?

TOTP is generally more secure than SMS-based OTP.

---

### What status code for an invalid OTP?

```text
401 Unauthorized
```

(or **400 Bad Request** depending on your API design, but **401** is common when OTP is treated as part of authentication.)

---

# 15. Quick Revision

| Component   | Purpose        |
| ----------- | -------------- |
| Password    | First Factor   |
| SMS OTP     | Second Factor  |
| Redis       | OTP Storage    |
| SMS Gateway | Send OTP       |
| JWT         | Login Complete |

---

# 16. Interview Answer

> **SMS-based Two-Factor Authentication (2FA) is a security mechanism that requires users to verify their identity using a one-time password sent to their registered mobile number after successfully entering their password. The backend generates a random OTP, stores it temporarily (commonly in Redis with a TTL), sends it through an SMS provider such as Twilio, and verifies the OTP entered by the user. Once verified, the OTP is deleted and the application issues a JWT or creates a session. Although SMS 2FA is widely supported and easy for users, it is generally considered less secure than TOTP because it is vulnerable to SIM swap attacks and SMS interception.**

---

# ⭐ Interview Tips

## SMS 2FA Flow

```text
User

↓

Password

↓

Verified

↓

Generate OTP

↓

Redis

↓

SMS Gateway

↓

Phone

↓

Enter OTP

↓

Verify

↓

JWT
```

---

## Complete Authentication Flow

```text
Password

↓

Correct?

↓

YES

↓

SMS OTP

↓

Correct?

↓

YES

↓

Authenticated
```

---

## OTP Lifecycle

```text
Generate OTP

↓

Store

↓

Send SMS

↓

Verify

↓

Delete OTP
```

---

# ⭐ Most Asked Interview Questions

### Q1. Why store OTP in Redis instead of MongoDB?

Redis provides:

- Automatic expiration (TTL)
- Extremely fast reads/writes
- Automatic cleanup

Example

```text
OTP

↓

Redis

↓

5 Minutes

↓

Deleted Automatically
```

---

### Q2. Why is SMS 2FA less secure than TOTP?

SMS-based OTPs can be affected by:

- SIM swap attacks
- SMS interception
- Delayed message delivery

TOTP generates codes locally on the user's device and doesn't rely on the mobile network.

---

### Q3. Should OTPs be hashed before storing?

For high-security systems, **yes**.

Instead of storing:

```text
583921
```

store

```text
bcrypt(583921)
```

Then compare the entered OTP with the hashed value, just like passwords.

---

### Q4. How do production systems implement SMS 2FA?

```text
Password

↓

Verified

↓

Generate OTP

↓

Store in Redis (TTL)

↓

Send via Twilio/AWS SNS

↓

Verify OTP

↓

Delete OTP

↓

Issue JWT / Create Session
```

This is the architecture commonly used by banking, fintech, and e-commerce applications for SMS-based two-factor authentication.
