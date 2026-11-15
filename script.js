document.addEventListener("DOMContentLoaded", () => {
    const subscriptionButton = document.querySelector("[data-subscription-target]");
    const contactButton = document.querySelector("[data-contact-target]");
    const subscriptionPopup = document.querySelector("#subscription");
    const contactPopup = document.querySelector("#contact");
    const overlay = document.querySelector("#popup-overlay");
    const closeButtons = document.querySelectorAll("[data-close-button]");
    function openPopup(popup) {
        if (!popup || !overlay) return;
        popup.classList.add("active");
        overlay.classList.add("active");
    }
    function closePopups() {
        subscriptionPopup?.classList.remove("active");
        contactPopup?.classList.remove("active");
        overlay?.classList.remove("active");
    }
    subscriptionButton?.addEventListener("click", () => {
        openPopup(subscriptionPopup);
    });
    contactButton?.addEventListener("click", () => {
        openPopup(contactPopup);
    });
    closeButtons.forEach(button => {
        button.addEventListener("click", closePopups);
    });
    document.addEventListener('keydown', (event) => {
        if(event.key === 'Escape') {
            closePopups();
        }
    });
    overlay?.addEventListener("click", closePopups);
});

const dateTime = document.getElementById("current-date-time");

if (dateTime) {
    dateTime.textContent = new Date().toLocaleString();
    setInterval(function () {
        dateTime.textContent = new Date().toLocaleString();
    }, 1000);
}

// Greeting message by time using switch case
const greetingText = document.getElementById("greeting-text");

if (greetingText) {
    const currentHour = new Date().getHours();
    let greetingMessage = "";

    switch (true) {
        case (currentHour >= 6 && currentHour < 12):
            greetingMessage = "Good morning! Welcome to Bloom Room Cafe";
            break;
        case (currentHour >= 12 && currentHour < 18):
            greetingMessage = "Good day! Welcome to Bloom Room Cafe";
            break;
        case (currentHour >= 18 && currentHour < 24):
            greetingMessage = "Good evening! Welcome to Bloom Room Cafe";
            break;
        default:
            greetingMessage = "Good night! Welcome to Bloom Room Cafe";
            break;
    }

    greetingText.textContent = greetingMessage;
}

const faqQuestion1 = document.getElementById("faq-question-1");
const faqAnswer1 = document.getElementById("faq-answer-1");
const faqQuestion2 = document.getElementById("faq-question-2");
const faqAnswer2 = document.getElementById("faq-answer-2");
const faqQuestion3 = document.getElementById("faq-question-3");
const faqAnswer3 = document.getElementById("faq-answer-3");
let faq1Open = false;
let faq2Open = false;
let faq3Open = false;

if (faqQuestion1) {
    faqQuestion1.addEventListener("click", function () {
        if (faq1Open === true) {
            faqAnswer1.classList.remove("show");
            faq1Open = false;
        } else {
            faqAnswer1.classList.add("show");
            faq1Open = true;
        }
    });
}

if (faqQuestion2) {
    faqQuestion2.addEventListener("click", function () {
        if (faq2Open === true) {
            faqAnswer2.classList.remove("show");
            faq2Open = false;
        } else {
            faqAnswer2.classList.add("show");
            faq2Open = true;
        }
    });
}

if (faqQuestion3) {
    faqQuestion3.addEventListener("click", function () {
        if (faq3Open === true) {
            faqAnswer3.classList.remove("show");
            faq3Open = false;
        } else {
            faqAnswer3.classList.add("show");
            faq3Open = true;
        }
    });
}


// Helper: Show site notification toast
function showNotification(message) {
    const $notif = $("#site-notification");
    if ($notif.length) {
        $notif.text(message).stop(true, true).fadeIn(300).delay(3000).fadeOut(300);
    }
}

// Helper: Submit form with loading spinner
function submitWithSpinner(formElement, notificationMessage, callback) {
    const $form = $(formElement);
    const $submitBtn = $form.find("button[type='submit']");
    if (!$submitBtn.length) return;

    const originalBtnText = $submitBtn.text();
    $form.data("submitting", true);
    $submitBtn.prop("disabled", true).html(
        '<span class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>Please wait...'
    );

    setTimeout(function () {
        $submitBtn.prop("disabled", false).text(originalBtnText);
        $form.data("submitting", false);

        if (notificationMessage) {
            showNotification(notificationMessage);
        }

        if (typeof callback === "function") {
            callback();
        }
    }, 1500);
}

