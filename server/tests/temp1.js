//npm install 

//const puppeteer = require('puppeteer');
// const C = require('./credentials.js');
// const workspace_url = '#domain';
// const TEAM_BUTTON = '#submit_team_domain';
// const USERNAME_SELECTOR = '#email';
// const PASSWORD_SELECTOR = '#password';
// const CTA_SELECTOR = '#signin_btn';


// const puppeteer = require('puppeteer');
// (async () => {

//     const browser = await puppeteer.launch({headless: false});

//     const page = await browser.newPage();

//     await page.goto("https://slack.com/signin");

//     //page.setViewport({width: 1366, height: 768});

//     await page.screenshot({path: 'slack.png'});
    
//     await browser.close();

// })();

const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({headless: false});
  const page = await browser.newPage();
  await page.goto('https://slack.com/signin');
  await page.screenshot({path: 'slack.png'});

  await browser.close();
})();



//   async function startBrowser() {
//   const browser = await puppeteer.launch({headless: false});
//   const page = await browser.newPage();
//   return {browser, page};
// }

// async function closeBrowser(browser) {
//   return browser.close();
// }

// async function playTest(url) {
//   const {browser, page} = await startBrowser();
//   page.setViewport({width: 1366, height: 768});
//   await page.goto(url);
//   await page.click(workspace_url);
//   await page.keyboard.type(C.workspace);
//   await page.click(TEAM_BUTTON);
//   await page.waitForNavigation();
//   await page.screenshot({path: 'slack.png'});
  
//   await page.click(USERNAME_SELECTOR);
//   await page.keyboard.type(C.username);
//   await page.click(PASSWORD_SELECTOR);
//   await page.keyboard.type(C.password);
//   await page.click(CTA_SELECTOR);
//   await page.waitForNavigation();

//   await page.click('p-channel_sidebar_name');
//   await page.click('ql-clipboard');
//   await page.keyboard.type(C.command);



//   //await page.screenshot({path: ''});


// }

// (async () => {
//   await playTest("https://slack.com/signin");
//   process.exit(1);
// })();