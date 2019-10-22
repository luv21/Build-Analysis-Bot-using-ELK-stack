

var chai = require("chai");
var expect = chai.expect;

const C = require('./credentials.js');
const workspace_url = '#domain';
const TEAM_BUTTON = '#submit_team_domain';
const USERNAME_SELECTOR = '#email';
const PASSWORD_SELECTOR = '#password';
const CTA_SELECTOR = '#signin_btn';
const url = 'https://slack.com/signin'

const assert = require('assert')
const puppeteer = require('puppeteer')


let browser
let page

async function startBrowser() {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  return { browser, page };
}

async function closeBrowser(browser) {
  return browser.close();
}


describe('Use Case Name', async (url) => {
  it('Post the  success status of the build on user request ', async () => {
    const { browser, page } = await startBrowser();
    await page.goto(C.url);
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

    // const title = await page.$x(linkselector);
    // let text = await page.evaluate(linkselector => linkselector.textContent, title[6]);
    // console.log(text)

    await page.goto("https://se-botwa.slack.com/messages/CPDF945Q9");
    await page.waitFor(5000);
    await page.click('#undefined > p');
    await page.keyboard.type(C.command + " " + build_pass);
    await page.keyboard.press('Enter');
    await page.keyboard.press('Enter');
    await page.waitFor(10000);

    await page.evaluate(() => document.querySelector('c-virtual_list__scroll_container').click());
    content = await page.evaluate(() => document.querySelector('c-virtual_list__scroll_container').innerHTML);
    assert.equal(content, [])









  });

  it('Post the  success status of the build on user request ', async () => {

    await page.goto(C.url);
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

    // const title = await page.$x(linkselector);
    // let text = await page.evaluate(linkselector => linkselector.textContent, title[6]);
    // console.log(text)

    await page.goto("https://se-botwa.slack.com/messages/CPDF945Q9");
    await page.waitFor(5000);
    await page.click('#undefined > p');
    await page.keyboard.type(C.command + " " + build_fail);
    await page.keyboard.press('Enter');
    await page.keyboard.press('Enter');
    await page.waitFor(10000);

    await page.evaluate(() => document.querySelector('c-virtual_list__scroll_container').click());
    content = await page.evaluate(() => document.querySelector('c-virtual_list__scroll_container').innerHTML);
    assert.equal(content, [])



  });
});

(async () => {
  //await playTest("https://slack.com/signin");
  process.exit(1);
})();