const form = document.getElementById("contact-form");

if (form) {
    const bookingStep1 = document.getElementById("booking-step-1");
    const bookingStep2 = document.getElementById("booking-step-2");
    const bookingNext = document.getElementById("booking-next");
    const bookingBack = document.getElementById("booking-back");
    const nameInput = document.getElementById("booking-name");
    const emailInput = document.getElementById("booking-email");
    const nameError = document.getElementById("booking-name-error");
    const emailError = document.getElementById("booking-email-error");
    const formStatus = document.getElementById("booking-form-status");
    let currentBookingStep = 1;
    const bookingTime = document.getElementById("time");
    const bookingTimeInfo = document.getElementById("booking-time-info");
    const bookingSuccessSound = new Audio("sounds/success.mp3");

    function updateBookingTimeInfo() {
        switch (bookingTime.value) {
            case "morning":
                bookingTimeInfo.textContent = "Breakfast is served from 08:00 to 11:00.";
                break;
            case "afternoon":
                bookingTimeInfo.textContent = "Lunch is served from 12:00 to 16:00.";
                break;
            case "evening":
                bookingTimeInfo.textContent = "Dinner is served from 17:00 to 21:00.";
                break;
        }
    }
    bookingTime.addEventListener("change", updateBookingTimeInfo);
    updateBookingTimeInfo();

    // Auto-fill booking form with current logged-in user profile details
    function autofillBookingForm() {
        if (localStorage.getItem("isLoggedIn") === "true") {
            const currentUsername = localStorage.getItem("currentUser");
            if (currentUsername) {
                let profileData = null;
                try {
                    profileData = JSON.parse(localStorage.getItem("user_" + currentUsername.toLowerCase()));
                } catch (e) {}

                const autoName = profileData && profileData.fullName ? profileData.fullName : currentUsername;
                const autoEmail = profileData && profileData.email ? profileData.email : "";

                if (nameInput) nameInput.value = autoName;
                if (emailInput) emailInput.value = autoEmail;

                if (!$("#booking-auto-notice").length) {
                    const noticeHtml = `
                        <div id="booking-auto-notice" class="alert alert-success py-2 px-3 small d-flex align-items-center justify-content-between mb-3 rounded-3">
                            <span>🌸 Booking as: <strong>${autoName}</strong></span>
                            <span class="badge bg-success-subtle text-success border border-success-subtle">Auto-filled</span>
                        </div>
                    `;
                    $("#booking-step-1").prepend(noticeHtml);
                }
            }
        }
    }
    autofillBookingForm();

    function validateBookingStep1() {
        nameError.textContent = "";
        emailError.textContent = "";
        formStatus.textContent = "";

        let isValid = true;
        const nameValue = nameInput.value.trim();
        const emailValue = emailInput.value.trim();

        if (nameValue === "") {
            nameError.textContent = "Name is required.";
            isValid = false;
        } else if (!/^\p{L}+(?:[ -]\p{L}+)*$/u.test(nameValue)) {
            nameError.textContent = "Use letters, spaces or hyphens only.";
            isValid = false;
        } else if(nameValue.length < 3) {
            nameError.textContent = "Name should contain at least 3 letters";
            isValid = false;
        }

        if (emailValue === "") {
            emailError.textContent = "Email is required.";
            isValid = false;
        } else if (!/^[^\s@]+@[^\s@]+\.[a-zA-Z]{2,}$/.test(emailValue)) {
            emailError.textContent = "Please enter a valid email.";
            isValid = false;
        }
        return isValid;
    };

    bookingNext.addEventListener("click", function() {
        if(validateBookingStep1()) {
            bookingStep1.style.display = "none";
            bookingStep2.style.display = "block";
            currentBookingStep = 2;
        }
    });

    bookingBack.addEventListener("click", function() {
        bookingStep1.style.display = "block";
        bookingStep2.style.display = "none";
        currentBookingStep = 1;
    });

    // Form navigation using arrow keys (keydown)
    form.addEventListener("keydown", function (event) {
        const formFields = Array.from(form.elements).filter(function (element) {
            return element.type !== "hidden" && element.offsetParent !== null;
        });
        const currentFieldIndex = formFields.indexOf(document.activeElement);

        if (event.key === "ArrowDown") {
            event.preventDefault();
            if (currentFieldIndex < formFields.length - 1) {
                formFields[currentFieldIndex + 1].focus();
            }
        } else if (event.key === "ArrowUp") {
            event.preventDefault();
            if (currentFieldIndex > 0) {
                formFields[currentFieldIndex - 1].focus();
            }
        } else if (event.key === "ArrowRight") {
            if (currentBookingStep === 1) {
                bookingNext.click();
            }
        } else if (event.key === "ArrowLeft") {
            if (currentBookingStep === 2) {
                bookingBack.click();
            }
        }
    });

    form.addEventListener("submit", function (event) {
        event.preventDefault();
        if ($(form).data("submitting")) return;
        if (currentBookingStep === 1) {
            bookingNext.click();
            return;
        }
        const isValid = validateBookingStep1();
        if (isValid) {
            submitWithSpinner(form, "Table reservation request sent successfully!", function () {
                bookingSuccessSound.currentTime = 0;
                bookingSuccessSound.play().catch(function () {});
            });
        } else {
            formStatus.textContent = "Please correct the errors above.";
        }
    });

    form.addEventListener("reset", function () {
        bookingStep1.style.display = "block";
        bookingStep2.style.display = "none";
        currentBookingStep = 1;
        nameError.textContent = "";
        emailError.textContent = "";
        formStatus.textContent = "";
        setTimeout(function () {
            updateBookingTimeInfo();
            autofillBookingForm();
        }, 0);
    });
}
//pop-up subscription form
const subscriptionForm = document.getElementById("subscription-form");

