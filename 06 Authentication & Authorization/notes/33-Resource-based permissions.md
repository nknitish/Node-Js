# Resource-Based Permissions

> **Interview Definition:**  
> **Resource-Based Permissions** are an authorization model where access decisions are made based on the **specific resource being accessed**, not just the user's role. The system checks whether the authenticated user has permission to perform an action on a particular resource, such as **their own profile, order, or document**.

> **One-line Interview Answer:**  
> **Resource-based authorization answers the question: "Can this user perform this action on this specific resource?"**

---

# Table of Contents

1. What are Resource-Based Permissions?
2. Why Do We Need Them?
3. RBAC vs Resource-Based Permissions
4. Resource-Based Authorization Flow
5. Common Examples
6. Express.js Implementation
7. Combining RBAC + Resource Permissions
8. Real-world Examples
9. Best Practices
10. Common Interview Questions
11. Quick Revision
12. Interview Answer

---

# 1. What are Resource-Based Permissions?

Role-Based Access Control (RBAC) answers

```text
Who can perform this action?
```

Resource-Based Authorization answers

```text
Can this user perform this action

ON THIS RESOURCE?
```

Example

```text
Nitish

↓

Update Profile

↓

Own Profile?

↓

YES

↓

Allow
```

---

# 2. Why Do We Need Them?

Imagine Facebook.

User A

```text
Edit Profile

↓

Own Profile

↓

✔
```

User A

```text
Edit User B's Profile

↓

❌
```

Both users have the same role

```text
role = "user"
```

Role alone isn't enough.

---

# 3. RBAC vs Resource-Based Permissions

## RBAC

```text
Role

↓

Admin

↓

Delete User
```

Decision is based only on role.

---

## Resource-Based

```text
Role

↓

User

↓

Own Resource?

↓

Allow
```

Decision depends on:

- User
- Resource
- Action

---

Comparison

| RBAC                              | Resource-Based                     |
| --------------------------------- | ---------------------------------- |
| Checks role                       | Checks ownership or resource rules |
| Simple                            | More flexible                      |
| Admin/User                        | Owner, Team Member, Project Member |
| Same permission for all resources | Different permission per resource  |

---

# 4. Resource-Based Authorization Flow

```text
Request

↓

JWT Authentication

↓

req.user

↓

Fetch Resource

↓

Compare Resource Owner

↓

Owner?

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

# 5. Common Examples

## Example 1

User Profile

```text
User

↓

GET /profile/123

↓

Owner?

↓

YES

↓

Allow
```

---

## Example 2

Orders

```text
Customer

↓

GET /orders/100

↓

Own Order?

↓

YES

↓

Allow
```

---

## Example 3

Documents

```text
Employee

↓

Edit Document

↓

Assigned Editor?

↓

YES

↓

Allow
```

---

## Example 4

GitHub Repository

```text
Repository

↓

Owner?

↓

Collaborator?

↓

Organization Admin?

↓

Allow
```

---

# 6. Express.js Implementation

Suppose

JWT

```javascript
req.user = {
  id: "123",
};
```

Order

```javascript
{

    id: "100",

    userId: "123"

}
```

Middleware

```javascript
async function isOrderOwner(req, res, next) {
  const order = await Order.findById(req.params.id);

  if (!order) {
    return res.sendStatus(404);
  }

  if (order.userId.toString() !== req.user.id) {
    return res.sendStatus(403);
  }

  next();
}
```

Usage

```javascript
app.get(
  "/orders/:id",

  authenticate,

  isOrderOwner,

  getOrder,
);
```

---

# 7. Combining RBAC + Resource Permissions

Large applications often combine both.

Example

```text
Admin

↓

Access Everything
```

User

```text
↓

Own Resources Only
```

Flow

```text
Request

↓

Authenticate

↓

Admin?

↓

YES

↓

Allow

↓

NO

↓

Owner?

↓

YES

↓

Allow

↓

NO

↓

