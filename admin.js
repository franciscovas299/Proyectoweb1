document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('cr-form');
    const adminGrid = document.getElementById('cr-admin-grid');
    const alert = document.getElementById('alert');

    loadCourses(adminGrid);

    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            addCourse();
        });
    }

    function addCourse() {
        const title = document.getElementById('cr-title').value;
        const description = document.getElementById('cr-description').value;
        const image = document.getElementById('cr-image').value;

        const course = createCourseElement(title, description, image);

        if (adminGrid) {
            adminGrid.appendChild(course);
        }

        saveCourse({ title, description, image });

        showAlert();

        form.reset();
    }

    function createCourseElement(title, description, image) {
        const course = document.createElement('div');
        course.classList.add('cr-curso');

        course.innerHTML = `
            <img src="${image}" alt="${title}" class="cr-img">
            <h3 class="cr-h3">${title}</h3>
            <p class="cr-p">${description}</p>
            <a href="#" class="cr-btn">Ver curso</a>
        `;

        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Eliminar';
        deleteBtn.classList.add('cr-delete-btn');
        deleteBtn.addEventListener('click', () => {
            removeCourse(course, { title, description, image });
        });
        course.appendChild(deleteBtn);

        return course;
    }

    function showAlert() {
        alert.style.display = 'block';
        setTimeout(() => {
            alert.style.display = 'none';
        }, 3000);
    }

    function saveCourse(course) {
        let courses = JSON.parse(localStorage.getItem('courses')) || [];
        courses.push(course);
        localStorage.setItem('courses', JSON.stringify(courses));
    }

    function loadCourses(grid) {
        if (!grid) return;

        let courses = JSON.parse(localStorage.getItem('courses')) || [];
        courses.forEach(course => {
            const courseElement = createCourseElement(course.title, course.description, course.image);
            grid.appendChild(courseElement);
        });
    }

    function removeCourse(courseElement, courseData) {
        courseElement.parentNode.removeChild(courseElement);

        let courses = JSON.parse(localStorage.getItem('courses')) || [];
        courses = courses.filter(course =>
            course.title !== courseData.title ||
            course.description !== courseData.description ||
            course.image !== courseData.image
        );
        localStorage.setItem('courses', JSON.stringify(courses));
    }
});
