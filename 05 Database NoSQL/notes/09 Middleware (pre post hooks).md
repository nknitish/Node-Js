# Mongoose Middleware (Pre & Post Hooks)

> **Interview Definition:**
> **Mongoose Middleware**, also called **Hooks**, are functions that automatically execute **before (pre)** or **after (post)** specific Mongoose operations such as saving, updating, deleting, validating, or querying documents. Middleware is commonly used for tasks like **password hashing, logging, validation, auditing, and sending notifications**.

---

# Table of Contents

1. What is Middleware?
2. Why Use Middleware?
3. Types of Middleware
4. Pre Middleware
5. Post Middleware
6. Document Middleware
7. Query Middleware
8. Model Middleware
9. Aggregate Middleware
10. Common Use Cases
11. Execution Order
12. Error Handling
13. Best Practices
14. Common Interview Questions
15. Quick Revision
16. Interview Answer

---

# 1. What is Middleware?

Middleware (Hooks) are functions that run **automatically** before or after a Mongoose operation.

Flow:

```text
Create User

↓

pre("save")

↓

Save Document

↓

post("save")

↓

Return Response
```

You don't call hooks directly.

Mongoose calls them automatically.

---

# 2. Why Use Middleware?

Suppose we are creating a user.

Without middleware:

```javascript
const user = new User({
  name: "Nitish",

  password: "123456",
});

await user.save();
```

Password is stored exactly as entered.

With middleware:

```text
User Save

↓

Hash Password

↓

Save

↓

Database
```

The password is automatically hashed before being stored.

---

# 3. Types of Middleware

Mongoose provides four main middleware types.

| Type                 | Runs On                                                     |
| -------------------- | ----------------------------------------------------------- |
| Document Middleware  | save, validate, deleteOne, updateOne (document)             |
| Query Middleware     | find, findOne, updateOne, findOneAndUpdate, deleteOne, etc. |
| Model Middleware     | insertMany, bulkWrite, createCollection                     |
| Aggregate Middleware | aggregate()                                                 |

---

# 4. Pre Middleware

Runs **before** an operation.

Syntax

```javascript
schema.pre(operation, function (next) {
  // code

  next();
});
```

Example

```javascript
userSchema.pre("save", function (next) {
  console.log("Before Save");

  next();
});
```

Execution

```text
Save Request

↓

Before Save

↓

MongoDB Save
```

---

# 5. Post Middleware

Runs **after** an operation completes.

```javascript
userSchema.post("save", function (doc) {
  console.log("User Saved");

  console.log(doc.name);
});
```

Execution

```text
Save

↓

MongoDB

↓

After Save
```

---

# 6. Document Middleware

Works on **document instances**.

```javascript
userSchema.pre("save", function (next) {
  console.log(this.name);

  next();
});
```

Here

```javascript
this;
```

refers to the document being saved.

Example

```javascript
const user = new User({
  name: "Nitish",
});

await user.save();
```

Output

```text
Nitish
```

Common document middleware

| Hook                        |
| --------------------------- |
| save                        |
| validate                    |
| deleteOne _(document form)_ |
| updateOne _(document form)_ |

---

# 7. Query Middleware

Runs on query methods.

```javascript
userSchema.pre("find", function (next) {
  console.log(this.getFilter());

  next();
});
```

Example

```javascript
await User.find({
  age: 25,
});
```

Output

```text
{ age: 25 }
```

Notice

```javascript
this;
```

is the **Query object**, not the document.

Common query middleware

```text
find

findOne

findOneAndUpdate

updateOne

deleteOne

countDocuments
```

---

# 8. Model Middleware

Runs on model methods.

Example

```javascript
userSchema.pre("insertMany", function (next, docs) {
  console.log(docs);

  next();
});
```

Runs before

```javascript
User.insertMany([...]);
```

---

# 9. Aggregate Middleware

Runs before aggregation pipelines.

```javascript
userSchema.pre("aggregate", function (next) {
  console.log(this.pipeline());

  next();
});
```

Example

```javascript
await User.aggregate([
  {
    $match: {
      age: {
        $gte: 18,
      },
    },
  },
]);
```

---

# 10. Common Use Cases

## Password Hashing

```javascript
import bcrypt from "bcrypt";

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }

  this.password = await bcrypt.hash(
    this.password,

    10,
  );

  next();
});
```

---

## Logging

```javascript
userSchema.post("save", function (doc) {
  console.log(`${doc.name} created`);
});
```

---

## Validation

```javascript
userSchema.pre("save", function (next) {
  if (this.age < 18) {
    return next(new Error("Invalid Age"));
  }

  next();
});
```

---

## Timestamp

```javascript
userSchema.pre("save", function (next) {
  this.updatedAt = new Date();

  next();
});
```

(Although Mongoose's `timestamps: true` option is usually preferred.)

---

# 11. Execution Order

```text
Request

↓

pre("validate")

↓

Validation

↓

pre("save")

↓

MongoDB Save

↓

post("save")

↓

Response
```

If multiple hooks exist

```javascript
userSchema.pre("save", ...);

userSchema.pre("save", ...);

userSchema.pre("save", ...);
```

They execute **in the order they are registered**.

---

# 12. Error Handling

Throw an error.

```javascript
userSchema.pre("save", function (next) {
  if (!this.email) {
    return next(new Error("Email Required"));
  }

  next();
});
```

Result

```text
Save Cancelled

↓

Error Returned
```

---

# 13. Best Practices

✅ Use middleware for reusable logic.

✅ Hash passwords in `pre("save")`.

✅ Keep middleware lightweight.

✅ Use document middleware when you need access to `this` as the document.

✅ Be careful with query middleware because `this` is the query, not the document.

❌ Don't place business logic everywhere in controllers if it naturally belongs in middleware.

---

# 14. Common Interview Questions

### What is Middleware?

Functions that automatically run before or after Mongoose operations.

---

### Difference between Pre and Post hooks?

| Pre                           | Post                  |
| ----------------------------- | --------------------- |
| Runs before operation         | Runs after operation  |
| Can modify data before saving | Used after completion |

---

### What is `this` inside `pre("save")`?

The document being saved.

---

### What is `this` inside `pre("find")`?

The Mongoose query object.

---

### Why hash passwords in `pre("save")`?

To ensure passwords are securely transformed before being stored in the database.

---

### Why check `isModified("password")`?

To avoid hashing an already-hashed password when saving an existing document without changing the password.

---

# 15. Quick Revision

| Hook              | Purpose            |
| ----------------- | ------------------ |
| pre("save")       | Before saving      |
| post("save")      | After saving       |
| pre("find")       | Before query       |
| post("find")      | After query        |
| pre("validate")   | Before validation  |
| pre("aggregate")  | Before aggregation |
| pre("insertMany") | Before bulk insert |

---

# 16. Interview Answer

> **Mongoose Middleware, also known as Hooks, are functions that automatically execute before or after specific Mongoose operations. `pre` hooks run before an operation, allowing developers to validate or modify data, while `post` hooks run after the operation completes and are useful for logging, notifications, or other follow-up tasks. Mongoose supports document, query, model, and aggregate middleware. Common use cases include password hashing, auditing, validation, timestamps, and logging. Middleware helps centralize reusable logic and keeps controllers cleaner.**
