# Node.js Database Drivers (`pg` & `mysql2`)

> **Interview Definition:**
> A **Database Driver** is a software library that allows a Node.js application to communicate with a database server. It manages the connection, sends SQL queries, receives results, handles prepared statements, transactions, and connection pooling.

---

# Table of Contents

1. What is a Database Driver?
2. Why Do We Need a Driver?
3. How Database Drivers Work
4. Popular Node.js Database Drivers
5. Installing Drivers
6. PostgreSQL Driver (`pg`)
7. MySQL Driver (`mysql2`)
8. Connection Pooling
9. Parameterized Queries
10. Transactions
11. Driver vs ORM
12. Best Practices
13. Common Interview Questions
14. Quick Revision
15. Interview Answer

---

# 1. What is a Database Driver?

Node.js cannot directly communicate with a database.

Instead, it uses a **driver**.

Example:

```text id="exq4dl"
Node.js Application

↓

Database Driver

↓

Database Server
```

The driver translates your JavaScript code into database protocol messages.

---

# 2. Why Do We Need a Driver?

Suppose we write:

```js id="jlwm66"
SELECT * FROM users;
```

Node.js doesn't know how to send this to PostgreSQL or MySQL.

The driver:

- Opens a connection
- Sends the SQL
- Receives the result
- Converts it into JavaScript objects

---

# 3. Internal Flow

```text id="jlwm67"
Express

        │

        ▼

Controller

        │

        ▼

Database Driver

        │

        ▼

Database

        │

        ▼

Result

        │

        ▼

JSON Response
```

---

# 4. Popular Node.js Database Drivers

| Database             | Driver                       |
| -------------------- | ---------------------------- |
| PostgreSQL           | `pg`                         |
| MySQL / MariaDB      | `mysql2`                     |
| SQLite               | `sqlite3` / `better-sqlite3` |
| Microsoft SQL Server | `mssql`                      |
| Oracle               | `oracledb`                   |

---

# 5. Installing Drivers

## PostgreSQL

```bash id="jlwm68"
npm install pg
```

---

## MySQL

```bash id="’wini69"
npm install mysql2
```

---

# 6. PostgreSQL Driver (`pg`)

Import:

```js id="’wini70"
import { Pool } from "pg";
```

Create a connection pool:

```js id="’wini71"
const pool = new Pool({
  host: "localhost",
  port: 5432,
  user: "postgres",
  password: "password",
  database: "company",
});
```

Run a query:

```js id="’wini72"
const result = await pool.query("SELECT * FROM users");

console.log(result.rows);
```

Response:

```js id="’wini73"
[
  {
    id: 1,
    name: "Nitish",
  },
];
```

---

## Parameterized Query

Avoid SQL Injection.

```js id="’wini74"
const id = 1;

const result = await pool.query("SELECT * FROM users WHERE id = $1", [id]);
```

`$1`, `$2`, `$3` are placeholders in PostgreSQL.

---

# 7. MySQL Driver (`mysql2`)

Import:

```js id="’wini75"
import mysql from "mysql2/promise";
```

Create a connection:

```js id="’wini76"
const connection = await mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "password",
  database: "company",
});
```

Run a query:

```js id="’wini77"
const [rows] = await connection.execute("SELECT * FROM users");

console.log(rows);
```

---

## Parameterized Query

```js id="’wini78"
const id = 1;

const [rows] = await connection.execute("SELECT * FROM users WHERE id = ?", [
  id,
]);
```

`?` is the placeholder in MySQL.

---

# 8. Connection Pooling

Creating a new database connection for every request is expensive.

Without pooling:

```text id="’wini79"
Request

↓

Create Connection

↓

Query

↓

Close Connection
```

Repeated for every request.

---

With pooling:

```text id="’wini80"
Connection Pool

│

├── Connection 1

├── Connection 2

├── Connection 3

└── Connection 4
```

Requests reuse existing connections.

---

## PostgreSQL Pool

