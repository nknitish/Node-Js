# Security Best Practices

## Core security concepts

- Authentication proves who the user is
- Authorization decides what that user is allowed to do
- Use HTTPS in production
- Never expose secrets in source code

## Libraries used

- Helmet: adds secure HTTP headers
- CORS: controls cross-origin requests
- express-rate-limit: limits repeated requests
- bcryptjs: hashes passwords
- jsonwebtoken: manages access tokens

## Important protections

- Hash passwords with bcrypt, not plain text
- Use short-lived JWT tokens
- Store secrets in `.env` files
- Set `HttpOnly`, `Secure`, and `SameSite` when using cookies
- Validate all user input

## Example use

```js
app.use(helmet());
app.use(cors({ origin: true }));
app.use(rateLimit({ windowMs: 15 * 60 * 1000, max: 100 }));
```

## Common vulnerabilities

- SQL Injection
- XSS
- CSRF
- Brute force attacks
- Parameter pollution

Always sanitize inputs and use allow-lists for validation.