if (subscriptionForm) {
    const subscriptionName = document.getElementById("subscription-name");
    const subscriptionEmail = document.getElementById("subscription-email");

    // Auto-fill subscription form with current user details if logged in
    function autofillSubscriptionForm() {
        if (localStorage.getItem("isLoggedIn") === "true") {
            const currentUsername = localStorage.getItem("currentUser");
            if (currentUsername) {
                let profileData = null;
                try {
                    profileData = JSON.parse(localStorage.getItem("user_" + currentUsername.toLowerCase()));
                } catch (e) {}

                if (subscriptionName && !subscriptionName.value) {
                    subscriptionName.value = profileData && profileData.fullName ? profileData.fullName : currentUsername;
                }
                if (subscriptionEmail && !subscriptionEmail.value) {
                    subscriptionEmail.value = profileData && profileData.email ? profileData.email : "";
                }
            }
        }
    }
    autofillSubscriptionForm();
    const subscriptionPassword = document.getElementById("subscription-password");
    const confirmPassword = document.getElementById("subscription-confirm-password");
    const subscriptionNameError = document.getElementById("subscription-name-error");
    const subscriptionEmailError = document.getElementById("subscription-email-error");
    const passwordError = document.getElementById("subscription-password-error");
    const confirmPasswordError = document.getElementById("subscription-confirm-password-error");
    const subscriptionStatus = document.getElementById("subscription-form-status");

    subscriptionForm.addEventListener("submit", function (event) {
        event.preventDefault();
        if ($(subscriptionForm).data("submitting")) return;

        subscriptionNameError.textContent = "";
        subscriptionEmailError.textContent = "";
        passwordError.textContent = "";
        confirmPasswordError.textContent = "";
        subscriptionStatus.textContent = "";

        let isValid = true;
        const nameValue = subscriptionName.value.trim();
        const emailValue = subscriptionEmail.value.trim();

        if (nameValue === "") {
            subscriptionNameError.textContent = "Name is required.";
            isValid = false;
        } else if (!/^\p{L}+(?:[ -]\p{L}+)*$/u.test(nameValue)) {
            subscriptionNameError.textContent = "Use letters, spaces or hyphens only.";
            isValid = false;
        } else if(nameValue.length < 3) {
            subscriptionNameError.textContent = "Name should contain at least 3 letters";
            isValid = false;
        }

        if (emailValue === "") {
            subscriptionEmailError.textContent = "Email is required.";
            isValid = false;
        } else if (!/^[^\s@]+@[^\s@]+\.[a-zA-Z]{2,}$/.test(emailValue)) {
            subscriptionEmailError.textContent = "Please enter a valid email.";
            isValid = false;
        }
        if (subscriptionPassword.value.length < 6) {
            passwordError.textContent = "Password must contain at least 6 characters.";
            isValid = false;
        }

        if (subscriptionPassword.value !== confirmPassword.value) {
            confirmPasswordError.textContent = "Passwords do not match.";
            isValid = false;
        }

        if (isValid) {
            submitWithSpinner(subscriptionForm, "Subscribed successfully! Welcome to Bloom Room Cafe.");
        } else {
            subscriptionStatus.textContent = "Please correct the errors above.";
        }
    });
}
//background color changer
const btnColorChanger = document.getElementById("changeBg");

