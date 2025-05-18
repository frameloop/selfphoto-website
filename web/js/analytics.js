// Configuración de Google Analytics con respeto a la privacidad
window.dataLayer = window.dataLayer || [];
function gtag() {
    dataLayer.push(arguments);
}

// Configuración inicial
gtag('js', new Date());
gtag('config', 'G-Q5K5LM8VT5', {
    'anonymize_ip': true,
    'cookie_expires': 28 * 24 * 60 * 60, // 28 días
    'cookie_domain': 'selfphotostudio.es',
    'cookie_flags': 'SameSite=None;Secure',
    'send_page_view': true,
    'allow_google_signals': false,
    'allow_ad_personalization_signals': false,
    // Extensiones adicionales
    'link_attribution': true, // Mejora el seguimiento de enlaces
    'page_visibility': true, // Seguimiento de visibilidad de página
    'session_timeout': 1800, // Timeout de sesión a 30 minutos
    'site_speed_sample_rate': 100, // Muestra completa de velocidad del sitio
    'user_timing_sample_rate': 100, // Muestra completa de timing de usuario
    'content_group1': 'Self·Photo Studio' // Agrupación de contenido
});

// Función para registrar eventos personalizados
function trackEvent(category, action, label = null, value = null) {
    gtag('event', action, {
        'event_category': category,
        'event_label': label,
        'value': value,
        'non_interaction': false
    });
}

// Registrar eventos de navegación
document.addEventListener('DOMContentLoaded', () => {
    // Seguimiento de clicks en el menú
    const menuItems = document.querySelectorAll('.menu-superior a');
    menuItems.forEach(item => {
        item.addEventListener('click', () => {
            trackEvent('Navegación', 'Click Menú', item.textContent);
        });
    });

    // Seguimiento de clicks en las pestañas
    const tabs = document.querySelectorAll('.tab');
    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            trackEvent('Navegación', 'Click Tab', tab.textContent.trim());
        });
    });

    // Seguimiento de envíos del formulario
    const form = document.querySelector('form[action="https://formspree.io/f/movdrrra"]');
    if (form) {
        form.addEventListener('submit', () => {
            trackEvent('Formulario', 'Envío', 'Formulario de Contacto');
        });
    }

    // Seguimiento de tiempo en página
    let tiempoInicio = Date.now();
    window.addEventListener('beforeunload', () => {
        const tiempoTotal = Math.round((Date.now() - tiempoInicio) / 1000);
        trackEvent('Engagement', 'Tiempo en Página', null, tiempoTotal);
    });

    // Seguimiento de scroll
    let scrollMaximo = 0;
    window.addEventListener('scroll', () => {
        const scrollActual = Math.round((window.scrollY + window.innerHeight) / document.documentElement.scrollHeight * 100);
        if (scrollActual > scrollMaximo) {
            scrollMaximo = scrollActual;
            if (scrollMaximo % 25 === 0) { // Registrar cada 25% de scroll
                trackEvent('Engagement', 'Scroll', `${scrollMaximo}%`);
            }
        }
    });
}); 