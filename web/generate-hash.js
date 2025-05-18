const crypto = require('crypto');

// El script de configuración de Google Analytics
const script = `window.dataLayer = window.dataLayer || [];
function gtag() {
    dataLayer.push(arguments);
}
gtag('js', new Date());
gtag('config', 'G-Q5K5LM8VT5', {
    'anonymize_ip': true,
    'cookie_expires': 28 * 24 * 60 * 60,
    'cookie_domain': 'selfphotostudio.es',
    'cookie_flags': 'SameSite=None;Secure',
    'send_page_view': true,
    'allow_google_signals': false,
    'allow_ad_personalization_signals': false,
    'link_attribution': true,
    'page_visibility': true,
    'session_timeout': 1800,
    'site_speed_sample_rate': 100,
    'user_timing_sample_rate': 100,
    'content_group1': 'Self·Photo Studio'
});`;

// Generar el hash SHA256
const hash = crypto.createHash('sha256').update(script).digest('base64');

console.log('Hash SHA256 del script de Google Analytics:');
console.log(`'sha256-${hash}'`); 