# Salt and Salt Rounds (bcrypt)

> **Interview Definition:**
> A **Salt** is a random value added to a password before hashing to ensure that identical passwords generate different hashes. **Salt Rounds** (also called the **Cost Factor** or **Work Factor**) determine how many computational rounds bcrypt performs when generating the hash. Higher salt rounds increase security but also increase the time required to hash passwords.

---

# Table of Contents

1. What is a Salt?
2. Why Do We Need a Salt?
3. What are Salt Rounds?
4. How bcrypt Uses Salt
5. Hashing Flow
6. Generating a Salt
7. Hashing with Salt
8. Password Verification
9. Choosing Salt Rounds
10. Best Practices
11. Common Interview Questions
12. Quick Revision
13. Interview Answer

---

# 1. What is a Salt?

A **Salt** is a randomly generated string added to a password before hashing.

Example

```text id="salt001"
Password

↓

hello123
```

Generated Salt

```text id="salt002"
A7x92LmP
```

Combined

```text id="salt003"
hello123A7x92LmP
```

Then bcrypt hashes the combined value.

---

# 2. Why Do We Need a Salt?

Imagine two users choose the same password.

```text id="salt004"
User A

↓

hello123


User B

↓

hello123
```

Without Salt

```text id="salt005"
SHA256

↓

ABC123


SHA256

↓

ABC123
```

Same password → Same hash.

---

With Salt

```text id="salt006"
User A

↓

Salt = Xyz123

↓

bcrypt

↓

$2b$10$abc...


User B

↓

Salt = Pqr789

↓

bcrypt

↓

$2b$10$xyz...
```

Same password → Different hashes.

---

## Why is this important?

Without salt, attackers can use **Rainbow Tables**.

```text id="salt007"
Password

↓

Precomputed Hash

↓

Instant Match
```

With salt

```text id="salt008"
Random Salt

↓

Different Hash

↓

Rainbow Table Becomes Ineffective
```

---

# 3. What are Salt Rounds?

Salt Rounds determine **how much work bcrypt performs** while creating a hash.

Example

```javascript id="salt009"
await bcrypt.hash(password, 10);
```

The number:

```text id="salt010"
10
```

is the **Cost Factor** (Salt Rounds).

Higher rounds

```text id="salt011"
More CPU Time

↓

More Secure
```

Lower rounds

```text id="salt012"
Less CPU Time

↓

Faster
```

---

# 4. How bcrypt Uses Salt

```text id="salt013"
Password

↓

Generate Random Salt

↓

Combine Password + Salt

↓

Hash Repeatedly

↓

Store Hash
```

bcrypt stores everything needed for verification inside the hash.

---

# 5. Hashing Flow

```text id="salt014"
Password

↓

Generate Salt

↓

Cost Factor

↓

bcrypt Hash

↓

Database
```

Example Stored Hash

```text id="salt015"
$2b$10$7Q6uKfM8N5x...
```

Inside this hash are:

- Algorithm (`2b`)
- Cost Factor (`10`)
- Salt
- Final Hash

---

# 6. Generating a Salt

Although `bcrypt.hash()` generates a salt automatically, you can create one manually.

```javascript id="salt016"
import bcrypt from "bcrypt";

const salt = await bcrypt.genSalt(10);

console.log(salt);
```

Example Output

```text id="salt017"
$2b$10$KJvQX9vH3M...
```

---

# 7. Hashing with Salt

Method 1 (Recommended)

```javascript id="salt018"
const hash = await bcrypt.hash("hello123", 10);
```

bcrypt automatically generates the salt.

---

Method 2 (Manual Salt)

```javascript id="salt019"
const salt = await bcrypt.genSalt(10);

const hash = await bcrypt.hash("hello123", salt);

console.log(hash);
```

Both approaches are valid, but the first is simpler and more commonly used.

---

# 8. Password Verification

Login

```javascript id="salt020"
const isMatch = await bcrypt.compare(enteredPassword, storedHash);
```

Internally

```text id="salt021"
Stored Hash

↓

Extract Salt

↓

Hash Entered Password

↓

Compare

↓

true / false
```

You never need to store the salt separately because bcrypt embeds it in the hash.

---

# 9. Choosing Salt Rounds

| Salt Rounds | Speed       | Security |
| ----------- | ----------- | -------- |
| 8           | Fast        | Lower    |
| 10          | Good        | Good     |
| 12          | Slower      | Better   |
| 14          | Much Slower | High     |

Most Node.js applications commonly use:

```javascript id="salt022"
bcrypt.hash(password, 10);
```

or

```javascript id="salt023"
bcrypt.hash(password, 12);
```

Choose a value that balances security and application performance.

---

# 10. Best Practices

✅ Let `bcrypt.hash()` generate the salt automatically.

✅ Use a cost factor that suits your application's performance requirements.

✅ Never reuse a fixed salt for all users.

✅ Never store plain-text passwords.

✅ Always use `bcrypt.compare()` for verification.

---

# 11. Common Interview Questions

### What is a Salt?

A random value added to a password before hashing.

---

### Why do we use a Salt?

To ensure identical passwords produce different hashes and to protect against rainbow table attacks.

---

### What are Salt Rounds?

The work factor that controls how computationally expensive hashing is.

---

### Does bcrypt generate a Salt automatically?

Yes.

`bcrypt.hash(password, rounds)` automatically creates a random salt.

---

### Is the Salt stored separately?

No.

bcrypt stores the salt inside the generated hash.

---

# 12. Quick Revision

| Concept            | Purpose                         |
| ------------------ | ------------------------------- |
| Salt               | Makes each password hash unique |
| Salt Rounds        | Controls hashing workload       |
| `bcrypt.genSalt()` | Generate a salt manually        |
| `bcrypt.hash()`    | Hash a password                 |
| `bcrypt.compare()` | Verify a password               |

---

# 13. Interview Answer

> **A salt is a randomly generated value that bcrypt adds to a password before hashing. It ensures that two users with the same password will still have different hashes, protecting against rainbow table attacks. Salt rounds, also known as the cost factor, determine how much computational work bcrypt performs while generating the hash. A higher cost factor increases security by making brute-force attacks more expensive, but it also increases the time required to hash passwords. In most applications, developers use `bcrypt.hash(password, 10)` or `bcrypt.hash(password, 12)`, allowing bcrypt to generate a unique salt automatically.**
