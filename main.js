const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ headless: false, slowMo: 50 });
  const context = await browser.newContext();
  // Open new page
  const page = await context.newPage();
  // Go to https://web.gencat.cat/ca/inici
  await page.goto('https://web.gencat.cat/ca/inici');
  // Click input[type="search"]
  await page.click('input[type="search"]');
  // Fill input[type="search"]
  await page.fill('input[type="search"]', 'agenda cultural');
  // Click [aria-label="Cercar"]
  await Promise.all([
    page.waitForNavigation(/*{ url: 'https://web.gencat.cat/ca/cercador?q=&lr=lang_ca' }*/),
    page.click('[aria-label="Cercar"]'),
  ]);

  // ---------------------
  await context.close();
  await browser.close();
})();
