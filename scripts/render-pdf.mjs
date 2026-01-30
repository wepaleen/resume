import { chromium } from "playwright";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function render(inputHtmlPath, outputPdfPath) {
  const browser = await chromium.launch();
  const page = await browser.newPage();

  await page.emulateMedia({
    media: "screen",
    colorScheme: "light",
    reducedMotion: "reduce",
  });

  const url = "file://" + path.resolve(inputHtmlPath);
  await page.goto(url, { waitUntil: "networkidle" });

  await page.pdf({
    path: outputPdfPath,
    format: "A4",
    printBackground: true,
    margin: { top: "12mm", right: "12mm", bottom: "12mm", left: "12mm" },
  });

  await browser.close();
}

await render("dist/index.html", "dist/resume.pdf");
await render("dist/ru/index.html", "dist/ru/resume.pdf");
