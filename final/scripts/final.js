document.addEventListener('DOMContentLoaded', () => {
    const categoryLinks = document.querySelectorAll('.category-link');
    let allReviews = []; // Store all reviews fetched from JSON

    const modal = document.getElementById('ReviewModal2');
    const closeButton = document.querySelector('.close-button'); // This targets the close button specifically for ReviewModal2
    const modalTitle = document.getElementById('modal-title'); // keep for potential future use
    const modalReviewsContent = document.getElementById('modal-reviews-content'); // keep for potential future use

    // Handle initial display of ReviewModal2
    if (modal) {
        modal.style.display = 'none';
    }

    // Function to close the ReviewModal2
    function closeReviewModal() {
        if (modal) {
            modal.style.display = 'none'; // Hide the modal
        }
    }

    // Event listener for closing ReviewModal2 using its specific close button
    if (closeButton) {
        closeButton.addEventListener('click', closeReviewModal);
    }

    // Function to create and display review cards
    // This function will now check if reviewsGrid exists before trying to use it
    function displayReviews(reviewsToDisplay) {
        const reviewsGrid = document.getElementById('reviews-grid'); // Get reviewsGrid here
        if (!reviewsGrid) { // Check if reviewsGrid exists
            return; // Exit if no reviewsGrid on the page
        }

        reviewsGrid.innerHTML = '';
        if (reviewsToDisplay.length === 0) {
            reviewsGrid.innerHTML = '<p>No reviews found for this category.</p>';
            return;
        }

        reviewsToDisplay.forEach(review => {
            const reviewCard = document.createElement('div');
            reviewCard.classList.add('review-card');

            reviewCard.innerHTML = `
                <img src="${review.image}" alt="${review.title} Movie Poster" loading="lazy">
                <div class="card-content">
                    <p class="category">${review.category}</p>
                    <h3>${review.title}</h3>
                    <p class="description">${review.description}</p>
                    <p class="release-date">Release Date: ${review.releaseDate}</p>
                </div>
                <a href="review.html#join" class="read-more">Add Review</a>
            `;
            reviewsGrid.appendChild(reviewCard);
        });
    }

    // Function to fetch reviews from JSON
    async function fetchReviews() {
        // Only attempt to fetch and display reviews if reviewsGrid exists
        const reviewsGrid = document.getElementById('reviews-grid');
        if (!reviewsGrid) {
            return; // Exit if no reviewsGrid on the page
        }

        try {
            const response = await fetch('data/reviews.json');
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            allReviews = await response.json();
            displayReviews(allReviews); // Display all reviews initially
        } catch (error) {
            console.error('Could not fetch reviews:', error);
            reviewsGrid.innerHTML = '<p>Failed to load reviews. Please try again later.</p>';
        }
    }

    // Event listener for category links
    if (categoryLinks.length > 0) {
        categoryLinks.forEach(link => {
            link.addEventListener('click', (event) => {
                event.preventDefault();

                categoryLinks.forEach(l => l.classList.remove('active'));
                event.target.classList.add('active');

                const selectedCategory = event.target.dataset.category;
                filterReviews(selectedCategory);
            });
        });
    }
    // Function to filter reviews based on category
    function filterReviews(category) {
        let filtered = [];
        if (category === 'All') {
            filtered = allReviews;
        } else {
            filtered = allReviews.filter(review => review.category === category);
        }
        displayReviews(filtered);
    }

    if (document.getElementById('reviews-grid')) {
        fetchReviews();
    }

    const modalTriggers = document.querySelectorAll('.modal-trigger');
    const modals = document.querySelectorAll('.modal');
    const closeButtonsModals = document.querySelectorAll('.modal .close-button');

    modalTriggers.forEach(trigger => {
        trigger.addEventListener('click', (event) => {
            event.preventDefault();
            const modalId = trigger.dataset.modal;
            const targetModal = document.getElementById(modalId);
            if (targetModal) {
                targetModal.style.display = 'flex';
            }
        });
    });

    // Event listeners for close buttons
    closeButtonsModals.forEach(button => {
        button.addEventListener('click', () => {
            button.closest('.modal').style.display = 'none';
        });
    });

    // Close any modal if clicking outside of it
    window.addEventListener('click', (event) => {
        // Handle ReviewModal2 specifically first
        if (event.target === modal) {
            closeReviewModal();
        }

        // Then handle other general modals
        modals.forEach(individualModal => {
            // Ensure not to re-close ReviewModal2 if it was already handled by the specific check above
            if (event.target === individualModal && individualModal.id !== 'ReviewModal2') {
                individualModal.style.display = 'none';
            }
        });
    });

    // Handling URL parameters for form submission display
    const urlParams = new URLSearchParams(window.location.search);

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

    const displayMessage = document.getElementById('displayMessage');
    if (displayMessage) {
        displayMessage.textContent = urlParams.get('comments') || 'N/A';
    }

    // Hamburger menu functionality
    const hamburger = document.querySelector('.hamburger');
    const mainNav = document.querySelector('.main-nav');

    if (hamburger && mainNav) {
        hamburger.addEventListener('click', function() {
            mainNav.classList.toggle('open');
        });
    }

    // FAQ Modal functionality
    const faqQuestions = document.querySelectorAll('.faq-question');

    faqQuestions.forEach(question => {
        question.addEventListener('click', () => {
            const modalId = question.dataset.modal;
            const targetModal = document.getElementById(modalId);
            if (targetModal) {
                targetModal.style.display = 'block';
            }
        });
    });
});