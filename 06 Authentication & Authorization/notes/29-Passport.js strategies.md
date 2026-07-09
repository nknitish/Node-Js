# Passport.js Strategies

> **Interview Definition:**  
> **Passport.js** is an authentication middleware for Node.js that provides a flexible and modular way to authenticate users. It supports multiple authentication mechanisms called **Strategies**, such as Local Authentication, JWT Authentication, Google OAuth, GitHub OAuth, Facebook OAuth, and many more.

> **One-line Interview Answer:**  
> **Passport.js simplifies authentication by providing reusable authentication strategies for different login methods.**

---

# Table of Contents

1. What is Passport.js?
2. Why Passport.js?
3. What is a Strategy?
4. Passport.js Architecture
5. Authentication Flow
6. Local Strategy
7. JWT Strategy
8. Google OAuth Strategy
9. GitHub OAuth Strategy
10. Session vs JWT with Passport
11. Passport Lifecycle
12. serializeUser & deserializeUser
13. Express Implementation
14. Common Passport Strategies
15. Best Practices
16. Common Interview Questions
17. Quick Revision
18. Interview Answer

---

# 1. What is Passport.js?

Passport.js is an authentication middleware for Express.

Instead of writing authentication logic yourself,

Passport provides ready-made authentication strategies.

```text
Express

↓

Passport.js

↓

Authentication Strategy

↓

User Verified
```

---

# 2. Why Passport.js?

Without Passport

```text
Google Login

↓

Write OAuth Logic

↓

Exchange Tokens

↓

Verify User

↓

Create Session
```

With Passport

```text
Passport

↓

Google Strategy

↓

Done
```

It reduces boilerplate code.

---

# 3. What is a Strategy?

A Strategy is simply a plugin that tells Passport **how to authenticate a user**.

Examples

```text
Local Strategy

↓

Email + Password
```

```text
JWT Strategy

↓

Bearer Token
```

```text
Google Strategy

↓

Google OAuth
```

```text
GitHub Strategy

↓

GitHub OAuth
```

Passport itself doesn't authenticate users.

Strategies do.

---

# 4. Passport.js Architecture

```text
              Client

                 │

                 ▼

             Express

                 │

                 ▼

            Passport.js

                 │

       ┌─────────┼──────────┐

       ▼         ▼          ▼

   Local      JWT      Google

 Strategy   Strategy   Strategy

       ▼         ▼          ▼

     User Database / OAuth Provider

                 │

                 ▼

         Authentication Result
```

---

# 5. Authentication Flow

```text
Request

↓

Passport.authenticate()

↓

Selected Strategy

↓

Verify Credentials

↓

Success / Failure

↓

Route Handler
```

---

# 6. Local Strategy

Used for traditional login.

```text
Email

+

Password
```

Install

```bash
pnpm add passport-local
```

Example

```javascript
import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";

passport.use(
  new LocalStrategy(
    {
      usernameField: "email",
    },

    async (email, password, done) => {
      const user = await User.findOne({ email });

      if (!user) {
        return done(null, false);
      }

      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        return done(null, false);
      }

      return done(null, user);
    },
  ),
);
```

Login Route

```javascript
app.post(
  "/login",

  passport.authenticate("local"),

  (req, res) => {
    res.send("Login Successful");
  },
);
```

---

# 7. JWT Strategy

Used for API authentication.

Install

```bash
pnpm add passport-jwt
```

Example

```javascript
import { Strategy as JwtStrategy } from "passport-jwt";

passport.use(
  new JwtStrategy(
    {
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),

      secretOrKey: process.env.JWT_SECRET,
    },

    async (payload, done) => {
      const user = await User.findById(payload.userId);

      done(null, user);
    },
  ),
);
```

Protected Route

```javascript
app.get(
  "/profile",

  passport.authenticate(
    "jwt",

    {
      session: false,
    },
  ),

  (req, res) => {
    res.json(req.user);
  },
);
```

---

# 8. Google OAuth Strategy

Install

```bash
pnpm add passport-google-oauth20
```

Strategy

```javascript
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.CLIENT_ID,

      clientSecret: process.env.CLIENT_SECRET,

      callbackURL: "/auth/google/callback",
    },

    async (
      accessToken,

      refreshToken,

      profile,

      done,
    ) => {
      done(null, profile);
    },
  ),
);
```

---

# 9. GitHub OAuth Strategy

Install

```bash
pnpm add passport-github2
```

```javascript
passport.use(
  new GitHubStrategy(
    {
      clientID: process.env.CLIENT_ID,

      clientSecret: process.env.CLIENT_SECRET,

      callbackURL: "/auth/github/callback",
    },

    async (
      accessToken,

      refreshToken,

      profile,

      done,
    ) => {
      done(null, profile);
    },
  ),
);
```

---

# 10. Session vs JWT with Passport

Passport works with both.

## Session Authentication

```text
Passport

↓

Session

↓

Cookie

↓

Server Session
```

