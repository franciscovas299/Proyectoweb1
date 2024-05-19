// Valores de correo y contraseña específicos
const specialEmail = "admin@gmail.com";
const specialPassword = "12345";

// Funciones de validación existentes (sin cambios)
function validateFirstName() {
    const firstName = document.getElementById('fName').value.trim().toUpperCase();
    const errorContainer = document.getElementById('fName-error');
    errorContainer.innerHTML = "";

    if (firstName.length < 3) {
        errorContainer.innerHTML = "El nombre debe tener al menos 3 caracteres.";
        return false;
    }

    const nameRegex = /^[A-Z\s]+$/;
    if (!nameRegex.test(firstName)) {
        errorContainer.innerHTML = "El nombre solo puede contener letras.";
        return false;
    }

    return true;
}

function validateLastName() {
    const lastName = document.getElementById('lName').value.trim().toUpperCase();
    const errorContainer = document.getElementById('lName-error');
    errorContainer.innerHTML = "";

    if (lastName.length < 3) {
        errorContainer.innerHTML = "El apellido debe tener al menos 3 caracteres.";
        return false;
    }

    const nameRegex = /^[A-Z\s]+$/;
    if (!nameRegex.test(lastName)) {
        errorContainer.innerHTML = "El apellido solo puede contener letras.";
        return false;
    }

    return true;
}

function validateEmail() {
    const email = document.getElementById('email').value.trim();
    const errorContainer = document.getElementById('email-error');
    errorContainer.innerHTML = "";

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        errorContainer.innerHTML = "Por favor ingresa una dirección de correo electrónico válida.";
        return false;
    }

    return true;
}

function validatePassword() {
    const password = document.getElementById('password').value.trim();
    const errorContainer = document.getElementById('password-error');
    errorContainer.innerHTML = "";

    if (password.length < 5) {
        errorContainer.innerHTML = "La contraseña debe tener al menos 5 caracteres.";
        return false;
    }

    return true;
}

function validateConfirmPassword() {
    const password = document.getElementById('password').value.trim();
    const confirmPassword = document.getElementById('confirmPassword').value.trim();
    const errorContainer = document.getElementById('confirmPassword-error');
    errorContainer.innerHTML = "";

    if (password !== confirmPassword) {
        errorContainer.innerHTML = "Las contraseñas no coinciden.";
        return false;
    }

    return true;
}

function register(event) {
    event.preventDefault();
    const isFirstNameValid = validateFirstName();
    const isLastNameValid = validateLastName();
    const isEmailValid = validateEmail();
    const isPasswordValid = validatePassword();
    const isConfirmPasswordValid = validateConfirmPassword();

    if (!isFirstNameValid || !isLastNameValid || !isEmailValid || !isPasswordValid || !isConfirmPasswordValid) {
        return;
    }

    const firstName = document.getElementById('fName').value.trim().toUpperCase();
    const lastName = document.getElementById('lName').value.trim().toUpperCase();
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value.trim();

    const user = {
        fName: firstName,
        lName: lastName,
        email: email,
        password: password
    };
    localStorage.setItem('user', JSON.stringify(user));

    alert("¡Registro exitoso! Bienvenido, " + firstName + " " + lastName + "!");
    window.location.href = "registro.html";
}

function signIn() {
    const email = document.getElementById("signInEmail").value;
    const password = document.getElementById("signInPassword").value;
    const errorContainer = document.getElementById('signIn-error-container');
    errorContainer.innerHTML = "";

    // Verificar si coincide con el correo y contraseña específicos
    if (email === specialEmail && password === specialPassword) {
        alert("¡Inicio de sesión exitoso para " + email + "!");
        window.location.href = "admin.html"; // Redirigir a la página específica
        return;
    }

    const storedUser = localStorage.getItem('user');
    if (storedUser) {
        const parsedUser = JSON.parse(storedUser);
        if (email === parsedUser.email && password === parsedUser.password) {
            alert("¡Inicio de sesión exitoso para " + email + "!");
            window.location.href = "principal.html";
        } else {
            errorContainer.innerHTML += "El correo electrónico o la contraseña son incorrectos.<br>";
        }
    } else {
        errorContainer.innerHTML += "No hay usuarios registrados. Por favor regístrate primero.<br>";
    }
}

function togglePasswordVisibility(id) {
    const input = document.getElementById(id);
    if (input.type === "password") {
        input.type = "text";
    } else {
        input.type = "password";
    }
}

function showSignIn() {
    document.getElementById("my-signup").style.display = "none";
    document.getElementById("signIn").style.display = "block";
}

function showSignUp() {
    document.getElementById("signIn").style.display = "none";
    document.getElementById("my-signup").style.display = "block";
}
