# Mongoose ODM (Object Data Modeling)

> **Interview Definition:**
> **Mongoose** is an **ODM (Object Data Modeling)** library for MongoDB and Node.js. It provides **schemas, models, validation, middleware, virtuals, population, and powerful query APIs**, making it easier to build scalable and maintainable applications.

---

# Table of Contents

1. What is Mongoose?
2. Why Mongoose?
3. ODM vs Native Driver
4. Installing Mongoose
5. Connecting to MongoDB
6. Schema
7. Model
8. CRUD Operations
9. Validation
10. Schema Options
11. Middleware (Hooks)
12. Population
13. Virtuals
14. Best Practices
15. Common Interview Questions
16. Quick Revision
17. Interview Answer

---

# 1. What is Mongoose?

Mongoose is a Node.js library that sits **between your application and MongoDB**.

Architecture:

```text
Node.js

↓

Mongoose (ODM)

↓

MongoDB Driver

↓

MongoDB
```

Instead of writing raw MongoDB queries everywhere, you work with **Schemas** and **Models**.

---

# 2. Why Mongoose?

Without Mongoose:

```javascript
await db.collection("users").insertOne({
  name: "Nitish",
  age: 25,
});
```

No validation.

No schema.

No middleware.

---

With Mongoose:

```javascript
await User.create({
  name: "Nitish",
  age: 25,
});
```

Automatically supports:

- Validation
- Schema
- Models
- Middleware
- Population
- Virtuals

---

# 3. ODM vs Native Driver

| Native Driver      | Mongoose            |
| ------------------ | ------------------- |
| Direct MongoDB API | ODM Layer           |
| No Schema          | Schema              |
| No Validation      | Built-in Validation |
| No Models          | Models              |
| More Control       | Easier Development  |
| Lightweight        | Feature Rich        |

---

# 4. Installing Mongoose

```bash
npm install mongoose
```

Import:

```javascript
import mongoose from "mongoose";
```

---

# 5. Connecting to MongoDB

```javascript
import mongoose from "mongoose";

await mongoose.connect("mongodb://127.0.0.1:27017/company");

console.log("MongoDB Connected");
```

Connection Flow

```text
Express

↓

Mongoose

↓

MongoDB Driver

↓

MongoDB Server
```

---

# 6. Schema

A **Schema** defines the structure of a document.

```javascript
import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: String,

  age: Number,

  city: String,
});
```

Think of a schema as a **blueprint**.

---

## Schema with Types

```javascript
const userSchema = new mongoose.Schema({
  name: {
    type: String,
  },

  age: {
    type: Number,
  },

  email: {
    type: String,
  },
});
```

---

# 7. Model

A **Model** is created from a Schema.

```javascript
const User = mongoose.model("User", userSchema);
```

Relationship:

```text
Schema

↓

Model

↓

MongoDB Collection
```

Model name:

```javascript
User;
```

Collection created:

```text
users
```

(Mongoose automatically pluralizes the model name.)

---

# 8. CRUD Operations

## Create

```javascript
await User.create({
  name: "Nitish",

  age: 25,
});
```

---

## Read

Find all:

```javascript
const users = await User.find();
```

Find one:

```javascript
const user = await User.findOne({
  name: "Nitish",
});
```

Find by ID:

```javascript
const user = await User.findById(id);
```

---

## Update

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

Find and update:

```javascript
await User.findByIdAndUpdate(
  id,

  {
    age: 30,
  },
);
```

---

## Delete

```javascript
await User.deleteOne({
  name: "Nitish",
});
```

Delete by ID:

```javascript
await User.findByIdAndDelete(id);
```

---

# 9. Validation

Validation prevents invalid data.

```javascript
const userSchema = new mongoose.Schema({
  name: {
    type: String,

    required: true,
  },

  age: {
    type: Number,

    min: 18,
  },

  email: {
    type: String,

    required: true,

    unique: true,
  },
});
```

