const puppeteer = require('puppeteer');
const path = require('path');

(async () => {
    console.log("Starting PDF generation...");
    
    // Launch browser with optimized settings for high-fidelity rendering
    const browser = await puppeteer.launch({ 
        headless: 'new',
        args: [
            '--no-sandbox', 
            '--disable-setuid-sandbox',
            '--disable-dev-shm-usage', // Helps prevent memory issues on some systems
            '--font-render-hinting=none' // Improves font consistency across platforms
        ] 
    });
    
    const page = await browser.newPage();
    
    // Set 1920x1080 resolution with a higher scale factor for crisper text/images in PDF
    await page.setViewport({
        width: 1920, 
        height: 1080,
        deviceScaleFactor: 1 
    });
    
    const filePath = `file://${path.join(__dirname, 'index.html')}`;
    
    // networkidle0 ensures all fonts, SVGs, and images are fully downloaded and rendered
    await page.goto(filePath, { waitUntil: 'networkidle0' });
    
    // Explicitly emulate print media to trigger our @media print CSS rules
    await page.emulateMediaType('print');
    
    // Generate the PDF
    await page.pdf({
        path: 'poster.pdf',
        width: '1920px',
        height: '1080px',
        printBackground: true, // Force background colors and gradients to render
        margin: { top: 0, right: 0, bottom: 0, left: 0 }, // CRUCIAL: Remove default browser print margins
        pageRanges: '1'
    });
    
    await browser.close();
    console.log("✨ PDF generated successfully at poster.pdf");
})();