if (btnColorChanger) {
    btnColorChanger.addEventListener("click", () => {
        document.body.style.backgroundColor = generateColor();
    });
}

function generateColor() {
    const color = ["#fae8e8", "#faf3e8", "#f9fae8", "#ecfae8", "#e8faed", "#e8faf8", "#e8f0fa", "#f2e8fa", "#fae8f3", "#d8708a", "#d8b270", "#d8cd70", "#a6d870", "#70d88f", "#70d8c5", "#709fd8", "#9270d8", "#d870be", "#7ea1a0", "#a17e7e", "#a1947e", "#a1a17e", "#8aa17e", "#7e85a1", "#947ea1", "#a17e99"];
    const randomColor = color[Math.floor(Math.random() * color.length)];
    return randomColor;
};
// Criterion 3: Light and Dark Modes with localStorage persistence
function applyTheme(theme) {
    const themeBtn = document.getElementById("theme-btn");
    if (theme === "dark") {
        document.documentElement.setAttribute("data-bs-theme", "dark");
        document.body.classList.add("dark-mode");
        if (themeBtn) themeBtn.textContent = "☀️ Light Mode";
    } else {
        document.documentElement.setAttribute("data-bs-theme", "light");
        document.body.classList.remove("dark-mode");
        if (themeBtn) themeBtn.textContent = "🌙 Dark Mode";
    }
}

// Read saved theme from localStorage on load
const savedTheme = localStorage.getItem("theme") || "light";
applyTheme(savedTheme);

const themeBtn = document.getElementById("theme-btn");
if (themeBtn) {
    themeBtn.addEventListener("click", function () {
        const currentTheme = document.documentElement.getAttribute("data-bs-theme");
        const newTheme = currentTheme === "dark" ? "light" : "dark";
        localStorage.setItem("theme", newTheme);
        document.body.style.backgroundColor = ""; // Reset custom background color if changed
        applyTheme(newTheme);
    });
}
    
//star rating system
let stars = document.getElementsByClassName("star");
let output = document.getElementById("output");
function gfg(n) {
    remove();
    for (let i = 0; i < n; i++) {
        let cls = "";
        if (n == 1) cls = "one";
        else if (n == 2) cls = "two";
        else if (n == 3) cls = "three";
        else if (n == 4) cls = "four";
        else if (n == 5) cls = "five";
        stars[i].className = "star " + cls;
    }
    output.innerText = "Rating is: " + n + "/5";
}
function remove() {
    let i = 0;
    while (i < 5) {
        stars[i].className = "star";
        i++;
    }
}