Example

```javascript
passport.authenticate("local");
```

---

## JWT Authentication

```text
Passport

↓

JWT

↓

Authorization Header

↓

Stateless
```

Example

```javascript
passport.authenticate(
  "jwt",

  {
    session: false,
  },
);
```

---

# 11. Passport Lifecycle

```text
Incoming Request

↓

Passport.authenticate()

↓

Strategy

↓

Verify User

↓

Success

↓

req.user

↓

Route Handler
```

---

# 12. serializeUser & deserializeUser

Used only with **session-based authentication**.

### serializeUser()

Stores user identifier in the session.

```javascript
passport.serializeUser((user, done) => {
  done(null, user.id);
});
```

---

### deserializeUser()

Retrieves the full user from the session.

```javascript
passport.deserializeUser(async (id, done) => {
  const user = await User.findById(id);

  done(null, user);
});
```

Flow

```text
Login

↓

serializeUser

↓

Session

↓

Next Request

↓

deserializeUser

↓

req.user
```

For JWT authentication,

these methods are **not used**.

---

# 13. Express Implementation

```javascript
import passport from "passport";

app.use(passport.initialize());

app.use(passport.session());
```

`passport.session()` is required only if using session-based authentication.

---

# 14. Common Passport Strategies

| Strategy | Purpose            |
| -------- | ------------------ |
| Local    | Email & Password   |
| JWT      | API Authentication |
| Google   | Google OAuth       |
| GitHub   | GitHub OAuth       |
| Facebook | Facebook Login     |
| OAuth2   | Generic OAuth      |

---

# 15. Best Practices

✅ Use JWT strategy for REST APIs.

✅ Use Local strategy for username/password login.

✅ Use OAuth strategies for social login.

✅ Store secrets in `.env`.

✅ Hash passwords using bcrypt.

✅ Use HTTPS.

✅ Disable sessions (`session: false`) when using JWT.

---

# 16. Common Interview Questions

### What is Passport.js?

Authentication middleware for Express.

---

### What is a Strategy?

A plugin that defines how authentication happens.

---

### Can Passport use JWT?

Yes.

Using

```text
passport-jwt
```

---

### Can Passport use Google OAuth?

Yes.

Using

```text
passport-google-oauth20
```

---

### Does Passport store users?

No.

Passport only authenticates.

You manage your own database.

---

# 17. Quick Revision

| Strategy | Authentication   |
| -------- | ---------------- |
| Local    | Email + Password |
| JWT      | Bearer Token     |
| Google   | Google OAuth     |
| GitHub   | GitHub OAuth     |
| Session  | Cookie + Session |

---

# 18. Interview Answer

> **Passport.js is an authentication middleware for Express.js that simplifies user authentication through reusable strategies. A strategy defines how a user is authenticated, such as using an email and password (Local Strategy), a JWT (JWT Strategy), or a third-party provider like Google or GitHub (OAuth Strategies). Passport itself does not store users or sessions—it delegates authentication to strategies and then attaches the authenticated user to `req.user`. It supports both session-based and stateless JWT authentication, making it a flexible choice for web applications and APIs.**

---

# ⭐ Interview Tips

## Passport Architecture

```text
Client

↓

Express

↓

Passport

↓

Strategy

↓

Database / OAuth

↓

Authenticated
```

---

## Strategy Selection

```text
Email Login

↓

Local Strategy


API Request

↓

JWT Strategy


Google Login

↓

Google Strategy


GitHub Login

↓

GitHub Strategy
```

---

## Passport Request Flow

```text
Request

↓

passport.authenticate()

↓

Strategy

↓

Verify User

↓

req.user

↓

Controller
```

---

# ⭐ Most Asked Interview Questions

### Q1. Why use Passport.js instead of writing authentication yourself?

Passport provides:

- Ready-made authentication strategies
- Consistent authentication flow
- Support for many providers
- Less boilerplate code

However, for simple JWT-based APIs, many teams implement authentication manually because Passport can add unnecessary abstraction.

---

### Q2. Can Passport.js work without sessions?

Yes.

For JWT authentication:

```javascript
passport.authenticate("jwt", {
  session: false,
});
```

This creates a stateless authentication flow.

---

### Q3. What is the difference between `passport.initialize()` and `passport.session()`?

| Method                  | Purpose                                                |
| ----------------------- | ------------------------------------------------------ |
| `passport.initialize()` | Initializes Passport for every request                 |
| `passport.session()`    | Restores authenticated users from server-side sessions |

If you're using JWT authentication only, you typically use **only** `passport.initialize()`.

---

### Q4. Do companies always use Passport.js?

No.

Many modern Node.js applications:

- Use Passport.js for OAuth integrations (Google, GitHub, etc.).
- Implement JWT authentication manually using libraries like `jsonwebtoken`.

Passport is a tool, not a requirement. The choice depends on the project's complexity and authentication needs.
