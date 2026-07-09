# QR Code Generation for TOTP (2FA)

> **Interview Definition:**  
> **QR Code Generation** in Two-Factor Authentication is the process of converting a user's **TOTP secret key** into a QR code that can be scanned by an authenticator app (such as Google Authenticator or Microsoft Authenticator). The QR code contains an **`otpauth://` URI**, allowing the app to securely configure TOTP without requiring the user to manually enter the secret key.

> **One-line Interview Answer:**  
> **QR codes simplify TOTP setup by securely sharing the secret key with authenticator apps.**

---

# Table of Contents

1. Why Do We Need QR Codes?
2. What Information Does the QR Code Contain?
3. TOTP Setup Flow
4. The `otpauth://` URI
5. QR Code Generation
6. Express.js Implementation
7. Verification Flow
8. Complete 2FA Setup
9. Popular Authenticator Apps
10. Security Considerations
11. Best Practices
12. Common Interview Questions
13. Quick Revision
14. Interview Answer

---

# 1. Why Do We Need QR Codes?

When enabling TOTP,

the server generates a secret.

Example

```text
JBSWY3DPEHPK3PXP
```

Typing this manually is difficult.

Instead

```text
Secret

↓

QR Code

↓

Scan

↓

Done
```

---

# 2. What Information Does the QR Code Contain?

The QR Code **does not contain the OTP**.

It contains

```text
Application Name

+

Account

+

Secret Key

+

Algorithm

+

Issuer
```

Example

```text
MyApp

Nitish

JBSWY3DPEHPK3PXP
```

---

# 3. TOTP Setup Flow

```text
User

↓

Enable 2FA

↓

Backend Generates Secret

↓

Generate QR Code

↓

User Scans QR

↓

Authenticator Stores Secret

↓

Setup Complete
```

Later

```text
Authenticator

↓

Generate OTP

↓

Login
```

---

# 4. The `otpauth://` URI

The QR code encodes a URI in the following format:

```text
otpauth://totp/MyApp:nitish@example.com

?secret=JBSWY3DPEHPK3PXP

&issuer=MyApp
```

Meaning

| Parameter            | Purpose           |
| -------------------- | ----------------- |
| `totp`               | TOTP Algorithm    |
| `MyApp`              | Application Name  |
| `nitish@example.com` | User Account      |
| `secret`             | Shared Secret     |
| `issuer`             | Organization Name |

Authenticator apps understand this format automatically.

---

# 5. QR Code Generation

Install packages

```bash
pnpm add speakeasy qrcode
```

Generate Secret

```javascript
import speakeasy from "speakeasy";

const secret = speakeasy.generateSecret({
  name: "MyApp",
});
```

Example

```text
secret.base32

↓

JBSWY3DPEHPK3PXP
```

Generate QR Code

```javascript
import QRCode from "qrcode";

const qr = await QRCode.toDataURL(secret.otpauth_url);

console.log(qr);
```

The result is a Base64 image that can be displayed in your frontend.

---

# 6. Express.js Implementation

Generate QR

```javascript
app.get("/2fa/setup", async (req, res) => {
  const secret = speakeasy.generateSecret({
    name: "MyApp",
  });

  const qrCode = await QRCode.toDataURL(secret.otpauth_url);

  // Save secret in DB

  res.json({
    qrCode,
  });
});
```

Verify OTP

```javascript
const verified = speakeasy.totp.verify({
  secret: user.secret,

  encoding: "base32",

  token: req.body.otp,
});
```

---

# 7. Verification Flow

```text
Authenticator

↓

Generate OTP

↓

User Types OTP

↓

Server Generates OTP

↓

Match?

↓

YES

↓

2FA Enabled
```

Notice

The QR code is **not used during login**.

It is used **only once during setup**.

---

# 8. Complete 2FA Setup

```text
Enable 2FA

↓

Generate Secret

↓

Generate QR

↓

Frontend Shows QR

↓

User Scans

↓

Authenticator Saves Secret

↓

User Enters OTP

↓

Verify OTP

↓

Store Secret

↓

2FA Enabled
```

