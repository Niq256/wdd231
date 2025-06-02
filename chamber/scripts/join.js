document.addEventListener('DOMContentLoaded', () => {
    // Set the timestamp for the hidden input field
    const timestampField = document.getElementById('timestamp');
    if (timestampField) {
        const now = new Date();
        timestampField.value = now.toISOString(); // ISO 8601 format for consistency
    }

    // Modal functionality
    const modalTriggers = document.querySelectorAll('.modal-trigger');
    const modals = document.querySelectorAll('.modal');
    const closeButtons = document.querySelectorAll('.close-button');

    modalTriggers.forEach(trigger => {
        trigger.addEventListener('click', (event) => {
            event.preventDefault(); // Prevent default link behavior
            const modalId = trigger.dataset.modal;
            const modal = document.getElementById(modalId);
            if (modal) {
                modal.style.display = 'flex'; // Use flex to center content
            }
        });
    });

    closeButtons.forEach(button => {
        button.addEventListener('click', () => {
            const modal = button.closest('.modal');
            if (modal) {
                modal.style.display = 'none';
            }
        });
    });

    // Close modal when clicking outside of it
    modals.forEach(modal => {
        modal.addEventListener('click', (event) => {
            if (event.target === modal) {
                modal.style.display = 'none';
            }
        });
    });

    // Animation for membership cards on initial load
    const membershipCards = document.querySelectorAll('.membership-cards .card');
    membershipCards.forEach((card, index) => {
        // Add a slight delay for each card to create a staggered effect
        setTimeout(() => {
            card.classList.add('animate');
        }, 100 * index); // 100ms delay per card
    });

    // --- Second block's functionality (moved here) ---
    const urlParams = new URLSearchParams(window.location.search);

    // It's good practice to check if the element exists before trying to set textContent
    const displayFirstName = document.getElementById('displayFirstName');
    if (displayFirstName) {
        displayFirstName.textContent = urlParams.get('firstName') || 'N/A';
    }

    const displayLastName = document.getElementById('displayLastName');
    if (displayLastName) {
        displayLastName.textContent = urlParams.get('lastName') || 'N/A';
    }

    const displayEmail = document.getElementById('displayEmail');
    if (displayEmail) {
        displayEmail.textContent = urlParams.get('email') || 'N/A';
    }

    const displayPhone = document.getElementById('displayPhone');
    if (displayPhone) {
        displayPhone.textContent = urlParams.get('phone') || 'N/A';
    }

    const displayBizName = document.getElementById('displayBizName');
    if (displayBizName) {
        displayBizName.textContent = urlParams.get('bizName') || 'N/A';
    }

    const displayTimestamp = document.getElementById('displayTimestamp');
    if (displayTimestamp) { // Check for existence
        const timestamp = urlParams.get('timestamp');
        if (timestamp) {
            try {
                const date = new Date(timestamp);
                displayTimestamp.textContent = date.toLocaleString();
            } catch (e) {
                displayTimestamp.textContent = 'Invalid Date';
            }
        } else {
            displayTimestamp.textContent = 'N/A';
        }
    }

});
