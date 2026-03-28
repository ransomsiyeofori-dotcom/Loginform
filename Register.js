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
  terms: (val, allValues, isChecked) => (!isChecked ? "You must agree to continue" : null)
};

// Helper: Show/Hide Errors
const toggleError = (fieldId, message) => {
  const errorElement = document.getElementById(`${fieldId}Error`);
  const inputElement = document.getElementById(fieldId);
  
  if (errorElement) errorElement.textContent = message || "";
  if (inputElement) {
    inputElement.classList.toggle("is-invalid", !!message);
    // Accessibility: Screen readers will announce the error
    inputElement.setAttribute("aria-invalid", !!message);
  }
};

// Main Validation Logic
const validateForm = () => {
  let isValid = true;
  const formData = new FormData(form);
  const values = Object.fromEntries(formData.entries());

  for (const field in validationRules) {
    const input = document.getElementById(field);
    const value = field === 'terms' ? input.checked : input.value.trim();
    const errorMessage = validationRules[field](value, values, input.checked);

    if (errorMessage) {
      toggleError(field, errorMessage);
      isValid = false;
    } else {
      toggleError(field, null);
    }
  }
  return isValid;
};

// Event Listeners
form.addEventListener("submit", (e) => {
  e.preventDefault();
  
  if (validateForm()) {
    console.log("Form Data:", Object.fromEntries(new FormData(form)));
    alert("🚀 Signup successful!");
    form.reset();
  }
});

// Real-time validation (Optional but recommended)
form.querySelectorAll("input").forEach(input => {
  input.addEventListener("blur", () => validateForm()); 
});