403
```

Middleware

```javascript
function canAccessOrder(order, user) {
  if (user.role === "admin") {
    return true;
  }

  return order.userId.toString() === user.id;
}
```

---

# 8. Real-world Examples

## E-commerce

Customer

```text
Own Orders

↓

✔
```

Other Customer

```text
Someone Else's Order

↓

❌
```

Admin

```text
All Orders

↓

✔
```

---

## Google Drive

```text
Document Owner

↓

Edit
```

Shared User

```text
↓

Read Only
```

Owner

```text
↓

Remove Sharing
```

---

## Jira

Project Member

```text
↓

View Issues
```

Project Admin

```text
↓

Manage Project
```

Reporter

```text
↓

Edit Own Issues
```

---

# 9. Best Practices

✅ Authenticate first.

✅ Check role first (Admin shortcut).

✅ Then verify ownership.

✅ Never trust resource IDs from the client.

✅ Return **404** if the resource doesn't exist.

✅ Return **403** if the resource exists but access is denied.

✅ Keep authorization logic in reusable middleware or service functions.

---

# 10. Common Interview Questions

### What is Resource-Based Authorization?

Authorization based on ownership or resource-specific rules.

---

### Is RBAC enough?

Not always.

Many applications require ownership checks.

---

### Can Admin bypass ownership?

Usually yes.

Business requirements decide.

---

### What status code for unauthorized resource access?

```text
403 Forbidden
```

---

### What if the resource doesn't exist?

```text
404 Not Found
```

---

# 11. Quick Revision

| Concept             | Meaning                        |
| ------------------- | ------------------------------ |
| RBAC                | Role-Based                     |
| Resource Permission | Ownership-Based                |
| Owner               | Can access own resource        |
| Admin               | Usually accesses all resources |
| 403                 | Forbidden                      |
| 404                 | Resource Not Found             |

---

# 12. Interview Answer

> **Resource-Based Permissions are an authorization approach where access is determined by the relationship between the user and the specific resource being accessed. Instead of checking only the user's role, the application verifies conditions such as ownership, membership, or assigned permissions. For example, a customer can view only their own orders, while an administrator can view all orders. In Express.js, this is typically implemented by authenticating the user, loading the requested resource from the database, comparing it with `req.user`, and returning `403 Forbidden` if the user is not allowed to access it. Resource-based authorization is commonly combined with RBAC in production systems.**

---

# ⭐ Interview Tips

## Resource Authorization Flow

```text
Request

↓

Authenticate

↓

Fetch Resource

↓

Owner?

↓

YES

↓

Controller

↓

NO

↓

403
```

---

## RBAC + Resource Check

```text
Admin

↓

Allow


User

↓

Own Resource?

↓

YES

↓

Allow

↓

NO

↓

403
```

---

## Example

```text
GET /orders/100

↓

JWT

↓

User ID = 123

↓

Order Owner = 123

↓

Allow
```

---

# ⭐ Most Asked Interview Questions

### Q1. Why isn't RBAC enough?

Suppose two users have the same role:

```text
User A

↓

role = user
```

```text
User B

↓

role = user
```

Both have the same role, but **User A should not be able to edit User B's profile**.

RBAC can't distinguish between **which resource** is being accessed.

---

### Q2. Should we check ownership in the frontend?

No.

The frontend may hide UI elements,

but the backend must always verify ownership.

---

### Q3. Why combine RBAC and Resource-Based Authorization?

A common production flow is:

```text
Admin?

↓

YES

↓

Allow

↓

NO

↓

Owner?

↓

YES

↓

Allow

↓

NO

↓

403
```

This allows administrators to manage all resources while restricting regular users to their own resources.

---

### Q4. Where is Resource-Based Authorization commonly used?

Almost every modern application uses it:

- E-commerce (own orders)
- Banking (own accounts)
- Google Drive (shared documents)
- GitHub (repositories)
- Jira (projects and issues)
- Slack (workspace resources)

It is one of the most common authorization patterns used alongside RBAC in production systems.
