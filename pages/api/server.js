// Este archivo redirige todas las peticiones a tu servidor personalizado
export default function handler(req, res) {
    // Redirigir a tu servidor personalizado
    res.redirect(307, '/');
}
