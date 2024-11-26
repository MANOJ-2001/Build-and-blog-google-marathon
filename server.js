const express = require("express");
const multer = require("multer");
const path = require("path");
const { Storage } = require("@google-cloud/storage");

const app = express();
const port = 3000;

// Path to your service account JSON key and Google Cloud Storage bucket name
const keyFilePath = path.join(__dirname, 'decoded-vision-442719-c9-ac60c4f83a01.json'); // Adjust path if needed
const bucketName = 'myownapp'; // Replace with your actual bucket name

// Set up Google Cloud Storage with the provided service account key
const storage = new Storage({
  keyFilename: keyFilePath,
});

const bucket = storage.bucket(bucketName);

// Set up Multer to store files in memory with a limit of 100MB per file
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 1000 * 1024 * 1024 }, // Limit file size to 100 MB
}).single("file");

// Serve static files (frontend files)
app.use(express.static(path.join(__dirname, 'public')));

// API endpoint to handle file uploads
app.post("/upload", (req, res) => {
  upload(req, res, (err) => {
    if (err) {
      console.error("Upload error:", err);
      return res.status(500).send("Error uploading file: " + err.message);
    }

    if (!req.file) {
      return res.status(400).send("No file uploaded");
    }

    // Create a writable stream to upload the file to Google Cloud Storage
    const blob = bucket.file(req.file.originalname);
    const blobStream = blob.createWriteStream({
      resumable: false, // For smaller files, set resumable to false
    });

    // Handle the successful file upload
    blobStream.on("finish", () => {
      res.status(200).send(`File uploaded successfully: ${req.file.originalname}`);
    });

    // Handle any errors during the upload process
    blobStream.on("error", (err) => {
      console.error("Error during file upload:", err);
      res.status(500).send("Error uploading file: " + err.message);
    });

    // End the stream and upload the file buffer
    blobStream.end(req.file.buffer);
  });
});

// Serve your HTML file when users visit the root route '/'
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html')); // Ensure 'index.html' exists in the 'public' folder
});

// Start the server on port 3000
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
