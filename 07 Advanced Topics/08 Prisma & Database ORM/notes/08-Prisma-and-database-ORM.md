# Prisma & Database ORM

## What is Prisma?

Prisma is a modern ORM and database toolkit for Node.js and TypeScript. It helps you model data, query databases, and keep application code cleaner.

## Benefits

- Type-safe database access
- Clean schema modeling
- Simple migrations
- Strong developer experience
- Works well with PostgreSQL, MySQL, SQLite, and more

## Typical workflow

1. Define the Prisma schema
2. Run `prisma migrate dev`
3. Generate Prisma client
4. Use `prisma.user.findMany()` or `prisma.post.create()`

## Example

```js
const user = await prisma.user.create({
  data: { email: "test@example.com", name: "Test" },
});
```

## Best practices

- Keep schema changes under source control
- Validate configuration before production deployment
- Use transaction boundaries for multi-step writes
- Keep Prisma client usage centralized in service files
