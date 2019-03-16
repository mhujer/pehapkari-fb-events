const puppeteer = require('puppeteer');

(async () => {
    const eventIds = [
        '1921124228010979',
        '2360678963966266',
        '344366143062801',
        '799941073678290',
        '249069149361168',
        '234748540811605',
        '554725398340518',
        '342162879917136',
        '2122598584718649',
        '579328219174315',
        '295040601216441',
        '2677594598917305'
    ];

    const browser = await puppeteer.launch({headless: false});
    const page = await browser.newPage();
    await page.goto('https://www.facebook.com/events/' + eventIds[0] + '/');

    // Get the "viewport" of the page, as reported by the page.
    const data = await page.evaluate(() => {

        const heading = document.getElementById('seo_h1_tag').textContent;
        const dateTime = document.querySelector('#event_time_info div[content]').getAttribute('content');
        const dateTimeString = document.querySelector('#event_time_info div[content]').textContent
        const location = document.querySelector('#event_summary #event_time_info').nextElementSibling.querySelector('span[style]').textContent;

        return {
            heading: heading,
            dateTime: dateTime,
            dateTimeString: dateTimeString,
            location: location
        };
    });
    console.log('Data:', data);

    //await page.screenshot({path: 'example.png'});

    await browser.close();
})();

