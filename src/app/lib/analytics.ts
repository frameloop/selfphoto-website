'use client';

// Configuración de Google Analytics con respeto a la privacidad
declare global {
  interface Window {
    dataLayer: unknown[];
    gtag: (...args: unknown[]) => void;
  }
}

// Función para inicializar Google Analytics
export const initializeGA = () => {
  window.dataLayer = window.dataLayer || [];
  function gtag(...args: unknown[]) {
    window.dataLayer.push(args);
  }
  window.gtag = gtag;

  // Configuración inicial
  gtag('js', new Date());
  gtag('config', 'G-Q5K5LM8VT5', {
    anonymize_ip: true,
    cookie_expires: 28 * 24 * 60 * 60, // 28 días
    cookie_domain: 'selfphotostudio.es',
    cookie_flags: 'SameSite=None;Secure',
    send_page_view: true,
    allow_google_signals: false,
    allow_ad_personalization_signals: false,
    // Extensiones adicionales
    link_attribution: true, // Mejora el seguimiento de enlaces
    page_visibility: true, // Seguimiento de visibilidad de página
    session_timeout: 1800, // Timeout de sesión a 30 minutos
    site_speed_sample_rate: 100, // Muestra completa de velocidad del sitio
    user_timing_sample_rate: 100, // Muestra completa de timing de usuario
    content_group1: 'Self·Photo Studio', // Agrupación de contenido
  });
};

// Función para registrar eventos personalizados
export const trackEvent = (
  category: string,
  action: string,
  label: string | null = null,
  value: number | null = null
) => {
  window.gtag('event', action, {
    event_category: category,
    event_label: label,
    value: value,
    non_interaction: false,
  });
};
