# bcrypt for Password Hashing

> **Interview Definition:**
> **bcrypt** is a password hashing algorithm specifically designed for securely storing passwords. It automatically generates a **random salt**, combines it with the password, and performs multiple hashing rounds to produce a secure hash. Unlike general-purpose hashing algorithms, bcrypt is intentionally slow, making brute-force attacks much more difficult.

---

# Table of Contents

1. What is bcrypt?
2. Why Use bcrypt?
3. How bcrypt Works
4. Installing bcrypt
5. Hashing a Password
6. Comparing Passwords
7. Salt & Salt Rounds
8. Login Flow
9. Complete Example
10. Common Mistakes
11. Best Practices
12. Common Interview Questions
13. Quick Revision
14. Interview Answer

---

# 1. What is bcrypt?

bcrypt is a **password hashing library**.

Instead of storing:

```text id="bcrypt001"
hello123
```

We store:

```text id="bcrypt002"
$2b$10$V9P6M6I6o2W....
```

The original password is **never stored** in the database.

---

# 2. Why Use bcrypt?

Suppose two users choose the same password.

```
Password

↓

hello123
```

Without bcrypt

```text id="bcrypt003"
User A

↓

SHA256

↓

ABC123


User B

↓

SHA256

↓

ABC123
```

Same password → Same hash.

---

With bcrypt

```text id="bcrypt004"
User A

↓

bcrypt

↓

$2b$10$A...


User B

↓

bcrypt

↓

$2b$10$X...
```

Same password → Different hashes because bcrypt generates a unique salt.

---

# 3. How bcrypt Works

```text id="bcrypt005"
Password

↓

Generate Random Salt

↓

Combine Password + Salt

↓

Hash Multiple Times

↓

Store Hash
```

The stored hash already contains:

- Algorithm
- Cost factor
- Salt
- Hash

---

# 4. Installing bcrypt

Using npm

```bash id="bcrypt006"
npm install bcrypt
```

Using pnpm

```bash id="bcrypt007"
pnpm add bcrypt
```

Import

```javascript id="bcrypt008"
import bcrypt from "bcrypt";
```

---

# 5. Hashing a Password

```javascript id="bcrypt009"
import bcrypt from "bcrypt";

const password = "hello123";

const hashedPassword = await bcrypt.hash(password, 10);

console.log(hashedPassword);
```

Example Output

```text id="bcrypt010"
$2b$10$9Qj6...
```

---

## Save to Database

```javascript id="bcrypt011"
const user = await User.create({
  email: "nitish@gmail.com",

  password: hashedPassword,
});
```

Database

```javascript id="bcrypt012"
{
    email: "nitish@gmail.com",

    password: "$2b$10$9Qj6..."
}
```

---

# 6. Comparing Passwords

During login

```javascript id="bcrypt013"
const isMatch = await bcrypt.compare(
  "hello123",

  hashedPassword,
);

console.log(isMatch);
```

Output

```text id="bcrypt014"
true
```

Wrong password

```javascript id="bcrypt015"
await bcrypt.compare(
  "wrongPassword",

  hashedPassword,
);
```

Output

```text id="bcrypt016"
false
```

---

# 7. Salt & Salt Rounds

Hashing

```javascript id="bcrypt017"
await bcrypt.hash(
  password,

  10,
);
```

Here

```text id="bcrypt018"
10
```

is the **cost factor (salt rounds)**.

Higher value

```text id="bcrypt019"
More Secure

↓

Slower
```

Lower value

```text id="bcrypt020"
Faster

↓

Less Resistant to Brute Force
```

Common values

| Cost Factor | Usage                                                        |
| ----------- | ------------------------------------------------------------ |
| 8           | Development                                                  |
| 10          | Most applications                                            |
| 12          | Higher security                                              |
| 14+         | High-security environments (with performance considerations) |

---

# 8. Login Flow

```text id="bcrypt021"
User Login

↓

Find User

↓

bcrypt.compare()

↓

Password Match?

↓

Login Success
```

---

# 9. Complete Example

## Register

```javascript id="bcrypt022"
import bcrypt from "bcrypt";

app.post("/register", async (req, res) => {
  const hashedPassword = await bcrypt.hash(
    req.body.password,

    10,
  );

  const user = await User.create({
    email: req.body.email,

    password: hashedPassword,
  });

  res.json(user);
});
```

---

## Login

```javascript id="bcrypt023"
app.post("/login", async (req, res) => {
  const user = await User.findOne({
    email: req.body.email,
  });

  if (!user) {
    return res.status(404).send("User not found");
  }

  const isMatch = await bcrypt.compare(
    req.body.password,

    user.password,
  );

  if (!isMatch) {
    return res.status(401).send("Invalid Password");
  }

  res.send("Login Successful");
});
```

---

# 10. Common Mistakes

❌ Store plain-text passwords

```javascript id="bcrypt024"
password: "hello123";
```

---

❌ Compare passwords directly

```javascript id="bcrypt025"
if(password === user.password)
```

---

❌ Hash password twice

```javascript id="bcrypt026"
bcrypt.hash(
  hashedPassword,

  10,
);
```

---

✅ Correct

```javascript id="bcrypt027"
bcrypt.compare(
  enteredPassword,

  storedHash,
);
```

---

# 11. Best Practices

✅ Hash every password before saving.

✅ Use `bcrypt.compare()` for verification.

✅ Never decrypt passwords.

✅ Use a reasonable cost factor (commonly 10–12 depending on your application's performance requirements).

✅ Always use HTTPS so passwords are protected during transmission.

---

# 12. Common Interview Questions

### What is bcrypt?

A password hashing algorithm.

---

### Why use bcrypt?

To securely store passwords.

---

### Can bcrypt decrypt passwords?

No.

Hashing is one-way.

---

### Why does bcrypt generate different hashes for the same password?

Because it generates a unique random salt for every hash.

---

### Which function hashes passwords?

```javascript id="bcrypt028"
bcrypt.hash();
```

---

### Which function verifies passwords?

```javascript id="bcrypt029"
bcrypt.compare();
```

---

# 13. Quick Revision

| Method             | Purpose                   |
| ------------------ | ------------------------- |
| `bcrypt.hash()`    | Create password hash      |
| `bcrypt.compare()` | Verify password           |
| Salt               | Makes hashes unique       |
| Cost Factor        | Controls hashing workload |

---

# 14. Interview Answer

> **bcrypt is a password hashing algorithm designed specifically for securely storing passwords. It automatically generates a unique random salt for each password and applies a configurable work factor (cost factor) to slow down the hashing process, making brute-force attacks more difficult. During registration, passwords are hashed using `bcrypt.hash()` before being stored. During login, `bcrypt.compare()` hashes the entered password internally and compares it with the stored hash. Because bcrypt is a one-way hashing algorithm, passwords cannot be decrypted, making it a secure choice for password storage.**
