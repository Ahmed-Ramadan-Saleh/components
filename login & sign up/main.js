// DOM Elements - Initialize after DOM is ready
document.addEventListener("DOMContentLoaded", function () {
  // Tab switching
  const tabBtns = document.querySelectorAll(".tab-btn");
  const tabSlider = document.querySelector(".tab-slider");
  const loginForm = document.getElementById("loginForm");
  const signupForm = document.getElementById("signupForm");

  tabBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      const tab = btn.dataset.tab;

      // Update active states
      tabBtns.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");

      // Move slider
      if (tab === "signup") {
        tabSlider.classList.add("right");
      } else {
        tabSlider.classList.remove("right");
      }

      // Switch forms
      if (tab === "login") {
        loginForm.classList.remove("hidden");
        loginForm.classList.add("visible");
        signupForm.classList.add("hidden");
        signupForm.classList.remove("visible");
      } else {
        signupForm.classList.remove("hidden");
        signupForm.classList.add("visible");
        loginForm.classList.add("hidden");
        loginForm.classList.remove("visible");
      }
    });
  });

  // Password visibility toggle
  const passwordToggles = document.querySelectorAll(".password-toggle");

  passwordToggles.forEach((toggle) => {
    toggle.addEventListener("click", () => {
      const input = toggle.parentElement.querySelector(".input-field");
      const eyeOpen = toggle.querySelector(".eye-open");
      const eyeClosed = toggle.querySelector(".eye-closed");

      if (input.type === "password") {
        input.type = "text";
        eyeOpen.style.display = "none";
        eyeClosed.style.display = "block";
      } else {
        input.type = "password";
        eyeOpen.style.display = "block";
        eyeClosed.style.display = "none";
      }
    });
  });

  // Password strength checker
  const signupPassword = document.getElementById("signupPassword");
  const strengthFill = document.getElementById("strengthFill");
  const strengthText = document.getElementById("strengthText");

  if (signupPassword) {
    signupPassword.addEventListener("input", (e) => {
      const password = e.target.value;
      const strength = checkPasswordStrength(password);

      strengthFill.className = "strength-fill " + strength.class;
      strengthText.textContent = strength.text;
    });
  }

  function checkPasswordStrength(password) {
    let score = 0;

    if (password.length >= 8) score++;
    if (password.length >= 12) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/[0-9]/.test(password)) score++;
    if (/[^A-Za-z0-9]/.test(password)) score++;

    if (password.length === 0) {
      return { class: "", text: "Enter a password" };
    } else if (score <= 2) {
      return { class: "weak", text: "Weak password" };
    } else if (score <= 4) {
      return { class: "medium", text: "Medium strength" };
    } else {
      return { class: "strong", text: "Strong password" };
    }
  }

  // Form validation
  function validateEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  function showError(input) {
    const group = input.closest(".input-group");
    if (group) {
      group.classList.add("has-error");
      input.classList.add("error");
      input.classList.remove("success");
    }
  }

  function showSuccess(input) {
    const group = input.closest(".input-group");
    if (group) {
      group.classList.remove("has-error");
      input.classList.remove("error");
      input.classList.add("success");
    }
  }

  function clearValidation(input) {
    const group = input.closest(".input-group");
    if (group) {
      group.classList.remove("has-error");
      input.classList.remove("error", "success");
    }
  }

  // Real-time validation
  const allInputs = document.querySelectorAll(".input-field");

  allInputs.forEach((input) => {
    input.addEventListener("blur", () => {
      validateInput(input);
    });

    input.addEventListener("input", () => {
      clearValidation(input);
    });
  });

  function validateInput(input) {
    const type = input.type;
    const value = input.value.trim();

    if (input.required && !value) {
      showError(input);
      return false;
    }

    if (type === "email" && value && !validateEmail(value)) {
      showError(input);
      return false;
    }

    if (input.id === "signupPassword" && value && value.length < 8) {
      showError(input);
      return false;
    }

    if (input.id === "confirmPassword") {
      const password = document.getElementById("signupPassword");
      if (password && value !== password.value) {
        showError(input);
        return false;
      }
    }

    if (value) {
      showSuccess(input);
    }
    return true;
  }

  // Form submission
  const successOverlay = document.getElementById("successOverlay");
  const successTitle = document.getElementById("successTitle");
  const successText = document.getElementById("successText");

  if (loginForm) {
    loginForm.addEventListener("submit", async (e) => {
      e.preventDefault();

      const email = document.getElementById("loginEmail");
      const password = document.getElementById("loginPassword");
      let isValid = true;

      if (email) {
        if (!validateInput(email)) isValid = false;
      }
      if (password) {
        if (!validateInput(password)) isValid = false;
      }

      if (!isValid) return;

      const submitBtn = loginForm.querySelector(".submit-btn");
      if (submitBtn) {
        submitBtn.classList.add("loading");
      }

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000));

      if (submitBtn) {
        submitBtn.classList.remove("loading");
      }

      // Show success
      if (successTitle) successTitle.textContent = "Welcome Back";
      if (successText)
        successText.textContent = "Redirecting you to dashboard...";
      if (successOverlay) successOverlay.classList.add("show");
    });
  }

  if (signupForm) {
    signupForm.addEventListener("submit", async (e) => {
      e.preventDefault();

      const name = document.getElementById("signupName");
      const email = document.getElementById("signupEmail");
      const password = document.getElementById("signupPassword");
      const confirmPassword = document.getElementById("confirmPassword");
      const agreeTerms = document.getElementById("agreeTerms");

      let isValid = true;

      if (name) {
        if (!validateInput(name)) isValid = false;
      }
      if (email) {
        if (!validateInput(email)) isValid = false;
      }
      if (password) {
        if (!validateInput(password)) isValid = false;
      }
      if (confirmPassword) {
        if (!validateInput(confirmPassword)) isValid = false;
      }
      if (agreeTerms && !agreeTerms.checked) {
        isValid = false;
        const group = agreeTerms.closest(".checkbox-group");
        if (group) {
          group.style.animation = "shake 0.4s ease";
          setTimeout(() => {
            group.style.animation = "";
          }, 400);
        }
      }

      if (!isValid) return;

      const submitBtn = signupForm.querySelector(".submit-btn");
      if (submitBtn) {
        submitBtn.classList.add("loading");
      }

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000));

      if (submitBtn) {
        submitBtn.classList.remove("loading");
      }

      // Show success
      if (successTitle) successTitle.textContent = "Account Created";
      if (successText)
        successText.textContent = "Please check your email to verify...";
      if (successOverlay) successOverlay.classList.add("show");
    });
  }

  // Forgot password link
  const forgotPassword = document.getElementById("forgotPassword");
  if (forgotPassword) {
    forgotPassword.addEventListener("click", (e) => {
      e.preventDefault();
      alert("Password reset link has been sent to your email!");
    });
  }
});
