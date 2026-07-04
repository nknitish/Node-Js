# SQL Indexes and Performance

> **Interview Definition:**
> An **Index** is a special database data structure that improves the speed of data retrieval operations. Instead of scanning every row in a table, the database uses the index to quickly locate matching records. Indexes significantly improve **SELECT** queries but can slow down **INSERT**, **UPDATE**, and **DELETE** operations because the index must also be maintained.

---

# Table of Contents

1. What is an Index?
2. Why Do We Need Indexes?
3. How an Index Works
4. Creating an Index
5. Types of Indexes
6. Clustered vs Non-Clustered Index
7. Composite Index
8. Unique Index
9. Primary Key Index
10. How Indexes Improve Performance
11. When NOT to Use Indexes
12. Query Optimization
13. Best Practices
14. Common Interview Questions
15. Quick Revision
16. Interview Answer

---

# 1. What is an Index?

Think of an index in a database like the index in a book.

Without an index:

```text id="y0w4mn"
Book

↓

Page 1

↓

Page 2

↓

Page 3

↓

...

↓

Page 500
```

To find "JavaScript", you may need to scan many pages.

With an index:

```text id="mepsuz"
Book Index

↓

JavaScript

↓

Page 342
```

You jump directly to the required page.

Databases work similarly.

---

# 2. Why Do We Need Indexes?

Suppose a table has:

```text id="2wzv9p"
Users

10,000,000 Rows
```

Query:

```sql id="8rq8dp"
SELECT *
FROM Users
WHERE email = 'nitish@gmail.com';
```

Without an index:

```text id="pm7htb"
Database

↓

Row 1

↓

Row 2

↓

Row 3

↓

...

↓

Row 10,000,000
```

This is called a **Full Table Scan**.

With an index:

```text id="gmbjlwm"
Database

↓

Index

↓

Matching Row
```

The database finds the row much faster.

---

# 3. How an Index Works

Most relational databases implement indexes using balanced tree structures (commonly **B-trees** or variants such as **B+ trees**).

Simplified view:

```text id="jlwm13"
          40
         /  \
       20    60
      / \    / \
    10 30 50 70
```

Searching for:

```text id="jlwm14"
50
```

The database follows the tree instead of scanning every row.

---

# 4. Creating an Index

Create an index:

```sql id="jlwm15"
CREATE INDEX idx_users_email
ON Users(email);
```

Now queries filtering by:

```sql id="jlwm16"
WHERE email = 'nitish@gmail.com'
```

can use the index.

---

## Remove an Index

```sql id="jlwm17"
DROP INDEX idx_users_email;
```

> **Note:** The exact syntax for dropping indexes differs across databases (MySQL, PostgreSQL, SQL Server, etc.).

---

# 5. Types of Indexes

| Index               | Purpose                                           |
| ------------------- | ------------------------------------------------- |
| Primary Key Index   | Unique identifier                                 |
| Unique Index        | Prevent duplicate values                          |
| Single-column Index | One column                                        |
| Composite Index     | Multiple columns                                  |
| Clustered Index     | Determines physical row order (database-specific) |
| Non-Clustered Index | Separate index structure                          |

---

# 6. Primary Key Index

Every primary key is automatically indexed in most relational databases.

Example:

```sql id="jlwm18"
CREATE TABLE Users (

    id INT PRIMARY KEY,

    name VARCHAR(100)

);
```

The database creates an index on:

```text id="jlwm19"
id
```

Searching:

```sql id="jlwm20"
SELECT *
FROM Users
WHERE id = 10;
```

is efficient.

---

# 7. Unique Index

Prevents duplicate values.

```sql id="jlwm21"
CREATE UNIQUE INDEX idx_email
ON Users(email);
```

Allowed:

```text id="jlwm22"
nitish@gmail.com

rahul@gmail.com
```

Not allowed:

```text id="jlwm23"
nitish@gmail.com

nitish@gmail.com
```

The second insert fails because the indexed column must remain unique.

---

# 8. Composite Index

Index on multiple columns.

```sql id="jlwm24"
CREATE INDEX idx_name_city
ON Users(name, city);
```

Useful query:

```sql id="jlwm25"
SELECT *
FROM Users
WHERE name = 'Nitish'
AND city = 'Delhi';
```

---

## Left-most Prefix Rule

For many databases using B-tree indexes, a composite index on:

```text id="jlwm26"
(name, city)
```

can efficiently support queries such as:

```sql id="’wini27"
WHERE name = 'Nitish'
```

and

