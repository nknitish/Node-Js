# Mongoose Schema

> **Interview Definition:**
> A **Schema** in Mongoose is a blueprint that defines the **structure, data types, validation rules, default values, indexes, relationships, and behavior** of documents stored in a MongoDB collection.

---

# Table of Contents

1. What is a Schema?
2. Why Do We Need Schemas?
3. Schema vs Collection vs Model
4. Creating a Schema
5. Data Types
6. Schema Options
7. Validation
8. Default Values
9. Enums
10. Nested Schemas
11. Arrays
12. References (Relationships)
13. Indexes
14. Schema Methods
15. Static Methods
16. Virtuals
17. Middleware (Hooks)
18. Best Practices
19. Common Interview Questions
20. Quick Revision

---

# 1. What is a Schema?

A Schema is a **blueprint** for documents.

Think of it like this:

```text
MongoDB

↓

Collection

↓

Documents
```

Without Mongoose:

```json
{
  "anything": "can be stored"
}
```

With Mongoose:

```text
Schema

↓

Rules

↓

Validation

↓

MongoDB
```

---

# 2. Why Do We Need Schemas?

MongoDB itself is schema-flexible.

This is valid:

```json
{
  "name": "Nitish"
}
```

Another document:

```json
{
  "age": 25
}
```

Another:

```json
{
  "random": "abc"
}
```

Everything is different.

Schemas make documents consistent.

---

# 3. Schema → Model → Collection

```text
Schema

↓

Model

↓

Collection

↓

Documents
```

Example

```javascript
const userSchema = new mongoose.Schema({...});

const User = mongoose.model("User", userSchema);
```

Collection created:

```text
users
```

---

# 4. Creating a Schema

```javascript
import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: String,

  age: Number,

  city: String,
});
```

---

# 5. Common Data Types

```javascript
const userSchema = new mongoose.Schema({
  name: String,

  age: Number,

  salary: Number,

  isAdmin: Boolean,

  email: String,

  birthDate: Date,

  skills: [String],

  address: Object,

  profileImage: Buffer,

  userId: mongoose.Schema.Types.ObjectId,
});
```

Supported Types

| Type     | Example          |
| -------- | ---------------- |
| String   | `"Nitish"`       |
| Number   | `25`             |
| Boolean  | `true`           |
| Date     | `new Date()`     |
| Array    | `["React"]`      |
| Object   | `{city:"Delhi"}` |
| Buffer   | Images           |
| ObjectId | MongoDB IDs      |

---

# 6. Schema Options

```javascript
const userSchema = new mongoose.Schema(
  {
    name: String,
  },

  {
    timestamps: true,

    versionKey: false,
  },
);
```

Generated document

```javascript
{

    name: "Nitish",

    createdAt: "...",

    updatedAt: "..."

}
```

---

# 7. Validation

```javascript
const userSchema = new mongoose.Schema({
  name: {
    type: String,

    required: true,
  },

  age: {
    type: Number,

    min: 18,

    max: 60,
  },
});
```

Trying to save

```javascript
{
  age: 10;
}
```

Produces

```text
Validation Error
```

---

# 8. Default Values

```javascript
const userSchema = new mongoose.Schema({
  city: {
    type: String,

    default: "Delhi",
  },
});
```

Insert

```javascript
{
  name: "Nitish";
}
```

Stored

```javascript
{

    name:"Nitish",

    city:"Delhi"

}
```

---

# 9. Enum

```javascript
role:{

    type:String,

    enum:["Admin","User","Manager"]

}
```

Allowed

```text
Admin

User

Manager
```

Not Allowed

```text
CEO
```

---

# 10. Nested Objects

```javascript
const userSchema = new mongoose.Schema({
  name: String,

  address: {
    city: String,

    state: String,

    country: String,
  },
});
```

Document

```javascript
{

    name:"Nitish",

    address:{

        city:"Delhi",

        state:"Delhi"

    }

}
```

---

# 11. Arrays

Simple Array

```javascript
skills: [String];
```

Stored

```javascript
{
  skills: ["React", "Node", "MongoDB"];
}
```

Array of Objects

```javascript
orders: [
  {
    product: String,

    price: Number,
  },
];
```

---

# 12. References

Similar to SQL Foreign Keys.

```javascript
const postSchema = new mongoose.Schema({
  title: String,

  author: {
    type: mongoose.Schema.Types.ObjectId,

    ref: "User",
  },
});
```

Populate

```javascript
const posts = await Post.find()

  .populate("author");
```

---

# 13. Indexes

```javascript
const userSchema = new mongoose.Schema({
  email: {
    type: String,

    unique: true,
  },
});
```

Or

```javascript
userSchema.index({
  email: 1,
});
```

---

# 14. Instance Methods

```javascript
userSchema.methods.sayHello = function () {
  return `Hello ${this.name}`;
};
```

Usage

```javascript
const user = await User.findById(id);

console.log(user.sayHello());
```

---

# 15. Static Methods

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
await User.findAdults();
```

---

# 16. Virtuals

```javascript
userSchema
  .virtual("fullName")

  .get(function () {
    return `${this.firstName} ${this.lastName}`;
  });
```

Not stored in MongoDB.

Generated dynamically.

---

# 17. Middleware

Before Save

```javascript
userSchema.pre("save", function (next) {
  console.log("Saving...");

  next();
});
```

After Save

```javascript
userSchema.post("save", function () {
  console.log("Saved");
});
```

---

# 18. Best Practices

✅ One schema per collection

✅ Validate important fields

✅ Use timestamps

✅ Use indexes wisely

✅ Keep schemas small

✅ Use references only when needed

---

# 19. Common Interview Questions

### What is a Schema?

A blueprint that defines document structure.

---

### Difference between Schema and Model?

Schema defines structure.

Model performs CRUD operations.

---

### Can MongoDB work without Schema?

Yes.

MongoDB is schema-less.

Schemas are provided by Mongoose.

---

### Why use Schema?

- Validation
- Consistency
- Cleaner code
- Better maintenance

---

### Difference between Schema and Collection?

Schema defines the structure.

Collection stores the documents.

---

### What are Virtuals?

Computed properties that are not stored in MongoDB.

---

### What are Hooks?

Functions executed before or after database operations.

---

# 20. Quick Revision

| Feature        | Schema |
| -------------- | ------ |
| Structure      | ✅     |
| Validation     | ✅     |
| Default Values | ✅     |
| Enum           | ✅     |
| Indexes        | ✅     |
| References     | ✅     |
| Methods        | ✅     |
| Virtuals       | ✅     |
| Middleware     | ✅     |
| Timestamps     | ✅     |

---

# Interview Answer

> **A Mongoose Schema is a blueprint that defines how documents should be structured inside a MongoDB collection. It specifies field names, data types, validation rules, default values, indexes, relationships, virtual properties, middleware hooks, and custom methods. While MongoDB itself is schema-flexible, Mongoose Schemas provide consistency, validation, and maintainability, making them a core part of building scalable Node.js applications with MongoDB.**
