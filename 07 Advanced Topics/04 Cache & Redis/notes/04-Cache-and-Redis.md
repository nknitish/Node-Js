# Cache & Redis

## Why cache data?

Caching reduces repeated expensive database calls and improves API speed.

## Cache terms

- Cache hit: data is found in cache
- Cache miss: data is not in cache and must be loaded
- TTL: time to live, how long a value remains valid

## Redis use cases

- Session storage
- Rate limiting
- API result caching
- Queues and pub/sub
- Job coordination

## Example pattern

```js
const cached = await redis.get("user:1");
if (!cached) {
  const user = await db.findUser(1);
  await redis.set("user:1", JSON.stringify(user), "EX", 60);
}
```

## Best practices

- Cache only data that is safe to reuse
- Use short TTL for dynamic content
- Invalidate cache when data changes
- Track cache misses and performance improvements
