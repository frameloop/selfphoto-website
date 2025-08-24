import fs from 'fs';
import path from 'path';

export default function Home({ htmlContent }) {
    return (
        <div dangerouslySetInnerHTML={{ __html: htmlContent }} />
    );
}

export async function getStaticProps() {
    try {
        const htmlPath = path.join(process.cwd(), 'web', 'index.html');
        const htmlContent = fs.readFileSync(htmlPath, 'utf8');

        return {
            props: {
                htmlContent,
            },
        };
    } catch (error) {
        console.error('Error reading HTML file:', error);
        return {
            props: {
                htmlContent: '<h1>Error loading content</h1>',
            },
        };
    }
}
