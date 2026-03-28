const form = document.getElementById("signupForm");

// Initialize country select (jQuery plugin)
const $countryInput = $("#country");
$countryInput.countrySelect({ defaultCountry: "ng" });

// Validation Rules Map
const validationRules = {
  fullname: (val) => {
    if (!val) return "Full name is required";
    if (val.length < 3) return "Name must be at least 3 characters";
    return null;
  },
  email: (val) => {
    const pattern = /^[^ ]+@[^ ]+\.[a-z]{2,}$/i;
    if (!val) return "Email is required";
    if (!pattern.test(val)) return "Enter a valid email";
    return null;
  },
  country: (val) => (!val ? "Please select a country" : null),
  password: (val) => {
    const pattern = /^(?=.*[A-Z])(?=.*\d).{6,}$/;
    if (!val) return "Password is required";
    if (!pattern.test(val)) return "Must be 6+ chars, 1 uppercase, 1 number";
    return null;
  },
  confirmPassword: (val, allValues) => {
    if (!val) return "Confirm your password";
    if (val !== allValues.password) return "Passwords do not match";
    return null;
  },
  terms: (val, allValues, isChecked) =>
    (!isChecked ? "You must agree to continue" : null)
};

// Show / Hide error
const toggleError = (fieldId, message) => {
  const errorElement = document.getElementById(`${fieldId}Error`);
  const inputElement = document.getElementById(fieldId);

  if (errorElement) errorElement.textContent = message || "";

  if (inputElement) {
    inputElement.classList.toggle("is-invalid", !!message);
    inputElement.setAttribute("aria-invalid", !!message);
  }
};

// Validate form
const validateForm = () => {
  let isValid = true;

  const formData = new FormData(form);
  const values = Object.fromEntries(formData.entries());

  for (const field in validationRules) {
    const input = document.getElementById(field);

    const value =
      field === "terms"
        ? input.checked
        : (input.value || "").trim();

    const errorMessage = validationRules[field](
      value,
      values,
      input?.checked
    );

    if (errorMessage) {
      toggleError(field, errorMessage);
      isValid = false;
    } else {
      toggleError(field, null);
    }
  }

  return isValid;
};

// Spinner control
function showSpinner() {
  document.getElementById("overlay").style.display = "flex";
}

function hideSpinner() {
  document.getElementById("overlay").style.display = "none";
}

// Submit event
form.addEventListener("submit", (e) => {
  e.preventDefault();

  if (validateForm()) {
    // ✅ SHOW SPINNER ONLY WHEN VALID
    showSpinner();

    setTimeout(() => {
      hideSpinner();

      console.log("Form Data:", Object.fromEntries(new FormData(form)));
      alert("🚀 Signup successful!");

      form.reset();
    }, 2500);
  }
});

// Real-time validation
form.querySelectorAll("input").forEach(input => {
  input.addEventListener("blur", validateForm);
});

// ===============================
// 👁️ SHOW / HIDE PASSWORD
// ===============================
const passwordInput = document.getElementById("password");
const togglePassword = document.getElementById("togglePassword");

togglePassword.addEventListener("click", () => {
  if (passwordInput.type === "password") {
    passwordInput.type = "text";
    togglePassword.textContent = "🙈";
  } else {
    passwordInput.type = "password";
    togglePassword.textContent = "👁️";
  }
});

// ===============================
// 💪 PASSWORD STRENGTH
// ===============================
const strengthText = document.getElementById("strengthText");
const strengthFill = document.getElementById("strengthFill");

passwordInput.addEventListener("input", () => {
  const value = passwordInput.value;

  let strength = 0;

  if (value.length >= 6) strength++;
  if (/[A-Z]/.test(value)) strength++;
  if (/[0-9]/.test(value)) strength++;
  if (/[^A-Za-z0-9]/.test(value)) strength++;

  switch (strength) {
    case 0:
      strengthText.textContent = "";
      strengthFill.style.width = "0%";
      break;

    case 1:
      strengthText.textContent = "Weak";
      strengthFill.style.width = "25%";
      strengthFill.style.background = "red";
      break;

    case 2:
      strengthText.textContent = "Medium";
      strengthFill.style.width = "50%";
      strengthFill.style.background = "orange";
      break;

    case 3:
      strengthText.textContent = "Strong";
      strengthFill.style.width = "75%";
      strengthFill.style.background = "blue";
      break;

    case 4:
      strengthText.textContent = "Very Strong";
      strengthFill.style.width = "100%";
      strengthFill.style.background = "green";
      break;
  }
});