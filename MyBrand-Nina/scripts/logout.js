


  const user = localStorage.getItem("token");



if (!localStorage.getItem("token")) {
  alert("Login first");
  window.location.href = "login.html";
}

function logout() {
  localStorage.removeItem("token");
  localStorage.removeItem("role");
  localStorage.removeItem("userId");
}

const userRole = localStorage.getItem("role");
if (userRole == "user") {
  alert("You are normal user");
  window.location.href = "../index.html";
}










