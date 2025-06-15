document.addEventListener('DOMContentLoaded', () => {
    const reviewsGrid = document.getElementById('reviews-grid');
    const categoryLinks = document.querySelectorAll('.category-link');
    let allReviews = []; // Store all reviews fetched from JSON

    // Function to fetch reviews from JSON
    async function fetchReviews() {
        try {
            const response = await fetch('data/reviews.json');
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            allReviews = await response.json();
            displayReviews(allReviews); 
        } catch (error) {
            console.error('Could not fetch reviews:', error);
            reviewsGrid.innerHTML = '<p>Failed to load reviews. Please try again later.</p>';
        }
    }

    // Function to create and display review cards
    function displayReviews(reviewsToDisplay) {
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

    // Event listener for category links
    categoryLinks.forEach(link => {
        link.addEventListener('click', (event) => {
            event.preventDefault();
            categoryLinks.forEach(l => l.classList.remove('active'));
            event.target.classList.add('active');

            const selectedCategory = event.target.dataset.category;
            filterReviews(selectedCategory);
        });
    });

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

    fetchReviews();
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

    // Close modal if clicking outside of the content
    window.addEventListener('click', (event) => {
        modals.forEach(modal => {
            if (event.target == modal) {
                modal.style.display = 'none';
            }
        });
    });
});