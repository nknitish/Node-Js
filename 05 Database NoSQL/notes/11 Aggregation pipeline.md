# MongoDB Aggregation Pipeline

> **Interview Definition:**
> The **Aggregation Pipeline** is a MongoDB framework for processing documents through a sequence of stages. Each stage transforms, filters, groups, sorts, or reshapes the data, and the output of one stage becomes the input for the next stage. It is used for **analytics, reporting, dashboards, data transformation, and complex queries**.

---

# Table of Contents

1. What is Aggregation?
2. Why Use Aggregation?
3. How the Pipeline Works
4. Basic Syntax
5. Common Pipeline Stages
6. `$match`
7. `$project`
8. `$group`
9. `$sort`
10. `$limit`
11. `$skip`
12. `$unwind`
13. `$lookup`
14. `$count`
15. `$facet`
16. Complete Examples
17. Best Practices
18. Common Interview Questions
19. Quick Revision
20. Interview Answer

---

# 1. What is Aggregation?

Aggregation processes documents step by step.

Think of it like a factory assembly line.

```text
Raw Documents
      │
      ▼
Filter
      │
      ▼
Group
      │
      ▼
Sort
      │
      ▼
Final Result
```

Each step is called a **Pipeline Stage**.

---

# 2. Why Use Aggregation?

Instead of writing lots of JavaScript:

```javascript
const users = await User.find();

// Filter
// Group
// Sort
// Count
```

MongoDB performs everything inside the database.

Benefits

- Faster
- Less network traffic
- Powerful analytics
- Optimized by MongoDB
- Better for reports

---

# 3. Pipeline Flow

```text
Collection

      │

      ▼

Stage 1 ($match)

      │

      ▼

Stage 2 ($group)

      │

      ▼

Stage 3 ($sort)

      │

      ▼

Stage 4 ($project)

      │

      ▼

Result
```

Each stage receives the output of the previous stage.

---

# 4. Basic Syntax

```javascript
const result = await User.aggregate([
  {
    stage1,
  },

  {
    stage2,
  },

  {
    stage3,
  },
]);
```

Example

```javascript
const users = await User.aggregate([
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

# Sample Collection

```javascript
[
  {
    name: "Nitish",
    city: "Delhi",
    age: 25,
    salary: 50000,
  },
  {
    name: "Rahul",
    city: "Delhi",
    age: 28,
    salary: 70000,
  },
  {
    name: "Aman",
    city: "Mumbai",
    age: 24,
    salary: 60000,
  },
];
```

---

# 5. Common Pipeline Stages

| Stage      | Purpose                    |
| ---------- | -------------------------- |
| `$match`   | Filter documents           |
| `$project` | Select or transform fields |
| `$group`   | Group documents            |
| `$sort`    | Sort documents             |
| `$limit`   | Limit results              |
| `$skip`    | Skip documents             |
| `$unwind`  | Flatten arrays             |
| `$lookup`  | Join collections           |
| `$count`   | Count documents            |
| `$facet`   | Multiple pipelines         |

---

# 6. `$match`

Works like SQL `WHERE`.

```javascript
const users = await User.aggregate([
  {
    $match: {
      city: "Delhi",
    },
  },
]);
```

Output

```javascript
[
  {
    name: "Nitish",
  },
  {
    name: "Rahul",
  },
];
```

---

# 7. `$project`

Choose which fields to return.

```javascript
await User.aggregate([
  {
    $project: {
      name: 1,
      age: 1,
      _id: 0,
    },
  },
]);
```

Output

```javascript
{
    name: "Nitish",
    age: 25
}
```

---

## Rename Fields

```javascript
await User.aggregate([
  {
    $project: {
      userName: "$name",
      _id: 0,
    },
  },
]);
```

Output

```javascript
{
  userName: "Nitish";
}
```

---

# 8. `$group`

Similar to SQL `GROUP BY`.

Count users by city.

```javascript
await User.aggregate([
  {
    $group: {
      _id: "$city",
      totalUsers: {
        $sum: 1,
      },
    },
  },
]);
```

Output

```javascript
[
  {
    _id: "Delhi",
    totalUsers: 2,
  },
  {
    _id: "Mumbai",
    totalUsers: 1,
  },
];
```

---

## Average Salary

```javascript
await User.aggregate([
  {
    $group: {
      _id: "$city",
      averageSalary: {
        $avg: "$salary",
      },
    },
  },
]);
```

---

## Total Salary

```javascript
await User.aggregate([
  {
    $group: {
      _id: "$city",
      totalSalary: {
        $sum: "$salary",
      },
    },
  },
]);
```

---

# 9. `$sort`

Ascending

```javascript
await User.aggregate([
  {
    $sort: {
      age: 1,
    },
  },
]);
```

Descending

```javascript
await User.aggregate([
  {
    $sort: {
      salary: -1,
    },
  },
]);
```

---

# 10. `$limit`

```javascript
await User.aggregate([
  {
    $limit: 5,
  },
]);
```

---

# 11. `$skip`

Pagination

```javascript
await User.aggregate([
  {
    $skip: 10,
  },
  {
    $limit: 10,
  },
]);
```

---

# 12. `$unwind`

Converts array elements into separate documents.

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

Pipeline

```javascript
await User.aggregate([
  {
    $unwind: "$skills",
  },
]);
```

Output

```javascript
{
    name: "Nitish",
    skills: "React"
}

