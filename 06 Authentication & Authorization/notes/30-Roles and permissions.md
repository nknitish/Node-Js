# Roles and Permissions (RBAC)

> **Interview Definition:**  
> **Role-Based Access Control (RBAC)** is an authorization model where users are assigned one or more **roles**, and each role contains a set of **permissions**. Instead of assigning permissions directly to every user, permissions are grouped into roles, making authorization easier to manage and scale.

> **One-line Interview Answer:**  
> **RBAC controls what authenticated users can do by assigning permissions through roles.**

---

# Table of Contents

1. What is RBAC?
2. Why Do We Need RBAC?
3. Authentication vs Authorization
4. Roles
5. Permissions
6. How RBAC Works
7. RBAC Flow
8. Database Design
9. Express.js Implementation
10. Real-world Examples
11. RBAC vs ABAC
12. Best Practices
13. Common Interview Questions
14. Quick Revision
15. Interview Answer

---

# 1. What is RBAC?

RBAC stands for

```text
Role

↓

Permissions

↓

Access
```

Instead of saying

```text
Nitish

↓

Can Create Users

↓

Can Delete Users

↓

Can Update Products
```

we assign

```text
Nitish

↓

Admin

↓

Permissions
```

---

# 2. Why Do We Need RBAC?

Imagine an application with

- 10,000 users
- 50 permissions

Without RBAC

```text
User

↓

Permission 1

Permission 2

Permission 3

Permission 4
```

Thousands of permission assignments.

With RBAC

```text
User

↓

Role

↓

Permissions
```

Much easier to manage.

---

# 3. Authentication vs Authorization

Authentication

```text
Who are you?
```

Example

```text
Login

↓

JWT Verified
```

Authorization

```text
What can you do?
```

Example

```text
Admin?

↓

Delete User?
```

Authentication happens first.

Authorization happens second.

---

# 4. Roles

A Role is a collection of permissions.

Example

```text
Admin

Manager

Employee

Customer

Guest
```

Example

```text
Admin

↓

Create Users

Delete Users

Manage Orders

Manage Products
```

---

# 5. Permissions

Permissions define specific actions.

Example

```text
Create Product

Read Product

Update Product

Delete Product
```

Instead of

```text
Admin
```

we check

```text
product:create
```

Example naming convention

```text
user:create

user:update

user:delete

product:create

product:update

product:delete

order:read
```

---

# 6. How RBAC Works

```text
User Login

↓

JWT Verified

↓

Read User Role

↓

Read Permissions

↓

Permission Exists?

↓

YES

↓

Allow

↓

NO

↓

403 Forbidden
```

---

# 7. RBAC Flow

```text
Client Request

↓

JWT Middleware

↓

req.user

↓

Authorization Middleware

↓

Role

↓

Permission

↓

Controller
```

---

# 8. Database Design

## Simple Role

### Users Collection

```javascript
{
    "_id": "...",

    "name": "Nitish",

    "email": "abc@gmail.com",

    "role": "admin"
}
```

---

## Separate Roles Collection

### Roles

```javascript
{
    "_id": "...",

    "name": "Admin",

    "permissions": [

        "user:create",

        "user:update",

        "user:delete",

        "product:create",

        "product:update"
    ]
}
```

Users

```javascript
{
    "_id":"...",

    "name":"Nitish",

    "role":"Admin"
}
```

---

# 9. Express.js Implementation

JWT Middleware

```javascript
req.user = {
  id: "123",

  role: "admin",
};
```

Authorization Middleware

```javascript
function authorize(...roles) {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        message: "Forbidden",
      });
    }

    next();
  };
}
```

Protected Route

```javascript
app.delete(
  "/users/:id",

  authenticate,

  authorize("admin"),

  deleteUser,
);
```

---

## Permission-Based Middleware

Instead of checking roles,

check permissions.

```javascript
function hasPermission(permission) {
  return (req, res, next) => {
    if (!req.user.permissions.includes(permission)) {
      return res.sendStatus(403);
    }

    next();
  };
}
```

Example

