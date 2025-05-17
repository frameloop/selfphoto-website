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