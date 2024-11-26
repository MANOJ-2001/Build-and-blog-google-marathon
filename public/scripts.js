// Select DOM elements
const fileInput = document.getElementById("file-upload");
const fileNameDisplay = document.getElementById("file-name");
const progressBar = document.getElementById("progress-bar");
const statusMessage = document.getElementById("status-message");

// Update file name display when a file is selected
fileInput.addEventListener("change", (event) => {
  const file = event.target.files[0];
  if (file) {
    fileNameDisplay.textContent = file.name;
  }
});

// Upload file to server
async function startUpload() {
  const file = fileInput.files[0];
  if (!file) {
    statusMessage.textContent = "Please select a file!";
    statusMessage.style.color = "#dc3545"; // Error red
    return;
  }

  const formData = new FormData();
  formData.append("file", file);

  progressBar.style.display = "block";
  statusMessage.textContent = "Uploading...";
  statusMessage.style.color = "#007bff"; // Blue for in-progress

  try {
    const response = await fetch("/upload", {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      // Log status code to provide more details about the error
      throw new Error(`Upload failed with status: ${response.status}`);
    }

    const result = await response.text();
    statusMessage.textContent = result;
    statusMessage.style.color = "#28a745"; // Green for success

  } catch (error) {
    console.error("Error during upload:", error); // Logs the full error
    statusMessage.textContent = "Error uploading file: " + error.message;
    statusMessage.style.color = "#dc3545"; // Error red
  } finally {
    progressBar.style.display = "none";
  }
}
