const subscriptionButtons = document.querySelectorAll("[data-subscription-target]");
const contactButtons = document.querySelectorAll("[data-contact-target]");
const closeButtons = document.querySelectorAll("[data-close-button]");
const overlay = document.querySelector("#popup-overlay");

function openPopup(popup) {
    if (!popup || !overlay) return;
    popup.classList.add("active");
    overlay.classList.add("active");
}

function closePopup(popup) {
    if (!popup || !overlay) return;
    popup.classList.remove("active");
    const anotherPopupIsActive = document.querySelector(".subscription.active, .contact.active");
    if (!anotherPopupIsActive) {
        overlay.classList.remove("active");
    }
}

subscriptionButtons.forEach(button => {
    button.addEventListener("click", () => {
        const popup = document.querySelector(button.dataset.subscriptionTarget);
        openPopup(popup);
    });
});

contactButtons.forEach(button => {
    button.addEventListener("click", () => {
        const popup = document.querySelector(button.dataset.contactTarget);
        openPopup(popup);
    });
});

closeButtons.forEach(button => {
    button.addEventListener("click", () => {
        const popup = button.closest(".subscription, .contact");
        closePopup(popup);
    });
});

if (overlay) {
    overlay.addEventListener("click", () => {
        document.querySelectorAll(".subscription.active, .contact.active").forEach(popup => {
            popup.classList.remove("active");
        });

        overlay.classList.remove("active");
    });
}

const dateTime = document.getElementById("current-date-time");

if (dateTime) {
    dateTime.textContent = new Date().toLocaleString();
    setInterval(function () {
        dateTime.textContent = new Date().toLocaleString();
    }, 1000);
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

const form = document.getElementById("contact-form");

if (form) {
    const nameInput = document.getElementById("booking-name");
    const emailInput = document.getElementById("booking-email");
    const nameError = document.getElementById("booking-name-error");
    const emailError = document.getElementById("booking-email-error");
    const formStatus = document.getElementById("booking-form-status");

    form.addEventListener("submit", function (event) {
        event.preventDefault();

        nameError.textContent = "";
        emailError.textContent = "";
        formStatus.textContent = "";

        let isValid = true;
        const nameValue = nameInput.value.trim();
        const emailValue = emailInput.value.trim();

        if (nameValue === "") {
            nameError.textContent = "Name is required.";
            isValid = false;
        } else if (!/^[A-Za-zА-Яа-яЁё\s]+$/.test(nameValue)) {
            nameError.textContent = "Name can contain only letters and spaces.";
            isValid = false;
        }

        if (emailValue === "") {
            emailError.textContent = "Email is required.";
            isValid = false;
        } else if (!/^[^\s@]+@[^\s@]+\.[A-Za-z]{2,}$/.test(emailValue)) {
            emailError.textContent = "Please enter a valid email.";
            isValid = false;
        }

        if (isValid) {
            formStatus.textContent = "Your table request was sent successfully.";
        } else {
            formStatus.textContent = "Please correct the errors above.";
        }
    });
}

const subscriptionForm = document.getElementById("subscription-form");

if (subscriptionForm) {
    const subscriptionName = document.getElementById("subscription-name");
    const subscriptionEmail = document.getElementById("subscription-email");
    const subscriptionPassword = document.getElementById("subscription-password");
    const confirmPassword = document.getElementById("subscription-confirm-password");
    const subscriptionNameError = document.getElementById("subscription-name-error");
    const subscriptionEmailError = document.getElementById("subscription-email-error");
    const passwordError = document.getElementById("subscription-password-error");
    const confirmPasswordError = document.getElementById("subscription-confirm-password-error");
    const subscriptionStatus = document.getElementById("subscription-form-status");

    subscriptionForm.addEventListener("submit", function (event) {
        event.preventDefault();

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
        } else if (!/^[A-Za-zА-Яа-яЁё\s]+$/.test(nameValue)) {
            subscriptionNameError.textContent = "Name can contain only letters and spaces.";
            isValid = false;
        }

        if (emailValue === "") {
            subscriptionEmailError.textContent = "Email is required.";
            isValid = false;
        } else if (!/^[^\s@]+@[^\s@]+\.[A-Za-z]{2,}$/.test(emailValue)) {
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
            subscriptionStatus.textContent = "Thank you for subscribing.";
        } else {
            subscriptionStatus.textContent = "Please correct the errors above.";
        }
    });
}

let btnColorChanger = document.getElementById("changeBg");
btnColorChanger.addEventListener("click", () => {
    document.body.style.backgroundColor = generateColor();
});
function generateColor() {
    var color = ["#fae8e8", "#faf3e8", "#f9fae8", "#ecfae8", "#e8faed", "#e8faf8", "#e8f0fa", "#f2e8fa", "#fae8f3", "#d8708a", "#d8b270", "#d8cd70", "#a6d870", "#70d88f", "#70d8c5", "#709fd8", "#9270d8", "#d870be", "#7ea1a0", "#a17e7e", "#a1947e", "#a1a17e", "#8aa17e", "#7e85a1", "#947ea1", "#a17e99"];
    let randomColor = color[Math.floor(Math.random() * color.length)];
    return randomColor;
};
