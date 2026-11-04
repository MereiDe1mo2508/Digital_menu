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
// Changing theme to dark using Bootstrap data-bs-theme
const themeBtn = document.getElementById("theme-btn");

if (themeBtn) {
    themeBtn.addEventListener("click", function () {
        const currentTheme = document.documentElement.getAttribute("data-bs-theme");

        if (currentTheme === "dark") {
            document.documentElement.setAttribute("data-bs-theme", "light");
            document.body.classList.remove("dark-mode");
            themeBtn.textContent = "🌙 Dark Mode";
        } else {
            document.documentElement.setAttribute("data-bs-theme", "dark");
            document.body.classList.add("dark-mode");
            document.body.style.backgroundColor = ""; // Reset background color if was changed
            themeBtn.textContent = "☀️ Light Mode";
        }
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
$(".count").each(function () {
    $(this).prop("Counter",0).animate({
        Counter: $(this).text()
    }, {
        duration: 4000,
        easing: "swing",
        step: function (now) {
            $(this).text(Math.ceil(now));
        }
    });
});

$(document).on("scroll", function(){
    var pixels = $(document).scrollTop();
    var pageHeight = $(document).height() - $(window).height();
    var progress = 100 * pixels / pageHeight;
  
    $("div.progress").css("width", progress + "%");
});

$(document).ready(function() {
    console.log("jQuery is ready!");

    // Task 1 & Task 3: Real-time Search, Live Filter, and Highlighting
    $("#menu-search").on("keyup input", function () {
        const searchText = $(this).val().trim();
        const lowerSearch = searchText.toLowerCase();

        // Reset original text on all items (clears previous highlights)
        $("section[aria-label*='Full'] li").each(function () {
            $(this).html($(this).text());
        });

        // If search input is empty, restore highlights and all menu items
        if (lowerSearch === "") {
            $("#menu-highlights").show();
            $("section[aria-label*='Full'] .col-md-6").show();
            $("section[aria-label*='Full'] li").show();
        } else {
            // Hide top highlight cards when searching
            $("#menu-highlights").hide();

            // Prepare safe regular expression for text highlighting
            const escapedText = searchText.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
            const regex = new RegExp("(" + escapedText + ")", "gi");

            // Filter individual menu items and highlight matching characters
            $("section[aria-label*='Full'] li").each(function () {
                const dishText = $(this).text();
                const isMatch = dishText.toLowerCase().indexOf(lowerSearch) > -1;

                $(this).toggle(isMatch);

                // Highlight matching characters if item matches
                if (isMatch) {
                    const highlighted = dishText.replace(regex, '<span class="highlight">$1</span>');
                    $(this).html(highlighted);
                }
            });

            // Hide empty category sections that have no matching items
            $("section[aria-label*='Full'] .col-md-6").each(function () {
                const hasVisibleItems = $(this).find("li:visible").length > 0;
                $(this).toggle(hasVisibleItems);
            });
        }
    });

    // Task 2: Autocomplete Search Suggestions
    // Dynamically collect all menu items from the current page (Breakfast or Lunch)
    const suggestionsList = [];
    $("section[aria-label*='Full'] li").each(function () {
        const dish = $(this).text().trim();
        if (dish && suggestionsList.indexOf(dish) === -1) {
            suggestionsList.push(dish);
        }
    });

    // Display suggestions as the user types
    $("#menu-search").on("input", function () {
        const query = $(this).val().toLowerCase().trim();
        const suggestionsBox = $("#search-suggestions");

        // Clear previous suggestions
        suggestionsBox.empty();

        if (query.length > 0) {
            // Find all matching dishes
            const matches = suggestionsList.filter(function (dish) {
                return dish.toLowerCase().indexOf(query) > -1;
            });

            // If matches found, create and append list items
            if (matches.length > 0) {
                matches.forEach(function (dish) {
                    suggestionsBox.append(
                        '<li class="list-group-item list-group-item-action" style="cursor: pointer;">' + dish + '</li>'
                    );
                });
                suggestionsBox.show();
            } else {
                suggestionsBox.hide();
            }
        } else {
            suggestionsBox.hide();
        }
    });

    // When clicking a suggestion, populate search input and trigger filter
    $(document).on("click", "#search-suggestions li", function () {
        const chosenDish = $(this).text();
        $("#menu-search").val(chosenDish).trigger("keyup");
        $("#search-suggestions").hide();
    });

    // Hide suggestions dropdown when clicking outside the search box
    $(document).on("click", function (e) {
        if (!$(e.target).closest(".search-section").length) {
            $("#search-suggestions").hide();
        }
    });
});
