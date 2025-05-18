const http = require('http');

const options = {
    hostname: 'localhost',
    port: 3000,
    method: 'HEAD',
    path: '/'
};

const req = http.request(options, (res) => {
    console.log('Estado:', res.statusCode);
    console.log('\nCabeceras de seguridad:');
    console.log('----------------------');

    const securityHeaders = [
        'content-security-policy',
        'x-frame-options',
        'x-content-type-options',
        'strict-transport-security',
        'x-xss-protection',
        'referrer-policy',
        'permissions-policy',
        'cache-control',
        'pragma',
        'x-permitted-cross-domain-policies',
        'cross-origin-embedder-policy',
        'cross-origin-opener-policy',
        'cross-origin-resource-policy'
    ];

    securityHeaders.forEach(header => {
        const value = res.headers[header];
        console.log(`${header}: ${value || 'No presente'}`);
    });
});

req.on('error', (e) => {
    console.error('Error:', e.message);
});

req.end(); 