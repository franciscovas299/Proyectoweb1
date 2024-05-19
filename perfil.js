document.addEventListener('DOMContentLoaded', function () {
    showProfile();
});

function showProfile() {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
        const user = JSON.parse(storedUser);
        const profileContainer = document.getElementById('profile-container');
        profileContainer.innerHTML = `
            <h2>Información Personal</h2>
            <div class="pf-profile-picture">
                <img src="${user.profilePicture || 'default-profile.jpg'}" alt="Foto de Perfil" id="profile-picture">
            </div>
            <p><strong>Nombre:</strong> ${user.fName} ${user.lName}</p>
            <p><strong>Facultad:</strong> ${user.faculty}</p>
            <p><strong>Carrera:</strong> ${user.course}</p>
            <p><strong>Cédula / Pasaporte:</strong> ${user.id}</p>
            <p><strong>Teléfono:</strong> ${user.phone}</p>
            <button class="pf-button" onclick="editProfile()">Editar Perfil</button>
        `;
    } else {
        window.location.href = "inicio.html"; 
    }
}

function editProfile() {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
        const user = JSON.parse(storedUser);
        const profileContainer = document.getElementById('profile-container');
        profileContainer.innerHTML = `
            <h2>Editar Información Personal</h2>
            <div class="pf-profile-picture">
                <img src="${user.profilePicture || 'default-profile.jpg'}" alt="Foto de Perfil" id="profile-picture">
                <input type="file" accept="image/*" id="profile-picture-input">
                <button class="pf-button" onclick="saveProfilePicture()">Cambiar Foto</button>
            </div>
            <p><strong>Nombre:</strong> <input type="text" id="edit-fname" class="pf-input" value="${user.fName}" oninput="validateText(this)"></p>
            <p><strong>Apellido:</strong> <input type="text" id="edit-lname" class="pf-input" value="${user.lName}" oninput="validateText(this)"></p>
            <p><strong>Facultad:</strong> <input type="text" id="edit-faculty" class="pf-input" value="${user.faculty}" oninput="validateText(this)"></p>
            <p><strong>Carrera:</strong> <input type="text" id="edit-course" class="pf-input" value="${user.course}" oninput="validateText(this)"></p>
            <p><strong>Cédula / Pasaporte:</strong> <input type="text" id="edit-id" class="pf-input" value="${user.id}" oninput="validateNumber(this)"></p>
            <p><strong>Teléfono:</strong> <input type="text" id="edit-phone" class="pf-input" value="${user.phone}" oninput="validateNumber(this)"></p>
            <button class="pf-button" onclick="saveProfile()">Guardar Cambios</button>
        `;
    }
}

function validateText(input) {
    const regex = /^[a-zA-Z\s]*$/;
    if (!regex.test(input.value)) {
        input.value = input.value.replace(/[^a-zA-Z\s]/g, '');
        alert('Solo se permiten letras y espacios.');
    }
}

function validateNumber(input) {
    const regex = /^[0-9]*$/;
    if (!regex.test(input.value)) {
        input.value = input.value.replace(/[^0-9]/g, '');
        alert('Solo se permiten números.');
    }
}

function saveProfile() {
    const fName = document.getElementById('edit-fname').value;
    const lName = document.getElementById('edit-lname').value;
    const faculty = document.getElementById('edit-faculty').value;
    const course = document.getElementById('edit-course').value;
    const id = document.getElementById('edit-id').value;
    const phone = document.getElementById('edit-phone').value;

    const user = {
        fName,
        lName,
        faculty,
        course,
        id,
        phone,
        profilePicture: document.getElementById('profile-picture').src
    };

    localStorage.setItem('user', JSON.stringify(user));
    showProfile();
    alert('Perfil actualizado exitosamente.');
}

function saveProfilePicture() {
    const fileInput = document.getElementById('profile-picture-input');
    const file = fileInput.files[0];
    if (file) {
        if (!['image/jpeg', 'image/png', 'image/gif'].includes(file.type)) {
            alert('Por favor, selecciona una imagen JPEG, PNG o GIF.');
            return;
        }

        const reader = new FileReader();
        reader.onload = function (event) {
            const imageUrl = event.target.result;
            const storedUser = localStorage.getItem('user');
            if (storedUser) {
                const user = JSON.parse(storedUser);
                user.profilePicture = imageUrl;
                localStorage.setItem('user', JSON.stringify(user));
                const profilePicture = document.querySelector('#profile-picture');
                if (profilePicture) {
                    profilePicture.src = imageUrl;
                }
                alert('Foto de perfil guardada exitosamente.');
            }
        };
        reader.readAsDataURL(file);
    } else {
        alert('Por favor, selecciona una imagen.');
    }
}
