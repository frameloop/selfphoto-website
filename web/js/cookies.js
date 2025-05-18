// Gestión del banner de cookies
function mostrarBannerCookies() {
    const banner = document.getElementById('cookie-banner');
    if (!localStorage.getItem('cookiesAceptadas')) {
        banner.style.display = 'block';
    } else {
        banner.style.display = 'none';
    }
}

function aceptarCookies() {
    console.log('🟢 Click en aceptar cookies');
    localStorage.setItem('cookiesAceptadas', 'true');
    localStorage.setItem('fechaAceptacion', new Date().toISOString());
    mostrarBannerCookies();
    if (typeof gtag === 'function') {
        gtag('consent', 'update', {
            'analytics_storage': 'granted'
        });
    }
}

function rechazarCookies() {
    console.log('🟠 Click en rechazar cookies');
    localStorage.setItem('cookiesAceptadas', 'false');
    mostrarBannerCookies();
    if (typeof gtag === 'function') {
        gtag('consent', 'update', {
            'analytics_storage': 'denied'
        });
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const cookiesAceptadas = localStorage.getItem('cookiesAceptadas');
    const fechaAceptacion = localStorage.getItem('fechaAceptacion');
    if (fechaAceptacion) {
        const fecha = new Date(fechaAceptacion);
        const seisMeses = 180 * 24 * 60 * 60 * 1000;
        if (new Date() - fecha > seisMeses) {
            localStorage.removeItem('cookiesAceptadas');
            localStorage.removeItem('fechaAceptacion');
        }
    }
    mostrarBannerCookies();
    if (typeof gtag === 'function') {
        gtag('consent', 'default', {
            'analytics_storage': cookiesAceptadas === 'true' ? 'granted' : 'denied'
        });
    }
    // Añadir listeners a los botones del banner de cookies
    const btnAceptar = document.getElementById('btn-aceptar-cookies');
    const btnRechazar = document.getElementById('btn-rechazar-cookies');
    if (btnAceptar) btnAceptar.addEventListener('click', aceptarCookies);
    if (btnRechazar) btnRechazar.addEventListener('click', rechazarCookies);
}); 