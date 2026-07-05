# MongoDB Collections and Documents

> **Interview Definition:**
> A **Collection** is a group of related documents in MongoDB, similar to a table in SQL. A **Document** is the basic unit of data stored in MongoDB. Documents are JSON-like objects (stored internally as **BSON**) containing key-value pairs.

---

# Table of Contents

1. What are Collections and Documents?
2. SQL vs MongoDB
3. What is a Document?
4. What is a Collection?
5. BSON vs JSON
6. Document Structure
7. Nested Documents
8. Arrays in Documents
9. Dynamic Schema
10. Document Size & `_id`
11. Collection Operations
12. Best Practices
13. Common Interview Questions
14. Quick Revision
15. Interview Answer

---

# 1. What are Collections and Documents?

MongoDB stores data in **documents**, and related documents are grouped into **collections**.

Hierarchy:

```text id="jlwm114"
MongoDB Server

↓

Database

↓

Collection

↓

Document

↓

Fields
```

Example:

```text id="’wini115"
Company Database

↓

Users Collection

↓

User Documents
```

---

# 2. SQL vs MongoDB

| SQL         | MongoDB    |
| ----------- | ---------- |
| Database    | Database   |
| Table       | Collection |
| Row         | Document   |
| Column      | Field      |
| Primary Key | `_id`      |

Example:

SQL

```text id="’wini116"
Users Table

--------------------------------

ID   Name   Age

--------------------------------

1    Nitish 25
```

MongoDB

```json id="’wini117"
{
  "_id": 1,
  "name": "Nitish",
  "age": 25
}
```

---

# 3. What is a Document?

A document is a **single record** in MongoDB.

Example:

```json id="’wini118"
{
  "_id": 1,
  "name": "Nitish",
  "age": 25,
  "city": "Delhi"
}
```

Each field is stored as a **key-value pair**.

```text id="’wini119"
"name"

↓

"Nitish"
```

---

# 4. What is a Collection?

A collection stores multiple documents.

Example:

```text id="’wini120"
Users Collection

│

├── Document 1

├── Document 2

├── Document 3

└── Document 4
```

Example:

```json id="’wini121"
{
  "_id": 1,
  "name": "Nitish"
}
```

```json id="’wini122"
{
  "_id": 2,
  "name": "Rahul"
}
```

```json id="’wini123"
{
  "_id": 3,
  "name": "Aman"
}
```

---

# 5. BSON vs JSON

MongoDB stores documents internally as **BSON (Binary JSON)**.

| JSON             | BSON                                                                  |
| ---------------- | --------------------------------------------------------------------- |
| Text format      | Binary format                                                         |
| Human-readable   | Optimized for storage and retrieval                                   |
| Fewer data types | Supports additional types such as `ObjectId`, `Date`, and binary data |

Example JSON:

```json id="’wini124"
{
  "name": "Nitish",
  "age": 25
}
```

Stored internally as BSON.

---

# 6. Document Structure

A document contains fields.

```json id="’wini125"
{
  "_id": 101,
  "name": "Nitish",
  "email": "nitish@gmail.com",
  "age": 25,
  "isAdmin": false
}
```

Data Types:

| Type     | Example             |
| -------- | ------------------- |
| String   | `"Nitish"`          |
| Number   | `25`                |
| Boolean  | `true`              |
| Array    | `["React","Node"]`  |
| Object   | `{ city: "Delhi" }` |
| Date     | `new Date()`        |
| ObjectId | Default `_id`       |

---

# 7. Nested Documents

MongoDB supports nested objects.

Example:

```json id="’wini126"
{
  "_id": 1,
  "name": "Nitish",
  "address": {
    "city": "Delhi",
    "state": "Delhi",
    "country": "India"
  }
}
```

Access:

```text id="’wini127"
address.city
```

Nested documents reduce the need for joins in many scenarios.

---

# 8. Arrays in Documents

Arrays are first-class citizens in MongoDB.

Example:

```json id="’wini128"
{
  "_id": 1,
  "name": "Nitish",
  "skills": ["React", "Node.js", "TypeScript"]
}
```

Arrays of objects:

```json id="’wini129"
{
  "_id": 1,
  "orders": [
    {
      "product": "Laptop",
      "price": 80000
    },
    {
      "product": "Mouse",
      "price": 1000
    }
  ]
}
```

---

# 9. Dynamic Schema

Unlike SQL tables, documents in the same collection can have different fields.

Document 1

```json id="’wini130"
{
  "name": "Nitish",
  "age": 25
}
```

Document 2

```json id="’wini131"
{
  "name": "Rahul",
  "city": "Mumbai",
  "skills": ["React"]
}
```

Both documents can exist in the same collection.

> Although MongoDB allows flexible schemas, production applications often enforce a consistent document structure using validation rules or libraries such as Mongoose.

---

# 10. `_id` Field

Every document has a unique `_id`.

Example:

```json id="’wini132"
{
    "_id": ObjectId("687...")
}
```

MongoDB automatically generates an `ObjectId` if you don't provide one.

Properties:

- Unique
- Indexed by default
- Used to identify documents

---

# 11. Collection Operations

Create a document:

```javascript id="’wini133"
db.users.insertOne({
  name: "Nitish",
  age: 25,
});
```

---

Find documents:

```javascript id="’wini134"
db.users.find();
```

---

Update a document:

```javascript id="’wini135"
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

Delete a document:

```javascript id="’wini136"
db.users.deleteOne({
  name: "Nitish",
});
```

---

# 12. Best Practices

✅ Keep related data together when it makes sense.

✅ Use nested documents for tightly coupled data.

✅ Use references when documents become too large or are shared by multiple entities.

✅ Let MongoDB generate `_id` unless you have a good reason not to.

✅ Design documents based on application query patterns.

---

# 13. Common Interview Questions

### What is a document?

A JSON-like record stored in a MongoDB collection.

---

### What is a collection?

A group of related documents.

---

### Difference between a table and a collection?

A table stores rows with a fixed schema, while a collection stores flexible BSON documents.

---

### What is `_id`?

A unique identifier automatically created for every MongoDB document.

---

### What is BSON?

A binary representation of JSON-like documents used internally by MongoDB.

---

### Can two documents have different fields?

Yes. MongoDB supports flexible schemas, although many applications choose to enforce a consistent structure.

---

# 14. Quick Revision

| SQL         | MongoDB    |
| ----------- | ---------- |
| Table       | Collection |
| Row         | Document   |
| Column      | Field      |
| Primary Key | `_id`      |

---

# 15. Interview Answer

> **In MongoDB, a collection is a group of related documents, similar to a table in a relational database. A document is the basic unit of data and is stored internally as BSON, a binary representation of JSON-like data. Documents contain key-value pairs and can include nested objects and arrays, making it easy to represent complex data structures. Unlike SQL tables, collections support flexible schemas, allowing documents to have different fields when appropriate. Every document contains a unique `_id` field that identifies it and is indexed by default.**