Login Later

```text
Password

↓

Verified

↓

Authenticator

↓

OTP

↓

Verify

↓

JWT
```

---

# 9. Popular Authenticator Apps

- Google Authenticator
- Microsoft Authenticator
- Authy
- 1Password
- Bitwarden
- Duo Mobile

All support the `otpauth://` standard.

---

# 10. Security Considerations

The QR Code contains the **shared secret**.

Anyone who scans it can generate valid OTPs.

Therefore

```text
Generate Once

↓

Scan

↓

Discard
```

Never expose the QR code after setup.

---

# 11. Best Practices

✅ Use HTTPS.

✅ Generate a unique secret for every user.

✅ Store the secret securely (encrypted if appropriate).

✅ Verify one OTP before enabling 2FA.

✅ Provide backup recovery codes.

✅ Never log or expose the secret.

---

# 12. Common Interview Questions

### What does the QR Code contain?

The TOTP configuration (`otpauth://` URI), including the shared secret and metadata.

---

### Does the QR Code contain OTPs?

No.

It contains the secret used to generate OTPs.

---

### Is the QR Code used during login?

No.

Only during the initial setup.

---

### Can users manually enter the secret?

Yes.

Authenticator apps usually allow manual entry if QR scanning isn't possible.

---

### Why use QR codes?

To make TOTP setup quick and reduce typing errors.

---

# 13. Quick Revision

| Component     | Purpose            |
| ------------- | ------------------ |
| Secret        | Shared Key         |
| QR Code       | Share Secret       |
| otpauth://    | TOTP Configuration |
| Authenticator | Generates OTP      |
| OTP           | Login Verification |

---

# 14. Interview Answer

> **QR Code generation in TOTP-based Two-Factor Authentication is used to simplify the secure transfer of a shared secret key from the server to an authenticator application. When a user enables 2FA, the backend generates a unique secret and creates an `otpauth://` URI containing the application name, account identifier, issuer, and secret. This URI is converted into a QR code using a library such as `qrcode`. The user scans the QR code with an authenticator app, which stores the secret and begins generating time-based one-time passwords. During login, both the server and the authenticator independently generate the same OTP using the shared secret and the current time.**

---

# ⭐ Interview Tips

## QR Code Setup

```text
Generate Secret

↓

Create otpauth:// URI

↓

Generate QR Code

↓

Scan

↓

Authenticator Stores Secret
```

---

## Complete TOTP Flow

```text
Backend

↓

Secret

↓

QR Code

↓

User

↓

Authenticator

↓

OTP

↓

Verify
```

---

## Login Flow

```text
Password

↓

Verified

↓

Authenticator

↓

OTP

↓

Server

↓

Generate OTP

↓

Match

↓

JWT
```

---

# ⭐ Most Asked Interview Questions

### Q1. Why use a QR Code instead of showing the secret?

The secret looks like:

```text
JBSWY3DPEHPK3PXP
```

Typing it manually is slow and error-prone.

QR codes make setup:

- Faster
- Easier
- Less error-prone

---

### Q2. What happens if someone steals the QR Code?

Since the QR code contains the **shared secret**:

```text
QR Code

↓

Secret

↓

Generate OTP

↓

Account Access
```

Treat it like a password:

- Show it only during setup.
- Never expose it again after successful configuration.

---

### Q3. What is `otpauth://`?

`otpauth://` is a standardized URI format used by authenticator apps.

Example

```text
otpauth://totp/MyApp:user@example.com

?secret=JBSWY3DPEHPK3PXP

&issuer=MyApp
```

Authenticator apps read this URI to configure TOTP automatically.

---

### Q4. How do production applications implement QR-based TOTP?

```text
User Enables 2FA

↓

Generate Secret

↓

Create otpauth:// URI

↓

Generate QR Code

↓

Scan with Authenticator

↓

Verify First OTP

↓

Store Secret

↓

2FA Enabled

↓

Future Login

↓

Password

↓

TOTP

↓

JWT / Session
```

This is the standard implementation used by services like GitHub, AWS, Microsoft, and many banking applications.
