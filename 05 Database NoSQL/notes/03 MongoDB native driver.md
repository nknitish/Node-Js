# MongoDB Native Driver (Node.js)

> **Interview Definition:**
> The **MongoDB Native Driver** is the official Node.js library provided by MongoDB that allows Node.js applications to communicate directly with a MongoDB database. It provides APIs for connecting to MongoDB, performing CRUD operations, creating indexes, running aggregations, managing transactions, and more—without using an ORM/ODM like Mongoose.

---

# Table of Contents

1. What is the MongoDB Native Driver?
2. Why Use the Native Driver?
3. Native Driver vs Mongoose
4. Installation
5. Connecting to MongoDB
6. Database & Collection
7. CRUD Operations
8. Query Operators
9. Update Operators
10. Connection Pooling
11. Transactions
12. Best Practices
13. Common Interview Questions
14. Quick Revision
15. Interview Answer

---

# 1. What is the MongoDB Native Driver?

The MongoDB Native Driver is the **official driver** for Node.js.

It acts as a bridge between:

```text id="jlwm139"
Node.js Application

↓

MongoDB Driver

↓

MongoDB Server
```

Without the driver:

Node.js cannot communicate with MongoDB.

---

# 2. Why Use the Native Driver?

The driver allows you to:

- Connect to MongoDB
- Create databases
- Create collections
- Insert documents
- Read documents
- Update documents
- Delete documents
- Create indexes
- Run aggregation pipelines
- Execute transactions
- Manage connection pooling

---

# 3. Native Driver vs Mongoose

| Native Driver           | Mongoose                                     |
| ----------------------- | -------------------------------------------- |
| Official MongoDB driver | ODM (Object Document Mapper)                 |
| Direct database access  | Adds schemas, models, validation, middleware |
| Write queries manually  | Work with models                             |
| Lightweight             | More features and abstractions               |
| Maximum control         | Faster development for many applications     |

---

# 4. Installation

```bash id="’wini140"
npm install mongodb
```

Import:

```js id="’wini141"
import { MongoClient } from "mongodb";
```

---

# 5. Connecting to MongoDB

```js id="’wini142"
import { MongoClient } from "mongodb";

const url = "mongodb://localhost:27017";

const client = new MongoClient(url);

await client.connect();

console.log("Connected");
```

Connection flow:

```text id="’wini143"
Node.js

↓

MongoClient

↓

MongoDB
```

---

# 6. Selecting a Database

```js id="’wini144"
const db = client.db("company");
```

Select a collection:

```js id="’wini145"
const users = db.collection("users");
```

Hierarchy:

```text id="’wini146"
MongoClient

↓

Database

↓

Collection

↓

Documents
```

---

# 7. CRUD Operations

## Insert One

```js id="’wini147"
await users.insertOne({
  name: "Nitish",
  age: 25,
  city: "Delhi",
});
```

---

## Insert Many

```js id="’wini148"
await users.insertMany([
  {
    name: "Rahul",
    age: 27,
  },
  {
    name: "Aman",
    age: 24,
  },
]);
```

---

## Find All

```js id="’wini149"
const result = await users.find().toArray();

console.log(result);
```

---

## Find One

```js id="’wini150"
const user = await users.findOne({
  name: "Nitish",
});
```

---

## Update One

```js id="’wini151"
await users.updateOne(
  {
    name: "Nitish",
  },
  {
    $set: {
      age: 26,
    },
  },
);
```

---

## Update Many

```js id="’wini152"
await users.updateMany(
  {
    city: "Delhi",
  },
  {
    $set: {
      active: true,
    },
  },
);
```

---

## Delete One

```js id="’wini153"
await users.deleteOne({
  name: "Nitish",
});
```

---

## Delete Many

```js id="’wini154"
await users.deleteMany({
  active: false,
});
```

---

# 8. Query Operators

Find users older than 25:

```js id="’wini155"
await users
  .find({
    age: {
      $gt: 25,
    },
  })
  .toArray();
```

---