```js id="’wini81"
const pool = new Pool({
  max: 10,
});
```

---

## MySQL Pool

```js id="’wini82"
const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "password",
  database: "company",
  connectionLimit: 10,
});
```

---

# 9. Transactions

## PostgreSQL

```js id="’wini83"
const client = await pool.connect();

try {
  await client.query("BEGIN");

  await client.query(
    "UPDATE accounts SET balance = balance - 1000 WHERE id = 1",
  );

  await client.query(
    "UPDATE accounts SET balance = balance + 1000 WHERE id = 2",
  );

  await client.query("COMMIT");
} catch (err) {
  await client.query("ROLLBACK");

  throw err;
} finally {
  client.release();
}
```

---

## MySQL

```js id="’wini84"
const connection = await pool.getConnection();

try {
  await connection.beginTransaction();

  await connection.execute(
    "UPDATE accounts SET balance = balance - 1000 WHERE id = 1",
  );

  await connection.execute(
    "UPDATE accounts SET balance = balance + 1000 WHERE id = 2",
  );

  await connection.commit();
} catch (err) {
  await connection.rollback();

  throw err;
} finally {
  connection.release();
}
```

---

# 10. Driver vs ORM

| Database Driver          | ORM                                  |
| ------------------------ | ------------------------------------ |
| Write SQL manually       | Work with models/objects             |
| More control             | Higher abstraction                   |
| Better for complex SQL   | Faster development                   |
| Examples: `pg`, `mysql2` | Examples: Prisma, Sequelize, TypeORM |

---

# 11. Real-world Express Example

```js id="’wini85"
import express from "express";
import { Pool } from "pg";

const app = express();

const pool = new Pool({
  database: "company",
});

app.get("/users", async (req, res) => {
  const result = await pool.query("SELECT * FROM users");

  res.json(result.rows);
});

app.listen(3000);
```

Flow:

```text id="’wini86"
HTTP Request

↓

Express

↓

Controller

↓

pg Driver

↓

PostgreSQL

↓

Rows

↓

JSON Response
```

---

# 12. Best Practices

✅ Use connection pools instead of creating a new connection for every request.

✅ Always use parameterized queries.

✅ Close or release connections after use.

✅ Use transactions for related operations.

✅ Store credentials in environment variables instead of hardcoding them.

---

# 13. Common Interview Questions

### What is a database driver?

A library that allows an application to communicate with a database.

---

### Why use `pg`?

To connect Node.js applications to PostgreSQL.

---

### Why use `mysql2` instead of `mysql`?

`mysql2` supports modern features such as Promise-based APIs and generally offers better performance and compatibility with current Node.js development practices.

---

### What is connection pooling?

A technique that reuses database connections instead of creating a new one for every request.

---

### Why use parameterized queries?

To safely pass user input and help prevent SQL injection attacks.

---

### Difference between a driver and an ORM?

A driver executes SQL directly, while an ORM maps database tables to application objects and provides a higher-level API.

---

# 14. Quick Revision

| Concept         | PostgreSQL                    | MySQL                                          |
| --------------- | ----------------------------- | ---------------------------------------------- |
| Driver          | `pg`                          | `mysql2`                                       |
| Query Method    | `pool.query()`                | `connection.execute()`                         |
| Placeholder     | `$1`                          | `?`                                            |
| Connection Pool | `Pool`                        | `createPool()`                                 |
| Transactions    | `BEGIN`, `COMMIT`, `ROLLBACK` | `beginTransaction()`, `commit()`, `rollback()` |

---

# 15. Interview Answer

> **A database driver is a library that enables a Node.js application to communicate with a database server. Popular drivers include `pg` for PostgreSQL and `mysql2` for MySQL. Drivers manage database connections, execute SQL queries, support parameterized queries to help prevent SQL injection, handle transactions, and often provide connection pooling for better performance. Unlike ORMs, database drivers require developers to write SQL directly, giving greater control and flexibility over database interactions.**
