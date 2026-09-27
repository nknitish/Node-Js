# Validation and Error Handling

## Why validation matters

User input is never safe. Validation ensures that the API only accepts expected values and returns clear errors before data reaches your database or business logic.

## Common validation tools

- Zod: good for TypeScript-first validation and clear type inference
- Joi: very popular for schema-based validation in JavaScript
- express-validator: a middleware-based approach for Express

## Error handling flow

1. Validate request body/query params
2. Throw a structured error or return a response
3. Centralize error response formatting
4. Log server errors without exposing internals

## Important concepts

- 400 Bad Request: invalid user input
- 401 Unauthorized: user is not authenticated
- 403 Forbidden: user is authenticated but not allowed
- 404 Not Found: route or resource missing
- 500 Internal Server Error: unexpected bug in code

## Best practices

- Use schema validation for all API inputs
- Avoid trusting frontend validation alone
- Return consistent error object structures
- Keep business validation separate from transport validation
- Use `abortEarly: false` in Joi when you want all errors together

## Example flow

```js
const userSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
});
```

This prevents invalid records from entering the application.
