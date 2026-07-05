# MongoDB Transactions

> **Interview Definition:**
> A **Transaction** in MongoDB is a group of one or more database operations that are executed as a **single atomic unit**. Either **all operations succeed (Commit)** or **all operations fail (Rollback)**, ensuring data consistency and integrity.

---

# Table of Contents

1. What is a Transaction?
2. Why Do We Need Transactions?
3. ACID Properties
4. How Transactions Work
5. Starting a Transaction
6. Commit Transaction
7. Abort Transaction (Rollback)
8. Transaction Example
9. Transactions with Mongoose
10. Transactions vs Single Operations
11. Best Practices
12. Common Interview Questions
13. Quick Revision
14. Interview Answer

---

# 1. What is a Transaction?

A transaction groups multiple database operations into **one logical unit**.

If every operation succeeds:

```text
Commit
```

If even one operation fails:

```text
Rollback
```

Example

```text
Transfer Money

↓

Debit Account

↓

Credit Account

↓

Success

↓

Commit
```

If credit fails

```text
Transfer Money

↓

Debit Account

↓

Credit Fails

↓

Rollback

↓

Balance Restored
```

---

# 2. Why Do We Need Transactions?

Imagine a banking application.

Account A

```text
₹5000
```

Account B

```text
₹2000
```

Transfer ₹1000

Without a transaction:

```text
Debit A ✅

Credit B ❌

Money Lost
```

With a transaction:

```text
Debit A

↓

Credit B

↓

Success

↓

Commit
```

Or

```text
Debit A

↓

Credit Fails

↓

Rollback

↓

Original Balances Restored
```

Transactions ensure consistency.

---

# 3. ACID Properties

Transactions follow **ACID** principles.

| Property    | Meaning                                                 |
| ----------- | ------------------------------------------------------- |
| Atomicity   | All operations succeed or none do                       |
| Consistency | Database remains valid before and after the transaction |
| Isolation   | Concurrent transactions don't interfere improperly      |
| Durability  | Committed changes survive failures                      |

---

# 4. How Transactions Work

```text
Start Session

↓

Start Transaction

↓

Operation 1

↓

Operation 2

↓

Operation 3

↓

Commit

OR

Abort
```

MongoDB uses **sessions** to manage transactions.

---

# 5. Starting a Transaction

Using the MongoDB Native Driver.

```javascript
import { MongoClient } from "mongodb";

const client = new MongoClient(uri);

await client.connect();

const session = client.startSession();
```

Start the transaction.

```javascript
session.startTransaction();
```

---

# 6. Commit Transaction

```javascript
await session.commitTransaction();
```

Everything is saved permanently.

Flow

```text
Operations

↓

Commit

↓

MongoDB Updated
```

---

# 7. Abort Transaction (Rollback)

```javascript
await session.abortTransaction();
```

Flow

```text
Operations

↓

Error

↓

Abort

↓

Database Restored
```

---

# 8. Complete Transaction Example (MongoDB Native Driver)

```javascript
import { MongoClient } from "mongodb";

const client = new MongoClient("mongodb://127.0.0.1:27017");

await client.connect();

const session = client.startSession();

try {
  session.startTransaction();

  const db = client.db("bank");

  const accounts = db.collection("accounts");

  await accounts.updateOne(
    { name: "Nitish" },
    { $inc: { balance: -1000 } },
    { session },
  );

  await accounts.updateOne(
    { name: "Rahul" },
    { $inc: { balance: 1000 } },
    { session },
  );

  await session.commitTransaction();

  console.log("Transaction Successful");
} catch (error) {
  await session.abortTransaction();

  console.log("Transaction Failed");
} finally {
  await session.endSession();

  await client.close();
}
```

---

# 9. Transactions with Mongoose

Create a session.

```javascript
const session = await mongoose.startSession();
```

Execute transaction.

```javascript
try {
  session.startTransaction();

  await User.create(
    [
      {
        name: "Nitish",
      },
    ],
    {
      session,
    },
  );

  await Order.create(
    [
      {
        product: "Laptop",
      },
    ],
    {
      session,
    },
  );

  await session.commitTransaction();
} catch (err) {
  await session.abortTransaction();
} finally {
  session.endSession();
}
```

---

## Using `withTransaction()`

A cleaner approach.

```javascript
const session = await mongoose.startSession();

await session.withTransaction(async () => {
  await User.create(
    [
      {
        name: "Nitish",
      },
    ],
    {
      session,
    },
  );

  await Order.create(
    [
      {
        product: "Laptop",
      },
    ],
    {
      session,
    },
  );
});

session.endSession();
```

---

# 10. Transactions vs Single Operations

Single update.

```javascript
await User.updateOne(
  {
    name: "Nitish",
  },
  {
    $set: {
      city: "Delhi",
    },
  },
);
```

No transaction needed.

---

Multiple collections.

```text
Users

↓

Orders

↓

Payments
```

Transaction recommended.

---

# 11. Best Practices

✅ Use transactions only when multiple related operations must succeed together.

✅ Keep transactions short to reduce lock duration and resource usage.

✅ Always use `try...catch...finally`.

✅ Always end the session.

✅ Prefer `withTransaction()` for cleaner transaction management.

> **Note:** Multi-document transactions require a MongoDB deployment that supports them (such as a replica set or sharded cluster).

---

# 12. Common Interview Questions

### What is a Transaction?

A group of operations that execute as one atomic unit.

---

### What happens if one operation fails?

The transaction is aborted, and all previous operations in the transaction are rolled back.

---

### Why are Sessions required?

Sessions allow MongoDB to track and manage the transaction across multiple operations.

---

### Difference between Commit and Abort?

| Commit           | Abort                 |
| ---------------- | --------------------- |
| Save all changes | Roll back all changes |

---

### When should you use Transactions?

When multiple related writes must either all succeed or all fail.

Examples:

- Bank transfers
- Order + Payment
- Inventory + Order
- User + Profile creation

---

### Are Transactions always necessary?

No.

A single document write in MongoDB is already atomic, so many operations do not require an explicit transaction.

---

# 13. Quick Revision

| Method                | Purpose                                                  |
| --------------------- | -------------------------------------------------------- |
| `startSession()`      | Create a session                                         |
| `startTransaction()`  | Begin transaction                                        |
| `commitTransaction()` | Save all changes                                         |
| `abortTransaction()`  | Roll back changes                                        |
| `endSession()`        | Close session                                            |
| `withTransaction()`   | Execute transaction with automatic commit/abort handling |

---

# 14. Interview Answer

> **Transactions in MongoDB allow multiple database operations to execute as a single atomic unit. If every operation succeeds, the transaction is committed; if any operation fails, the transaction is aborted and all previous changes are rolled back. Transactions follow the ACID properties—Atomicity, Consistency, Isolation, and Durability—and are managed using sessions. They are commonly used for workflows such as money transfers, order processing, inventory management, and other scenarios where multiple related operations across one or more documents or collections must remain consistent.**