$(document).ready(function() {
    console.log("jQuery is ready!");

        // Task 1 & Task 3
    $("#menu-search").on("keyup", function() {
        var searchText = $(this).val().trim();
        var lowerSearch = searchText.toLowerCase();

        $("section[aria-label*='Full'] li").each(function() {
            $(this).html($(this).text());
        });

        if (lowerSearch === "") {
            $("#menu-highlights").show();
            $("section[aria-label*='Full'] .col-md-6").show();
            $("section[aria-label*='Full'] li").show();
        } else {
            $("section[aria-label*='Full'] li").each(function() {
                var dishText = $(this).text();
                var isMatch = dishText.toLowerCase().indexOf(lowerSearch) > -1;

                if (isMatch) {
                    $(this).show();
                    var originalText = $(this).text();
                    var regex = new RegExp("(" + searchText + ")", "gi");
                    var highlighted = originalText.replace(regex, "<mark>$1</mark>");
                    $(this).html(highlighted);
                } else {
                    $(this).hide();
                }
            });

            $("section[aria-label*='Full'] .col-md-6").each(function() {
                var visibleItems = $(this).find("li:visible").length;
                if (visibleItems > 0) {
                    $(this).show();
                } else {
                    $(this).hide();
                }
            });
        }
    });

    // Task 2
    $("#menu-search").on("keyup", function() {
        var query = $(this).val().toLowerCase().trim();
        var suggestionsBox = $("#search-suggestions");
        
        suggestionsBox.empty().hide();

        if (query.length > 0) {
            $("section[aria-label*='Full'] li").each(function() {
                var dish = $(this).text();
                
                if (dish.toLowerCase().indexOf(query) > -1) {
                    var regex = new RegExp("(" + query + ")", "gi");
                    var highlightedDish = dish.replace(regex, "<mark>$1</mark>");
                    
                    suggestionsBox.append('<li class="list-group-item list-group-item-action" style="cursor: pointer;">' + highlightedDish + '</li>');
                }
            });
            
            if (suggestionsBox.children().length > 0) {
                suggestionsBox.show();
            }
        }
    });

    $(document).on("click", "#search-suggestions li", function() {
        var chosenDish = $(this).text().trim(); 
        
        $("#menu-search").val(chosenDish);
        $("#search-suggestions").hide();
        $("#menu-search").trigger("keyup");
        $("#menu-search").blur();
    });

    $(document).on("click", function(e) {
        if (!$(e.target).closest(".search-section").length) {
            $("#search-suggestions").hide();
        }
    });

    // Task 4
    $(window).on("scroll", function() {
        var pixels = $(window).scrollTop();
        var pageHeight = $(document).height() - $(window).height();
        var progress = 100 * pixels / pageHeight;
        
        $("div.progress").css("width", progress + "%");
    });

    // Task 5
    $(".count").each(function() {
        var $this = $(this);
        $({ Counter: 0 }).animate({ Counter: $this.text() }, {
            duration: 4000,
            step: function() {
                $this.text(Math.ceil(this.Counter));
            }
        });
    });

        // Task 6 & Task 7 (Handled via submitWithSpinner and form validation)

    // Task 8
    $(".copy-contact").on("click", function() {
        var $button = $(this);
        var text = $button.attr("data-copy");
        var $tooltip = $button.siblings(".copy-tooltip");
        var originalText = $button.text();

        if (navigator.clipboard) {
            navigator.clipboard.writeText(text);
        } else {
            var $temp = $("<textarea>").val(text).appendTo("body");
            $temp[0].select();
            document.execCommand("copy");
            $temp.remove();
        }

        $button.text("✔ Copied!");
        $tooltip.text("Copied to clipboard!").fadeIn(150);

        setTimeout(function() {
            $button.text(originalText);
            $tooltip.fadeOut(150);
        }, 2500);
    });

    // Task 9
    function loadVisibleImages() {
        var viewTop = $(window).scrollTop();
        var viewBottom = viewTop + $(window).height();

        $("img[data-src]").each(function() {
            var $image = $(this);
            
            if (!$image.is(":visible")) return;
            
            var imageTop = $image.offset().top;
            var imageBottom = imageTop + $image.outerHeight();

            if (imageTop < viewBottom && imageBottom > viewTop) {
                $image.attr("src", $image.attr("data-src"));
                $image.removeAttr("data-src");
            }
        });
    }

    $(window).on("scroll resize", loadVisibleImages);
    loadVisibleImages();

});
// ==========================================
// Criterion 5.1 & 5.2: Authentication Simulation & Form Validation
// ==========================================

// ------------------------------------------
// Registration Form
// ------------------------------------------
const registerForm = document.getElementById("registerForm");

