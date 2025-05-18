const puppeteer = require('puppeteer');

(async () => {
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();
    await page.goto('http://localhost:3000');

    // Ir a la sección de contacto
    await page.click('#menu-contacto');
    await page.waitForSelector('form[action="https://formspree.io/f/movdrrra"]');

    // Casos de prueba
    const tests = [
        {
            nombre: '',
            email: '',
            mensaje: '',
            esperado: 'El nombre solo puede contener letras',
            descripcion: 'Campos vacíos'
        },
        {
            nombre: '<script>',
            email: 'test@test.com',
            mensaje: 'Hola',
            esperado: 'No se permiten caracteres o palabras sospechosas',
            descripcion: 'Nombre con caracteres peligrosos'
        },
        {
            nombre: 'Juan',
            email: 'noesuncorreo',
            mensaje: 'Hola',
            esperado: 'Introduce un correo electrónico válido',
            descripcion: 'Email inválido'
        },
        {
            nombre: 'Juan',
            email: 'test@test.com',
            mensaje: 'Hi',
            esperado: 'El mensaje debe tener entre 5 y 500 caracteres',
            descripcion: 'Mensaje demasiado corto'
        },
        {
            nombre: 'Juan',
            email: 'test@test.com',
            mensaje: 'Hola, este es un mensaje válido.',
            esperado: '',
            descripcion: 'Datos válidos'
        }
    ];

    for (const test of tests) {
        // Rellenar el formulario
        await page.evaluate(() => {
            document.getElementById('nombre').value = '';
            document.getElementById('email').value = '';
            document.getElementById('mensaje').value = '';
        });
        await page.type('#nombre', test.nombre);
        await page.type('#email', test.email);
        await page.type('#mensaje', test.mensaje);
        await page.click('button[type="submit"]');
        await page.waitForTimeout(500);
        const error = await page.$eval('#form-errores', el => el.innerText).catch(() => '');
        if (test.esperado) {
            if (error.includes(test.esperado)) {
                console.log(`✅ [${test.descripcion}] Mensaje de error detectado correctamente.`);
            } else {
                console.log(`❌ [${test.descripcion}] FALLO. Esperado: "${test.esperado}". Obtenido: "${error}"`);
            }
        } else {
            if (!error) {
                console.log(`✅ [${test.descripcion}] Sin errores, datos válidos.`);
            } else {
                console.log(`❌ [${test.descripcion}] FALLO. No esperaba errores, pero se obtuvo: "${error}"`);
            }
        }
    }

    await browser.close();
})(); 