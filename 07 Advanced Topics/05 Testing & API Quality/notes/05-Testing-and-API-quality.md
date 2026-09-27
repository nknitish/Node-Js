# Testing & API Quality

## Testing types

- Unit testing
- Integration testing
- End-to-end testing
- API testing

## Tools

- Jest: test runner and assertion library
- Supertest: test HTTP endpoints without starting a browser
- NYC or coverage tools: measure coverage

## Good test strategy

- Test happy paths
- Test validation failures
- Test authentication flows
- Mock external services only when necessary
- Keep tests small and meaningful

## Example

```js
await request(app).get("/api/users").expect(200);
```

## Coverage goal

Aim for 80%+ code coverage in a real application, especially on business logic and APIs.
