# SQL Basics (SELECT, INSERT, UPDATE, DELETE)

> **Interview Definition:**
> **SQL (Structured Query Language)** is the standard language used to communicate with **Relational Database Management Systems (RDBMS)** such as MySQL, PostgreSQL, SQL Server, Oracle, and SQLite. SQL is used to create databases, manage tables, insert data, retrieve data, update data, and delete data.

---

# Table of Contents

1. What is SQL?
2. What is a Database?
3. Table, Row, and Column
4. SQL Categories
5. SELECT Statement
6. INSERT Statement
7. UPDATE Statement
8. DELETE Statement
9. CRUD Operations
10. Sample Database
11. Common Interview Questions
12. Quick Revision
13. Interview Answer

---

# 1. What is SQL?

SQL stands for:

```text id="aq7lq8"
Structured Query Language
```

It is used to:

- Create databases
- Create tables
- Store data
- Retrieve data
- Update data
- Delete data
- Manage permissions

Example Databases:

- MySQL
- PostgreSQL
- SQLite
- SQL Server
- Oracle

---

# 2. What is a Database?

A database stores related information in an organized manner.

Example:

```text id="hboem0"
Company Database

│

├── Users

├── Products

├── Orders

└── Payments
```

Each table stores a different type of data.

---

# 3. Table, Row, and Column

Example table:

```text id="jwqg7q"
Users

------------------------------------------------

ID      Name        Age      City

------------------------------------------------

1       Nitish      25       Delhi

2       Rahul       28       Mumbai

3       Aman        24       Pune
```

Columns:

```text id="k59pfu"
ID

Name

Age

City
```

Rows:

```text id="i77ywd"
1 Nitish 25 Delhi

2 Rahul 28 Mumbai

3 Aman 24 Pune
```

---

# 4. SQL Categories

| Category | Purpose                                                        |
| -------- | -------------------------------------------------------------- |
| DDL      | Create and modify database objects (`CREATE`, `ALTER`, `DROP`) |
| DML      | Manipulate data (`INSERT`, `UPDATE`, `DELETE`)                 |
| DQL      | Retrieve data (`SELECT`)                                       |
| DCL      | Manage permissions (`GRANT`, `REVOKE`)                         |
| TCL      | Transaction control (`COMMIT`, `ROLLBACK`)                     |

For interviews, **SELECT, INSERT, UPDATE, and DELETE** are the most frequently used DML/DQL operations.

---

# Sample Table

We'll use this table throughout the examples.

```text id="v8s38n"
Users

-------------------------------------------------

ID      Name        Age      City

-------------------------------------------------

1       Nitish      25       Delhi

2       Rahul       28       Mumbai

3       Aman        24       Pune
```

---

# 5. SELECT Statement

## Purpose

Retrieve data from a table.

Syntax:

```sql id="tfnpsz"
SELECT column_name
FROM table_name;
```

---

## Select All Columns

```sql id="8aklbi"
SELECT *
FROM Users;
```

Output:

```text id="wy8dpc"
1 Nitish 25 Delhi

2 Rahul 28 Mumbai

3 Aman 24 Pune
```

---

## Select Specific Columns

```sql id="w6k8ru"
SELECT Name, Age
FROM Users;
```

Output:

```text id="2s7dm0"
Nitish 25

Rahul 28

Aman 24
```

---

## Filter Records

```sql id="jefxjm"
SELECT *
FROM Users
WHERE Age > 25;
```

Output:

```text id="h7rqqx"
Rahul 28 Mumbai
```

---

## Multiple Conditions

```sql id="q6qrm8"
SELECT *
FROM Users
WHERE Age > 20
AND City = 'Delhi';
```

---

## Sorting

```sql id="1mjlwm"
SELECT *
FROM Users
ORDER BY Age DESC;
```

Ascending:

```sql id="l1mjlwm"
SELECT *
FROM Users
ORDER BY Age ASC;
```

---

## Limit Rows

MySQL/PostgreSQL:

```sql id="6dk4df"
SELECT *
FROM Users
LIMIT 2;
```

---

# 6. INSERT Statement

## Purpose

Insert new rows into a table.

Syntax:

```sql id="vj3fx7"
INSERT INTO table_name (
    column1,
    column2
)
VALUES (
    value1,
    value2
);
```