if (registerForm) {
    registerForm.addEventListener("submit", function (e) {
        e.preventDefault();

        // Inputs
        const nameInput = document.getElementById("registerName");
        const emailInput = document.getElementById("registerEmail");
        const phoneInput = document.getElementById("registerPhone");
        const userInput = document.getElementById("registerUser");
        const passwordInput = document.getElementById("registerPassword");
        const confirmPasswordInput = document.getElementById("registerConfirmPassword");

        // Error message containers
        const nameError = document.getElementById("registerNameError");
        const emailError = document.getElementById("registerEmailError");
        const phoneError = document.getElementById("registerPhoneError");
        const userError = document.getElementById("registerUserError");
        const passwordError = document.getElementById("registerPasswordError");
        const confirmError = document.getElementById("registerConfirmPasswordError");
        const statusMsg = document.getElementById("registerFormStatus");

        // Reset errors
        nameError.textContent = "";
        emailError.textContent = "";
        phoneError.textContent = "";
        userError.textContent = "";
        passwordError.textContent = "";
        confirmError.textContent = "";
        statusMsg.textContent = "";

        let isValid = true;

        const fullName = nameInput ? nameInput.value.trim() : "";
        const email = emailInput ? emailInput.value.trim() : "";
        const phone = phoneInput ? phoneInput.value.trim() : "";
        const username = userInput ? userInput.value.trim() : "";
        const password = passwordInput ? passwordInput.value : "";
        const confirmPassword = confirmPasswordInput ? confirmPasswordInput.value : "";

        // 1. Validate Full Name
        if (fullName === "") {
            nameError.textContent = "Full name is required.";
            isValid = false;
        } else if (fullName.length < 2) {
            nameError.textContent = "Name must be at least 2 characters.";
            isValid = false;
        }

        // 2. Validate Email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[a-zA-Z]{2,}$/;
        if (email === "") {
            emailError.textContent = "Email is required.";
            isValid = false;
        } else if (!emailRegex.test(email)) {
            emailError.textContent = "Please enter a valid email address (e.g. name@example.com).";
            isValid = false;
        }

        // 3. Validate Phone Number pattern
        const phoneRegex = /^(\+?[0-9]{10,15}|[0-9]{3}[-\s]?[0-9]{3}[-\s]?[0-9]{4})$/;
        if (phone === "") {
            phoneError.textContent = "Phone number is required.";
            isValid = false;
        } else if (!phoneRegex.test(phone)) {
            phoneError.textContent = "Please enter a valid phone number (e.g. +7 777 123 4567).";
            isValid = false;
        }

        // 4. Validate Username
        if (username === "") {
            userError.textContent = "Username is required.";
            isValid = false;
        } else if (username.length < 3) {
            userError.textContent = "Username must be at least 3 characters.";
            isValid = false;
        } else if (localStorage.getItem("user_" + username.toLowerCase()) !== null || localStorage.getItem(username) !== null) {
            userError.textContent = "This username is already taken. Please choose another.";
            isValid = false;
        }

        // 5. Validate Password length and complexity
        const passwordComplexityRegex = /^(?=.*[A-Za-z])(?=.*\d).{6,}$/;
        if (password === "") {
            passwordError.textContent = "Password is required.";
            isValid = false;
        } else if (!passwordComplexityRegex.test(password)) {
            passwordError.textContent = "Password must be at least 6 characters and include both letters and numbers.";
            isValid = false;
        }

        // 6. Confirm Password match
        if (confirmPassword === "") {
            confirmError.textContent = "Please confirm your password.";
            isValid = false;
        } else if (password !== confirmPassword) {
            confirmError.textContent = "Passwords do not match.";
            isValid = false;
        }

        if (isValid) {
            // Save user profile object in localStorage
            const userProfile = {
                fullName: fullName,
                email: email,
                phone: phone,
                username: username,
                password: password,
                createdAt: new Date().toLocaleDateString()
            };

            localStorage.setItem("user_" + username.toLowerCase(), JSON.stringify(userProfile));
            localStorage.setItem(username, password); // Backward compatibility

            statusMsg.className = "mb-3 text-center fw-semibold text-success";
            statusMsg.textContent = "Registration successful! Redirecting to login page...";

            showNotification("Registration successful! Welcome to Bloom Room Cafe.");

            setTimeout(function () {
                window.location.href = "login.html";
            }, 1200);
        } else {
            statusMsg.className = "mb-3 text-center fw-semibold text-danger";
            statusMsg.textContent = "Please correct the errors above.";
        }
    });
}

// ------------------------------------------
// Login Form
// ------------------------------------------
const loginForm = document.getElementById("loginForm");

