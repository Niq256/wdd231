// Hamburger code
document.addEventListener('DOMContentLoaded', () => {
    const hamburger = document.querySelector('.hamburger');
    const mainNav = document.querySelector('.main-nav');

    if (hamburger && mainNav) {
        hamburger.addEventListener('click', () => {
            mainNav.classList.toggle('open');
        });
    }
// Ensure business directory - list of business displays only in directory page
    if (document.body.classList.contains('directory-page')) {
        const mainContent = document.querySelector('main');
        if (mainContent) {
            const memberListSection = document.createElement('section');
            memberListSection.classList.add('member-list');
            mainContent.appendChild(memberListSection);

            const toggleButton = document.createElement('button');
            toggleButton.textContent = 'Toggle View';
            const toggleContainer = document.createElement('div');
            toggleContainer.classList.add('toggle-container');
            toggleContainer.appendChild(toggleButton);
            mainContent.insertBefore(toggleContainer, memberListSection);

            async function fetchMembers() {
                try {
                    const response = await fetch('./data/members.json');
                    const members = await response.json();
                    displayMembers(members, 'grid');
                } catch (error) {
                    console.error('Error fetching members:', error);
                    memberListSection.innerHTML = '<p>Error loading member directory.</p>';
                }
            }

            function displayMembers(members, view) {
                memberListSection.innerHTML = '';
                memberListSection.classList.remove('grid-view', 'list-view');
                memberListSection.classList.add(`${view}-view`);

                members.forEach(member => {
                    const memberCard = document.createElement('div');
                    memberCard.classList.add('member-card');

                    if (view === 'grid') {
                        const image = document.createElement('img');
                        image.src = `./images/${member.image || 'default-logo.png'}`;
                        image.alt = member.companyName;
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

                    const membership = document.createElement('p');
                    membership.textContent = `Membership Level: ${member.membershipLevel}`;
                    memberCard.appendChild(membership);

                    memberListSection.appendChild(memberCard);
                });
            }
// view grid or list displays
            toggleButton.addEventListener('click', () => {
                const currentView = memberListSection.classList.contains('grid-view') ? 'grid' : 'list';
                const newView = currentView === 'grid' ? 'list' : 'grid';
                fetch('./data/members.json')
                    .then(response => response.json())
                    .then(members => displayMembers(members, newView))
                    .catch(error => console.error('Error toggling view:', error));
            });

            fetchMembers();
        }
    }
});