Example:

```sql id="jlwm12"
INSERT INTO Users (
    Name,
    Age,
    City
)
VALUES (
    'Ankit',
    27,
    'Bangalore'
);
```

Table becomes:

```text id="1jlwm12"
ID   Name     Age    City

1    Nitish   25     Delhi

2    Rahul    28     Mumbai

3    Aman     24     Pune

4    Ankit    27     Bangalore
```

---

## Insert Multiple Rows

```sql id="2jlwm12"
INSERT INTO Users (
    Name,
    Age,
    City
)
VALUES
('Riya',22,'Delhi'),
('Karan',30,'Jaipur');
```

---

# 7. UPDATE Statement

## Purpose

Modify existing rows.

Syntax:

```sql id="3jlwm12"
UPDATE table_name
SET column = value
WHERE condition;
```

Example:

```sql id="4jlwm12"
UPDATE Users
SET City = 'Noida'
WHERE ID = 1;
```

Updated table:

```text id="5jlwm12"
Nitish

↓

Noida
```

---

## Update Multiple Columns

```sql id="6jlwm12"
UPDATE Users
SET
    Name = 'Nitish Kumar',
    Age = 26
WHERE ID = 1;
```

---

## ⚠️ Without WHERE

```sql id="7jlwm12"
UPDATE Users
SET City = 'Delhi';
```

Every row becomes:

```text id="8jlwm12"
Delhi
Delhi
Delhi
Delhi
```

This is a common interview warning.

---

# 8. DELETE Statement

## Purpose

Delete rows from a table.

Syntax:

```sql id="9jlwm12"
DELETE FROM table_name
WHERE condition;
```

Example:

```sql id="10jlwm12"
DELETE FROM Users
WHERE ID = 2;
```

Rahul is removed.

---

## ⚠️ Without WHERE

```sql id="11jlwm12"
DELETE FROM Users;
```

All rows are deleted.

The table remains, but it is empty.

---

# 9. CRUD Operations

```text id="12jlwm12"
Create

↓

INSERT

------------------

Read

↓

SELECT

------------------

Update

↓

UPDATE

------------------

Delete

↓

DELETE
```

---

# 10. Real-world Example

### Create User

```sql id="13jlwm12"
INSERT INTO Users (
    Name,
    Age
)
VALUES (
    'Nitish',
    25
);
```

---

### Get Users

```sql id="14jlwm12"
SELECT *
FROM Users;
```

---

### Update User

```sql id="15jlwm12"
UPDATE Users
SET Age = 26
WHERE ID = 1;
```

---

### Delete User

```sql id="16jlwm12"
DELETE FROM Users
WHERE ID = 1;
```

---

# 11. Common Interview Questions

### What is SQL?

A language used to interact with relational databases by querying and managing data.

---

### Difference between DELETE and DROP?

| DELETE          | DROP                     |
| --------------- | ------------------------ |
| Removes rows    | Removes the entire table |
| Table remains   | Table is deleted         |
| Can use `WHERE` | No `WHERE`               |

---

### Difference between DELETE and TRUNCATE?

| DELETE                              | TRUNCATE                               |
| ----------------------------------- | -------------------------------------- |
| Deletes selected or all rows        | Deletes all rows                       |
| Supports `WHERE`                    | No `WHERE`                             |
| Typically logs row-by-row deletions | Generally faster for removing all rows |

---

### Why is WHERE important?

Without a `WHERE` clause, `UPDATE` and `DELETE` affect every row in the table.

---

### What does `SELECT *` do?

Retrieves all columns from the specified table.

---

# 12. Quick Revision

| Command  | Purpose              |
| -------- | -------------------- |
| `SELECT` | Read data            |
| `INSERT` | Create new rows      |
| `UPDATE` | Modify existing rows |
| `DELETE` | Remove rows          |

---

# 13. Interview Answer

> **SQL (Structured Query Language) is the standard language used to work with relational databases. The four most fundamental SQL commands are `SELECT`, `INSERT`, `UPDATE`, and `DELETE`, which correspond to the CRUD operations. `SELECT` retrieves data, `INSERT` adds new records, `UPDATE` modifies existing records, and `DELETE` removes records. These commands form the foundation of almost every SQL-based application and are widely used in backend development and REST APIs.**
