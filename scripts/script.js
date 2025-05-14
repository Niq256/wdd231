// Hamburger menu toggle for mobile
function toggleNav() {
    const navList = document.querySelector('nav ul');
    const navElement = document.querySelector('nav');
    const hamburger = document.querySelector('.hamburger');
    navList.classList.toggle('show');
    navElement.classList.toggle('show');
    hamburger.classList.toggle('open');
}

// Set current year
const yearSpan = document.getElementById('currentyear');
yearSpan.textContent = new Date().getFullYear();

// Set last modified date
const lastModifiedPara = document.getElementById('lastModified');
lastModifiedPara.textContent = `Last updated: ${document.lastModified}`;