const puppeteer = require('puppeteer');
const path = require('path');

(async () => {
const browser = await puppeteer.launch({ args: ['--no-sandbox', '--disable-setuid-sandbox'] });
const page = await browser.newPage();

// Set screen size for 16:9 landscape aspect ratio (typical for poster/slides)
await page.setViewport({width: 1920, height: 1080});

const filePath = `file://${path.join(__dirname, 'index.html')}`;
// networkidle0 ensures fonts and external assets are fully loaded
await page.goto(filePath, { waitUntil: 'networkidle0' });

await page.pdf({
    path: 'poster.pdf',
    width: '1920px',
    height: '1080px',
    printBackground: true,
    pageRanges: '1'
});
await browser.close();
})();