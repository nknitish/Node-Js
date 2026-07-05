# Mongoose Schema Validation

> **Interview Definition:**
> **Schema Validation** in Mongoose is the process of ensuring that data being saved to MongoDB follows the rules defined in a schema. Validation helps maintain data integrity by checking field types, required fields, value ranges, string lengths, patterns, enums, and custom business rules before documents are stored.

---

# Table of Contents

1. What is Schema Validation?
2. Why Do We Need Validation?
3. Built-in Validators
4. Required Validation
5. String Validation
6. Number Validation
7. Enum Validation
8. Default Values
9. Custom Validation
10. Async Validation
11. Validation on Updates
12. Validation Errors
13. Best Practices
14. Common Interview Questions
15. Quick Revision
16. Interview Answer

---

# 1. What is Schema Validation?

Validation checks whether the data is **correct before saving it**.

Without validation:

```javascript
{
    name: "",
    age: -10,
    email: "abc"
}
```

All of this could be stored.

With validation:

```text
Save Request

↓

Validation

↓

Valid?

 ┌───────────────┐
 │               │
 ▼               ▼

Save        Validation Error
```

---

# 2. Why Do We Need Validation?

Imagine a User collection.

Without validation:

```javascript
{
    name: "",
    age: -50,
    email: "wrong-email"
}
```

Problems:

- Missing data
- Invalid emails
- Negative ages
- Inconsistent documents

Validation prevents these problems before data reaches MongoDB.

---

# 3. Built-in Validators

| Validator | Purpose               |
| --------- | --------------------- |
| required  | Field must exist      |
| min       | Minimum number        |
| max       | Maximum number        |
| minlength | Minimum string length |
| maxlength | Maximum string length |
| enum      | Allowed values        |
| match     | Regular expression    |
| validate  | Custom validator      |

---

# 4. Required Validation

```javascript
import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
    type: String,

    required: true,
  },

  email: {
    type: String,

    required: true,
  },
});
```

Valid

```javascript
{
    name: "Nitish",
    email: "nitish@gmail.com"
}
```

Invalid

```javascript
{
  email: "nitish@gmail.com";
}
```

Output

```text
ValidationError:
Path 'name' is required.
```

---

# 5. String Validation

## minlength

```javascript
username: {

    type: String,

    minlength: 3

}
```

Invalid

```javascript
{
  username: "ab";
}
```

---

## maxlength

```javascript
username: {

    type: String,

    maxlength: 20

}
```

---

## trim

Automatically removes leading and trailing spaces.

```javascript
name: {

    type: String,

    trim: true

}
```

Input

```text
"  Nitish  "
```

Stored

```text
"Nitish"
```

---

## lowercase

```javascript
email: {

    type: String,

    lowercase: true

}
```

Input

```text
Nitish@GMAIL.com
```

Stored

```text
nitish@gmail.com
```

---

## uppercase

```javascript
code: {

    type: String,

    uppercase: true

}
```

---

# 6. Number Validation

```javascript
age: {

    type: Number,

    min: 18,

    max: 60

}
```

Valid

```javascript
{
  age: 25;
}
```

Invalid

```javascript
{
  age: 15;
}
```

Output

```text
ValidationError
```

---

# 7. Enum Validation

```javascript
role: {

    type: String,

    enum: [

        "User",

        "Admin",

        "Manager"

    ]

}
```

Allowed

```text
User
Admin
Manager
```

Invalid

```text
CEO
```

Output

```text
ValidationError
```

---

# 8. Default Values

```javascript
city: {

    type: String,

    default: "Delhi"

}
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
    name: "Nitish",
    city: "Delhi"
}
```

---

# 9. Pattern Validation (Regex)

Validate email format.

```javascript
email: {

    type: String,

    match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/

}
```

Valid

```text
nitish@gmail.com
```

Invalid

```text
nitishgmail.com
```

---

# 10. Custom Validation

Sometimes built-in validators are not enough.

```javascript
age: {

    type: Number,

    validate: {

        validator(value) {

            return value >= 18;

        },

        message: "Age must be at least 18"

    }

}
```

Invalid

```javascript
{
  age: 15;
}
```

Output

```text
Age must be at least 18
```

---

# 11. Async Validation

Useful when validation requires a database lookup or another asynchronous operation.

```javascript
email: {

    type: String,

    validate: {

        validator: async function(value) {

            return value.endsWith("@gmail.com");

        },

        message: "Only Gmail addresses are allowed"

    }

}
```

---

# 12. Validation on Updates

By default, many update operations **do not run validators**.

Example:

```javascript
await User.updateOne(
  { _id: id },

  {
    age: 10,
  },
);
```

Enable validation.

```javascript
await User.updateOne(
  { _id: id },

  {
    age: 10,
  },

  {
    runValidators: true,
  },
);
```

This is a very common interview question.

---

# 13. Validation Errors

```javascript
try {
  await User.create({
    age: 10,
  });
} catch (err) {
  console.log(err.message);
}
```

Output

```text
ValidationError:
Path 'name' is required.
```

---

# 14. Best Practices

✅ Validate all important fields.

✅ Use `required` for mandatory fields.

✅ Use `enum` for fixed values.

✅ Use `match` for email, phone numbers, etc.

✅ Add custom validation for business rules.

✅ Use `runValidators: true` when performing update operations that should be validated.

---

# 15. Common Interview Questions

### What is schema validation?

Validation ensures that documents satisfy the rules defined in a Mongoose schema before they are saved.

---

### Why use validation?

To prevent invalid or inconsistent data from being stored.

---

### Difference between `required` and `default`?

| required               | default                                    |
| ---------------------- | ------------------------------------------ |
| Field must be provided | Value is automatically assigned if omitted |

---

### What is `enum`?

Restricts a field to a predefined list of values.

---

### What is `match`?

Uses a regular expression to validate string values.

---

### Why use `runValidators`?

Because update operations such as `updateOne()` do not automatically run schema validators unless this option is enabled.

---

# 16. Quick Revision

| Validator | Purpose               |
| --------- | --------------------- |
| required  | Mandatory field       |
| min       | Minimum number        |
| max       | Maximum number        |
| minlength | Minimum string length |
| maxlength | Maximum string length |
| enum      | Allowed values        |
| match     | Regex validation      |
| default   | Default value         |
| validate  | Custom validation     |

---

# 17. Interview Answer

> **Schema validation in Mongoose ensures that documents conform to the rules defined in a schema before they are stored in MongoDB. Mongoose provides built-in validators such as `required`, `min`, `max`, `minlength`, `maxlength`, `enum`, `match`, and `default`, along with support for custom and asynchronous validation. Validation helps maintain data integrity, prevents invalid data from being saved, and makes applications more reliable. When performing update operations like `updateOne()` or `findOneAndUpdate()`, validators should be enabled using `runValidators: true` if validation is required.**
