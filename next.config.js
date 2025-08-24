/** @type {import('next').NextConfig} */
const nextConfig = {
    // Configuración mínima para evitar errores
    experimental: {
        // Deshabilitar características experimentales
    },
    // Usar tu servidor personalizado en lugar de Next.js
    async rewrites() {
        return [
            {
                source: '/(.*)',
                destination: '/api/server',
            },
        ];
    },
    // No generar páginas estáticas
    output: 'standalone',
    // Deshabilitar optimizaciones de Next.js
    swcMinify: false,
    compress: false,
}

module.exports = nextConfig