if (loginForm) {
    loginForm.addEventListener("submit", function (e) {
        e.preventDefault();

        const userInput = document.getElementById("loginUser");
        const passwordInput = document.getElementById("loginPassword");
        const userError = document.getElementById("loginUserError");
        const passwordError = document.getElementById("loginPasswordError");
        const statusMsg = document.getElementById("loginFormStatus");

        userError.textContent = "";
        passwordError.textContent = "";
        statusMsg.textContent = "";

        const query = userInput ? userInput.value.trim() : "";
        const password = passwordInput ? passwordInput.value : "";

        let isValid = true;

        if (query === "") {
            userError.textContent = "Please enter your username or email.";
            isValid = false;
        }

        if (password === "") {
            passwordError.textContent = "Please enter your password.";
            isValid = false;
        }

        if (!isValid) return;

        // Check credentials against stored profiles
        let matchedUser = null;

        // Check directly by username key
        const directProfileJson = localStorage.getItem("user_" + query.toLowerCase());
        if (directProfileJson) {
            try {
                const parsed = JSON.parse(directProfileJson);
                if (parsed.password === password) {
                    matchedUser = parsed;
                }
            } catch (err) {
                console.error(err);
            }
        }

        // Check by simple username or search by email
        if (!matchedUser) {
            const fallbackPass = localStorage.getItem(query);
            if (fallbackPass === password) {
                matchedUser = {
                    username: query,
                    fullName: query,
                    email: query.includes("@") ? query : query + "@example.com",
                    phone: "+7 777 000 0000"
                };
            } else {
                // Search across all stored user profiles
                for (let i = 0; i < localStorage.length; i++) {
                    const key = localStorage.key(i);
                    if (key && key.startsWith("user_")) {
                        try {
                            const candidate = JSON.parse(localStorage.getItem(key));
                            if (candidate && (candidate.username.toLowerCase() === query.toLowerCase() || candidate.email.toLowerCase() === query.toLowerCase())) {
                                if (candidate.password === password) {
                                    matchedUser = candidate;
                                    break;
                                }
                            }
                        } catch (err) {
                            // continue
                        }
                    }
                }
            }
        }

        if (matchedUser) {
            localStorage.setItem("isLoggedIn", "true");
            localStorage.setItem("currentUser", matchedUser.username);

            statusMsg.className = "mb-3 text-center fw-semibold text-success";
            statusMsg.textContent = "Login successful! Redirecting to your Profile...";

            showNotification("Welcome back, " + (matchedUser.fullName || matchedUser.username) + "!");

            // Criterion 5.1: "Log In" checks credentials and redirects to a Profile Page
            setTimeout(function () {
                window.location.href = "profile.html";
            }, 1000);
        } else {
            statusMsg.className = "mb-3 text-center fw-semibold text-danger";
            statusMsg.textContent = "Invalid username/email or password.";
        }
    });
}

// ------------------------------------------
// Profile Page Population (Criterion 5.1)
// ------------------------------------------
const currentPage = window.location.pathname.split("/").pop().toLowerCase();
const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";

if (currentPage === "profile.html") {
    // Protected route: redirect to login if not logged in
    if (!isLoggedIn) {
        window.location.replace("login.html");
    } else {
        const currentUsername = localStorage.getItem("currentUser") || "Guest";
        let userProfile = null;

        const storedProfile = localStorage.getItem("user_" + currentUsername.toLowerCase());
        if (storedProfile) {
            try {
                userProfile = JSON.parse(storedProfile);
            } catch (err) {
                console.error(err);
            }
        }

        const fullName = userProfile && userProfile.fullName ? userProfile.fullName : currentUsername;
        const email = userProfile && userProfile.email ? userProfile.email : (currentUsername + "@example.com");
        const phone = userProfile && userProfile.phone ? userProfile.phone : "+7 777 123 4567";
        const initial = fullName.charAt(0).toUpperCase();

        const headingName = document.getElementById("profileHeadingName");
        const headingUsername = document.getElementById("profileHeadingUsername");
        const fullNameEl = document.getElementById("profileFullName");
        const usernameEl = document.getElementById("profileUsername");
        const emailEl = document.getElementById("profileEmail");
        const phoneEl = document.getElementById("profilePhone");
        const avatarEl = document.getElementById("profileAvatarLetter");

        if (headingName) headingName.textContent = fullName;
        if (headingUsername) headingUsername.textContent = "@" + currentUsername;
        if (fullNameEl) fullNameEl.textContent = fullName;
        if (usernameEl) usernameEl.textContent = currentUsername;
        if (emailEl) emailEl.textContent = email;
        if (phoneEl) phoneEl.textContent = phone;
        if (avatarEl) avatarEl.innerHTML = `<span>${initial}</span>`;
    }
}

// ------------------------------------------
// Logout Handlers
// ------------------------------------------
function performLogout() {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("currentUser");
    showNotification("You have been logged out.");
    setTimeout(function () {
        window.location.replace("login.html");
    }, 600);
}

