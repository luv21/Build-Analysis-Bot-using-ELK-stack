//npm install 

const puppeteer = require('puppeteer');

(async () => {

    const browser = await puppeteer.launch({headless:false});

    const page = await browser.newPage();

    await page.goto("https://slack.com/signin");

    //await page.screenshot({path: 'example.png'});


    await browser.close();


})();