# SQL Joins and Relationships

> **Interview Definition:**
> **Relationships** define how tables are connected using **Primary Keys** and **Foreign Keys**, while **Joins** are SQL operations used to retrieve related data from two or more tables based on those relationships.

---

# Table of Contents

1. What are Relationships?
2. Why Do We Need Relationships?
3. Primary Key
4. Foreign Key
5. Types of Relationships
6. What is a JOIN?
7. Types of JOINs
8. INNER JOIN
9. LEFT JOIN
10. RIGHT JOIN
11. FULL OUTER JOIN
12. SELF JOIN
13. CROSS JOIN
14. JOIN Comparison
15. Real-world Examples
16. Common Interview Questions
17. Quick Revision
18. Interview Answer

---

# 1. What are Relationships?

In relational databases, data is usually split into multiple tables instead of storing everything in one table.

Example:

```text
Users Table

ID     Name

1      Nitish

2      Rahul
```

```text
Orders Table

OrderID     UserID      Product

101         1           Laptop

102         1           Mouse

103         2           Keyboard
```

Instead of storing the user's name repeatedly, the **Orders** table stores the **UserID**.

This creates a relationship between the two tables.

---

# 2. Why Do We Need Relationships?

Without relationships:

```text
Orders

------------------------------------------------

OrderID    UserName      Product

101        Nitish        Laptop

102        Nitish        Mouse

103        Nitish        Keyboard
```

Problems:

- Duplicate data
- More storage
- Hard to update
- Risk of inconsistent data

With relationships:

```text
Users

1   Nitish

2   Rahul
```

```text
Orders

101   UserID=1

102   UserID=1

103   UserID=2
```

Benefits:

- Less duplication
- Better consistency
- Easier maintenance
- Normalized database design

---

# 3. Primary Key (PK)

A **Primary Key** uniquely identifies each row in a table.

Example:

```text
Users

----------------------------

ID      Name

----------------------------

1       Nitish

2       Rahul

3       Aman
```

Here:

```text
ID
```

is the Primary Key.

Properties:

- Unique
- Cannot be NULL
- One primary key per table

---

# 4. Foreign Key (FK)

A **Foreign Key** is a column that references the Primary Key of another table.

```text
Users

ID (PK)

↓

Orders

UserID (FK)
```

Example:

```text
Users

ID     Name

1      Nitish

2      Rahul
```

```text
Orders

OrderID     UserID

101         1

102         2
```

`Orders.UserID` references `Users.ID`.

---

# 5. Types of Relationships

## One-to-One (1:1)

One user has one passport.

```text
User

1

↓

Passport

1
```

---

## One-to-Many (1:N)

One customer places many orders.

```text
User

1

↓

Orders

101

102

103
```

Most common relationship.

---

## Many-to-Many (M:N)

Students enroll in many courses.

Courses have many students.

```text
Students

↓

StudentCourses

↓

Courses
```

A **junction table** (also called a bridge table) stores the associations.

---

# 6. What is a JOIN?

A JOIN combines rows from multiple tables based on a related column.

Example:

Users

```text
ID      Name

1       Nitish

2       Rahul
```

Orders

```text
OrderID     UserID      Product

101         1           Laptop

102         2           Mouse
```

Query:

```sql
SELECT *
FROM Users
JOIN Orders
ON Users.ID = Orders.UserID;
```

Result:

```text
Nitish

Laptop

Rahul

Mouse
```

---

# 7. Types of JOINs

| JOIN            | Returns                             |
| --------------- | ----------------------------------- |
| INNER JOIN      | Matching rows only                  |
| LEFT JOIN       | All rows from left table + matches  |
| RIGHT JOIN      | All rows from right table + matches |
| FULL OUTER JOIN | All rows from both tables           |
| SELF JOIN       | Join a table with itself            |
| CROSS JOIN      | Cartesian product                   |

---

# Sample Tables

Users

```text
ID     Name

1      Nitish

2      Rahul

3      Aman
```

Orders

```text
OrderID     UserID      Product

101         1           Laptop

102         2           Mouse
```

---

# 8. INNER JOIN

Returns only matching rows.

```sql
SELECT
    Users.Name,
    Orders.Product
FROM Users
INNER JOIN Orders
ON Users.ID = Orders.UserID;
```

Result

```text
Nitish Laptop

Rahul Mouse
```

Notice:

Aman is missing because there are no matching orders.

---

### Visual

```text
Users      Orders

  ○────────○

Only intersection
```

---

# 9. LEFT JOIN

Returns:

- All rows from the left table
- Matching rows from the right table

