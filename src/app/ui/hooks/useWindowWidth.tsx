import { useState, useEffect } from 'react'

interface WindowSizes {
    isSmallDevice: boolean
    isMediumDevice: boolean
    isLargeDevice: boolean
    isExtraLargeDevice: boolean
}

export function useWindowSize(): WindowSizes {
    // Estado para almacenar los tamaños de ventana
    const [windowSizes, setWindowSizes] = useState<WindowSizes>({
        isSmallDevice: false,
        isMediumDevice: true,
        isLargeDevice: false,
        isExtraLargeDevice: false
    })

    useEffect(() => {
        // Función para calcular y actualizar los tamaños
        const updateSizes = () => {
            setWindowSizes({
                isSmallDevice: window.innerWidth < 768,
                isMediumDevice: window.innerWidth >= 768,
                isLargeDevice: window.innerWidth > 993,
                isExtraLargeDevice: window.innerWidth > 1201
            })
        }

        // Actualizar tamaños inicialmente
        updateSizes()

        // Configurar listener para eventos de resize
        window.addEventListener('resize', updateSizes)

        // Limpiar al desmontar
        return () => window.removeEventListener('resize', updateSizes)
    }, []) // El efecto solo se ejecuta una vez al montar

    return windowSizes
}
