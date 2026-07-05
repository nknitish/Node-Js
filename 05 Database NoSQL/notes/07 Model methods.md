# Mongoose Model Methods

> **Interview Definition:**
> **Model Methods** are functions provided by Mongoose Models to interact with MongoDB collections. They allow you to perform **CRUD operations, queries, updates, deletions, aggregations, counting, and bulk operations** without writing raw MongoDB queries.

---

# Table of Contents

1. What is a Model?
2. What are Model Methods?
3. Model vs Document Methods
4. Creating a Model
5. Create Methods
6. Read Methods
7. Update Methods
8. Delete Methods
9. Count Methods
10. Aggregate Methods
11. Bulk Operations
12. Query Helpers
13. Model Static Methods
14. Best Practices
15. Common Interview Questions
16. Quick Revision
17. Interview Answer

---

# 1. What is a Model?

A **Model** is created from a Schema.

```javascript
const User = mongoose.model("User", userSchema);
```

Relationship:

```text
Schema
   │
   ▼
Model
   │
   ▼
MongoDB Collection
```

The model provides methods to interact with the collection.

---

# 2. What are Model Methods?

Instead of writing raw MongoDB queries:

```javascript
db.collection("users").find();
```

We use:

```javascript
User.find();
```

Model methods simplify database operations.

---

# 3. Model vs Document Methods

| Model Methods                 | Document Methods                                     |
| ----------------------------- | ---------------------------------------------------- |
| Work on the entire collection | Work on a single document                            |
| `User.find()`                 | `user.save()`                                        |
| `User.create()`               | `user.remove()` _(deprecated, prefer `deleteOne()`)_ |
| `User.updateOne()`            | `user.updateOne()`                                   |

---

# 4. Creating a Model

```javascript
import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: String,

  age: Number,

  email: String,
});

const User = mongoose.model("User", userSchema);
```

---

# 5. Create Methods

## create()

```javascript
await User.create({
  name: "Nitish",

  age: 25,

  email: "nitish@gmail.com",
});
```

---

## insertMany()

```javascript
await User.insertMany([
  {
    name: "Rahul",

    age: 26,
  },

  {
    name: "Aman",

    age: 28,
  },
]);
```

---

# 6. Read Methods

## find()

Returns all matching documents.

```javascript
const users = await User.find();
```

---

## findOne()

Returns first matching document.

```javascript
const user = await User.findOne({
  email: "nitish@gmail.com",
});
```

---

## findById()

```javascript
const user = await User.findById(id);
```

Equivalent:

```javascript
User.findOne({
  _id: id,
});
```

---

## select()

Select specific fields.

```javascript
const users = await User.find()

  .select("name email");
```

---

## sort()

```javascript
const users = await User.find()

  .sort({
    age: -1,
  });
```

- `1` → Ascending
- `-1` → Descending

---

## limit()

```javascript
const users = await User.find()

  .limit(5);
```

---

## skip()

Pagination

```javascript
const users = await User.find()

  .skip(10)

  .limit(10);
```

---

# 7. Update Methods

## updateOne()

