import Link from 'next/link';
import Footer from '@/app/ui/components/Footer';

export const metadata = {
  title: 'Política de Cookies - Self·Photo Studio',
  description:
    'Política de cookies del estudio fotográfico Self·Photo Studio en Tarragona.',
};

export default function PoliticaCookies() {
  return (
    <div className="container">
      <header>
        <div className="header-top">
          <a
            href="https://www.emestudi.es"
            className="marca-emestudi"
            target="_blank"
            rel="noopener noreferrer"
          >
            emestudi
          </a>
          <nav className="menu-superior">
            <Link href="/">Volver al inicio</Link>
          </nav>
        </div>
      </header>

      <div className="politica-container">
        <h1>Política de Cookies</h1>

        <p>Última actualización: 18 de mayo de 2024</p>

        <h2>¿Qué son las cookies?</h2>
        <p>
          Las cookies son pequeños archivos de texto que los sitios web
          almacenan en su dispositivo cuando los visita. Se utilizan ampliamente
          para hacer que los sitios web funcionen de manera más eficiente y
          proporcionar información a los propietarios del sitio.
        </p>

        <h2>Tipos de cookies que utilizamos</h2>
        <ul>
          <li>
            <strong>Cookies esenciales:</strong> Necesarias para el
            funcionamiento básico del sitio web.
          </li>
          <li>
            <strong>Cookies de rendimiento:</strong> Nos ayudan a entender cómo
            los visitantes interactúan con nuestro sitio web.
          </li>
          <li>
            <strong>Cookies de funcionalidad:</strong> Permiten que el sitio web
            recuerde las elecciones que realiza para proporcionarle una
            experiencia más personalizada.
          </li>
          <li>
            <strong>Cookies de análisis:</strong> Utilizamos Google Analytics
            para analizar el uso del sitio web.
          </li>
        </ul>

        <h2>Google Analytics</h2>
        <p>
          Utilizamos Google Analytics para analizar el uso de nuestro sitio web.
          Google Analytics genera información estadística sobre el uso del sitio
          web mediante cookies. La información generada se utiliza para crear
          informes sobre el uso del sitio web.
        </p>
        <p>Configuración específica de Google Analytics en nuestro sitio:</p>
        <ul>
          <li>Anonimización de IPs activada</li>
          <li>Duración de cookies: 28 días</li>
          <li>Desactivación de señales de personalización de anuncios</li>
          <li>Cookies configuradas con flags de seguridad</li>
        </ul>

        <h2>¿Cómo controlar las cookies?</h2>
        <p>
          Puede controlar y/o eliminar las cookies según desee. Puede eliminar
          todas las cookies que ya están en su computadora y puede configurar la
          mayoría de los navegadores para evitar que se coloquen. Sin embargo,
          si hace esto, es posible que deba ajustar manualmente algunas
          preferencias cada vez que visite un sitio.
        </p>

        <h2>Sus derechos</h2>
        <p>De acuerdo con el RGPD, tiene derecho a:</p>
        <ul>
          <li>Acceder a sus datos personales</li>
          <li>Rectificar sus datos personales</li>
          <li>Solicitar la eliminación de sus datos personales</li>
          <li>Oponerse al procesamiento de sus datos personales</li>
          <li>
            Solicitar la limitación del procesamiento de sus datos personales
          </li>
          <li>Portabilidad de datos</li>
        </ul>

        <h2>Contacto</h2>
        <p>
          Si tiene alguna pregunta sobre nuestra política de cookies, puede
          contactarnos a través de nuestro formulario de contacto o enviando un
          correo electrónico a info@selfphotostudio.es
        </p>

        <Link href="/" className="volver">
          Volver al inicio
        </Link>
      </div>

      <Footer />
    </div>
  );
}
