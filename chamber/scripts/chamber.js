// Function to update the current year in the footer
function updateCurrentYear() {
    const currentYearSpan = document.getElementById('currentyear');
    if (currentYearSpan) {
        currentYearSpan.textContent = new Date().getFullYear();
    }
}

// Function to update the last modified date in the footer
function updateLastModified() {
    const lastModifiedParagraph = document.getElementById('lastModified');
    if (lastModifiedParagraph) {
        lastModifiedParagraph.textContent = `Last Modified: ${document.lastModified}`;
    }
}

// Hamburger menu functionality
function setupHamburgerMenu() {
    const hamburger = document.querySelector('.hamburger');
    const mainNav = document.querySelector('.main-nav');

    if (hamburger && mainNav) {
        hamburger.addEventListener('click', () => {
            mainNav.classList.toggle('open');
            hamburger.textContent = mainNav.classList.contains('open') ? '✕' : '☰';
        });
    }
}

// Function to load discover page items from JSON
async function loadDiscoverItems() {
    const gridContainer = document.getElementById('interest-items-grid');
    if (!gridContainer) return; // Only run if on the discover page

    try {
        const response = await fetch('data/discover.json');
        const items = await response.json();

        items.forEach(item => {
            const card = document.createElement('div');
            card.classList.add('interest-card');

            card.innerHTML = `
                <h2>${item.name}</h2>
                <figure>
                    <img src="images/${item.image}" alt="${item.name}" loading="lazy">
                </figure>
                <address>${item.address}</address>
                <p>${item.description}</p>
                <a href="#" class="learn-more-button">Learn More</a>
            `;
            gridContainer.appendChild(card);
        });
    } catch (error) {
        console.error('Error fetching discover items:', error);
        gridContainer.innerHTML = '<p>Failed to load discovery items. Please try again later.</p>';
    }
}

// Function to handle last visit message
function displayLastVisitMessage() {
    const messageElement = document.getElementById('last-visit-message');
    if (!messageElement) return; // Only run if on the discover page

    const lastVisit = localStorage.getItem('lastVisit');
    const now = Date.now(); // Current timestamp in milliseconds

    let message = '';

    if (!lastVisit) {
        // First visit
        message = "Welcome! Let us know if you have any questions.";
    } else {
        const lastVisitTime = parseInt(lastVisit, 10);
        const timeDifference = now - lastVisitTime; // Difference in milliseconds

        const millisecondsInADay = 24 * 60 * 60 * 1000;
        const daysDifference = Math.floor(timeDifference / millisecondsInADay);

        if (daysDifference < 1) {
            // Less than a day (same day)
            message = "Back so soon! Awesome!";
        } else if (daysDifference === 1) {
            message = "You last visited 1 day ago.";
        } else {
            message = `You last visited ${daysDifference} days ago.`;
        }
    }

    messageElement.textContent = message;

    // Store the current visit time
    localStorage.setItem('lastVisit', now.toString());
}


// Event listener for DOMContentLoaded
document.addEventListener('DOMContentLoaded', () => {
    updateCurrentYear();
    updateLastModified();
    setupHamburgerMenu();

    // Check if on the discover page to run specific functions
    if (document.body.classList.contains('discover-page')) {
        loadDiscoverItems();
        displayLastVisitMessage();
    }
});