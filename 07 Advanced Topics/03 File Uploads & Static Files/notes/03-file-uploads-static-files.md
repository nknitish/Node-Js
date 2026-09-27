# File Uploads & Static Files

## Static files

Express can serve public assets from a folder such as `public`:

```js
app.use(express.static("public"));
```

This is used for HTML, CSS, images, and frontend assets.

## File uploads

The `multer` package handles multipart form data. It is commonly used for profile images, documents, and CSV files.

```js
const upload = multer({ storage });
app.post("/upload", upload.single("avatar"), (req, res) => {
  res.json({ file: req.file });
});
```

## Security notes

- Validate MIME type and file extension
- Restrict maximum file size
- Save files in controlled directories
- Avoid accepting executable files in uploads

## Image handling

The `sharp` library is useful for resizing and optimizing images after upload.

```js
await sharp(inputPath).resize(300, 300).toFile(outputPath);
```

## Common use cases

- Profile upload
- Document management
- CSV import
- CDN or S3 image hosting
