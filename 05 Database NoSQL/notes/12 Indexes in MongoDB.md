# MongoDB Indexes

> **Interview Definition:**
> **Indexes** in MongoDB are special data structures that improve the speed of query operations by allowing MongoDB to quickly locate documents without scanning the entire collection. They work similarly to an index in a book, helping the database find data efficiently.

---

# Table of Contents

1. What are Indexes?
2. Why Do We Need Indexes?
3. How Indexes Work
4. Default `_id` Index
5. Creating Indexes
6. Single Field Index
7. Compound Index
8. Unique Index
9. Text Index
10. TTL Index
11. Multikey Index
12. Sparse & Partial Indexes
13. Viewing & Dropping Indexes
14. Explain Plan
15. Best Practices
16. Common Interview Questions
17. Quick Revision
18. Interview Answer

---

# 1. What are Indexes?

Imagine a collection with **1 million users**.

Without an index:

```text
Find email = "nitish@gmail.com"

↓

Scan Document 1

↓

Scan Document 2

↓

Scan Document 3

↓

...

↓

Scan Document 1,000,000
```

This is called a **Collection Scan (COLLSCAN)**.

With an index:

```text
Find email

↓

Email Index

↓

Directly locate matching document

↓

Return Result
```

MongoDB uses the index instead of checking every document.

---

# 2. Why Do We Need Indexes?

Indexes improve:

- Query speed
- Sorting performance
- Filtering performance
- Lookup performance

Without indexes:

```text
Query Time

↓

5 seconds
```

With indexes:

```text
Query Time

↓

50 ms
```

_(Actual improvement depends on data size, query pattern, and hardware.)_

---

# 3. How Indexes Work

Collection

```javascript
{
    name: "Nitish",
    age: 25,
    email: "nitish@gmail.com"
}
```

Index

```text
email

↓

nitish@gmail.com

↓

Document Pointer
```

MongoDB uses a **B-tree** data structure for most indexes.

---

# 4. Default `_id` Index

Every collection automatically has an index on `_id`.

```javascript
{
    "_id": ObjectId("...")
}
```

You do **not** need to create it manually.

---

# 5. Creating Indexes

Using Mongo Shell

```javascript
db.users.createIndex({
  email: 1,
});
```

Using Mongoose

```javascript
userSchema.index({
  email: 1,
});
```

Ascending

```javascript
{
  email: 1;
}
```

Descending

```javascript
{
  email: -1;
}
```

---

# 6. Single Field Index

```javascript
db.users.createIndex({
  age: 1,
});
```

Query

```javascript
db.users.find({
  age: 25,
});
```

MongoDB can use the index for faster lookups.

---

# 7. Compound Index

Index on multiple fields.

```javascript
db.users.createIndex({
  city: 1,

  age: -1,
});
```

Useful query

```javascript
db.users.find({
  city: "Delhi",

  age: 25,
});
```

### Prefix Rule

A compound index:

```javascript
{
    city: 1,
    age: 1
}
```

Can efficiently support:

```javascript
// ✅ Uses index
db.users.find({ city: "Delhi" });

// ✅ Uses index
db.users.find({
  city: "Delhi",
  age: 25,
});

// ❌ Usually cannot efficiently use the index alone
db.users.find({
  age: 25,
});
```

This is called the **Prefix Rule**, one of the most common interview topics.

---

# 8. Unique Index

Prevents duplicate values.

```javascript
db.users.createIndex(
  {
    email: 1,
  },

  {
    unique: true,
  },
);
```

Valid

```text
nitish@gmail.com
rahul@gmail.com
```

Invalid

```text
nitish@gmail.com
nitish@gmail.com
```

MongoDB throws a duplicate key error.

---

# 9. Text Index

Used for full-text search.

```javascript
db.posts.createIndex({
  title: "text",

  content: "text",
});
```

Search

```javascript
db.posts.find({
  $text: {
    $search: "React",
  },
});
```