$(document).on("click", "#logoutBtn, #profileLogoutBtn", function (e) {
    e.preventDefault();
    performLogout();
});

// ------------------------------------------
// Dynamic Navbar Authentication State
// ------------------------------------------
function updateNavbarAuth() {
    const isUserLoggedIn = localStorage.getItem("isLoggedIn") === "true";
    const currentUsername = localStorage.getItem("currentUser") || "User";

    if (isUserLoggedIn) {
        // Logged-in user: show logout button
        $("#logoutBtn").show();

        // Convert login link to profile with user's name
        $("nav a[href='login.html']").each(function () {
            $(this).text("Profile (" + currentUsername + ")").attr("href", "profile.html");
        });

        // Hide register link in navbar when already logged in
        $("nav a[href='register.html']").parent().hide();

        // Ensure profile link is visible
        $("nav a[href='profile.html']").each(function () {
            $(this).text("Profile (" + currentUsername + ")");
            $(this).parent().show();
        });
    } else {
        // Guest user: hide logout button completely
        $("#logoutBtn").hide();

        // If a profile link exists in navbar, show "Log in" instead for guests
        $("nav a[href='profile.html']").each(function () {
            $(this).text("Log in").attr("href", "login.html");
        });

        // Ensure login and register links are visible for guests
        $("nav a[href='login.html'], nav a[href='register.html']").parent().show();
    }
}

// Initialize navbar state immediately on page load
$(document).ready(function () {
    updateNavbarAuth();
});
updateNavbarAuth();

// ==========================================
// Criterion 7: External API Integration (TheMealDB)
// ==========================================
async function loadChefSpecials() {
    const $section = $("#api-specials-section");
    const $loading = $("#api-loading");
    const $error = $("#api-error");
    const $container = $("#api-specials-container");

    if (!$section.length) return;

    $loading.show();
    $error.hide();
    $container.hide().empty();

    try {
        // Fetch fresh desserts / chef specials from public TheMealDB API
        const response = await fetch("https://www.themealdb.com/api/json/v1/1/filter.php?c=Dessert");
        if (!response.ok) {
            throw new Error("HTTP request failed with status " + response.status);
        }

        const data = await response.json();
        
        // Pick 3 random desserts from the API so different dishes appear on each visit
        let specials = [];
        if (data.meals && data.meals.length > 0) {
            const shuffledMeals = data.meals.slice().sort(function () {
                return 0.5 - Math.random();
            });
            specials = shuffledMeals.slice(0, 3);
        }

        if (specials.length === 0) {
            throw new Error("No specials returned from API");
        }

        specials.forEach(function (meal) {
            const cardHtml = `
                <div class="col-12 col-md-4">
                    <article class="card h-100 shadow-sm border-0">
                        <div class="ratio ratio-4x3">
                            <img src="${meal.strMealThumb}" class="d-block w-100 object-fit-cover rounded-top" alt="${meal.strMeal}">
                        </div>
                        <div class="card-body d-flex flex-column p-4">
                            <span class="badge api-badge align-self-start mb-2 px-3 py-1 rounded-pill">Chef's Fresh Special</span>
                            <h3 class="card-title h5 mb-2">${meal.strMeal}</h3>
                            <p class="card-text text-muted small">Special artisanal dessert prepared fresh today in our kitchen.</p>
                            <button type="button" class="btn btn-outline-danger btn-sm mt-auto align-self-start order-special-btn" data-dish="${meal.strMeal}">
                                Order Today
                            </button>
                        </div>
                    </article>
                </div>
            `;
            $container.append(cardHtml);
        });

        $loading.hide();
        $container.fadeIn(400);
    } catch (err) {
        console.warn("External API fetch error:", err);
        $loading.hide();
        $error.fadeIn(300);
    }
}

// Trigger API load on page load if the section exists
$(document).ready(function () {
    if ($("#api-specials-section").length) {
        loadChefSpecials();
    }
});

// Retry or Refresh button for API specials
$(document).on("click", "#api-retry-btn, #api-refresh-btn", function () {
    loadChefSpecials();
});

// Ordering special dish triggers toast notification
$(document).on("click", ".order-special-btn", function () {
    const dish = $(this).attr("data-dish") || "Special item";
    showNotification(`Added "${dish}" to your order! 🌸`);
});


