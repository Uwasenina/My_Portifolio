// Email validation function
function validateEmail(email) {
  var re = /\S+@\S+\.\S+/;
  return re.test(email);
}

function resetSignUp() {
  document.getElementById("email").value = "";
  document.getElementById("name").value = "";
  document.getElementById("pass").value = "";
  document.getElementById("cpass").value = "";
}

async function signup() {
  var email = document.getElementById("email").value;
  var name = document.getElementById("name").value;
  var pass = document.getElementById("pass").value;
  var cpass = document.getElementById("cpass").value;
  var male = document.getElementById("male").checked ? "M" : "";
  var female = document.getElementById("female").checked ? "F" : "";
  var role = "user";

  if (email.trim() === "") {
    document.getElementById("sms-e").innerHTML = "Please enter your email";
    return;
  }

  if (!validateEmail(email)) {
    document.getElementById("sms-e").innerHTML = "Invalid email address";
    return;
  } else {
    document.getElementById("sms-e").innerHTML = "";
  }

  if (name.length < 1) {
    document.getElementById("sms-n").innerHTML = "Username is required";
    return;
  } else {
    document.getElementById("sms-n").innerHTML = "";
  }

  if (pass.length < 4) {
    document.getElementById("sms-p").innerHTML =
      "Please enter Password and must be at least 4 characters";
    return;
  }

  if (!/[A-Z]/.test(pass)) {
    document.getElementById("sms-p").innerHTML =
      "Password must contain at least one capital letter";
    return;
  }

  if (cpass === "") {
    document.getElementById("sms-p").innerHTML = "Please repeat password";
  } else {
    document.getElementById("sms-p").innerHTML = "";
  }

  if (pass !== cpass) {
    document.getElementById("sms-conf-p").innerHTML = "Passwords do not match";
    return;
  } else {
    document.getElementById("sms-conf-p").innerHTML = "";
  }

  if (!male && !female) {
    document.getElementById("sms-gender").innerHTML =
      "Please select your gender";
    return;
  } else {
    document.getElementById("sms-gender").innerHTML = "";
  }

  // console.log(name, email, pass, female ,male);

   try {
      const apiUrl = "http://localhost:4000/brand/user/post";
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          username: name,
          password: pass,
          gender: male || female,
          role: role,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      // Registration successful
      document.getElementById("reg-success").textContent =
        "Signup successful! Redirecting to login page...";
      setTimeout(function () {
        window.location.href = "../pages/login.html";
      }, 2000);
    } catch (error) {
      console.error("Error during signup:", error);
      // Handle the error if needed
    }

  document.getElementById("reg-success").textContent = "Signup successful!";

  resetSignUp();
}
