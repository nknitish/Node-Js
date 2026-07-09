# Admin vs User Access (RBAC)

> **Interview Definition:**  
> **Admin vs User Access** is an authorization pattern where different user roles have different levels of access to application resources. After authentication, the backend checks the user's role or permissions before allowing an action.

> **One-line Interview Answer:**  
> **Admins have elevated privileges to manage the system, while Users have limited access to their own resources and permitted actions.**

---

# Table of Contents

1. What is Admin vs User Access?
2. Why Do We Need It?
3. Access Levels
4. Authentication vs Authorization
5. Admin vs User Flow
6. Backend Implementation
7. Express Middleware Example
8. Real-world Examples
9. Role-Based vs Permission-Based Access
10. Best Practices
11. Common Interview Questions
12. Quick Revision
13. Interview Answer

---

# 1. What is Admin vs User Access?

Most applications have multiple types of users.

Example

```text
Admin

↓

Full Access
```

```text
User

↓

Limited Access
```

The backend decides what each role is allowed to do.

---

# 2. Why Do We Need It?

Imagine an e-commerce website.

Without authorization

```text
Customer

↓

Delete Products

✔
```

Anyone could perform administrative actions.

Instead

```text
Customer

↓

Delete Product

↓

403 Forbidden
```

---

# 3. Access Levels

Example

| Action             | Admin | User |
| ------------------ | :---: | :--: |
| View Profile       |  ✅   |  ✅  |
| Update Own Profile |  ✅   |  ✅  |
| Delete Own Account |  ✅   |  ✅  |
| View All Users     |  ✅   |  ❌  |
| Delete Users       |  ✅   |  ❌  |
| Manage Products    |  ✅   |  ❌  |
| Manage Orders      |  ✅   |  ❌  |
| View Reports       |  ✅   |  ❌  |
| Change User Roles  |  ✅   |  ❌  |

---

# 4. Authentication vs Authorization

Authentication

```text
Who are you?

↓

JWT Verified
```

Authorization

```text
What are you allowed to do?

↓

Admin?

↓

Allow
```

Flow

```text
Request

↓

Authentication

↓

Authorization

↓

Controller
```

---

# 5. Admin vs User Flow

```text
Client Request

↓

Verify JWT

↓

req.user

↓

Read Role

↓

Admin?

↓

YES

↓

Execute Controller

↓

NO

↓

403 Forbidden
```

---

# 6. Backend Implementation

User

```javascript
{
    id: "1",
    name: "Nitish",
    role: "user"
}
```

Admin

```javascript
{
    id: "2",
    name: "John",
    role: "admin"
}
```

---

# 7. Express Middleware Example

Authentication Middleware

```javascript
app.use(authenticate);
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

Admin Route

```javascript
app.delete(
  "/users/:id",

  authenticate,

  authorize("admin"),

  deleteUser,
);
```

Admin & Manager Route

```javascript
app.post(
  "/products",

  authenticate,

  authorize("admin", "manager"),

  createProduct,
);
```

User Route

```javascript
app.get(
  "/profile",

  authenticate,

  getProfile,
);
```

---

# 8. Real-world Examples

## E-commerce

### Customer

```text
Browse Products

↓

Add to Cart

↓

Place Order

↓

View Own Orders
```

---

### Seller

```text
Create Products

↓

Update Products

↓

View Orders
```

---

### Admin

```text
Manage Users

↓

Manage Products

↓

Manage Orders

↓

View Reports
```

---

## Banking Application

Customer

```text
View Balance

↓

Transfer Money

↓

Download Statement
```

Admin

```text
Manage Customers

↓

Freeze Accounts

↓

Generate Reports
```

---

# 9. Role-Based vs Permission-Based Access

### Role-Based

```javascript
authorize("admin");
```

Simple

```text
Admin

↓

Access
```

---

### Permission-Based

```javascript
authorize("product:delete");
```

Flexible

```text
Admin

↓

product:delete

↓

Allowed
```

Many enterprise applications prefer **permission-based authorization** because roles alone become difficult to manage as the system grows.

---

# 10. Best Practices

✅ Authenticate first.

✅ Authorize second.

✅ Keep admin routes separate.

✅ Never trust frontend role checks.

✅ Return **403 Forbidden** for insufficient permissions.

✅ Prefer permission-based checks for large applications.

---

# 11. Common Interview Questions

### Can a User access Admin APIs?

No.

The backend should return

```text
403 Forbidden
```

---

### Can Admin access User APIs?

Usually yes.

Admins typically inherit normal user capabilities in addition to administrative ones, although this depends on business requirements.

---

### Should frontend hide Admin buttons?

Yes, for better user experience.

But backend authorization is still mandatory.

---

### Where should role checks happen?

Backend.

Never rely only on frontend.

---

# 12. Quick Revision

| Role           | Access           |
| -------------- | ---------------- |
| User           | Own Resources    |
| Admin          | System Resources |
| Authentication | Identity         |
| Authorization  | Permissions      |
| 403            | Forbidden        |

---

# 13. Interview Answer

> **Admin vs User Access is a common Role-Based Access Control (RBAC) implementation where different roles have different permissions. After a user is authenticated, the backend checks the user's role before allowing access to protected resources. For example, a User may only access their own profile and orders, while an Admin can manage users, products, and system settings. In Express.js, this is typically implemented using reusable authorization middleware that checks `req.user.role` or the user's permissions and returns `403 Forbidden` if access is denied.**

---

# ⭐ Interview Tips

## Authentication + Authorization

```text
Request

↓

JWT Verification

↓

req.user

↓

Role Check

↓

Controller
```

---

## Admin vs User

```text
Admin

↓

Manage System


User

↓

Use System
```

---

## Typical API Access

```text
GET /profile

↓

User ✔

Admin ✔


DELETE /users/:id

↓

User ❌

Admin ✔
```

---

# ⭐ Most Asked Interview Questions

### Q1. Why shouldn't we check only on the frontend?

Suppose the frontend hides the **Delete User** button.

A malicious user can still send:

```http
DELETE /users/123
```

directly using Postman or another HTTP client.

Only backend authorization can prevent unauthorized access.

---

### Q2. Should we hardcode `role === "admin"` everywhere?

For small projects, it's acceptable.

For larger applications, it's better to check permissions:

```text
user:delete

product:create

order:update
```

This makes the system more flexible.

---

### Q3. Can a user have multiple roles?

Yes.

Example

```text
John

↓

Manager

+

HR
```

The effective permissions are the combination of both roles.

---

### Q4. How do large companies manage Admin access?

A common architecture is:

```text
JWT Authentication

↓

Authorization Middleware

↓

Role Lookup

↓

Permission Lookup

↓

Controller
```

Roles and permissions are usually stored in a database so administrators can change access without modifying application code.
