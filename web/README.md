
## 🔧 Scripts Disponibles
- `npm start`: Inicia el servidor de desarrollo
- `npm test`: Ejecuta las pruebas automatizadas

## 🛡️ Configuración de Seguridad

### Cabeceras HTTP
```javascript
{
    'Content-Security-Policy': '...',
    'X-Frame-Options': 'SAMEORIGIN',
    'X-Content-Type-Options': 'nosniff',
    'Strict-Transport-Security': 'max-age=31536000; includeSubDomains; preload',
    'X-XSS-Protection': '1; mode=block',
    'Referrer-Policy': 'strict-origin-when-cross-origin',
    'Permissions-Policy': 'geolocation=(), microphone=(), camera=(), payment=(), usb=()'
}
```

### Optimización de Caché
```apache
ExpiresByType image/jpg "access plus 1 year"
ExpiresByType image/jpeg "access plus 1 year"
ExpiresByType image/gif "access plus 1 year"
ExpiresByType image/png "access plus 1 year"
ExpiresByType text/css "access plus 1 month"
ExpiresByType application/javascript "access plus 1 month"
```

## 🌐 Despliegue
El sitio está preparado para ser desplegado en:
- Servidores Apache (usando la configuración .htaccess)
- Servidores Node.js
- Servicios de hosting estático

### Requisitos de Apache
- mod_headers
- mod_rewrite
- mod_deflate
- mod_expires
- mod_evasive20 (opcional, para protección contra ataques)

## 🤝 Contribución
1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📝 Licencia
Este proyecto está bajo la Licencia ISC.

## 📞 Contacto
[INFORMACIÓN DE CONTACTO]

---
Desarrollado con ❤️ para Self·Photo Studio