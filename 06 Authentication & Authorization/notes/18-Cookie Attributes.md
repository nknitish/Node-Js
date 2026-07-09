# Cookie Attributes (HttpOnly, Secure, SameSite, Expiration)

> **Interview Definition:**  
> Cookie attributes are settings that control **how cookies are stored, transmitted, and protected**. They improve security by protecting cookies from attacks such as **XSS** and **CSRF**, and by controlling when cookies expire and under what conditions they are sent.

---

# Table of Contents

1. What are Cookie Attributes?
2. HttpOnly Flag
3. Secure Flag
4. SameSite Attribute
5. Cookie Expiration
6. Max-Age vs Expires
7. Session Cookies vs Persistent Cookies
8. Express.js Examples
9. Complete Production Cookie
10. Best Practices
11. Common Interview Questions
12. Quick Revision
13. Interview Answer

---

# 1. What are Cookie Attributes?

When a server creates a cookie,

it can attach additional properties.

Example

```http
Set-Cookie:
accessToken=abc123;
HttpOnly;
Secure;
SameSite=Strict;
Max-Age=900
```

These properties control

- Security
- Expiration
- Accessibility
- Browser behavior

---

# 2. HttpOnly Flag

## What is HttpOnly?

HttpOnly prevents JavaScript from accessing cookies.

```javascript
document.cookie;
```

Without HttpOnly

```text
JavaScript

↓

Can Read Cookie
```

With HttpOnly

```text
JavaScript

↓

Cannot Read Cookie
```

Express Example

```javascript
res.cookie(
  "accessToken",

  token,

  {
    httpOnly: true,
  },
);
```

---

## Why is HttpOnly Important?

Suppose your website has an XSS vulnerability.

Without HttpOnly

```text
Attacker Script

↓

Reads Cookie

↓

Steals JWT
```

With HttpOnly

```text
Attacker Script

↓

Cannot Read Cookie
```

---

# 3. Secure Flag

## What is Secure?

The Secure flag tells browsers

> Only send this cookie over HTTPS.

Without Secure

```text
HTTP

↓

Cookie Sent
```

With Secure

```text
HTTPS

↓

Cookie Sent
```

```text
HTTP

↓

Cookie NOT Sent
```

Express

```javascript
res.cookie(
  "accessToken",

  token,

  {
    secure: true,
  },
);
```

---

## Why is Secure Important?

Without Secure

```text
Public Wi-Fi

↓

HTTP

↓

Cookie Intercepted
```

With Secure

```text
HTTPS

↓

Encrypted

↓

Safer Transmission
```

---

# 4. SameSite Attribute

SameSite helps protect against CSRF attacks.

Values

| SameSite | Description                                                |
| -------- | ---------------------------------------------------------- |
| Strict   | Cookie sent only for same-site requests                    |
| Lax      | Sent for same-site requests and some top-level navigations |
| None     | Sent for cross-site requests (must also use `Secure`)      |

---

## Strict

```text
yourapp.com

↓

Cookie Sent
```

```text
another.com

↓

Cookie NOT Sent
```

Most secure.

---

## Lax

```text
User Clicks Link

↓

Cookie Sent
```

Useful for most websites.

---

## None

```text
Cross-Site Request

↓

Cookie Sent
```

Requires

```javascript
secure: true;
```

Otherwise modern browsers reject it.

---

Express Example

```javascript
res.cookie(
  "accessToken",

  token,

  {
    sameSite: "strict",
  },
);
```

---

# 5. Cookie Expiration

Cookies should not live forever.

Example

```javascript
res.cookie(
  "accessToken",

  token,

  {
    maxAge: 15 * 60 * 1000,
  },
);
```

Flow

```text
Cookie

↓

15 Minutes

↓

Expires

↓

Deleted
```

---

# 6. Max-Age vs Expires

## Max-Age

Relative time.

```javascript
maxAge: 900000;
```

↓

15 minutes.

---

## Expires

Absolute date.

```javascript
expires: new Date("2026-12-31");
```

---

Comparison

| Max-Age       | Expires            |
| ------------- | ------------------ |
| Relative      | Absolute           |
| Easier to use | Fixed date         |
| Preferred     | Less commonly used |

---

# 7. Session Cookies vs Persistent Cookies

## Session Cookie

