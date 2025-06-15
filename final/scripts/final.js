document.addEventListener('DOMContentLoaded', () => {
    console.log('review.js: DOM Content Loaded. Initializing FaithFlicks Reviews.');

    const reviewsGrid = document.getElementById('reviews-grid');
    const categoryLinks = document.querySelectorAll('.category-link');
    let allReviews = []; // Store all reviews fetched from JSON

    const modal = document.getElementById('ReviewModal2');
    const closeButton = document.querySelector('.close-button');
    const modalTitle = document.getElementById('modal-title');
    const modalReviewsContent = document.getElementById('modal-reviews-content');

    if (modal) {
        modal.style.display = 'none';
        console.log('review.js: Modal explicitly hidden on load.');
    } else {
        console.error('review.js: ERROR: Modal element #ReviewModal2 not found!');
    }

    // Event listener for closing the modal using the 'X' button
    if (closeButton) {
        closeButton.addEventListener('click', closeReviewModal);
        console.log('review.js: Close button listener attached.');
    } else {
        console.error('review.js: ERROR: Close button .close-button not found!');
    }

    async function fetchReviews() {
        console.log('review.js: Attempting to fetch reviews from data/reviews.json');
        try {
            const response = await fetch('data/reviews.json');
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            allReviews = await response.json();
            console.log(`review.js: Successfully fetched ${allReviews.length} reviews.`);
            displayReviews(allReviews); // Display all reviews initially
        } catch (error) {
            console.error('review.js: ERROR: Could not fetch reviews:', error);
            reviewsGrid.innerHTML = '<p>Failed to load reviews. Please try again later.</p>';
        }
    }

    // Function to close the modal
    function closeReviewModal() {
        console.log('review.js: Closing modal.');
        if (modal) {
            modal.style.display = 'none'; // Hide the modal
        }
    }

    // Event listener for closing the modal when clicking outside of it
    window.addEventListener('click', (event) => {
        if (event.target === modal) {
            console.log('review.js: Clicked outside modal, closing.');
            closeReviewModal();
        }
    });

    // Event listener for category links
    categoryLinks.forEach(link => {
        link.addEventListener('click', (event) => {
            event.preventDefault(); // Prevent default link behavior
            console.log('review.js: Category link clicked:', event.target.dataset.category);

            categoryLinks.forEach(l => l.classList.remove('active'));
            event.target.classList.add('active');

            const selectedCategory = event.target.dataset.category;
            filterReviews(selectedCategory);
        });
    });

    // Function to filter reviews based on category
    function filterReviews(category) {
        console.log('review.js: Filtering reviews by category:', category);
        let filtered = [];
        if (category === 'All') {
            filtered = allReviews;
        } else {
            filtered = allReviews.filter(review => review.category === category);
        }
        displayReviews(filtered);
    }
    fetchReviews();

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

});

document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.querySelector('.hamburger');
    const mainNav = document.querySelector('.main-nav');

    if (hamburger && mainNav) {
        hamburger.addEventListener('click', function() {
            mainNav.classList.toggle('open');
            console.log('review.js: Hamburger menu toggled.');
        });
    }
});

// Modal functionality for FAQ
document.addEventListener('DOMContentLoaded', () => {
    const faqQuestions = document.querySelectorAll('.faq-question');
    const modals = document.querySelectorAll('.modal');
    const closeButtons = document.querySelectorAll('.close-button');

    faqQuestions.forEach(question => {
        question.addEventListener('click', () => {
            const modalId = question.dataset.modal;
            document.getElementById(modalId).style.display = 'block';
        });
    });

    closeButtons.forEach(button => {
        button.addEventListener('click', () => {
            button.closest('.modal').style.display = 'none';
        });
    });

    window.addEventListener('click', (event) => {
        modals.forEach(modal => {
            if (event.target == modal) {
                modal.style.display = 'none';
            }
        });
    });
});