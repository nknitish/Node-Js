# Mongoose Population (References)

> **Interview Definition:**
> **Population** is a Mongoose feature that replaces a referenced **ObjectId** with the actual document from another collection. It is similar to a **JOIN** in SQL, allowing related data to be fetched automatically.

---

# Table of Contents

1. What is Population?
2. Why Do We Need Population?
3. Population vs SQL JOIN
4. Creating References
5. Populating Documents
6. Populating Multiple Fields
7. Nested Population
8. Selecting Fields
9. Virtual Population
10. Populate Options
11. Population vs Embedding
12. Best Practices
13. Common Interview Questions
14. Quick Revision
15. Interview Answer

---

# 1. What is Population?

Population replaces an **ObjectId** with the complete document.

Without Population

Users Collection

```javascript
{
    "_id": "u1",
    "name": "Nitish",
    "email": "nitish@gmail.com"
}
```

Posts Collection

```javascript
{
    "_id": "p1",
    "title": "Learning Mongoose",
    "author": "u1"
}
```

Here:

```text
author
```

contains only the ObjectId.

---

With Population

```javascript
{
    "_id": "p1",
    "title": "Learning Mongoose",
    "author": {
        "_id": "u1",
        "name": "Nitish",
        "email": "nitish@gmail.com"
    }
}
```

---

# 2. Why Do We Need Population?

Suppose one user has 100 posts.

Without references:

```text
Post

↓

Store complete user data

↓

Repeated 100 times
```

This causes duplicate data.

Instead:

```text
Post

↓

Store User ObjectId

↓

Populate when needed
```

Benefits:

- Less duplication
- Easier updates
- Smaller documents
- Better normalization

---

# 3. Population vs SQL JOIN

SQL

```text
Users

↓

JOIN

↓

Posts
```

MongoDB

```text
Posts

↓

ObjectId Reference

↓

populate()

↓

User Document
```

Population is conceptually similar to a JOIN but is implemented by Mongoose at the application layer rather than by MongoDB as a SQL JOIN.

---

# 4. Creating References

## User Schema

```javascript
import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: String,

  email: String,
});

const User = mongoose.model("User", userSchema);
```

---

## Post Schema

```javascript
const postSchema = new mongoose.Schema({
  title: String,

  content: String,

  author: {
    type: mongoose.Schema.Types.ObjectId,

    ref: "User",
  },
});

const Post = mongoose.model("Post", postSchema);
```

Here

```text
ref: "User"
```

tells Mongoose which model to populate.

---

# 5. Populating Documents

Find posts

```javascript
const posts = await Post.find()

  .populate("author");
```

Result

```javascript
{
    title: "Learning Mongoose",

    author: {

        _id: "...",

        name: "Nitish",

        email: "nitish@gmail.com"

    }

}
```

Flow

```text
Post

↓

author ObjectId

↓

populate()

↓

Complete User
```

---

# 6. Populating Multiple Fields

Suppose a Post has:

```javascript
{

    author: ObjectId,

    category: ObjectId

}
```

Populate both.

```javascript
const posts = await Post.find()

  .populate("author")

  .populate("category");
```

---

# 7. Nested Population

Example

Post

↓

User

↓

Company

```javascript
const posts = await Post.find()

  .populate({
    path: "author",

    populate: {
      path: "company",
    },
  });
```

Result

```javascript
Post

↓

Author

↓

Company
```

---

# 8. Selecting Fields

Sometimes you don't need every field.

```javascript
const posts = await Post.find()

  .populate(
    "author",

    "name email",
  );
```

Result

```javascript
{

    author: {

        name: "Nitish",

        email: "nitish@gmail.com"

    }

}
```

Password and other fields are excluded.

---

# 9. Virtual Population

Instead of storing an array of ObjectIds.

User

```javascript
{
  name: "Nitish";
}
```

Post

```javascript
{

    title: "React",

    author: ObjectId
}
```

User Schema

```javascript
userSchema.virtual("posts", {
  ref: "Post",

  localField: "_id",

  foreignField: "author",
});
```

Usage

```javascript
const users = await User.find()

  .populate("posts");
```

Output

```javascript
{

    name: "Nitish",

    posts: [

        {

            title: "React"

        },

        {

            title: "Node"

        }

    ]

}
```

---

# 10. Populate Options

Populate with filter.

```javascript
const users = await User.find()

  .populate({
    path: "posts",

    match: {
      published: true,
    },
  });
```

---

Limit populated documents.

```javascript
const users = await User.find()

  .populate({
    path: "posts",

    options: {
      limit: 5,
    },
  });
```

---

Sort populated documents.

```javascript
.populate({

    path: "posts",

    options: {

        sort: {

            createdAt: -1

        }

    }

});
```

---

# 11. Population vs Embedding

## Population (References)

```javascript
Post

{

    title:"React",

    author:ObjectId

}
```

Advantages

- No duplicate data
- Easy updates
- Good for shared data

---

## Embedding

```javascript
{

    title:"React",

    author:{

        name:"Nitish"

    }

}
```

Advantages

- Single database read
- Faster for tightly related data
- No population needed

---

## Which Should You Use?

| Use References       | Use Embedding               |
| -------------------- | --------------------------- |
| Shared data          | Small, tightly related data |
| Large relationships  | Frequently read together    |
| One user, many posts | Address inside User         |
| Products and Orders  | User preferences            |

---

# 12. Best Practices

✅ Use references for large relationships.

✅ Use embedding for small, tightly coupled data.

✅ Populate only the fields you need.

✅ Avoid deeply nested population when possible.

✅ Use indexes on referenced fields for better query performance.

---

# 13. Common Interview Questions

### What is Population?

A Mongoose feature that replaces referenced ObjectIds with complete documents.

---

### Is Population the same as SQL JOIN?

It is conceptually similar, but Mongoose performs additional queries and combines the results in the application rather than using SQL JOIN syntax.

---

### What does `ref` do?

It tells Mongoose which model should be used during population.

---

### Difference between Embedding and Referencing?

| Embedding                     | Referencing          |
| ----------------------------- | -------------------- |
| Stores nested document        | Stores ObjectId      |
| Faster reads for related data | Better normalization |
| Can duplicate data            | Less duplication     |

---

### Can you populate multiple fields?

Yes.

```javascript
.populate("author")
.populate("category")
```

---

### Can Population be nested?

Yes.

Using nested `populate()`.

---

# 14. Quick Revision

| Feature                   | Population |
| ------------------------- | ---------- |
| Uses ObjectId             | ✅         |
| Uses ref                  | ✅         |
| Similar to SQL JOIN       | ✅         |
| Supports Nested Populate  | ✅         |
| Supports Field Selection  | ✅         |
| Supports Filtering        | ✅         |
| Supports Virtual Populate | ✅         |

---

# 15. Interview Answer

> **Population is a Mongoose feature that replaces referenced ObjectIds with complete documents from another collection. It is conceptually similar to a SQL JOIN and is implemented using the `ref` property in a schema along with the `populate()` method. Population allows developers to normalize data by storing references instead of duplicating documents while still retrieving related information when needed. Mongoose also supports nested population, virtual population, field selection, filtering, sorting, and limiting populated documents, making it a powerful way to work with related collections.**
