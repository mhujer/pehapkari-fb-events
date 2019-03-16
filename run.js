const puppeteer = require('puppeteer');

(async () => {
    const browser = await puppeteer.launch({headless: false});
    const page = await browser.newPage();
    /*await page.goto('https://www.facebook.com/pg/pehapkari/events/');
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
    console.log('Data:', data);*/

    const data = { upcomingEvents: [ '415328609225062' ],
        pastEvents:
            [ '1921124228010979',
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
                '2677594598917305' ] };

    let eventDataList = [];

    const allEventIds = data.upcomingEvents.concat(data.pastEvents);

    for (const eventId of allEventIds) {
        console.log('downloading'+eventId);
        await page.goto('https://www.facebook.com/events/' + eventId + '/');
        /*await page.setViewport({
            width: 1200,
            height: 800
        });
*/
        // Get the "viewport" of the page, as reported by the page.
        const eventData = await page.evaluate(() => {

            const heading = document.getElementById('seo_h1_tag').textContent;
            const dateTime = document.querySelector('#event_time_info div[content]').getAttribute('content');
            const dateTimeString = document.querySelector('#event_time_info div[content]').textContent;
            let location = '';

            let linkEl = document.querySelector('#event_summary #event_time_info').nextElementSibling.querySelector('a[href^="https://www.facebook.com"');
            if (linkEl !== null) {
                let pageName = linkEl.textContent;
                let address = linkEl.parentElement.firstChild.nextElementSibling.textContent;

                location = pageName + ',' + address;
            } else {
                location = document.querySelector('#event_summary #event_time_info').nextElementSibling.querySelector('span[style]').textContent;
            }

            return {
                heading: heading,
                dateTime: dateTime,
                dateTimeString: dateTimeString,
                location: location
            };
        });
        console.log(eventData);

        eventDataList.push(eventData);
    }

    console.log(eventDataList);

    await browser.close();
})();

