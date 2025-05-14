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


const courses = [
    {
        subject: 'CSE',
        number: 110,
        title: 'Introduction to Programming',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course will introduce students to programming. It will introduce the building blocks of programming languages (variables, decisions, calculations, loops, array, and input/output) and use them to solve problems.',
        technology: [
            'Python'
        ],
        completed: true // I have completed this course
    },
    {
        subject: 'WDD',
        number: 130,
        title: 'Web Fundamentals',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course introduces students to the World Wide Web and to careers in web site design and development. The course is hands on with students actually participating in simple web designs and programming. It is anticipated that students who complete this course will understand the fields of web design and development and will have a good idea if they want to pursue this degree as a major.',
        technology: [
            'HTML',
            'CSS'
        ],
        completed: true // I have completed this course
    },
    {
        subject: 'CSE',
        number: 111,
        title: 'Programming with Functions',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'CSE 111 students become more organized, efficient, and powerful computer programmers by learning to research and call functions written by others; to write, call , debug, and test their own functions; and to handle errors within functions. CSE 111 students write programs with functions to solve problems in many disciplines, including business, physical science, human performance, and humanities.',
        technology: [
            'Python'
        ],
        completed: false
    },
    {
        subject: 'CSE',
        number: 210,
        title: 'Programming with Classes',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course will introduce the notion of classes and objects. It will present encapsulation at a conceptual level. It will also work with inheritance and polymorphism.',
        technology: [
            'C#'
        ],
        completed: false
    },
    {
        subject: 'WDD',
        number: 131,
        title: 'Dynamic Web Fundamentals',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course builds on prior experience in Web Fundamentals and programming. Students will learn to create dynamic websites that use JavaScript to respond to events, update content, and create responsive user experiences.',
        technology: [
            'HTML',
            'CSS',
            'JavaScript'
        ],
        completed: false
    },
    {
        subject: 'WDD',
        number: 231,
        title: 'Frontend Web Development I',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course builds on prior experience with Dynamic Web Fundamentals and programming. Students will focus on user experience, accessibility, compliance, performance optimization, and basic API usage.',
        technology: [
            'HTML',
            'CSS',
            'JavaScript'
        ],
        completed: false
    }
];

const coursesContainer = document.querySelector('.courses-container');
const filterButtons = document.querySelectorAll('.filter');
const totalCreditsSpan = document.getElementById('total-credits');

function displayCourses(filteredCourses) {
    coursesContainer.innerHTML = ''; // Clear previous courses
    filteredCourses.forEach(course => {
        const courseCard = document.createElement('div');
        courseCard.classList.add('course-card');
        if (course.completed) {
            courseCard.classList.add('completed');
        }

        const title = document.createElement('h3');
        title.textContent = `${course.subject} ${course.number}: ${course.title}`;

        const credits = document.createElement('p');
        credits.textContent = `Credits: ${course.credits}`;

        const description = document.createElement('p');
        description.textContent = course.description;

        const technology = document.createElement('p');
        technology.textContent = `Technology: ${course.technology.join(', ')}`;

        courseCard.appendChild(title);
        courseCard.appendChild(credits);
        courseCard.appendChild(description);
        courseCard.appendChild(technology);
        coursesContainer.appendChild(courseCard);
    });

    updateTotalCredits(filteredCourses);
}

function updateTotalCredits(currentCourses) {
    const total = currentCourses.reduce((sum, course) => sum + course.credits, 0);
    totalCreditsSpan.textContent = total;
}

function filterCourses(filter) {
    let filteredCourses;
    if (filter === 'all') {
        filteredCourses = courses;
    } else if (filter === 'wdd') {
        filteredCourses = courses.filter(course => course.subject === 'WDD');
    } else if (filter === 'cse') {
        filteredCourses = courses.filter(course => course.subject === 'CSE');
    }
    displayCourses(filteredCourses);
}

// Initial display of all courses
displayCourses(courses);

// Event listeners for filter buttons
filterButtons.forEach(button => {
    button.addEventListener('click', function() {
        filterButtons.forEach(btn => btn.classList.remove('active'));
        this.classList.add('active');
        const filterValue = this.getAttribute('data-filter');
        filterCourses(filterValue);
    });
});