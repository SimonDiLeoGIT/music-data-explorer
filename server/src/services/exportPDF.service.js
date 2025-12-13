class ExportPDFService {
  async generatePDF(html, styles) {
    const fullHTML = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="UTF-8">
          <style>
            ${styles}
          </style>
        </head>
        <body>
          ${html}
        </body>
      </html>`;

    let browser = null;

    try {
      const isVercel = process.env.VERCEL === "1";

      if (isVercel) {
        const puppeteer = await import("puppeteer-core");
        const chromium = await import("@sparticuz/chromium");

        browser = await puppeteer.default.launch({
          args: [...chromium.default.args],
          defaultViewport: chromium.default.defaultViewport,
          executablePath: await chromium.default.executablePath(),
          headless: chromium.default.headless,
        });
      } else {
        const puppeteer = await import("puppeteer");

        browser = await puppeteer.default.launch({
          headless: true,
          args: ["--no-sandbox", "--disable-setuid-sandbox"],
        });
      }

      const page = await browser.newPage();
      await page.setContent(fullHTML, { waitUntil: "networkidle0" });

      await new Promise((resolve) => setTimeout(resolve, 1000));

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

      return pdf;
    } catch (error) {
      throw new Error(`PDF generation failed: ${error.message}`);
    } finally {
      if (browser) {
        await browser.close();
      }
    }
  }
}

export default new ExportPDFService();
