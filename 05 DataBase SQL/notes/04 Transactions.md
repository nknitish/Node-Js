# SQL Transactions (COMMIT, ROLLBACK, SAVEPOINT & ACID)

> **Interview Definition:**
> A **Transaction** is a sequence of one or more SQL operations executed as a **single logical unit of work**. A transaction ensures that either **all operations succeed** or **none of them are applied**, keeping the database consistent and reliable.

---

# Table of Contents

1. What is a Transaction?
2. Why Do We Need Transactions?
3. Transaction Lifecycle
4. ACID Properties
5. BEGIN Transaction
6. COMMIT
7. ROLLBACK
8. SAVEPOINT
9. RELEASE SAVEPOINT
10. Real-world Examples
11. Isolation Levels
12. Common Problems Without Transactions
13. Best Practices
14. Common Interview Questions
15. Quick Revision
16. Interview Answer

---

# 1. What is a Transaction?

A transaction is a group of SQL statements that are treated as **one unit**.

Example:

```text id="w5d3kq"
Transfer ₹1000

↓

Withdraw ₹1000

↓

Deposit ₹1000

↓

Success
```

If either operation fails:

```text id="jcv31u"
Everything is undone
```

This prevents inconsistent data.

---

# 2. Why Do We Need Transactions?

Imagine transferring money.

Account A

```text id="8c6wq0"
₹5000
```

Account B

```text id="5jv4v6"
₹3000
```

Transfer:

```text id="h7m3mu"
Withdraw ₹1000

↓

Deposit ₹1000
```

Suppose the server crashes after withdrawal.

Without transactions:

```text id="nhlf4j"
Account A

₹4000

Account B

₹3000
```

₹1000 has effectively disappeared.

With transactions:

```text id="mu0e6l"
Failure

↓

ROLLBACK

↓

Account A ₹5000

Account B ₹3000
```

---

# 3. Transaction Lifecycle

```text id="3mznj5"
BEGIN

        │

        ▼

SQL Statements

        │

        ▼

Success?

   ┌────┴─────┐

   │          │

 Yes         No

   │          │

   ▼          ▼

COMMIT   ROLLBACK
```

---

# 4. ACID Properties

Transactions follow the **ACID** principles.

| Property            | Meaning                                                  |
| ------------------- | -------------------------------------------------------- |
| **A** - Atomicity   | All operations succeed or none do                        |
| **C** - Consistency | Database remains valid before and after the transaction  |
| **I** - Isolation   | Concurrent transactions do not interfere with each other |
| **D** - Durability  | Committed data survives crashes and restarts             |

---

## Atomicity

```text id="t4mjlwm"
Withdraw

↓

Deposit
```

Either both happen or neither happens.

---

## Consistency

Before:

```text id="jlwm45"
A = 5000

B = 3000
```

After transfer:

```text id="jlwm46"
A = 4000

B = 4000
```

The database remains in a valid state according to its rules and constraints.

---

## Isolation

Two users:

```text id="jlwm47"
User A

↓

Transaction

User B

↓

Transaction
```

Their work is isolated according to the chosen isolation level.

---

## Durability

After:

```text id="jlwm48"
COMMIT
```

The changes persist even if the database server crashes.

---

# 5. BEGIN Transaction

Start a transaction.

```sql id="’wini49"
BEGIN;
```

(or, in many databases:)

```sql id="’wini50"
START TRANSACTION;
```

Nothing is permanently saved until `COMMIT`.

---

# 6. COMMIT

Save all changes permanently.

```sql id="’wini51"
BEGIN;

UPDATE Accounts
SET Balance = Balance - 1000
WHERE ID = 1;

UPDATE Accounts
SET Balance = Balance + 1000
WHERE ID = 2;

COMMIT;
```

Flow:

```text id="’wini52"
BEGIN

↓

Updates

↓

COMMIT

↓

Permanent
```

---

# 7. ROLLBACK

Undo all changes made during the current transaction.

