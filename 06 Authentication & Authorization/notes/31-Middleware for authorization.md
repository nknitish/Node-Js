# Authorization Middleware

> **Interview Definition:**  
> **Authorization Middleware** is an Express middleware that checks whether an **authenticated user** has the required **role** or **permission** to access a protected resource. It executes **after authentication** and before the controller, preventing unauthorized users from performing restricted actions.

> **One-line Interview Answer:**  
> **Authentication verifies who the user is, while authorization middleware verifies what the user is allowed to do.**

---

# Table of Contents

1. What is Authorization Middleware?
2. Why Do We Need It?
3. Authentication vs Authorization Middleware
4. Authorization Flow
5. Role-Based Authorization Middleware
6. Permission-Based Authorization Middleware
7. Express.js Examples
8. Multiple Roles
9. Combining Authentication & Authorization
10. Real-world Examples
11. Best Practices
12. Common Interview Questions
13. Quick Revision
14. Interview Answer

---

# 1. What is Authorization Middleware?

Authorization middleware checks

```text
Can this user access this resource?
```

Unlike authentication,

it doesn't verify identity.

Instead,

it verifies permissions.

Example

```text
User

↓

Authenticated

↓

Admin?

↓

YES

↓

Continue
```

---

# 2. Why Do We Need It?

Imagine

```text
Customer

↓

DELETE /users/123
```

Without authorization

```text
Delete User

✔
```

Very dangerous.

Instead

```text
Customer

↓

Authorization Middleware

↓

403 Forbidden
```

---

# 3. Authentication vs Authorization Middleware

Authentication Middleware

```text
Verify JWT

↓

Who is the user?

↓

req.user
```

Authorization Middleware

```text
Check Role

↓

Check Permission

↓

Can user access?
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

# 4. Authorization Flow

```text
Client Request

↓

JWT Middleware

↓

req.user

↓

Authorization Middleware

↓

Role / Permission Check

↓

Allowed?

↓

YES

↓

Controller

↓

NO

↓

403 Forbidden
```

---

# 5. Role-Based Authorization Middleware

Suppose

JWT Payload

```javascript
req.user = {
  id: "123",

  role: "admin",
};
```

Middleware

```javascript
function authorize(...allowedRoles) {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({
        message: "Authentication Required",
      });
    }

    if (!allowedRoles.includes(req.user.role)) {
      return res.status(403).json({
        message: "Forbidden",
      });
    }

    next();
  };
}
```

Usage

```javascript
app.delete(
  "/users/:id",

  authenticate,

  authorize("admin"),

  deleteUser,
);
```

---

# 6. Permission-Based Authorization Middleware

Instead of checking roles,

check permissions.

Example

```javascript
req.user = {
  id: "123",

  permissions: ["product:create", "product:update", "order:read"],
};
```

Middleware

```javascript
function authorize(permission) {
  return (req, res, next) => {
    if (!req.user.permissions.includes(permission)) {
      return res.status(403).json({
        message: "Forbidden",
      });
    }

    next();
  };
}
```

Usage

```javascript
app.post(
  "/products",

  authenticate,

  authorize("product:create"),

  createProduct,
);
```

---

# 7. Express.js Examples

## Admin Route

```javascript
app.delete(
  "/users/:id",

  authenticate,

  authorize("admin"),

  deleteUser,
);
```

---

## Manager & Admin

```javascript
app.post(
  "/products",

  authenticate,

  authorize(
    "admin",

    "manager",
  ),

  createProduct,
);
```

---

## Permission-Based

```javascript
app.put(
  "/products/:id",

  authenticate,

  authorize("product:update"),

  updateProduct,
);
```

---

# 8. Multiple Roles

Middleware

```javascript
authorize(
  "admin",

  "manager",

  "editor",
);
```

Flow

```text
Admin

↓

✔


Manager

↓

✔


Customer

↓

403
```

---

# 9. Combining Authentication & Authorization

Typical middleware chain

```javascript
app.delete(
  "/users/:id",

  authenticate,

  authorize("admin"),

  deleteUser,
);
```

Flow

```text
Request

↓

Verify JWT

↓

req.user

↓

Check Role

↓

Controller
```

---

# 10. Real-world Examples

## E-commerce

Customer

```text
View Products

Buy Products
```

Seller

```text
Manage Products
```

Admin

```text
Delete Users

Manage Orders

Manage Products
```

---

## Company Portal

Employee

```text
View Payslips
```

Manager

```text
Approve Leave
```

HR

```text
Manage Employees
```

---

# 11. Best Practices

✅ Always authenticate before authorizing.

✅ Return **401 Unauthorized** if the user is not authenticated.

✅ Return **403 Forbidden** if the user lacks permission.

✅ Store permissions in the database.

✅ Keep middleware reusable.

✅ Never trust frontend authorization.

---

# 12. Common Interview Questions

### Why separate authentication and authorization?

Authentication verifies identity.

Authorization verifies permissions.

---

### Which middleware runs first?

Authentication.

---

### What if JWT is invalid?

```text
401 Unauthorized
```

---

### What if user lacks permission?

```text
403 Forbidden
```

---

### Should authorization happen in frontend?

Frontend may hide UI elements,

but backend must always enforce authorization.

---

# 13. Quick Revision

| Middleware     | Purpose           |
| -------------- | ----------------- |
| Authentication | Verify Identity   |
| Authorization  | Verify Permission |
| 401            | Not Authenticated |
| 403            | No Permission     |
| req.user       | User Information  |

---

# 14. Interview Answer

> **Authorization middleware is an Express middleware that checks whether an authenticated user has permission to access a resource or perform an action. It runs after authentication middleware has verified the user's identity and populated `req.user`. The middleware then checks the user's role or permissions before allowing the request to continue. If the user is not authenticated, the server returns `401 Unauthorized`. If the user is authenticated but lacks the required permission, it returns `403 Forbidden`. This approach keeps authorization logic reusable, centralized, and consistent across the application.**

---

# ⭐ Interview Tips

## Middleware Execution Order

```text
Request

↓

Authentication

↓

req.user

↓

Authorization

↓

Controller

↓

Response
```

---

## Role Check

```text
Admin

↓

Allowed


Customer

↓

403 Forbidden
```

---

## Permission Check

```text
product:create

↓

Permission Exists?

↓

YES

↓

Controller
```

---

# ⭐ Most Asked Interview Questions

### Q1. Why should authentication run before authorization?

Authorization needs to know **who the user is**.

Without authentication:

```text
Request

↓

No req.user

↓

Cannot Check Permissions
```

Therefore:

```text
Authentication

↓

Authorization
```

---

### Q2. Why return 401 vs 403?

```text
401

↓

User Not Logged In

or

Invalid Token
```

```text
403

↓

User Logged In

↓

Permission Denied
```

---

### Q3. Why use middleware instead of checking roles inside every controller?

Instead of writing:

```javascript
if (req.user.role !== "admin") {
  return res.sendStatus(403);
}
```

inside every controller,

centralize the logic:

```text
Request

↓

Authorization Middleware

↓

Controller
```

Benefits:

- Reusable
- Cleaner controllers
- Easier maintenance
- Consistent security

---

### Q4. How do large applications implement authorization?

Most enterprise applications follow this flow:

```text
JWT Authentication

↓

req.user

↓

Authorization Middleware

↓

Role

↓

Permissions

↓

Controller
```

Many systems use **permission-based checks** (e.g., `product:create`, `order:update`) instead of hardcoding role names, making the authorization system more flexible and scalable.
