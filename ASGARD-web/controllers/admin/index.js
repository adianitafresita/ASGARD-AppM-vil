// Constante para establecer el formulario de registro del primer usuario.
// Constante para establecer el formulario de inicio de sesión.
const LOGIN_FORM = document.getElementById('loginForm');
const SIGNUP_FORM = document.getElementById('signupForm');

const LOGIN_CONTENT = document.getElementById("loginContent");
const SIGNUP_CONTENT = document.getElementById("signUpContent");

// Método del evento para cuando el documento ha cargado.
document.addEventListener('DOMContentLoaded', async () => {
    // Llamada a la función para mostrar el encabezado y pie del documento.
    // Petición para consultar los usuarios registrados.
    const DATA = await fetchData(USER_API, 'readUsers');
    // Se comprueba si existe una sesión, de lo contrario se sigue con el flujo normal.
    if (DATA.session) {
        // Se direcciona a la página web de bienvenida.
        location.href = 'inicio.html';
    } else if (DATA.status) {
        // Se establece el título del contenido principal.
        // Se muestra el formulario para iniciar sesión.
        LOGIN_CONTENT.classList.add('show');
        sweetAlert(4, DATA.message, true);
    } else {
        // Se establece el título del contenido principal.
        // Se muestra el formulario para registrar el primer usuario.
        SIGNUP_CONTENT.classList.add('show');
        sweetAlert(4, DATA.error, true);
    }
});

// Método del evento para cuando se envía el formulario de registro del primer usuario.
SIGNUP_FORM.addEventListener('submit', async (event) => {
    // Se evita recargar la página web después de enviar el formulario.
    event.preventDefault();
    // Constante tipo objeto con los datos del formulario.
    const FORM = new FormData(SIGNUP_FORM);
    // Petición para registrar el primer usuario del sitio privado.
    const DATA = await fetchData(USER_API, 'signUp', FORM);
    // Se comprueba si la respuesta es satisfactoria, de lo contrario se muestra un mensaje con la excepción.
    if (DATA.status) {
        sweetAlert(1, DATA.message, true, 'index.html');
    } else {
        sweetAlert(2, DATA.error, false);
    }
});

// Método del evento para cuando se envía el formulario de inicio de sesión.
LOGIN_FORM.addEventListener('submit', async (event) => {
    // Se evita recargar la página web después de enviar el formulario.
    event.preventDefault();
    // Constante tipo objeto con los datos del formulario.
    const FORM = new FormData(LOGIN_FORM);
    // Petición para iniciar sesión.
    const DATA = await fetchData(USER_API, 'logIn', FORM);
    // Se comprueba si la respuesta es satisfactoria, de lo contrario se muestra un mensaje con la excepción.
    if (DATA.status) {
        console.log(DATA);
        sweetAlert(1, DATA.message, true, 'inicio.html');
    } else {
        sweetAlert(2, DATA.error, false);
    }
});