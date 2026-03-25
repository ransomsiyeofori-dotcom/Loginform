const email = document.getElementById("email");
const password = document.getElementById("password");
const loginBtn = document.getElementById("loginBtn");

const emailError = document.getElementById("emailError");
const passwordError = document.getElementById("passwordError");

function validateEmail(value) {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(value);
}

// 🔥 Check if form is valid
function checkFormValidity() {
  const isEmailValid = validateEmail(email.value);
  const isPasswordValid = password.value.length >= 6;

  // Enable or disable button
  loginBtn.disabled = !(isEmailValid && isPasswordValid);
}

// Email input
email.addEventListener("input", () => {
  if (!validateEmail(email.value)) {
    email.classList.add("invalid");
    email.classList.remove("valid");
    emailError.textContent = "Enter a valid email";
  } else {
    email.classList.add("valid");
    email.classList.remove("invalid");
    emailError.textContent = "";
  }

  checkFormValidity(); // 🔥 important
});

// Password input
password.addEventListener("input", () => {
  if (password.value.length < 6) {
    password.classList.add("invalid");
    password.classList.remove("valid");
    passwordError.textContent = "Minimum 6 characters";
  } else {
    password.classList.add("valid");
    password.classList.remove("invalid");
    passwordError.textContent = "";
  }

  checkFormValidity(); // 🔥 important
});

const form = document.getElementById("loginForm");
const spinner = document.getElementById("spinner");
const btnText = document.getElementById("btnText");

form.addEventListener("submit", (e) => {
  e.preventDefault();

  // 🔥 Show spinner
  spinner.style.display = "inline-block";
  btnText.style.display = "none";
  loginBtn.disabled = true;

  // ⏳ Simulate server request (2 seconds)
  setTimeout(() => {
    spinner.style.display = "none";
    btnText.style.display = "inline";
    loginBtn.disabled = false;

    alert("Login successful!");
  }, 2000);
});
// validation //
form.addEventListener("submit", function(e) {
    e.preventDefault(); // stop default form submit

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    // simple validation
    if (email === "" || password === "") {
      alert("Please fill all fields");
      return;
    }

    // redirect to dashboard
    window.location.href = "Dashboardtrade.html";
  });