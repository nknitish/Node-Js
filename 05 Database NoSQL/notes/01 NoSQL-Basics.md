# NoSQL Basics (MongoDB, Document Databases & NoSQL Concepts)

> **Interview Definition:**
> **NoSQL (Not Only SQL)** refers to a family of non-relational databases designed to store and retrieve data without relying on fixed table schemas. Unlike SQL databases, NoSQL databases are flexible, horizontally scalable, and optimized for handling large volumes of structured, semi-structured, and unstructured data.

---

# Table of Contents

1. What is NoSQL?
2. Why NoSQL?
3. SQL vs NoSQL
4. Types of NoSQL Databases
5. Document Databases
6. Collections & Documents
7. MongoDB Data Model
8. CRUD Operations
9. Relationships in NoSQL
10. Scaling
11. When to Use NoSQL
12. SQL vs NoSQL Comparison
13. Advantages & Disadvantages
14. Real-world Examples
15. Common Interview Questions
16. Quick Revision
17. Interview Answer

---

# 1. What is NoSQL?

NoSQL means:

```text id="g5h12n"
Not Only SQL
```

It does **not** mean SQL is obsolete.

Instead, it means:

- Different storage model
- Flexible schema
- Horizontal scalability
- High performance for certain workloads

Popular NoSQL databases:

- MongoDB
- Redis
- Cassandra
- CouchDB
- DynamoDB
- Neo4j

---

# 2. Why NoSQL?

Imagine storing user profiles.

SQL

```text id="1r4n7f"
Users

-----------------------------

ID

Name

Age

Phone

City

Country

Pincode
```

Adding a new field:

```text id="jlwm89"
Instagram
```

may require changing the table schema.

---

NoSQL

```json id="jlwm90"
{
  "name": "Nitish",
  "age": 25
}
```

Another document:

```json id="’wini91"
{
  "name": "Rahul",
  "age": 27,
  "instagram": "@rahul"
}
```

Different documents can contain different fields.

---

# 3. SQL vs NoSQL

| SQL              | NoSQL                                  |
| ---------------- | -------------------------------------- |
| Tables           | Collections                            |
| Rows             | Documents                              |
| Columns          | Fields                                 |
| Fixed Schema     | Flexible Schema                        |
| Relationships    | Embedded or referenced data            |
| Vertical Scaling | Horizontal Scaling                     |
| Uses SQL         | Database-specific query APIs/languages |

---

# 4. Types of NoSQL Databases

## 1. Document Database

Stores JSON-like documents.

Example:

- MongoDB
- CouchDB

---

## 2. Key-Value Database

Stores:

```text id="’wini92"
Key

↓

Value
```

Example:

```text id="’wini93"
user:1

↓

Nitish
```

Examples:

- Redis
- DynamoDB (supports key-value access patterns)

---

## 3. Column-family Database

Stores data by column families.

Examples:

- Cassandra
- HBase

Optimized for large-scale analytical and distributed workloads.

---

## 4. Graph Database

Stores:

```text id="’wini94"
Nodes

↓

Relationships

↓

Edges
```

Examples:

- Neo4j

Useful for:

- Social networks
- Recommendations
- Fraud detection

---

# 5. Document Database

Most popular NoSQL type.

Example document:

```json id="’wini95"
{
  "_id": 1,
  "name": "Nitish",
  "age": 25,
  "city": "Delhi"
}
```

Documents are stored inside collections.

---

# 6. Collections & Documents

SQL

```text id="’wini96"
Database

↓

Table

↓

Row
```

MongoDB

```text id="’wini97"
Database

↓

Collection

↓

Document
```

Example

```text id="’wini98"
Company

↓

Users Collection

↓

User Documents
```

---

# 7. MongoDB Data Model

Collection:

```text id="’wini99"
users
```

Documents:

```json id="’wini100"
{
  "_id": 1,
  "name": "Nitish",
  "age": 25
}
```

```json id="’wini101"
{
  "_id": 2,
  "name": "Rahul",
  "city": "Mumbai",
  "skills": ["React", "Node"]
}
```

Notice:

Different documents have different fields.

---

# 8. CRUD Operations

## Create