{
    name: "Nitish",
    skills: "Node"
}

{
    name: "Nitish",
    skills: "MongoDB"
}
```

---

# 13. `$lookup`

Equivalent to a SQL JOIN.

Users

```javascript
{
    _id: 1,
    name: "Nitish"
}
```

Posts

```javascript
{
    title: "React",
    author: 1
}
```

Pipeline

```javascript
await User.aggregate([
  {
    $lookup: {
      from: "posts",
      localField: "_id",
      foreignField: "author",
      as: "posts",
    },
  },
]);
```

Output

```javascript
{
    name: "Nitish",
    posts: [
        {
            title: "React"
        }
    ]
}
```

---

# 14. `$count`

```javascript
await User.aggregate([
  {
    $match: {
      city: "Delhi",
    },
  },
  {
    $count: "totalUsers",
  },
]);
```

Output

```javascript
[
  {
    totalUsers: 2,
  },
];
```

---

# 15. `$facet`

Run multiple pipelines in one query.

```javascript
await User.aggregate([
  {
    $facet: {
      users: [
        {
          $limit: 5,
        },
      ],

      total: [
        {
          $count: "count",
        },
      ],
    },
  },
]);
```

Output

```javascript
{
    users: [...],
    total: [
        {
            count: 100
        }
    ]
}
```

---

# 16. Complete Example

Find adult users in Delhi sorted by salary.

```javascript
const result = await User.aggregate([
  {
    $match: {
      city: "Delhi",
      age: {
        $gte: 18,
      },
    },
  },

  {
    $sort: {
      salary: -1,
    },
  },

  {
    $project: {
      name: 1,
      salary: 1,
      _id: 0,
    },
  },
]);
```

Flow

```text
Users

↓

$match

↓

$sort

↓

$project

↓

Result
```

---

# 17. Best Practices

✅ Place `$match` as early as possible.

✅ Project only required fields.

✅ Create indexes for fields used in `$match` and `$sort`.

✅ Avoid unnecessary `$lookup`.

✅ Use `$facet` when multiple related results are needed from one query.

---

# 18. Common Interview Questions

### What is an Aggregation Pipeline?

A sequence of stages that process MongoDB documents.

---

### What is `$match`?

Filters documents.

Equivalent to SQL `WHERE`.

---

### What is `$group`?

Groups documents.

Equivalent to SQL `GROUP BY`.

---

### What is `$lookup`?

Performs a join-like operation between collections.

---

### Difference between `find()` and `aggregate()`?

| `find()`          | `aggregate()`                                          |
| ----------------- | ------------------------------------------------------ |
| Simple retrieval  | Complex processing                                     |
| Basic filtering   | Filtering, grouping, transformations, joins, analytics |
| Returns documents | Returns transformed results                            |

---

### Why place `$match` first?

It reduces the number of documents processed by later stages, improving performance.

---

# 19. Quick Revision

| Stage      | SQL Equivalent |
| ---------- | -------------- |
| `$match`   | `WHERE`        |
| `$project` | `SELECT`       |
| `$group`   | `GROUP BY`     |
| `$sort`    | `ORDER BY`     |
| `$limit`   | `LIMIT`        |
| `$skip`    | `OFFSET`       |
| `$lookup`  | `JOIN`         |
| `$count`   | `COUNT(*)`     |

---

# 20. Interview Answer

> **The MongoDB Aggregation Pipeline is a framework for processing documents through multiple stages, where each stage transforms or filters the data before passing it to the next stage. Common stages include `$match` for filtering, `$project` for selecting or reshaping fields, `$group` for grouping data, `$sort` for ordering results, `$limit` and `$skip` for pagination, `$lookup` for joining collections, and `$unwind` for flattening arrays. Aggregation is widely used for analytics, reporting, dashboards, and complex data transformations, and it is generally more efficient than processing large datasets in application code because the work is performed inside MongoDB.**
