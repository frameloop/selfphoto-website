'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { trackEvent } from '@/app/lib/analytics'
import { FormattedCalendarEvent } from '@/types/calendar'
import { ScheduleClient } from '@/app/(home)/reservas/ScheduleClient'

export default function TabSection({
    formattedEvents
}: {
    formattedEvents: FormattedCalendarEvent[]
}) {
    const [activeSection, setActiveSection] = useState('estudio')
    const [showContacto, setShowContacto] = useState(false)

    useEffect(() => {
        // Registrar eventos iniciales
        const handleScrollEvent = () => {
            const scrollActual = Math.round(
                ((window.scrollY + window.innerHeight) /
                    document.documentElement.scrollHeight) *
                    100
            )
            if (scrollActual % 25 === 0) {
                trackEvent('Engagement', 'Scroll', `${scrollActual}%`)
            }
        }

        window.addEventListener('scroll', handleScrollEvent)
        const tiempoInicio = Date.now()

        window.addEventListener('beforeunload', () => {
            const tiempoTotal = Math.round((Date.now() - tiempoInicio) / 1000)
            trackEvent('Engagement', 'Tiempo en Página', null, tiempoTotal)
        })

        return () => {
            window.removeEventListener('scroll', handleScrollEvent)
            window.removeEventListener('beforeunload', () => {})
        }
    }, [])

    const handleTabClick = (section: string) => {
        setActiveSection(section)
        setShowContacto(false)
        window.scrollTo({ top: 0, behavior: 'smooth' })
        trackEvent('Navegación', 'Click Tab', section)
    }

    const handleVolverClick = () => {
        setActiveSection('estudio')
        setShowContacto(false)
        window.scrollTo({ top: 0, behavior: 'smooth' })
    }

    const handleContactoClick = (e: React.MouseEvent) => {
        e.preventDefault()
        setShowContacto(true)
        setActiveSection('')
        trackEvent('Navegación', 'Click Menú', 'Contacto')
    }

    const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const form = e.currentTarget
        let valido = true
        const mensajes: string[] = []

        const nombre = (
            form.elements.namedItem('name') as HTMLInputElement
        ).value.trim()
        const email = (
            form.elements.namedItem('_replyto') as HTMLInputElement
        ).value.trim()
        const mensaje = (
            form.elements.namedItem('message') as HTMLTextAreaElement
        ).value.trim()

        // Validación nombre
        if (!/^[A-Za-zÁÉÍÓÚáéíóúÑñ\s\-\.]{2,60}$/.test(nombre)) {
            valido = false
            mensajes.push(
                'El nombre solo puede contener letras, espacios, guiones y puntos (2-60 caracteres).'
            )
        }

        // Validación email
        if (!/^\S+@\S+\.\S+$/.test(email) || email.length > 80) {
            valido = false
            mensajes.push(
                'Introduce un correo electrónico válido (máx. 80 caracteres).'
            )
        }

        // Validación mensaje
        if (mensaje.length < 5 || mensaje.length > 500) {
            valido = false
            mensajes.push('El mensaje debe tener entre 5 y 500 caracteres.')
        }

        // Sanitización básica
        if (
            /<|>|script|onerror|onload|javascript:/i.test(
                nombre + email + mensaje
            )
        ) {
            valido = false
            mensajes.push('No se permiten caracteres o palabras sospechosas.')
        }

        // Mostrar errores
        let errorDiv = document.getElementById('form-errores')
        if (!errorDiv) {
            errorDiv = document.createElement('div')
            errorDiv.id = 'form-errores'
            errorDiv.style.color = 'red'
            errorDiv.style.marginBottom = '1rem'
            form.insertBefore(errorDiv, form.firstChild)
        }

        if (!valido) {
            errorDiv.innerHTML = mensajes.join('<br>')
            return
        } else {
            errorDiv.innerHTML = ''
            trackEvent('Formulario', 'Envío', 'Formulario de Contacto')
            form.submit()
        }
    }

    return (
        <>
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
                        <a onClick={() => handleTabClick('reserva')}>
                            {' '}
                            Reserva
                        </a>
                        <a
                            href="#"
                            id="menu-contacto"
                            onClick={handleContactoClick}
                        >
                            Contacto
                        </a>
                    </nav>
                </div>
                <div className="logo">
                    <div className="logo-linea1">
                        <span className="negro">Self·Photo</span>
                    </div>
                    <div className="logo-linea2">
                        <span className="naranja">Studio</span>
                    </div>
                </div>
            </header>

            <div className="tabs">
                <button
                    className={`tab ${
                        activeSection === 'estudio' ? 'active' : ''
                    }`}
                    onClick={() => handleTabClick('estudio')}
                >
                    <span className="icono">
                        {/* Casa */}
                        <svg
                            width="28"
                            height="28"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M3 10.75L12 4l9 6.75"
                                stroke="#1a1a1a"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                            <path
                                d="M4 10.75V20a1 1 0 001 1h4.5a.5.5 0 00.5-.5V15a1 1 0 011-1h2a1 1 0 011 1v5.5a.5.5 0 00.5.5H19a1 1 0 001-1V10.75"
                                stroke="#1a1a1a"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </svg>
                    </span>{' '}
                    Estudio
                </button>

                <button
                    className={`tab ${
                        activeSection === 'sesiones' ? 'active' : ''
                    }`}
                    onClick={() => handleTabClick('sesiones')}
                >
                    <span className="icono">
                        {/* Cámara */}
                        <svg
                            width="28"
                            height="28"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <rect
                                x="3"
                                y="7"
                                width="18"
                                height="13"
                                rx="2"
                                stroke="#1a1a1a"
                                strokeWidth="2"
                            />
                            <circle
                                cx="12"
                                cy="13.5"
                                r="3.5"
                                stroke="#1a1a1a"
                                strokeWidth="2"
                            />
                            <path
                                d="M8 7V5a1 1 0 011-1h6a1 1 0 011 1v2"
                                stroke="#1a1a1a"
                                strokeWidth="2"
                            />
                        </svg>
                    </span>{' '}
                    Sesiones
                </button>
                <button
                    className={`tab ${
                        activeSection === 'precios' ? 'active' : ''
                    }`}
                    onClick={() => handleTabClick('precios')}
                >
                    <span className="icono">
                        {/* Etiqueta */}
                        <svg
                            width="28"
                            height="28"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M20.59 13.41l-7.3 7.3a2 2 0 01-2.83 0l-7.3-7.3a2 2 0 010-2.83l7.3-7.3a2 2 0 012.83 0l7.3 7.3a2 2 0 010 2.83z"
                                stroke="#1a1a1a"
                                strokeWidth="2"
                            />
                            <circle cx="8.5" cy="8.5" r="1.5" fill="#1a1a1a" />
                        </svg>
                    </span>{' '}
                    Precios
                </button>
                <button
                    className={`tab ${
                        activeSection === 'team' ? 'active' : ''
                    }`}
                    onClick={() => handleTabClick('team')}
                >
                    <span className="icono">
                        {/* Grupo personas */}
                        <svg
                            width="28"
                            height="28"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <circle
                                cx="7"
                                cy="10"
                                r="3"
                                stroke="#1a1a1a"
                                strokeWidth="2"
                            />
                            <circle
                                cx="17"
                                cy="10"
                                r="3"
                                stroke="#1a1a1a"
                                strokeWidth="2"
                            />
                            <path
                                d="M2 20v-1a4 4 0 014-4h2a4 4 0 014 4v1"
                                stroke="#1a1a1a"
                                strokeWidth="2"
                            />
                            <path
                                d="M14 20v-1a4 4 0 014-4h2a4 4 0 014 4v1"
                                stroke="#1a1a1a"
                                strokeWidth="2"
                            />
                        </svg>
                    </span>{' '}
                    Team
                </button>
            </div>

            <main>
                <section
                    id="estudio"
                    className={`tab-section ${
                        activeSection === 'estudio' ? 'active' : ''
                    }`}
                >
                    <h2>Nuestro Estudio</h2>
                    <p>
                        Un espacio diseñado para capturar momentos únicos,
                        equipado con la última tecnología en fotografía y un
                        sistema automatizado que te permite ser el protagonista
                        de tu propia sesión.
                    </p>
                    <div className="estudio-grid">
                        <div>
                            <h3>Equipamiento</h3>
                            <ul>
                                <li>Cámara profesional automatizada</li>
                                <li>Iluminación LED de última generación</li>
                                <li>Fondos intercambiables</li>
                                <li>Sistema de visualización instantánea</li>
                            </ul>
                        </div>
                        <div>
                            <h3>Espacio</h3>
                            <ul>
                                <li>50m² de área de shooting</li>
                                <li>Vestuarios</li>
                                <li>Área de maquillaje</li>
                                <li>Zona de espera confortable</li>
                            </ul>
                        </div>
                    </div>
                    <button className="volver" onClick={handleVolverClick}>
                        Volver
                    </button>
                </section>

                <section
                    id="sesiones"
                    className={`tab-section ${
                        activeSection === 'sesiones' ? 'active' : ''
                    }`}
                >
                    <h2>Nuestras Sesiones</h2>
                    <p>
                        Descubre la magia de nuestras sesiones fotográficas
                        automatizadas. ¡Sonríe y dispara!
                    </p>
                    <div className="sesiones-galeria">
                        {[...Array(9)].map((_, i) => (
                            <figure key={i + 1}>
                                <Image
                                    src={`/images/ejemplo${i + 1}.jpeg`}
                                    alt={`Self-Photo Studio ${i + 1}`}
                                    width={300}
                                    height={300}
                                    style={{ objectFit: 'cover' }}
                                />
                            </figure>
                        ))}
                    </div>
                    <button className="volver" onClick={handleVolverClick}>
                        Volver
                    </button>
                </section>

                <section
                    id="reserva"
                    className={`tab-section ${
                        activeSection === 'reserva' ? 'active' : ''
                    }`}
                >
                    <h2>Reservas</h2>
                    <ScheduleClient initialEvents={formattedEvents || []} />
                    <button className="volver" onClick={handleVolverClick}>
                        Volver
                    </button>
                </section>

                <section
                    id="precios"
                    className={`tab-section ${
                        activeSection === 'precios' ? 'active' : ''
                    }`}
                >
                    <h2>Precios</h2>
                    <div className="precios-grid">
                        <div className="precios-wrapper">
                            <div className="precio-card">
                                <h3>
                                    BRONCE <span>35€</span>
                                </h3>
                                <ul>
                                    <li>
                                        <i className="fa-regular fa-clock icono-reloj"></i>{' '}
                                        20 min de Sesión
                                    </li>
                                    <li>
                                        <i className="fa-solid fa-print icono-impresora"></i>{' '}
                                        2 Fotos Impresas
                                    </li>
                                    <li>
                                        <i className="fa-regular fa-clock icono-reloj"></i>{' '}
                                        10 min de Selección
                                    </li>
                                    <li>
                                        <i className="fa-solid fa-cloud icono-nube"></i>{' '}
                                        Todas las fotos en la nube
                                    </li>
                                </ul>
                                <p>1 persona incl. / máx. 5*</p>
                            </div>
                            <div className="precio-card">
                                <h3>
                                    PLATA <span>50€</span>
                                </h3>
                                <ul>
                                    <li>
                                        <i className="fa-regular fa-clock icono-reloj"></i>{' '}
                                        30 min de Sesión
                                    </li>
                                    <li>
                                        <i className="fa-solid fa-print icono-impresora"></i>{' '}
                                        3 Fotos Impresas
                                    </li>
                                    <li>
                                        <i className="fa-regular fa-clock icono-reloj"></i>{' '}
                                        10 min de Selección
                                    </li>
                                    <li>
                                        <i className="fa-solid fa-cloud icono-nube"></i>{' '}
                                        Todas las fotos en la nube
                                    </li>
                                </ul>
                                <p>2 personas incl. / máx. 5*</p>
                            </div>
                            <div className="precio-card">
                                <h3>
                                    ORO <span>65€</span>
                                </h3>
                                <ul>
                                    <li>
                                        <i className="fa-regular fa-clock icono-reloj"></i>{' '}
                                        45 min de Sesión
                                    </li>
                                    <li>
                                        <i className="fa-solid fa-print icono-impresora"></i>{' '}
                                        5 Fotos Impresas
                                    </li>
                                    <li>
                                        <i className="fa-regular fa-clock icono-reloj"></i>{' '}
                                        10 min de Selección
                                    </li>
                                    <li>
                                        <i className="fa-solid fa-cloud icono-nube"></i>{' '}
                                        Todas las fotos en la nube
                                    </li>
                                </ul>
                                <p>2 personas incl. / máx. 5*</p>
                            </div>
                            <div className="precio-card">
                                <h3>
                                    ORO + MASCOTAS <span>80€</span>
                                </h3>
                                <ul>
                                    <li>
                                        <i className="fa-regular fa-clock icono-reloj"></i>{' '}
                                        60 min de Sesión
                                    </li>
                                    <li>
                                        <i className="fa-solid fa-print icono-impresora"></i>{' '}
                                        6 Fotos Impresas
                                    </li>
                                    <li>
                                        <i className="fa-regular fa-clock icono-reloj"></i>{' '}
                                        10 min de Selección
                                    </li>
                                    <li>
                                        <i className="fa-solid fa-cloud icono-nube"></i>{' '}
                                        Todas las fotos en la nube
                                    </li>
                                </ul>
                                <p>2 personas incl. / máx. 5 + mascota*</p>
                            </div>
                        </div>
                        <div className="extras-card">
                            <h3>Extras</h3>
                            <ul className="extras-list">
                                <li>
                                    <span className="icono-extra">
                                        <i className="fa-solid fa-user-plus"></i>
                                    </span>
                                    <div>
                                        <span className="extra-titulo">
                                            Persona Extra
                                        </span>
                                        <span className="extra-desc">
                                            10€ (De 2 a 99 años)
                                        </span>
                                    </div>
                                </li>
                                <li>
                                    <span className="icono-extra">
                                        <i className="fa-solid fa-paw"></i>
                                    </span>
                                    <div>
                                        <span className="extra-titulo">
                                            Mascota Extra
                                        </span>
                                        <span className="extra-desc">
                                            10€ (De 0 a 99 años)
                                        </span>
                                    </div>
                                </li>
                                <li>
                                    <span className="icono-extra">
                                        <i className="fa-solid fa-image"></i>
                                    </span>
                                    <div>
                                        <span className="extra-titulo">
                                            Revelado PRO
                                        </span>
                                        <span className="extra-desc">
                                            5€/foto (Máx. 20 fotos)
                                        </span>
                                    </div>
                                </li>
                                <li>
                                    <span className="icono-extra">
                                        <i className="fa-solid fa-arrows-rotate"></i>
                                    </span>
                                    <div>
                                        <span className="extra-titulo">
                                            Cambio de Fondo
                                        </span>
                                        <span className="extra-desc">
                                            10€ (Máx. dos cambios)
                                        </span>
                                    </div>
                                </li>
                                <li>
                                    <span className="icono-extra">
                                        <i className="fa-solid fa-paintbrush"></i>
                                    </span>
                                    <div>
                                        <span className="extra-titulo">
                                            MakeUp PRO
                                        </span>
                                        <span className="extra-desc">
                                            Consultar (Reserva/pago x
                                            adelantado)
                                        </span>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <button className="volver" onClick={handleVolverClick}>
                        Volver
                    </button>
                </section>

                <section
                    id="team"
                    className={`tab-section ${
                        activeSection === 'team' ? 'active' : ''
                    }`}
                >
                    <h2>Nuestro Equipo</h2>
                    <p>
                        Somos Quique y Cris, un equipo apasionado por la
                        fotografía y comprometido con hacer de tu sesión una
                        experiencia única y divertida.
                    </p>
                    <div className="team-foto">
                        <Image
                            src="/images/team.jpg"
                            alt="Equipo Self-Photo Studio"
                            width={350}
                            height={350}
                            style={{ objectFit: 'cover' }}
                        />
                    </div>
                    <p>
                        Nos encargamos de que tu experiencia en el estudio sea
                        memorable, guiándote durante toda la sesión para
                        conseguir las mejores fotos.
                    </p>
                </section>

                <section
                    id="contacto"
                    className={`tab-section ${showContacto ? 'active' : ''}`}
                >
                    <h2>Contacto</h2>
                    <p>
                        Si tienes alguna pregunta o necesitas más información,
                        no dudes en contactarnos.
                    </p>
                    <form
                        action="https://formspree.io/f/movdrrra"
                        method="POST"
                        onSubmit={handleFormSubmit}
                        noValidate
                    >
                        <label htmlFor="nombre">Nombre completo</label>
                        <input
                            type="text"
                            id="nombre"
                            name="name"
                            required
                            maxLength={60}
                        />
                        <label htmlFor="email">Correo electrónico</label>
                        <input
                            type="email"
                            id="email"
                            name="_replyto"
                            required
                            maxLength={80}
                        />
                        <label htmlFor="mensaje">Mensaje</label>
                        <textarea
                            id="mensaje"
                            name="message"
                            rows={5}
                            required
                            maxLength={500}
                        ></textarea>
                        <button type="submit">Enviar mensaje</button>
                    </form>
                    <h2>Dirección</h2>
                    <p>Avenida Tarragona, 138, Cunit, Tarragona</p>
                    <div className="mapa-container">
                        <iframe
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1501.12615765268!2d1.6348286114930175!3d41.19447238928082!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x12a3894881d57ba5%3A0x96a1f9ad28b7161b!2sSelf%C2%B7Photo%20Studio%20by%20emestudi!5e0!3m2!1ses!2ses!4v1747561761884!5m2!1ses!2ses"
                            width={600}
                            height={450}
                            allowFullScreen
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                        ></iframe>
                    </div>
                </section>
            </main>
        </>
    )
}
