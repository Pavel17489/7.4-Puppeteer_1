let page;

beforeEach(async () => {
  page = await browser.newPage();
});

afterEach(() => {
  page.close();
});

describe("Github page tests", () => {
  
  beforeEach(async () => {
  await page.goto("https://github.com/team");
});

  test("The h1 header content'", async () => {
    const firstLink = await page.$("header div div a");
    await firstLink.click();
    await page.waitForSelector('h1');
    const title2 = await page.title();
    const expected = "GitHub · Build and ship software on a single, collaborative platform · GitHub";
    expect(title2).toEqual(expected);
  }, 4000);

  test("The first link attribute", async () => {
    const actual = await page.$eval("a", link => link.getAttribute('href') );
    const expected = "#start-of-content";
    expect(actual).toEqual(expected);
  }, 4000);

  test("The page contains Sign in button", async () => {
    const btnSelector = ".btn-large-mktg.btn-mktg";
    await page.waitForSelector(btnSelector, {
      visible: true,
    });
    const actual = await page.$eval(btnSelector, link => link.textContent);
    const expected = "Get started with Team";
    expect(actual).toContain(expected)
  }, 6000);
});

describe("Github new 3 tests", () => {

  test("The h1 header in page enterprise", async () => {
    await page.goto("https://github.com/enterprise");
    await page.waitForSelector('h1');
    const title = await page.title();
    const expected = "The AI Powered Developer Platform. · GitHub";
    expect(title).toContain(expected);
  }, 4000);

  test("The page issues contains button", async () => {
    await page.goto("https://github.com/features/issues");
    const btnSelector = "[data-ref='hero-primary-action-2r6Ty4cT89L7IAyQyt1cAS']";
    await page.waitForSelector(btnSelector, {
      visible: true,
    });
    const actual = await page.$eval(btnSelector, link => link.textContent);
    const expected = "Start using projects";
    expect(actual).toContain(expected);
  }, 4000);

  test("The page GH Home contains open source", async () => {
    await page.goto("https://github.com/home");
    const element = "li:nth-child(4) button:nth-child(1)";
    const actual = await page.$eval(element, link => link.textContent);
    const expected = "Open Source";
    expect(actual).toContain(expected);
  }, 4000);
});