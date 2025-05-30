document.querySelectorAll(".open-button").forEach((button) => {
    button.addEventListener("click", () => {
        const targetModal = document.querySelector(`#${button.textContent.toLowerCase().replace(" ", "")}`);
        if (targetModal) {
            targetModal.showModal();
        }
    });
});

document.querySelectorAll(".close-button").forEach((button) => {
    button.addEventListener("click", () => {
        button.closest("dialog").close();
    });
});