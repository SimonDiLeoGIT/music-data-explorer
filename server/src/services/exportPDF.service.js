class exportPDFService {
  async generatePDF(html, styles) {
    const fullHTML = `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="UTF-8">
            <style>${styles}</style>
          </head>
          <body>${html}</body>
        </html>
      `;

    const browser = await puppeteer.launch({
      headless: true,
      args: ["--no-sandbox", "--disable-setuid-sandbox"],
    });

    const page = await browser.newPage();
    await page.setContent(fullHTML, { waitUntil: "networkidle0" });

    await page.waitForTimeout(2000);

    const pdf = await page.pdf({
      format: "A4",
      printBackground: true,
      margin: {
        top: "20px",
        right: "20px",
        bottom: "20px",
        left: "20px",
      },
    });

    await browser.close();

    return pdf;
  }
}
