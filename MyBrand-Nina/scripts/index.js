

function validateEmail(email) {
  var emailRegex = /^\S+@\S+\.\S+$/;
  return emailRegex.test(email);
}

function resetForm() {
  document.getElementById("name").value = "";
  document.getElementById("email").value = "";
  document.getElementById("message").value = "";
}
async function sendMessage() {
  var name = document.getElementById("name").value;
  var email = document.getElementById("email").value;
  var message = document.getElementById("message").value;
  
  if (name.trim() === "") {
    document.getElementById("name-p").innerHTML = "Please enter your name";
    return false;
  } else {
    document.getElementById("name-p").innerHTML = " ";
  }

  if (email.trim() === "") {
    document.getElementById("email-p").innerHTML = "Please enter your Email";
    return false;
  } else {
    document.getElementById("email-p").innerHTML = " ";
  }

  if (!validateEmail(email)) {
    document.getElementById("email-val-p").innerHTML = "Invalid email format";
    return false;
  } else {
    document.getElementById("email-val-p").innerHTML = " ";
  }

  if (message.trim() === "") {
    document.getElementById("message-p").innerHTML = "Write comment";
    return false;
  } else {
    document.getElementById("message-p").innerHTML = " ";
  }



  try {
        const apiUrl = "https://brand-backend-v2xk.onrender.com/brand/contact/post";
        const response = await fetch(apiUrl, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: name,
            email: email,
            message: message,
          }),
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

     alert("Message sent successfully!");
     resetForm();
    } catch (error) {
        console.error("Error adding comment:", error);
    }

}