```sql id="’wini28"
WHERE name = 'Nitish'
AND city = 'Delhi'
```

But it generally **cannot** efficiently support:

```sql id="’wini29"
WHERE city = 'Delhi'
```

because the leading indexed column (`name`) is missing.

---

# 9. Clustered vs Non-Clustered Index

## Clustered Index

Rows are stored according to the clustered index order (where supported).

```text id="’wini30"
1

2

3

4

5
```

Many databases allow only one clustered index per table.

---

## Non-Clustered Index

A separate structure stores indexed values and pointers to the data rows.

```text id="’wini31"
Email

↓

Pointer

↓

Actual Row
```

A table can typically have multiple non-clustered indexes (database-dependent).

---

# 10. How Indexes Improve Performance

Without index:

```sql id="’wini32"
SELECT *
FROM Users
WHERE email = 'abc@gmail.com';
```

Flow:

```text id="’wini33"
Scan Every Row

↓

Found
```

Time grows as the table grows.

---

With index:

```text id="’wini34"
Index

↓

Matching Entry

↓

Row
```

Much fewer rows need to be examined.

---

# 11. When NOT to Use Indexes

Indexes are not always beneficial.

Avoid excessive indexes on:

- Very small tables
- Columns with frequent updates
- Columns with very few distinct values (depending on the query workload)
- Temporary tables (depending on usage)

Why?

Every insert, update, or delete must also update the indexes.

---

# 12. Query Optimization

Suppose:

```sql id="’wini35"
SELECT *
FROM Users
WHERE email = 'abc@gmail.com';
```

If `email` is indexed:

```text id="’wini36"
Uses Index

↓

Fast
```

If `email` is not indexed:

```text id="’wini37"
Full Table Scan

↓

Slow
```

Many databases provide tools such as `EXPLAIN` (or similar) to inspect how a query will execute.

Example:

```sql id="’wini38"
EXPLAIN
SELECT *
FROM Users
WHERE email = 'abc@gmail.com';
```

---

# 13. Best Practices

✅ Index columns frequently used in:

- `WHERE`
- `JOIN`
- `ORDER BY`
- `GROUP BY`

---

✅ Index foreign keys when appropriate for joins.

---

❌ Don't create indexes on every column.

---

❌ Remove unused indexes.

---

❌ Monitor query performance before adding indexes.

---

# 14. Real-world Example

Users Table

```text id="’wini39"
ID

Name

Email
```

Create index:

```sql id="’wini40"
CREATE INDEX idx_users_email
ON Users(email);
```

Search:

```sql id="’wini41"
SELECT *
FROM Users
WHERE email = 'nitish@gmail.com';
```

Execution:

```text id="’wini42"
Query

↓

Index

↓

Matching Row

↓

Response
```

---

# 15. Common Interview Questions

### What is an Index?

A data structure that improves query performance by allowing the database to locate rows efficiently.

---

### Why are indexes faster?

Because the database searches the index instead of scanning every row.

---

### Do indexes improve INSERT performance?

No.

Additional work is required to maintain indexes during inserts, updates, and deletes.

---

### Does every column need an index?

No.

Too many indexes increase storage usage and slow write operations.

---

### Does a Primary Key create an index?

In most relational databases, yes.

---

### What is a Composite Index?

An index built on multiple columns to optimize queries that filter or sort using those columns.

---

### What is the left-most prefix rule?

For many B-tree composite indexes, queries should begin with the left-most indexed column to make efficient use of the index.

---

# 16. Quick Revision

| Concept             | Description                                        |
| ------------------- | -------------------------------------------------- |
| Index               | Speeds up data retrieval                           |
| Primary Key Index   | Automatically created in most databases            |
| Unique Index        | Prevents duplicates                                |
| Composite Index     | Multiple columns                                   |
| Clustered Index     | Determines physical row order (database-dependent) |
| Non-Clustered Index | Separate lookup structure                          |
| Drawback            | Slower writes and more storage                     |

---

# 17. Interview Answer

> **An index is a database data structure that improves the speed of data retrieval by allowing the database to locate rows efficiently instead of scanning the entire table. Most relational databases implement indexes using balanced tree structures such as B-trees. Indexes are especially useful for columns used in `WHERE`, `JOIN`, `ORDER BY`, and `GROUP BY` clauses. Common types include primary key indexes, unique indexes, single-column indexes, and composite indexes. While indexes significantly improve read performance, they also consume storage and add overhead to `INSERT`, `UPDATE`, and `DELETE` operations because the index must be maintained.**
