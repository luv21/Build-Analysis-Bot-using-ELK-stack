const puppeteer = require('puppeteer');
const C = require('./credentials.js');
const workspace_url = '#domain';
const TEAM_BUTTON = '#submit_team_domain';
const USERNAME_SELECTOR = '#email';
const PASSWORD_SELECTOR = '#password';
const CTA_SELECTOR = '#signin_btn';
const linkselector = "body > div.p-client_container > div > div > div.p-workspace__sidebar > div > nav > div.p-channel_sidebar__list > div:nth-child(1) > div > div.c-scrollbar__hider > div > div > div:nth-child(5) > a"


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
  await page.waitFor(2000);

  let texts1 = await page.evaluate(() => {
    let data1 = [];
    let elements = document.getElementsByClassName('c-link p-channel_sidebar__channel');
    for (var element of elements)
        data1.push(element.textContent);
    console.log(data1);
    return data1;
  });
  console.log(texts1);

  await page.goto("https://se-botwa.slack.com/messages/CPDF945Q9");
  await page.waitFor(2000);

  let texts2 = await page.evaluate(() => {
    let data2 = [];
    let elements = document.getElementsByClassName('p-message_input_field c-texty_input--multi_line c-texty_input ql-container focus');
    for (var element of elements)
        data2.push(element.textContent);
    console.log(data2);
    return data2;
  });
  console.log(texts2);

  await page.click('Message #bot');
  await page.keyboard.type("hello")
  /*
  let selector = 'input[name="username"]';
  await page.evaluate((selector) => document.querySelector(selector).click(), selector); 
  await page.evaluate('input[type="textbox"]')
  */
  //await page.click("#p-channel_sidebar__bot");
  //await page.click('#ql-clipboard');
  //await page.keyboard.type(C.command);

  //await page.screenshot({path: ''});

}

(async () => {
  await playTest("https://slack.com/signin");
  process.exit(1);
})();