Find age greater than or equal to 18:

```js id="’wini156"
await users
  .find({
    age: {
      $gte: 18,
    },
  })
  .toArray();
```

---

Find users in Delhi:

```js id="’wini157"
await users
  .find({
    city: "Delhi",
  })
  .toArray();
```

---

Find using multiple conditions:

```js id="’wini158"
await users
  .find({
    age: {
      $gte: 18,
    },
    city: "Delhi",
  })
  .toArray();
```

---

# 9. Update Operators

## `$set`

```js id="’wini159"
await users.updateOne(
  {},
  {
    $set: {
      city: "Noida",
    },
  },
);
```

---

## `$inc`

```js id="’wini160"
await users.updateOne(
  {},
  {
    $inc: {
      age: 1,
    },
  },
);
```

---

## `$push`

```js id="’wini161"
await users.updateOne(
  {},
  {
    $push: {
      skills: "Node.js",
    },
  },
);
```

---

## `$pull`

```js id="’wini162"
await users.updateOne(
  {},
  {
    $pull: {
      skills: "Java",
    },
  },
);
```

---

# 10. Connection Pooling

The native driver automatically manages a connection pool.

```text id="’wini163"
Node.js

↓

Connection Pool

│

├── Connection 1

├── Connection 2

├── Connection 3

└── Connection 4

↓

MongoDB
```

Configure pool size:

```js id="’wini164"
const client = new MongoClient(url, {
  maxPoolSize: 10,
});
```

Connection pooling improves performance by reusing existing connections.

---

# 11. Transactions

Start a session:

```js id="’wini165"
const session = client.startSession();
```

Execute a transaction:

```js id="’wini166"
try {
  session.startTransaction();

  await users.insertOne(
    {
      name: "Nitish",
    },
    { session },
  );

  await users.updateOne(
    {
      name: "Rahul",
    },
    {
      $set: {
        active: true,
      },
    },
    { session },
  );

  await session.commitTransaction();
} catch (err) {
  await session.abortTransaction();
} finally {
  await session.endSession();
}
```

> **Note:** Multi-document transactions require MongoDB deployments that support transactions (for example, replica sets or sharded clusters).

---

# 12. Best Practices

✅ Reuse a single `MongoClient` instance across your application.

✅ Use async/await for database operations.

✅ Close the client gracefully when the application shuts down.

✅ Create indexes for frequently queried fields.

✅ Validate user input before writing to the database.

---

# 13. Common Interview Questions

### What is the MongoDB Native Driver?

The official Node.js library for interacting directly with MongoDB.

---

### Why use the native driver?

It provides direct access to MongoDB features with minimal abstraction.

---

### Difference between the native driver and Mongoose?

The native driver communicates directly with MongoDB, while Mongoose adds schemas, models, validation, middleware, and other ODM features.

---

### What does `find().toArray()` do?

`find()` returns a cursor. Calling `toArray()` retrieves all matching documents into an array.

---

### Why use a connection pool?

To reuse database connections and improve application performance.

---

### Can the native driver perform transactions?

Yes, when connected to MongoDB deployments that support transactions.

---

# 14. Quick Revision

| Operation    | Native Driver                  |
| ------------ | ------------------------------ |
| Connect      | `MongoClient`                  |
| Database     | `client.db()`                  |
| Collection   | `db.collection()`              |
| Insert       | `insertOne()`                  |
| Read         | `find()` / `findOne()`         |
| Update       | `updateOne()` / `updateMany()` |
| Delete       | `deleteOne()` / `deleteMany()` |
| Transactions | Sessions                       |

---

# 15. Interview Answer

> **The MongoDB Native Driver is the official Node.js library for communicating directly with MongoDB. It provides APIs to connect to the database, access databases and collections, perform CRUD operations, create indexes, execute aggregation pipelines, manage transactions, and handle connection pooling. Unlike Mongoose, the native driver does not provide schemas or models, giving developers direct access to MongoDB features with minimal abstraction and greater control over database operations.**
