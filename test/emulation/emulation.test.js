import { browserDeviceFixture } from '../../fixtures/browser.fixture';
import { getBrowser, getDevice } from '../../helpers/browserLauncher.helper';

let browser, context, page;
browserDeviceFixture.forEach(deviceBrowserName => {
    describe('Emulation', () => {

        beforeEach(async () => {
            browser = await getBrowser();
            context = await browser.newContext(getDevice(deviceBrowserName));
            page = await context.newPage();
            await page.goto('https://www.whatsmybrowser.org/');
        });

        it(`Device: ${deviceBrowserName}`, async () => {
            var userAgent = await page.evaluate(() => `Browser User-Agent: ${navigator.userAgent}`);
            console.log(`${userAgent}`);
        });

        afterEach(async () => {
            await browser.close();
        });

    });

});