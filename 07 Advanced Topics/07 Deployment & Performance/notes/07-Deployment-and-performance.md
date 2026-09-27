# Deployment & Performance

## Production concerns

A Node.js app needs more than a server start command. In production you also need:

- process management
- reverse proxy
- health checks
- monitoring
- logging
- compression
- optimization

## Common tools

- PM2: process manager
- Nginx: reverse proxy and load balancing
- Docker: containerization
- Pino: lightweight logging
- Compression middleware: reduces payload size

## Performance best practices

- Use gzip or brotli compression
- Cache repetitive data with Redis
- Add indexes for database queries
- Avoid blocking code in the event loop
- Measure memory and CPU with built-in profiling tools

## Typical deployment flow

1. Install dependencies
2. Validate environment variables
3. Start app with process manager
4. Route traffic via Nginx or a cloud provider
5. Monitor logs and health checks