```javascript
app.post(
  "/products",

  authenticate,

  hasPermission("product:create"),

  createProduct,
);
```

---

# 10. Real-world Examples

## E-commerce

```text
Customer

↓

Browse Products

Buy Products
```

---

```text
Seller

↓

Manage Products

Manage Inventory
```

---

```text
Admin

↓

Everything
```

---

## Company Dashboard

```text
Employee

↓

Read Documents
```

```text
Manager

↓

Approve Leave

View Reports
```

```text
HR

↓

Manage Employees
```

---

# 11. RBAC vs ABAC

| RBAC              | ABAC                                  |
| ----------------- | ------------------------------------- |
| Based on Roles    | Based on Attributes                   |
| Simple            | Flexible                              |
| Easy to implement | More complex                          |
| Admin/User        | Department, Time, Location, Ownership |

Example

RBAC

```text
Admin

↓

Delete Product
```

ABAC

```text
Owner

+

Working Hours

+

Department

↓

Delete Product
```

---

# 12. Best Practices

✅ Keep roles simple.

✅ Check permissions instead of hardcoding roles whenever possible.

✅ Store permissions in the database.

✅ Never trust frontend role checks.

✅ Perform authorization on the backend.

✅ Return **403 Forbidden** for unauthorized access.

---

# 13. Common Interview Questions

### What is RBAC?

Authorization using roles and permissions.

---

### What is a Role?

A collection of permissions.

---

### What is a Permission?

A specific action.

Example

```text
product:update
```

---

### Which HTTP status code is returned?

```text
403 Forbidden
```

---

### Should frontend enforce permissions?

Frontend can hide buttons for a better user experience, but **the backend must always enforce authorization**.

---

# 14. Quick Revision

| Concept        | Meaning                   |
| -------------- | ------------------------- |
| Authentication | Verify Identity           |
| Authorization  | Verify Permission         |
| Role           | Group of Permissions      |
| Permission     | Action                    |
| RBAC           | Role-Based Access Control |
| 403            | Forbidden                 |

---

# 15. Interview Answer

> **Role-Based Access Control (RBAC) is an authorization model where permissions are assigned to roles, and users are assigned one or more roles. After a user is authenticated, the backend checks whether the user's role or permissions allow the requested action. For example, an Admin role may have permissions such as `user:create`, `user:update`, and `user:delete`, while a Customer role can only browse and purchase products. RBAC simplifies permission management, improves scalability, and ensures authorization decisions are enforced consistently on the backend.**

---

# ⭐ Interview Tips

## Authentication vs Authorization

```text
User

↓

Login

↓

JWT Verified

↓

Authentication

↓

Check Role

↓

Authorization

↓

API
```

---

## RBAC Flow

```text
Request

↓

Authenticate

↓

req.user

↓

Check Role

↓

Check Permission

↓

Allow

or

403
```

---

## Role Hierarchy

```text
Admin

│

├── User Management

├── Product Management

└── Order Management


Manager

│

├── Product Management

└── Order Management


Customer

│

├── Browse Products

└── Buy Products
```

---

# ⭐ Most Asked Interview Questions

### Q1. Why use permissions instead of checking roles everywhere?

Instead of

```javascript
if(role === "admin")
```

use

```text
product:create
```

This makes the system more flexible.

Example:

```text
Manager

↓

product:create

✔
```

without making them an Admin.

---

### Q2. Can a user have multiple roles?

Yes.

Example

```text
User

↓

Manager

+

HR
```

Permissions are the **union** of both roles.

---

### Q3. What happens if an authenticated user lacks permission?

Example

```text
JWT Valid

↓

Delete Product

↓

Permission Missing

↓

403 Forbidden
```

Authentication succeeded, but authorization failed.

---

### Q4. How do large companies implement RBAC?

A common production design is:

```text
Users

↓

Roles

↓

Permissions

↓

Authorization Middleware

↓

API
```

Many enterprise systems avoid hardcoding roles in code. Instead, roles and permissions are stored in a database, allowing administrators to change access without redeploying the application.
