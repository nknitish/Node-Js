# Background Jobs & Real-Time Communication

## Background jobs

Background jobs allow long-running tasks to be processed outside the request lifecycle.

Popular tools:

- BullMQ
- Agenda
- RabbitMQ
- Bee-Queue

## Real time

Socket.io is used for live communication between the server and browser clients.

```js
io.on("connection", (socket) => {
  socket.emit("welcome", { message: "Connected" });
});
```

## Example use cases

- Email sending
- Image processing
- Export generation
- Notiﬁcations
- Chat applications

## Best practices

- Keep jobs idempotent
- Retry failed tasks safely
- Store job metadata in Redis or database
- Add monitoring for queue health
