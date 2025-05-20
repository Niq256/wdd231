// Set current year
const yearSpan = document.getElementById('currentyear');
yearSpan.textContent = new Date().getFullYear();

// Set last modified date
const lastModifiedPara = document.getElementById('lastModified');
lastModifiedPara.textContent = `Last updated: ${document.lastModified}`;

document.addEventListener('DOMContentLoaded', () => {
    const hamburger = document.querySelector('.hamburger');
    const mainNav = document.querySelector('.main-nav');
    const memberListSection = document.createElement('section');
    memberListSection.classList.add('member-list');
    const mainContent = document.querySelector('main');
    mainContent.appendChild(memberListSection);
    const toggleButton = document.createElement('button');
    toggleButton.textContent = 'Toggle View';
    const toggleContainer = document.createElement('div');
    toggleContainer.classList.add('toggle-container');
    toggleContainer.appendChild(toggleButton);
    mainContent.insertBefore(toggleContainer, memberListSection);

    hamburger.addEventListener('click', () => {
        mainNav.classList.toggle('open');
    });

    async function fetchMembers() {
        try {
            const response = await fetch('./data/members.json');
            const members = await response.json();
            displayMembers(members, 'grid'); // Default to grid view
        } catch (error) {
            console.error('Error fetching members:', error);
            memberListSection.innerHTML = '<p>Error loading member directory.</p>';
        }
    }

    function displayMembers(members, view) {
        memberListSection.innerHTML = ''; // Clear previous content
        memberListSection.classList.remove('grid-view', 'list-view');
        memberListSection.classList.add(`${view}-view`);

        members.forEach(member => {
            const memberCard = document.createElement('div');
            memberCard.classList.add('member-card');

            if (view === 'grid') {
                const image = document.createElement('img');
                image.src = `./images/${member.image || 'default-logo.png'}`;
                image.alt = member.name;
                memberCard.appendChild(image);
            }

            const name = document.createElement('h3');
            name.textContent = member.name;
            memberCard.appendChild(name);

            const address = document.createElement('p');
            address.textContent = `Address: ${member.address}`;
            memberCard.appendChild(address);

            const phone = document.createElement('p');
            phone.textContent = `Phone: ${member.phone}`;
            memberCard.appendChild(phone);

            const website = document.createElement('p');
            const websiteLink = document.createElement('a');
            websiteLink.href = member.website;
            websiteLink.textContent = 'Visit Website';
            websiteLink.target = '_blank';
            website.appendChild(websiteLink);
            memberCard.appendChild(website);

            memberListSection.appendChild(memberCard);
        });
    }

    toggleButton.addEventListener('click', () => {
        const currentView = memberListSection.classList.contains('grid-view') ? 'grid' : 'list';
        const newView = currentView === 'grid' ? 'list' : 'grid';
        fetch('./data/members.json')
            .then(response => response.json())
            .then(members => displayMembers(members, newView))
            .catch(error => console.error('Error toggling view:', error));
    });

    fetchMembers();
});