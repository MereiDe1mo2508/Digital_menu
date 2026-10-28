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

    form.addEventListener("submit", function (event) {
        event.preventDefault();
        if (currentBookingStep === 1) {
            bookingNext.click();
            return;
        }
        const isValid = validateBookingStep1();
        if (isValid) {
            bookingSuccessSound.currentTime = 0;
            bookingSuccessSound.play();
            formStatus.textContent = "Your table request was sent successfully.";
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
        setTimeout(updateBookingTimeInfo, 0);
    });
}
//pop-up subscription form
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
            subscriptionStatus.textContent = "Thank you for subscribing.";
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
//changing theme to dark (doesn't work on some values and when background color is changed)
const themeBtn = document.getElementById("theme-btn");
if (themeBtn) {
    themeBtn.addEventListener("click", () => {
        document.body.classList.toggle("dark-mode");
    });
}
function switchTheme() {
    themeBtn.classList.toggle("dark-mode", themeBtn.checkVisibility);
}
//star rating system
let stars = document.getElementsByClassName("star");
let output = document.getElementById("output");
function gfg(n) {
    remove();
    for (let i = 0; i < n; i++) {
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
document.addEventListener('keydown', e => {
    if (e.key === 'k') {
        alert("Congrats! You found a secret egg which is keydown function!!")
    }
});
