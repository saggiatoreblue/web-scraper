const puppeteer = require('puppeteer');
const cheerio = require('cheerio');

const IMDB_URL = (keyword) => `https://www.imdb.com/search/title-text/?plot=${keyword}`;
let key = 'science fiction'.split(' ').join('+');
let posts = [];

(async () => {
    /* Initiate the Puppeteer browser */
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    await page.goto(IMDB_URL(key), { waitUntil: 'domcontentloaded' })
        .then(() => {
            const content = page.content();
            content.then((success) => {
                const $ = cheerio.load(success);
                $('.lister-item').each(function(index, elem) {
                    let title = $(this).find('.lister-item-header > a').text();
                    let year = $(this).find('.lister-item-year').text().replace(/[{()}]/g, '');
                    posts.push({index: index, title: title, year: year});
                });
            }).catch((error) => console.error(error));
        }).catch((error) => console.error(error));

    await browser.close();
})();

module.exports = posts;
