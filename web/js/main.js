// Tabs
const tabs = document.querySelectorAll('.tab');
const sections = document.querySelectorAll('.tab-section');

function activarTab(tabId) {
    sections.forEach(sec => sec.classList.remove('active'));
    document.getElementById(tabId).classList.add('active');
    tabs.forEach(tab => tab.classList.remove('active'));
    document.querySelector(`.tab[data-section="${tabId}"]`).classList.add('active');
}

tabs.forEach(tab => {
    tab.addEventListener('click', () => {
        activarTab(tab.dataset.section);
        window.scrollTo({ top: 0, behavior: 'smooth' });
        document.getElementById('contacto').classList.remove('active');
    });
});

// Botón volver
const volverBtns = document.querySelectorAll('.volver');
volverBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        activarTab('estudio');
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
});

// Mostrar solo contacto al hacer clic en el menú superior
const menuContacto = document.getElementById('menu-contacto');
menuContacto.addEventListener('click', (e) => {
    e.preventDefault();
    sections.forEach(sec => sec.classList.remove('active'));
    document.getElementById('contacto').classList.add('active');
    tabs.forEach(tab => tab.classList.remove('active'));
});

// Validación del formulario de contacto
const form = document.querySelector('form[action="https://formspree.io/f/movdrrra"]');
if (form) {
    const nombreInput = form.nombre;
    const emailInput = form.email;
    const telefonoInput = form.telefono;
    const mensajeInput = form.mensaje;

    function limpiarErrores() {
        [nombreInput, emailInput, telefonoInput, mensajeInput].forEach(input => {
            input.setCustomValidity('');
        });
    }

    [nombreInput, emailInput, telefonoInput, mensajeInput].forEach(input => {
        input.addEventListener('input', () => input.setCustomValidity(''));
    });

    form.addEventListener('submit', function (e) {
        limpiarErrores();

        const nombre = nombreInput.value.trim();
        const email = emailInput.value.trim();
        const telefono = telefonoInput.value.trim();
        const mensaje = mensajeInput.value.trim();

        // Validación nombre
        if (!nombre) {
            e.preventDefault();
            nombreInput.setCustomValidity('El nombre completo es obligatorio.');
            nombreInput.reportValidity();
            return;
        }
        if (!/^[A-Za-zÁÉÍÓÚáéíóúÑñ\s\-\.]{2,60}$/.test(nombre)) {
            e.preventDefault();
            nombreInput.setCustomValidity('El nombre solo puede contener letras, espacios, guiones y puntos (2-60 caracteres).');
            nombreInput.reportValidity();
            return;
        }
        // Validación email
        if (!/^\S+@\S+\.\S+$/.test(email) || email.length > 80) {
            e.preventDefault();
            emailInput.setCustomValidity('Introduce un correo electrónico válido (máx. 80 caracteres).');
            emailInput.reportValidity();
            return;
        }
        // Validación teléfono
        if (!/^[0-9+\s()-]{6,20}$/.test(telefono)) {
            e.preventDefault();
            telefonoInput.setCustomValidity('Introduce un número de teléfono válido (6-20 caracteres).');
            telefonoInput.reportValidity();
            return;
        }
        // Validación mensaje
        if (mensaje.length < 5 || mensaje.length > 500) {
            e.preventDefault();
            mensajeInput.setCustomValidity('El mensaje debe tener entre 5 y 500 caracteres.');
            mensajeInput.reportValidity();
            return;
        }
        // Sanitización básica
        if (/<|>|script|onerror|onload|javascript:/i.test(nombre + email + telefono + mensaje)) {
            e.preventDefault();
            mensajeInput.setCustomValidity('No se permiten caracteres o palabras sospechosas.');
            mensajeInput.reportValidity();
        }
    });
} 