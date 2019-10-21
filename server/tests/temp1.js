
const puppeteer = require('puppeteer');
const C = require('./credentials.js');
const workspace_url = '#domain';
const TEAM_BUTTON = '#submit_team_domain';
const USERNAME_SELECTOR = '#email';
const PASSWORD_SELECTOR = '#password';
const CTA_SELECTOR = '#signin_btn';


async function startBrowser() {
  const browser = await puppeteer.launch({headless: false});
  const page = await browser.newPage();
  return {browser, page};
}

async function closeBrowser(browser) {
  return browser.close();
}

async function playTest(url) {
  const {browser, page} = await startBrowser();
  await page.goto(url);
  await page.click(workspace_url);
  await page.keyboard.type(C.workspace);
  await page.click(TEAM_BUTTON);
  //await page.waitForNavigation();
  await page.waitFor(1000);
  await page.click("#email");
  await page.keyboard.type(C.username);
  await page.click(PASSWORD_SELECTOR);
  await page.keyboard.type(C.password);
  await page.click(CTA_SELECTOR);
  await page.waitFor(1000);
  /*
  await page.evaluate(() => {
    document.querySelector('').click();
 })
 */
  const textsArray = await page.evaluate(
    () => [...document.querySelectorAll('body > div.p-client_container > div > div > div.p-workspace__sidebar > div > nav > div.p-channel_sidebar__list > div:nth-child(1) > div > div.c-scrollbar__hider > div > div > div:nth-child(5) > a')].map(elem => elem.innerText)
  );
  console.log(textsArray);
  // await page.goto("https://se-botwa.slack.com/messages/CPDF945Q9");
  // await page.waitFor(1000);
  // await page.click("")
  // await page.keyboard.type("hello");
  //console.count("hehiii");
  
  //await page.click("#p-channel_sidebar__bot");
  //await page.click('#ql-clipboard');
  //await page.keyboard.type(C.command);

  //await page.screenshot({path: ''});


}

(async () => {
  await playTest("https://slack.com/signin");
  process.exit(1);
})();
