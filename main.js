const puppeteer = require('puppeteer');

(async () => {
    const browser = await puppeteer.launch(/*{headless: false}*/);
    const page = await browser.newPage();
    await page.goto('https://www.facebook.com/pg/pehapkari/events/');
    await page.setViewport({
        width: 1200,
        height: 800
    });

    page.evaluate(_ => {
        window.scrollBy(0, 2000);
    });

    await page.waitFor(3000);

    // Get the "viewport" of the page, as reported by the page.
    const data = await page.evaluate(() => {

        const parseEvents = (wrapperElementId) => {
            let eventIds = [];
            Array.from(document.querySelectorAll('#' + wrapperElementId + ' a')).forEach(function(el) {
                let eventUrl = el.getAttribute('href');

                if (eventUrl.startsWith('/events/')) {
                    let eventId = /\/events\/(\d+)\//g.exec(eventUrl);
                    eventIds.push(eventId[1]);
                }
            });

            return eventIds;
        };

        return {
            upcomingEvents: parseEvents('upcoming_events_card'),
            pastEvents: parseEvents('past_events_card'),
        };
    });
    console.log('Data:', data);

    await browser.close();
})();