```sql
SELECT
    Users.Name,
    Orders.Product
FROM Users
LEFT JOIN Orders
ON Users.ID = Orders.UserID;
```

Result

```text
Nitish Laptop

Rahul Mouse

Aman NULL
```

---

### Visual

```text
Users      Orders

○────────○

All left rows
```

---

# 10. RIGHT JOIN

Returns:

- All rows from the right table
- Matching rows from the left table

```sql
SELECT
    Users.Name,
    Orders.Product
FROM Users
RIGHT JOIN Orders
ON Users.ID = Orders.UserID;
```

If an order exists without a matching user, the user columns return `NULL`.

> **Note:** Some databases, such as SQLite, do not support `RIGHT JOIN`. In those systems, it is often rewritten using `LEFT JOIN` with the table order reversed.

---

# 11. FULL OUTER JOIN

Returns:

- Every row from both tables
- Matching rows combined
- Non-matching rows filled with `NULL`

```sql
SELECT
    Users.Name,
    Orders.Product
FROM Users
FULL OUTER JOIN Orders
ON Users.ID = Orders.UserID;
```

Visual

```text
Users

○────────○

Orders

Entire diagram
```

> **Note:** MySQL does not support `FULL OUTER JOIN` directly. It is commonly simulated using a combination of `LEFT JOIN`, `RIGHT JOIN`, and `UNION`.

---

# 12. SELF JOIN

Join a table with itself.

Employee Table

```text
ID     Name      ManagerID

1      CEO       NULL

2      Rahul     1

3      Nitish    2
```

Query

```sql
SELECT
    e.Name,
    m.Name AS Manager
FROM Employees e
JOIN Employees m
ON e.ManagerID = m.ID;
```

Result

```text
Rahul      CEO

Nitish     Rahul
```

---

# 13. CROSS JOIN

Every row combines with every other row.

Table A

```text
A

B
```

Table B

```text
1

2
```

Query

```sql
SELECT *
FROM TableA
CROSS JOIN TableB;
```

Result

```text
A 1

A 2

B 1

B 2
```

Rows returned:

```text
Rows(A) × Rows(B)
```

---

# 14. JOIN Comparison

| JOIN  | Result                        |
| ----- | ----------------------------- |
| INNER | Matching rows only            |
| LEFT  | All left + matching right     |
| RIGHT | All right + matching left     |
| FULL  | All rows from both tables     |
| SELF  | Same table joined with itself |
| CROSS | Every possible combination    |

---

# 15. Real-world Example

Users

```text
1 Nitish

2 Rahul
```

Orders

```text
101 Laptop

102 Mouse
```

Query

```sql
SELECT
    Users.Name,
    Orders.Product
FROM Users
INNER JOIN Orders
ON Users.ID = Orders.UserID;
```

Output

```text
Nitish Laptop

Rahul Mouse
```

---

# 16. Common Interview Questions

### What is a JOIN?

A SQL operation that combines data from multiple tables using related columns.

---

### Difference between INNER and LEFT JOIN?

| INNER JOIN         | LEFT JOIN                              |
| ------------------ | -------------------------------------- |
| Only matching rows | All left rows plus matching right rows |

---

### What is a Foreign Key?

A column that references the Primary Key of another table.

---

### What is a Primary Key?

A unique identifier for each row in a table.

---

### Why use relationships?

To reduce duplication, maintain consistency, and model real-world associations between data.

---

### What is a Many-to-Many relationship?

A relationship where multiple records in one table relate to multiple records in another table. It is implemented using a junction (bridge) table.

---

# 17. Quick Revision

| Concept         | Description                            |
| --------------- | -------------------------------------- |
| Primary Key     | Unique row identifier                  |
| Foreign Key     | References another table's Primary Key |
| INNER JOIN      | Matching rows only                     |
| LEFT JOIN       | All left rows                          |
| RIGHT JOIN      | All right rows                         |
| FULL OUTER JOIN | All rows from both tables              |
| SELF JOIN       | Join a table with itself               |
| CROSS JOIN      | Cartesian product                      |

---

# 18. Interview Answer

> **Relationships connect tables using Primary Keys and Foreign Keys, enabling normalized database design and reducing duplicate data. SQL JOINs retrieve related data from multiple tables based on these relationships. The most common JOIN is the `INNER JOIN`, which returns only matching rows. `LEFT JOIN` returns all rows from the left table and matching rows from the right table, while `RIGHT JOIN` does the opposite. `FULL OUTER JOIN` returns all rows from both tables, `SELF JOIN` joins a table with itself, and `CROSS JOIN` returns every possible combination of rows. Understanding relationships and JOINs is essential for designing efficient relational databases and writing SQL queries.**
