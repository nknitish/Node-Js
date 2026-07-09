# Password Strength Validation

> **Interview Definition:**
> **Password Strength Validation** is the process of ensuring that a user's password meets predefined security requirements before it is accepted. Strong password policies help protect user accounts from brute-force, dictionary, and credential stuffing attacks.

---

# Table of Contents

1. What is Password Strength Validation?
2. Why is it Important?
3. Common Password Rules
4. Strong vs Weak Passwords
5. Validation Flow
6. Regular Expression Validation
7. Express.js Validation Example
8. Mongoose Schema Validation
9. Password Strength Libraries
10. Best Practices
11. Common Interview Questions
12. Quick Revision
13. Interview Answer

---

# 1. What is Password Strength Validation?

Password strength validation checks whether a password satisfies security requirements before it is stored.

Example

```text
User Password

↓

Validate Rules

↓

Valid?

↓

Yes → Hash Password

No → Return Error
```

Validation happens **before** password hashing.

---

# 2. Why is it Important?

Weak passwords are easy to guess.

Example

```text
123456

password

qwerty

admin

abc123
```

These passwords can often be cracked quickly using dictionary or brute-force attacks.

Strong passwords reduce this risk.

---

# 3. Common Password Rules

A common policy includes:

- Minimum 8 characters
- At least one uppercase letter
- At least one lowercase letter
- At least one number
- At least one special character

Example

```text
Length ≥ 8

Uppercase ✔

Lowercase ✔

Number ✔

Special Character ✔
```

---

# 4. Strong vs Weak Passwords

| Password           | Strong? | Reason                    |
| ------------------ | ------- | ------------------------- |
| `123456`           | ❌      | Too short & predictable   |
| `password`         | ❌      | Common dictionary word    |
| `Nitish123`        | ⚠️      | Missing special character |
| `Nitish@123`       | ✅      | Meets common requirements |
| `My$ecureP@ss2026` | ✅      | Long and complex          |

---

# 5. Validation Flow

```text
User Enters Password

        │

        ▼

Check Length

        ▼

Check Uppercase

        ▼

Check Lowercase

        ▼

Check Number

        ▼

Check Special Character

        ▼

Valid?

   │          │

  Yes        No

   │          │

Hash      Return Error
```

---

# 6. Regular Expression Validation

Regex

```javascript
const passwordRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
```

Validation

```javascript
const password = "Nitish@123";

console.log(passwordRegex.test(password));
```

Output

```text
true
```

---

## Regex Breakdown

```text
^                  Start

(?=.*[a-z])        Lowercase

(?=.*[A-Z])        Uppercase

(?=.*\d)           Number

(?=.*[@$!%*?&])    Special Character

{8,}               Minimum 8 Characters

$                  End
```

---

# 7. Express.js Validation Example

```javascript
app.post("/register", async (req, res) => {
  const { password } = req.body;

  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

  if (!passwordRegex.test(password)) {
    return res.status(400).json({
      message:
        "Password must contain at least 8 characters, one uppercase letter, one lowercase letter, one number, and one special character.",
    });
  }

  res.send("Password Accepted");
});
```

---

# 8. Mongoose Schema Validation

```javascript
import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  password: {
    type: String,

    required: true,

    validate: {
      validator(value) {
        return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/.test(
          value,
        );
      },

      message: "Password is not strong enough.",
    },
  },
});
```

> **Note:** In real applications, password validation is usually performed before hashing, and the hashed password—not the plain password—is stored in MongoDB.

---

# 9. Password Strength Libraries

Instead of writing your own validation, you can use libraries.

Install

```bash
pnpm add validator
```

Example

```javascript
import validator from "validator";

const password = "Nitish@123";

console.log(validator.isStrongPassword(password));
```

Output

```text
true
```

Custom Rules

```javascript
validator.isStrongPassword(password, {
  minLength: 10,

  minLowercase: 1,

  minUppercase: 1,

  minNumbers: 1,

  minSymbols: 1,
});
```

---

# 10. Best Practices

✅ Require at least 8–12 characters.

✅ Encourage long passphrases where appropriate.

✅ Validate passwords before hashing.

✅ Hash passwords with bcrypt.

✅ Don't reveal exactly which validation rule failed if that conflicts with your security requirements.

✅ Prevent users from choosing extremely common passwords.

---

# 11. Common Interview Questions

### What is Password Strength Validation?

It verifies that a password satisfies the application's security requirements.

---

### Should validation happen before or after hashing?

Before hashing.

---

### Can bcrypt validate password strength?

No.

bcrypt only hashes and compares passwords.

---

### What is commonly used for validation?

- Regular Expressions
- `validator` package
- Client-side validation + Server-side validation

---

### Should validation happen only on the frontend?

No.

The backend must always validate passwords because frontend validation can be bypassed.

---

# 12. Quick Revision

| Feature             | Purpose                     |
| ------------------- | --------------------------- |
| Regex               | Validate password rules     |
| validator.js        | Password validation library |
| bcrypt              | Hash passwords              |
| Mongoose Validation | Server-side validation      |

---

# 13. Interview Answer

> **Password Strength Validation ensures that users create passwords that satisfy predefined security rules, such as minimum length, uppercase letters, lowercase letters, numbers, and special characters. This helps reduce the risk of brute-force and dictionary attacks. Validation should always occur before hashing the password, and it must be enforced on the server because client-side validation can be bypassed. After validation succeeds, the password should be hashed using a dedicated password hashing algorithm such as bcrypt before being stored in the database.**
