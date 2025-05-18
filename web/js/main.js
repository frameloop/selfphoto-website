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
    form.addEventListener('submit', function (e) {
        let valido = true;
        let mensajes = [];
        const nombre = form.nombre.value.trim();
        const email = form.email.value.trim();
        const mensaje = form.mensaje.value.trim();
        // Validación nombre
        if (!/^[A-Za-zÁÉÍÓÚáéíóúÑñ\s\-\.]{2,60}$/.test(nombre)) {
            valido = false;
            mensajes.push('El nombre solo puede contener letras, espacios, guiones y puntos (2-60 caracteres).');
        }
        // Validación email
        if (!/^\S+@\S+\.\S+$/.test(email) || email.length > 80) {
            valido = false;
            mensajes.push('Introduce un correo electrónico válido (máx. 80 caracteres).');
        }
        // Validación mensaje
        if (mensaje.length < 5 || mensaje.length > 500) {
            valido = false;
            mensajes.push('El mensaje debe tener entre 5 y 500 caracteres.');
        }
        // Sanitización básica
        if (/<|>|script|onerror|onload|javascript:/i.test(nombre + email + mensaje)) {
            valido = false;
            mensajes.push('No se permiten caracteres o palabras sospechosas.');
        }
        // Mostrar errores
        let errorDiv = document.getElementById('form-errores');
        if (!errorDiv) {
            errorDiv = document.createElement('div');
            errorDiv.id = 'form-errores';
            errorDiv.style.color = 'red';
            errorDiv.style.marginBottom = '1rem';
            form.insertBefore(errorDiv, form.firstChild);
        }
        if (!valido) {
            e.preventDefault();
            errorDiv.innerHTML = mensajes.join('<br>');
        } else {
            errorDiv.innerHTML = '';
        }
    });
} 