---

# 10. TTL Index (Time To Live)

Automatically removes expired documents.

Example

```javascript
db.sessions.createIndex(
  {
    createdAt: 1,
  },

  {
    expireAfterSeconds: 3600,
  },
);
```

After one hour

```text
Document

↓

Automatically Deleted
```

Common use cases:

- Sessions
- OTPs
- Cache
- Temporary tokens

---

# 11. Multikey Index

MongoDB automatically creates a multikey index when indexing an array field.

Document

```javascript
{
    name: "Nitish",
    skills: [
        "React",
        "Node",
        "MongoDB"
    ]
}
```

Create index

```javascript
db.users.createIndex({
  skills: 1,
});
```

Query

```javascript
db.users.find({
  skills: "React",
});
```

---

# 12. Sparse & Partial Indexes

## Sparse Index

Indexes only documents where the indexed field exists.

```javascript
db.users.createIndex(
  {
    phone: 1,
  },
  {
    sparse: true,
  },
);
```

---

## Partial Index

Indexes only documents matching a filter.

```javascript
db.users.createIndex(
  {
    age: 1,
  },
  {
    partialFilterExpression: {
      active: true,
    },
  },
);
```

Useful for reducing index size.

---

# 13. Viewing & Dropping Indexes

Show indexes

```javascript
db.users.getIndexes();
```

Drop one index

```javascript
db.users.dropIndex({
  email: 1,
});
```

Drop all indexes except `_id`

```javascript
db.users.dropIndexes();
```

---

# 14. Explain Plan

See how MongoDB executes a query.

```javascript
db.users
  .find({
    email: "nitish@gmail.com",
  })
  .explain("executionStats");
```

Look for:

```text
IXSCAN
```

Good

```text
COLLSCAN
```

Usually indicates no suitable index was used.

---

# 15. Best Practices

✅ Create indexes on frequently queried fields.

✅ Index fields used for sorting.

✅ Index fields used in joins (`$lookup`) when appropriate.

✅ Keep the number of indexes reasonable.

❌ Avoid indexing every field.

❌ Remember that indexes increase storage usage and slow writes because indexes must also be updated.

---

# 16. Common Interview Questions

### What is an Index?

A data structure that improves query performance.

---

### Why are indexes faster?

Because MongoDB can locate matching documents without scanning the entire collection.

---

### Does every collection have an index?

Yes.

MongoDB automatically creates an index on `_id`.

---

### What is a Compound Index?

An index built on multiple fields.

---

### What is the Prefix Rule?

A compound index can efficiently support queries that start with its leftmost indexed fields.

---

### Why not index every field?

Indexes consume disk space and memory, and every insert, update, or delete must also update the relevant indexes, which can reduce write performance.

---

### What is a TTL Index?

An index that automatically removes expired documents.

---

### What does `explain()` do?

It shows MongoDB's query execution plan, helping you determine whether indexes are being used.

---

# 17. Quick Revision

| Index Type | Purpose                       |
| ---------- | ----------------------------- |
| `_id`      | Default primary index         |
| Single     | One field                     |
| Compound   | Multiple fields               |
| Unique     | Prevent duplicates            |
| Text       | Full-text search              |
| TTL        | Auto-delete documents         |
| Multikey   | Arrays                        |
| Sparse     | Only documents with the field |
| Partial    | Only matching documents       |

---

# 18. Interview Answer

> **Indexes in MongoDB are special data structures that improve query performance by allowing the database to locate documents efficiently without scanning the entire collection. MongoDB automatically creates an index on the `_id` field, and developers can create additional indexes such as single-field, compound, unique, text, TTL, multikey, sparse, and partial indexes. Proper indexing significantly improves read performance and sorting but increases storage requirements and write overhead because indexes must be maintained whenever data changes. Choosing the right indexes based on application query patterns is essential for building scalable MongoDB applications.**