```sql id="’wini53"
BEGIN;

UPDATE Accounts
SET Balance = Balance - 1000
WHERE ID = 1;

ROLLBACK;
```

Result:

```text id="’wini54"
Database returns to its previous state.
```

---

# 8. SAVEPOINT

Create a checkpoint within a transaction.

```sql id="’wini55"
BEGIN;

UPDATE Users
SET Age = 26
WHERE ID = 1;

SAVEPOINT after_age_update;

UPDATE Users
SET City = 'Delhi'
WHERE ID = 1;
```

If the second update is wrong:

```sql id="’wini56"
ROLLBACK TO SAVEPOINT after_age_update;
```

Only changes made **after** the savepoint are undone.

---

# 9. RELEASE SAVEPOINT

Remove a savepoint.

```sql id="’wini57"
RELEASE SAVEPOINT after_age_update;
```

The transaction continues, but the named savepoint is no longer available.

---

# 10. Real-world Banking Example

Accounts

```text id="’wini58"
ID      Balance

1       5000

2       3000
```

Transfer:

```sql id="’wini59"
BEGIN;

UPDATE Accounts
SET Balance = Balance - 1000
WHERE ID = 1;

UPDATE Accounts
SET Balance = Balance + 1000
WHERE ID = 2;

COMMIT;
```

Result:

```text id="’wini60"
ID      Balance

1       4000

2       4000
```

---

# 11. Isolation Levels

Different databases provide isolation levels that balance **consistency** and **performance**.

| Isolation Level  | Prevents                                             |
| ---------------- | ---------------------------------------------------- |
| Read Uncommitted | Very few anomalies prevented                         |
| Read Committed   | Dirty reads                                          |
| Repeatable Read  | Dirty reads and non-repeatable reads                 |
| Serializable     | Dirty reads, non-repeatable reads, and phantom reads |

> The exact default isolation level depends on the database (for example, PostgreSQL and MySQL have different defaults).

---

# 12. Problems Without Transactions

Without transactions:

```text id="’wini61"
Update Account A

↓

Server Crash

↓

Account B Never Updated
```

Database becomes inconsistent.

---

With transactions:

```text id="’wini62"
Failure

↓

ROLLBACK

↓

Database Restored
```

---

# 13. Best Practices

✅ Use transactions for related operations.

Examples:

- Bank transfers
- Order creation
- Inventory updates
- Payment processing

---

✅ Commit only after all operations succeed.

---

✅ Roll back on errors.

---

✅ Keep transactions short to reduce locking and contention.

---

# 14. Common Interview Questions

### What is a transaction?

A sequence of SQL operations executed as a single unit of work.

---

### What does COMMIT do?

Permanently saves all changes made during the transaction.

---

### What does ROLLBACK do?

Undoes changes made during the current transaction.

---

### What is SAVEPOINT?

A checkpoint inside a transaction that allows partial rollback.

---

### What are ACID properties?

Atomicity, Consistency, Isolation, and Durability.

---

### Why are transactions important?

They ensure data consistency and prevent partial updates when failures occur.

---

# 15. Quick Revision

| Command                       | Purpose                       |
| ----------------------------- | ----------------------------- |
| `BEGIN` / `START TRANSACTION` | Start a transaction           |
| `COMMIT`                      | Save changes                  |
| `ROLLBACK`                    | Undo changes                  |
| `SAVEPOINT`                   | Create checkpoint             |
| `ROLLBACK TO SAVEPOINT`       | Undo changes after checkpoint |
| `RELEASE SAVEPOINT`           | Remove checkpoint             |

---

# 16. Interview Answer

> **A transaction is a sequence of SQL statements executed as a single logical unit of work. It guarantees that either all operations succeed or all are rolled back if an error occurs. Transactions follow the ACID properties: Atomicity, Consistency, Isolation, and Durability. Common transaction commands include `BEGIN` (or `START TRANSACTION`), `COMMIT`, `ROLLBACK`, and `SAVEPOINT`. Transactions are essential in scenarios such as banking, e-commerce, inventory management, and payment processing because they maintain database consistency even when failures occur.**
