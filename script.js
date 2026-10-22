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
    const nameInput = document.getElementById("name");
    const emailInput = document.getElementById("email");
    const nameError = document.getElementById("name-error");
    const emailError = document.getElementById("email-error");
    const formStatus = document.getElementById("form-status");

    form.addEventListener("submit", function (event) {
        event.preventDefault();

        nameError.textContent = "";
        emailError.textContent = "";
        formStatus.textContent = "";

        let isValid = true;
        const emailValue = emailInput.value;

        if (nameInput.value === "") {
            nameError.textContent = "Name is required.";
            isValid = false;
        }

        if (emailValue === "") {
            emailError.textContent = "Email is required.";
            isValid = false;
        } else if (emailValue.indexOf("@") === -1 || emailValue.indexOf(".") === -1) {
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