```javascript
await User.updateOne(
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

## updateMany()

```javascript
await User.updateMany(
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

## findByIdAndUpdate()

```javascript
await User.findByIdAndUpdate(
  id,

  {
    age: 30,
  },

  {
    new: true,

    runValidators: true,
  },
);
```

### Common Options

| Option              | Purpose                 |
| ------------------- | ----------------------- |
| new: true           | Return updated document |
| runValidators: true | Apply schema validation |

---

## findOneAndUpdate()

```javascript
await User.findOneAndUpdate(
  {
    email: "nitish@gmail.com",
  },

  {
    age: 27,
  },

  {
    new: true,
  },
);
```

---

# 8. Delete Methods

## deleteOne()

```javascript
await User.deleteOne({
  email: "nitish@gmail.com",
});
```

---

## deleteMany()

```javascript
await User.deleteMany({
  active: false,
});
```

---

## findByIdAndDelete()

```javascript
await User.findByIdAndDelete(id);
```

---

## findOneAndDelete()

```javascript
await User.findOneAndDelete({
  email: "nitish@gmail.com",
});
```

---

# 9. Count Methods

## countDocuments()

```javascript
const total = await User.countDocuments();
```

With filter

```javascript
const total = await User.countDocuments({
  city: "Delhi",
});
```

---

## estimatedDocumentCount()

```javascript
const total = await User.estimatedDocumentCount();
```

Much faster for counting **all** documents.

---

# 10. Aggregate Methods

Aggregation Pipeline

```javascript
const result = await User.aggregate([
  {
    $match: {
      city: "Delhi",
    },
  },

  {
    $group: {
      _id: "$city",

      total: {
        $sum: 1,
      },
    },
  },
]);
```

Used for:

- Reports
- Analytics
- Dashboards
- Data transformations

---

# 11. Bulk Operations

```javascript
await User.bulkWrite([
  {
    insertOne: {
      document: {
        name: "Nitish",
      },
    },
  },

  {
    updateOne: {
      filter: {
        name: "Rahul",
      },

      update: {
        $set: {
          age: 30,
        },
      },
    },
  },
]);
```

Useful when multiple operations should be sent in one request.

---

# 12. Query Helpers

```javascript
const users = await User.find({
  age: {
    $gte: 18,
  },
})

  .sort({
    age: 1,
  })

  .limit(10)

  .select("name age");
```

Query Builder

```text
find()

↓

sort()

↓

limit()

↓

select()

↓

execute
```

---

# 13. Static Methods

Create reusable model methods.

```javascript
userSchema.statics.findAdults = function () {
  return this.find({
    age: {
      $gte: 18,
    },
  });
};
```

Usage

```javascript
const users = await User.findAdults();
```

---

# 14. Best Practices

✅ Use `findById()` when querying by `_id`.

✅ Use `new: true` with `findByIdAndUpdate()` if you need the updated document.

✅ Use `runValidators: true` for update operations.

✅ Use `insertMany()` for bulk inserts.

✅ Use `lean()` for read-only queries when you don't need Mongoose document features.

Example:

```javascript
const users = await User.find().lean();
```

---

# 15. Common Interview Questions

### What is a Model?

A Mongoose object that represents a MongoDB collection and provides methods to interact with it.

---

### Difference between `find()` and `findOne()`?

| find()           | findOne()                      |
| ---------------- | ------------------------------ |
| Returns an array | Returns one document or `null` |

---

### Difference between `findById()` and `findOne()`?

`findById(id)` searches by the `_id` field and is equivalent to:

```javascript
User.findOne({ _id: id });
```

---

### Why use `new: true`?

To return the updated document instead of the original one.

---

### Why use `lean()`?

`lean()` returns plain JavaScript objects instead of full Mongoose documents, reducing memory usage and improving read performance for queries where document methods are unnecessary.

---

# 16. Quick Revision

| Method              | Purpose                   |
| ------------------- | ------------------------- |
| create()            | Insert one document       |
| insertMany()        | Insert multiple documents |
| find()              | Find many documents       |
| findOne()           | Find one document         |
| findById()          | Find by `_id`             |
| updateOne()         | Update one document       |
| updateMany()        | Update many documents     |
| findByIdAndUpdate() | Find and update           |
| deleteOne()         | Delete one document       |
| deleteMany()        | Delete many documents     |
| findByIdAndDelete() | Find and delete           |
| countDocuments()    | Count matching documents  |
| aggregate()         | Run aggregation pipeline  |

---

# 17. Interview Answer

> **Model methods are built-in functions provided by Mongoose Models to interact with MongoDB collections. They support CRUD operations, querying, updates, deletions, aggregations, counting, bulk operations, and custom static methods. Common methods include `create()`, `find()`, `findOne()`, `findById()`, `updateOne()`, `findByIdAndUpdate()`, `deleteOne()`, `findByIdAndDelete()`, `countDocuments()`, and `aggregate()`. These methods provide a clean, expressive API while leveraging Mongoose features such as validation, middleware, and schema-based modeling.**