```text
Browser Closed

↓

Cookie Deleted
```

No expiration is specified.

---

## Persistent Cookie

```text
Browser Closed

↓

Cookie Still Exists
```

Uses

- Max-Age
- Expires

---

# 8. Express.js Examples

Complete Cookie

```javascript
res.cookie(
  "accessToken",

  token,

  {
    httpOnly: true,

    secure: true,

    sameSite: "strict",

    maxAge: 15 * 60 * 1000,
  },
);
```

Clear Cookie

```javascript
res.clearCookie("accessToken");
```

---

# 9. Complete Production Cookie

```javascript
res.cookie(
  "refreshToken",

  refreshToken,

  {
    httpOnly: true,

    secure: true,

    sameSite: "strict",

    maxAge: 30 * 24 * 60 * 60 * 1000,
  },
);
```

Meaning

```text
JavaScript

↓

Cannot Read


HTTPS Only

↓

Yes


Cross-Site

↓

Blocked


Expires

↓

30 Days
```

---

# 10. Best Practices

✅ Always enable HttpOnly.

✅ Always enable Secure in production.

✅ Use SameSite=Lax or Strict unless cross-site requests are required.

✅ Set reasonable expiration.

✅ Clear cookies on logout.

✅ Use HTTPS.

---

# 11. Common Interview Questions

### What does HttpOnly do?

Prevents JavaScript from reading cookies.

---

### What does Secure do?

Allows cookies to be sent only over HTTPS.

---

### What does SameSite do?

Protects against CSRF attacks.

---

### Which SameSite value is most secure?

Strict.

---

### Should production cookies use Secure?

Yes.

Always.

---

# 12. Quick Revision

| Attribute | Purpose                   |
| --------- | ------------------------- |
| HttpOnly  | Prevent JavaScript access |
| Secure    | HTTPS only                |
| SameSite  | Reduce CSRF risk          |
| Max-Age   | Relative expiration       |
| Expires   | Absolute expiration       |

---

# 13. Interview Answer

> **Cookie attributes control how cookies are stored and transmitted. `HttpOnly` prevents JavaScript from accessing cookies, reducing the impact of XSS attacks. `Secure` ensures cookies are only sent over HTTPS, protecting them during transmission. `SameSite` helps defend against CSRF attacks by restricting when cookies are sent with cross-site requests. Cookie expiration can be controlled using `Max-Age` or `Expires`, allowing applications to define how long cookies remain valid. In production, authentication cookies should typically use `HttpOnly`, `Secure`, `SameSite`, and an appropriate expiration time to maximize security.**

---

# ⭐ Interview Tips

## Production Cookie

```text
HttpOnly

↓

JavaScript ❌


Secure

↓

HTTPS Only ✅


SameSite

↓

CSRF Protection ✅


Max-Age

↓

Automatic Expiration ✅
```

---

## Security Layers

```text
HttpOnly

↓

XSS Protection


Secure

↓

Network Protection


SameSite

↓

CSRF Protection
```

---

# ⭐ Most Asked Interview Questions

### Q1. Does HttpOnly prevent XSS?

**Not completely.**

HttpOnly **does not stop an XSS vulnerability** from existing. It only prevents malicious JavaScript from reading the cookie.

```text
XSS Attack

↓

JavaScript

↓

HttpOnly Cookie

↓

Cannot Read
```

---

### Q2. Should Secure be enabled during development?

Usually **no**, if you're running on plain `http://localhost`.

For production:

```text
HTTPS

↓

secure: true
```

For local development:

```javascript
secure: process.env.NODE_ENV === "production";
```

---

### Q3. Which SameSite value should I use?

| Value  | Use Case                                         |
| ------ | ------------------------------------------------ |
| Strict | Banking, admin panels, highly secure apps        |
| Lax    | Most web applications (recommended default)      |
| None   | Cross-site authentication (OAuth, embedded apps) |

If using `SameSite=None`, you **must** also set `Secure=true`.

---

### Q4. Which cookie settings do most production applications use?

```javascript
res.cookie("refreshToken", token, {
  httpOnly: true,
  secure: true,
  sameSite: "lax",
  maxAge: 30 * 24 * 60 * 60 * 1000,
});
```

This combination provides a strong balance of **security**, **browser compatibility**, and **user experience**.