```javascript id="’wini102"
db.users.insertOne({
  name: "Nitish",
  age: 25,
});
```

---

## Read

```javascript id="’wini103"
db.users.find();
```

---

## Update

```javascript id="’wini104"
db.users.updateOne(
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

## Delete

```javascript id="’wini105"
db.users.deleteOne({
  name: "Nitish",
});
```

---

# 9. Relationships in NoSQL

Unlike SQL joins, NoSQL often stores related data together.

SQL

```text id="’wini106"
Users

↓

Orders
```

Separate tables.

---

MongoDB

```json id="’wini107"
{
  "name": "Nitish",
  "orders": [
    {
      "product": "Laptop"
    },
    {
      "product": "Mouse"
    }
  ]
}
```

This is called **embedding**.

Another approach is **referencing**, where one document stores the ID of another document.

---

# 10. Scaling

SQL

```text id="’wini108"
Bigger Server

↓

Vertical Scaling
```

NoSQL

```text id="’wini109"
Server 1

Server 2

Server 3

↓

Horizontal Scaling
```

Horizontal scaling distributes data across multiple servers.

---

# 11. When to Use NoSQL?

Good choices include:

- Social media applications
- Chat applications
- Real-time analytics
- IoT systems
- Content management
- Logging systems
- Rapidly evolving schemas

---

# 12. SQL vs NoSQL Comparison

| Feature       | SQL                        | NoSQL                                         |
| ------------- | -------------------------- | --------------------------------------------- |
| Schema        | Fixed                      | Flexible                                      |
| Data Model    | Tables                     | Documents / Key-Value / Graph / Column-family |
| Relationships | Joins                      | Embedding or references                       |
| Scaling       | Vertical                   | Horizontal                                    |
| Transactions  | Strong transaction support | Varies by database                            |
| Best For      | Structured relational data | Flexible and large-scale data                 |

---

# 13. Advantages

✅ Flexible schema

✅ Easy horizontal scaling

✅ High performance for many workloads

✅ Stores nested JSON-like documents

✅ Good for rapidly changing applications

---

# 14. Disadvantages

❌ Joins may be limited or handled differently than SQL databases.

❌ Data duplication may increase depending on the modeling approach.

❌ Consistency guarantees vary across different NoSQL databases.

❌ Query languages and features are not standardized across vendors.

---

# 15. Real-world Example

MongoDB

```json id="’wini110"
{
  "_id": 101,
  "name": "Nitish",
  "email": "nitish@gmail.com",
  "skills": ["React", "Node.js"],
  "address": {
    "city": "Delhi",
    "country": "India"
  }
}
```

Nested data is stored naturally inside a single document.

---

# 16. Common Interview Questions

### What is NoSQL?

A family of non-relational databases designed for flexible schemas and scalable data storage.

---

### Difference between SQL and NoSQL?

SQL stores structured data in tables with predefined schemas, while NoSQL stores data using flexible models such as documents, key-value pairs, graphs, or column families.

---

### What is MongoDB?

A document-oriented NoSQL database that stores data in BSON documents (a binary representation of JSON-like data).

---

### What is a Collection?

A group of related documents, similar to a table in SQL.

---

### What is a Document?

A JSON-like object stored in a collection.

---

### Why is NoSQL scalable?

Many NoSQL databases are designed for horizontal scaling, allowing data to be distributed across multiple servers.

---

# 17. Quick Revision

| SQL      | MongoDB                 |
| -------- | ----------------------- |
| Database | Database                |
| Table    | Collection              |
| Row      | Document                |
| Column   | Field                   |
| JOIN     | Embedding / Referencing |

---

# 18. Interview Answer

> **NoSQL refers to a family of non-relational databases designed for flexible schemas, horizontal scalability, and efficient handling of large volumes of structured, semi-structured, or unstructured data. Unlike SQL databases, which organize data into tables and rows, NoSQL databases use models such as documents, key-value pairs, graphs, or column families. MongoDB is the most popular document-oriented NoSQL database, where data is stored as JSON-like BSON documents inside collections. NoSQL databases are commonly used for applications such as social media platforms, chat systems, content management systems, IoT, and real-time analytics, where scalability and schema flexibility are important.**
