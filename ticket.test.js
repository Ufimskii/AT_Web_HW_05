const { clickElement } = require("./lib/commands.js");
const { getText } = require("./lib/commands.js");

let page;

beforeEach(async () => {
  page = await browser.newPage();
  await page.goto("http://qamid.tmweb.ru/client/index.php", {
    // waitUntil: "load",
    // timeout: 60000,
  });
});

afterEach(() => {
  page.close();
});

describe("The ticket reserved cinema test", () => {
  test("Session time check", async () => {
    await clickElement(page, "a:nth-child(3)");
    await clickElement(page, "section:nth-child(3) li");
    await page.waitForSelector("div > p.buying__info-start");
    await page.$eval("div > p.buying__info-start", (link) => link.textContent);
    const actual = await getText(
      page,
      "body > main > section > div.buying__info > div > p.buying__info-start"
    );
    expect(actual).toContain("Начало сеанса: 10:00");
  });

  test("Booked cinema ticket", async () => {
    await clickElement(page, "a:nth-child(3)");
    await clickElement(page, "[data-seance-id = '122']");
    await clickElement(
      page,
      "body > main > section > div.buying-scheme > div.buying-scheme__wrapper > div:nth-child(10) > span:nth-child(10)"
    );

    isDisabled = await page.$eval("button", (button) => button.disabled);

    if (!isDisabled) {
      await clickElement(page, "button");
      await clickElement(page, "button");
      actual = await getText(page, "h2");
      expect(actual).toContain("Электронный билет");
    } else {
      expect(isDisabled).toEqual(true);
    }
  });

  test("Should reserved ticket", async () => {
    await clickElement(page, "a:nth-child(3)");
    await clickElement(page, "[data-seance-id = '122']");
    await clickElement(page, "div:nth-child(10) span:nth-child(10)");
    isDisabled = await page.$eval("button", (button) => button.disabled);
    expect(isDisabled).toEqual(true);
  });
});
``;
