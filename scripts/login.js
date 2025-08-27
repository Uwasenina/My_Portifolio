// Wait for DOM to be fully loaded before attaching event listeners
document.addEventListener("DOMContentLoaded", function () {
  // Get form elements
  const form = document.querySelector(".login-container form");
  const emailInput = document.getElementById("email"); // Changed to use email input
  const passwordInput = document.getElementById("password");
  let loginButton = document.getElementById("login-button");

  // Remove the anchor tag around the login button if exists (we'll handle navigation in JS)
  if (loginButton.parentElement.tagName === "A") {
    const newLoginButton = loginButton.cloneNode(true);
    loginButton.parentElement.parentNode.replaceChild(
      newLoginButton,
      loginButton.parentElement
    );
    loginButton = newLoginButton; // Update reference to the new button
  }

  // Create an element for error/success messages if it doesn't exist
  let messageElement = document.querySelector(".login-message");
  if (!messageElement) {
    messageElement = document.createElement("div");
    messageElement.className = "login-message";
    messageElement.style.marginTop = "15px";
    messageElement.style.textAlign = "center";
    messageElement.style.fontSize = "14px";
    form.appendChild(messageElement);
  }

  // Add click event listener to login button
  loginButton.addEventListener("click", async function (event) {
    event.preventDefault();

    // Get input values
    const email = emailInput.value.trim();
    const password = passwordInput.value;

    // Basic validation
    if (!email) {
      showMessage("Please enter your email address", "error");
      return;
    }

    if (!password) {
      showMessage("Please enter your password", "error");
      return;
    }

    // Show loading state
    loginButton.value = "Logging in...";
    loginButton.disabled = true;
    showMessage("Connecting to server...", "info");

    try {
      // Send login request to backend
      const apiUrl = "http://localhost:5000/users/login";
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      });

      const data = await response.json();

      loginButton.value = "Login";
      loginButton.disabled = false;

      if (response.ok) {
        showMessage("Login successful! Redirecting...", "success");

        // Store auth token if provided in response
        if (data.token) {
          localStorage.setItem("authToken", data.token);
        }

        // Store user info if needed
        if (data.user) {
          localStorage.setItem("userData", JSON.stringify(data.user));
        }

        // Redirect to home/dashboard after short delay
        setTimeout(() => {
          window.location.href = "../index.html";
        }, 1000);
      } else {
        // Failed login
        showMessage(
          data.message || "Invalid credentials. Please try again.",
          "error"
        );
      }
    } catch (error) {
      console.error("Login error:", error);

      // Reset button state
      loginButton.value = "Login";
      loginButton.disabled = false;

      // Show appropriate error message
      if (error.message && error.message.includes("Failed to fetch")) {
        showMessage(
          "Cannot connect to server. Please check if the server is running.",
          "error"
        );
      } else {
        showMessage("Login failed. Please try again later.", "error");
      }
    }
  });

  // Function to display messages to the user
  function showMessage(message, type) {
    messageElement.textContent = message;

    // Set color based on message type
    switch (type) {
      case "error":
        messageElement.style.color = "#f44336"; // Red
        break;
      case "success":
        messageElement.style.color = "#4CAF50"; // Green
        break;
      case "info":
        messageElement.style.color = "#2196F3"; // Blue
        break;
      default:
        messageElement.style.color = "#000000"; // Black
    }
  }

  // Add keyboard event listener for Enter key
  form.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
      event.preventDefault();
      loginButton.click();
    }
  });

  // Focus on email field when page loads
  if (emailInput) {
    emailInput.focus();
  }
});