Examples:

```javascript
await User.create({
  age: 15,
});
```

Output:

```text
Validation Error
```

---

## Common Validators

| Validator | Purpose                                            |
| --------- | -------------------------------------------------- |
| required  | Mandatory                                          |
| min       | Minimum value                                      |
| max       | Maximum value                                      |
| minlength | Minimum string length                              |
| maxlength | Maximum string length                              |
| enum      | Allowed values                                     |
| match     | Regex validation                                   |
| unique    | Creates a unique index (not a validator by itself) |

---

# 10. Schema Options

Automatically add timestamps.

```javascript
const userSchema = new mongoose.Schema(
  {
    name: String,
  },

  {
    timestamps: true,
  },
);
```

Document:

```javascript
{

    createdAt: "...",

    updatedAt: "..."

}
```

---

# 11. Middleware (Hooks)

Run code before or after database operations.

Pre-save hook:

```javascript
userSchema.pre(
  "save",

  function (next) {
    console.log("Before Save");

    next();
  },
);
```

Post-save hook:

```javascript
userSchema.post(
  "save",

  function (doc) {
    console.log("Saved");
  },
);
```

Common hooks:

| Hook             | Runs When     |
| ---------------- | ------------- |
| pre("save")      | Before save   |
| post("save")     | After save    |
| pre("find")      | Before query  |
| post("find")     | After query   |
| pre("deleteOne") | Before delete |

---

# 12. Population

Population replaces referenced IDs with actual documents.

Users Collection

```javascript
{

    _id: 1,

    name: "Nitish"
}
```

Posts Collection

```javascript
{

    title: "React",

    author: 1
}
```

Populate:

```javascript
const posts = await Post.find()

  .populate("author");
```

Result:

```javascript
{

    title: "React",

    author: {

        _id: 1,

        name: "Nitish"

    }

}
```

Similar to a SQL JOIN.

---

# 13. Virtuals

Virtual fields are **computed values**.

```javascript
userSchema.virtual("fullName").get(function () {
  return `${this.firstName} ${this.lastName}`;
});
```

Virtuals:

- Not stored in MongoDB
- Generated when accessed

---

# 14. Best Practices

✅ Create one schema per collection.

✅ Validate user input.

✅ Use timestamps.

✅ Use population only when necessary.

✅ Keep schemas focused and modular.

✅ Reuse a single Mongoose connection.

---

# 15. Common Interview Questions

### What is Mongoose?

An ODM library for MongoDB and Node.js.

---

### Difference between Schema and Model?

| Schema            | Model                    |
| ----------------- | ------------------------ |
| Blueprint         | Database Interface       |
| Defines structure | Performs CRUD operations |

---

### Difference between Mongoose and MongoDB Driver?

The native driver communicates directly with MongoDB, while Mongoose builds on top of it by adding schemas, models, validation, middleware, and other higher-level features.

---

### What is Population?

A feature that replaces referenced document IDs with the corresponding documents.

---

### What are Middleware Hooks?

Functions that run before or after specific Mongoose operations.

---

### What are Virtuals?

Computed properties that are not stored in the database.

---

# 16. Quick Revision

| Feature    | Mongoose |
| ---------- | -------- |
| Schema     | ✅       |
| Model      | ✅       |
| Validation | ✅       |
| Population | ✅       |
| Middleware | ✅       |
| Virtuals   | ✅       |
| Timestamps | ✅       |

---

# 17. Interview Answer

> **Mongoose is an Object Data Modeling (ODM) library for MongoDB and Node.js. It sits on top of the MongoDB Native Driver and provides a structured way to interact with MongoDB using schemas and models. Mongoose supports built-in validation, middleware hooks, virtual properties, population for document references, timestamps, and a rich query API. These features help developers write more maintainable, consistent, and scalable applications while still leveraging MongoDB's document-oriented data model.**
