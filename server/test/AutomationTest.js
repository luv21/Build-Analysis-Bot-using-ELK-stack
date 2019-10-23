

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

before(async () => {
    browser = await puppeteer.launch({ headless: false })
    page = await browser.newPage()
})

describe('Browser Automated testing for USe case 1 and 2', () => {
    // it('returns Chrome Puppeteer Github repo as first search result', async () => {
    //     await page.goto('https://duckduckgo.com/', { waitUntil: 'networkidle2' })
    //     await page.type('input#search_form_input_homepage', 'chrome puppeteer', { delay: 50 })
    //     await page.click('input#search_button_homepage')
    //     await page.waitForSelector('.results--main #r1-0')
    //     const githubLink = await page.evaluate(() => document.querySelector('a.result__a').textContent.trim())
    //     assert(githubLink, 'https://github.com/GoogleChrome/puppeteer')
    //     await page.screenshot({ path: 'duckduckgo.png' })
    // }).timeout(10000)

    it('Post the  failure status of the build on user request ', async () => {
        // await page.goto(C.url, { waitUntil: 'networkidle2' })
        // await page.click(workspace_url);
        // await page.keyboard.type(C.workspace);

        // await page.click(TEAM_BUTTON);

        // // await page.waitForNavigation();
        // await page.waitFor(1000);
        await page.goto("https://se-botwa.slack.com/messages/CPDF945Q9", { waitUntil: 'networkidle2' });
        await page.click("#email");

        await page.keyboard.type(C.username);

        await page.click(PASSWORD_SELECTOR);

        await page.keyboard.type(C.password);

        await page.click(CTA_SELECTOR);

        await page.waitFor(5000);
        await page.click('#undefined > p');

        await page.keyboard.type(C.command + " " + C.build_fail);

        // 
        await page.keyboard.press('Enter');
        await page.keyboard.press('Enter');
        await page.waitFor(10000);


    }).timeout(100000)
    // })
    it('Post the  success status of the build on user request ', async () => {
        await page.keyboard.type(C.command + " " + C.build_pass);
        await page.keyboard.press('Enter');
        await page.keyboard.press('Enter');
        await page.waitFor(10000);
    }).timeout(100000)

    it('Get URL for dashboard', async () => {
        await page.keyboard.type(C.command + " " + C.URL_fail);
        await page.keyboard.press('Enter');
        await page.keyboard.press('Enter');
        await page.waitFor(10000);
    }).timeout(100000)

});

after(async () => {
    await browser.close()
})

