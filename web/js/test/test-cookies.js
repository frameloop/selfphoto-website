const puppeteer = require('puppeteer');

(async () => {
    const browser = await puppeteer.launch({ headless: false }); // headless: false para ver la interacción
    const page = await browser.newPage();

    console.log('🧪 Iniciando pruebas del banner de cookies...\n');

    // Test 1: Banner visible al cargar la página
    console.log('Test 1: Verificar que el banner aparece al cargar la página...');
    await page.goto('http://localhost:3000');
    await page.waitForSelector('#cookie-banner');
    const bannerVisible = await page.evaluate(() => {
        const banner = document.getElementById('cookie-banner');
        return banner.style.display !== 'none';
    });
    console.log(bannerVisible ? '✅ Banner visible correctamente' : '❌ Banner no visible');

    // Test 2: Aceptar cookies
    console.log('\nTest 2: Probar aceptación de cookies...');
    await page.waitForSelector('#btn-aceptar-cookies', { visible: true });
    await page.evaluate(() => console.log('🟢 Botón aceptar visible en el DOM'));
    await page.click('#btn-aceptar-cookies');
    // Esperar a que localStorage se actualice
    let intentos = 0;
    let cookiesAceptadas = false;
    while (intentos < 10) {
        cookiesAceptadas = await page.evaluate(() => localStorage.getItem('cookiesAceptadas') === 'true');
        if (cookiesAceptadas) break;
        await new Promise(res => setTimeout(res, 200));
        intentos++;
    }
    const bannerOculto = await page.evaluate(() => {
        const banner = document.getElementById('cookie-banner');
        return banner.style.display === 'none';
    });
    console.log(bannerOculto && cookiesAceptadas ? '✅ Cookies aceptadas correctamente' : '❌ Error al aceptar cookies');

    // Test 3: Recargar página y verificar que el banner no aparece
    console.log('\nTest 3: Verificar persistencia de preferencias...');
    await page.reload();
    await new Promise(res => setTimeout(res, 500));
    const bannerNoVisible = await page.evaluate(() => {
        const banner = document.getElementById('cookie-banner');
        return banner.style.display === 'none';
    });
    console.log(bannerNoVisible ? '✅ Preferencias guardadas correctamente' : '❌ Error en persistencia de preferencias');

    // Test 4: Simular expiración de cookies
    console.log('\nTest 4: Simular expiración de preferencias...');
    await page.evaluate(() => {
        localStorage.removeItem('cookiesAceptadas');
        localStorage.removeItem('fechaAceptacion');
    });
    await page.reload();
    await new Promise(res => setTimeout(res, 500));
    const bannerReaparece = await page.evaluate(() => {
        const banner = document.getElementById('cookie-banner');
        return banner.style.display !== 'none';
    });
    console.log(bannerReaparece ? '✅ Banner reaparece correctamente' : '❌ Error al simular expiración');

    // Test 5: Rechazar cookies
    console.log('\nTest 5: Probar rechazo de cookies...');
    await page.waitForSelector('#btn-rechazar-cookies', { visible: true });
    await page.evaluate(() => console.log('🟢 Botón rechazar visible en el DOM'));
    await page.click('#btn-rechazar-cookies');
    // Esperar a que localStorage se actualice
    intentos = 0;
    let cookiesRechazadas = false;
    while (intentos < 10) {
        cookiesRechazadas = await page.evaluate(() => localStorage.getItem('cookiesAceptadas') === 'false');
        if (cookiesRechazadas) break;
        await new Promise(res => setTimeout(res, 200));
        intentos++;
    }
    console.log(cookiesRechazadas ? '✅ Cookies rechazadas correctamente' : '❌ Error al rechazar cookies');

    console.log('\n🧪 Pruebas completadas');
    await browser.close();
})(); 