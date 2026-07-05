# Mongoose Virtuals

> **Interview Definition:**
> **Virtuals** are computed properties in Mongoose that **are not stored in MongoDB**. They are generated dynamically when a document is read and are commonly used to combine fields, transform data, or expose derived values without storing duplicate data.

---

# Table of Contents

1. What are Virtuals?
2. Why Use Virtuals?
3. How Virtuals Work
4. Creating a Virtual
5. Virtual Getter
6. Virtual Setter
7. Virtuals with JSON
8. Virtual Populate
9. Real-world Examples
10. Virtuals vs Normal Fields
11. Best Practices
12. Common Interview Questions
13. Quick Revision
14. Interview Answer

---

# 1. What are Virtuals?

A Virtual is a field that **doesn't exist in MongoDB**.

Instead, Mongoose calculates its value when you access it.

Example

MongoDB Document

```javascript id="v1a01"
{
    firstName: "Nitish",
    lastName: "Kumar"
}
```

Virtual

```text id="v1a02"
fullName

↓

"Nitish Kumar"
```

Notice:

```text id="v1a03"
fullName
```

is **never stored** in MongoDB.

---

# 2. Why Use Virtuals?

Suppose we store:

```javascript id="v1a04"
{
    firstName: "Nitish",
    lastName: "Kumar"
}
```

Instead of storing:

```javascript id="v1a05"
{
  fullName: "Nitish Kumar";
}
```

(which duplicates data)

We generate it dynamically.

Benefits:

- Avoid duplicate data
- Cleaner documents
- Easier maintenance
- Computed values
- Better API responses

---

# 3. How Virtuals Work

```text id="v1a06"
MongoDB

↓

Document

↓

Mongoose

↓

Virtual Computed

↓

JSON Response
```

The value exists only in the Mongoose document unless configured to appear in JSON output.

---

# 4. Creating a Virtual

```javascript id="v1a07"
import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  firstName: String,

  lastName: String,
});
```

Create virtual

```javascript id="v1a08"
userSchema
  .virtual("fullName")

  .get(function () {
    return `${this.firstName} ${this.lastName}`;
  });
```

---

# 5. Virtual Getter

Getter returns a computed value.

```javascript id="v1a09"
userSchema
  .virtual("fullName")

  .get(function () {
    return `${this.firstName} ${this.lastName}`;
  });
```

Create user

```javascript id="v1a10"
const user = await User.create({
  firstName: "Nitish",

  lastName: "Kumar",
});
```

Access

```javascript id="v1a11"
console.log(user.fullName);
```

Output

```text id="v1a12"
Nitish Kumar
```

MongoDB stores only:

```javascript id="v1a13"
{
    firstName: "Nitish",

    lastName: "Kumar"
}
```

---

# 6. Virtual Setter

A setter allows writing to one virtual field and updating multiple real fields.

```javascript id="v1a14"
userSchema
  .virtual("fullName")

  .set(function (value) {
    const parts = value.split(" ");

    this.firstName = parts[0];

    this.lastName = parts[1];
  });
```

Usage

```javascript id="v1a15"
const user = new User();

user.fullName = "Nitish Kumar";

console.log(user.firstName);
```

Output

```text id="v1a16"
Nitish
```

```javascript id="v1a17"
console.log(user.lastName);
```

Output

```text id="v1a18"
Kumar
```

---

# 7. Virtuals in JSON

By default, virtuals are **not included** in `res.json()` or `toJSON()` output.

Enable them:

```javascript id="v1a19"
const userSchema = new mongoose.Schema(
  {
    firstName: String,

    lastName: String,
  },

  {
    toJSON: {
      virtuals: true,
    },

    toObject: {
      virtuals: true,
    },
  },
);
```

Now

```javascript id="v1a20"
res.json(user);
```

Output

```javascript id="v1a21"
{
    firstName: "Nitish",

    lastName: "Kumar",

    fullName: "Nitish Kumar"
}
```

---

# 8. Virtual Populate

Virtuals can also populate related documents **without storing an array of ObjectIds**.

User Schema

```javascript id="v1a22"
const userSchema = new mongoose.Schema({
  name: String,
});

userSchema.virtual("posts", {
  ref: "Post",
  localField: "_id",
  foreignField: "author",
});
```

Post Schema

```javascript id="v1a23"
const postSchema = new mongoose.Schema({
  title: String,
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});
```

Usage

```javascript id="v1a24"
const users = await User.find().populate("posts");
```

Output

```javascript id="v1a25"
{
    name: "Nitish",
    posts: [
        {
            title: "React"
        },
        {
            title: "Node.js"
        }
    ]
}
```

---

# 9. Real-world Examples

## Full Name

```javascript id="v1a26"
fullName

↓

firstName + lastName
```

---

## Age Group

```javascript id="v1a27"
userSchema
  .virtual("ageGroup")

  .get(function () {
    return this.age >= 18 ? "Adult" : "Minor";
  });
```

---

## Profile URL

```javascript id="v1a28"
userSchema
  .virtual("profileUrl")

  .get(function () {
    return `/users/${this._id}`;
  });
```

Output

```text id="v1a29"
/users/687bcf...
```

---

## Total Price

```javascript id="v1a30"
orderSchema
  .virtual("total")

  .get(function () {
    return this.price * this.quantity;
  });
```

---

# 10. Virtuals vs Normal Fields

| Normal Field        | Virtual                                   |
| ------------------- | ----------------------------------------- |
| Stored in MongoDB   | Not stored                                |
| Takes storage space | No storage                                |
| Read from database  | Computed dynamically                      |
| Can be indexed      | Cannot be indexed because it isn't stored |

---

# 11. Best Practices

✅ Use virtuals for computed values.

✅ Avoid storing duplicate data.

✅ Enable `toJSON.virtuals` when returning API responses.

✅ Keep virtual logic simple and fast.

❌ Don't use virtuals for values that should be searchable or indexed in MongoDB.

---

# 12. Common Interview Questions

### What is a Virtual?

A computed property that is not stored in MongoDB.

---

### Where are Virtuals stored?

They are not stored in the database. They exist only on Mongoose documents.

---

### Can Virtuals be queried?

No.

Since they don't exist in MongoDB, you cannot use them in database queries.

---

### Difference between Virtual and Normal Field?

| Normal Field      | Virtual              |
| ----------------- | -------------------- |
| Stored in MongoDB | Computed by Mongoose |
| Can be queried    | Cannot be queried    |
| Occupies storage  | No storage           |

---

### What is Virtual Populate?

A Mongoose feature that allows related documents to be populated using virtual relationships instead of storing arrays of references.

---

# 13. Quick Revision

| Feature           | Virtual |
| ----------------- | ------- |
| Stored in MongoDB | ❌      |
| Computed          | ✅      |
| Getter            | ✅      |
| Setter            | ✅      |
| Populate          | ✅      |
| Queryable         | ❌      |
| Indexed           | ❌      |

---

# 14. Interview Answer

> **Virtuals in Mongoose are computed properties that are not stored in MongoDB. They are generated dynamically using getter and setter functions and are useful for combining fields, transforming data, or exposing derived values such as a user's full name or profile URL. Virtuals help avoid storing duplicate data and keep documents clean. They can also be used with virtual population to represent relationships between collections without storing arrays of ObjectIds. Since virtuals are not persisted in the database, they cannot be queried or indexed.**
