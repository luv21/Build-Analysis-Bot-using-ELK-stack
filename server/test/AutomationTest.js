

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

    it('Post the  failure status of the build on user request ', async () => {

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