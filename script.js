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

overlay.addEventListener("click", () => {
    document.querySelectorAll(
        ".subscription.active, .contact.active"
    ).forEach(popup => {
        popup.classList.remove("active");
    });

    overlay.classList.remove("active");
});

