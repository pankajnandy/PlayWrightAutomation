const {test, expect} = require('@playwright/test');


test('first playwrite test',async ({page})=>
{
    // chrome - plugins/cookies
    //const context = await browser.newContext();
    //const page = await context.newPage();
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");     


});

test('Page playwright test', async ({page})=>
{
    await page.goto("https://google.com");

    console.log(await page.title());
    await expect(page).toHaveTitle('Google');

})

test('Browser Context-Validating Error login', async ({browser})=>
{
    const context = await browser.newContext();
    const page = await context.newPage();
    const userName = page.locator('#username');
    const signIn = page.locator("#signInBtn");
    const  cardTitles = page.locator(".card-body a");


        await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
        console.log(await page.title());

        //css
        await userName.fill("rahulshetty");
        await page.locator("[type='password']").fill("learning");
        await signIn.click();

        console.log(await page.locator("[style*='block']").textContent());
        await expect(page.locator("[style*='block']")).toContainText('Incorrect');

        await userName.fill("");
        await userName.fill("rahulshettyacademy");
        await signIn.click();
        console.log(await cardTitles.first().textContent());
        console.log(await cardTitles.nth(1).textContent());
        const allTitles = await cardTitles.allTextContents();
        console.log(allTitles);
    
})


test('UI Controls' , async({page})=>
{
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    const userName = page.locator('#username');
    const signIn = page.locator("#signInBtn");
    const dropdown = page.locator("select.form-control");
    const documentLink = page.locator("[href*='document-request']");


    await dropdown.selectOption("consult");    

    await page.locator(".radiotextsty").last().click();
    await page.locator("#okayBtn").click();
    console.log(await expect(page.locator(".radiotextsty").last()).toBeChecked());
    await page.locator(".radiotextsty").last().isChecked();

    await page.locator("#terms").click();
    await expect(page.locator("#terms").isChecked()).toBeTruthy();
    await expect(documentLink).toHaveAttribute('class','blinkingText')


    //await page.pause();

})

test('Navigate to next page window', async({browser})=>
{
    const context = await browser.newContext();
    const page = await context.newPage();
    const documentLink = page.locator("[href*='document-request']");
    

    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    console.log(await page.title());

    const [newPage] = await Promise.all([
        context.waitForEvent('page'),
        documentLink.click(),

    ])
    text = await newPage.locator(".red").textContent();
    console.log(text);


    //await expect(documentLink).click();




})

test.only('@Client App login', async ({ page }) => {
    //js file- Login js, DashboardPage
    const email = "anshika@gmail.com";
    const productName = 'ZARA COAT 3';
    const products = page.locator(".card-body");
    await page.goto("https://rahulshettyacademy.com/client");
    await page.locator("#userEmail").fill(email);
    await page.locator("#userPassword").fill("Iamking@000");
    await page.locator("[value='Login']").click();
    await page.waitForLoadState('networkidle');
    const titles = await page.locator(".card-body b").allTextContents();
    console.log(titles);
    const count = await products.count();
    for (let i = 0; i < count; ++i) {
       if (await products.nth(i).locator("b").textContent() === productName) 
        {
          //add to cart
          await products.nth(i).locator("text= Add To Cart").click();
          break;
       }
    }
  
    await page.locator("[routerlink*='cart']").click();
    //await page.pause();
  
    await page.locator("div li").first().waitFor();
    const bool = await page.locator("h3:has-text('zara coat 3')").isVisible();
    expect(bool).toBeTruthy();
    await page.locator("text=Checkout").click();
  
    await page.locator("[placeholder*='Country']").pressSequentially("ind");
  
    const dropdown = page.locator(".ta-results");
    await dropdown.waitFor();
    const optionsCount = await dropdown.locator("button").count();
    for (let i = 0; i < optionsCount; ++i) {
       const text = await dropdown.locator("button").nth(i).textContent();
       if (text === " India") {
          await dropdown.locator("button").nth(i).click();
          break;
       }
    }
  
    await expect(page.locator(".user__name [type='text']").first()).toHaveText(email);
    await page.locator(".action__submit").click();
    await expect(page.locator(".hero-primary")).toHaveText(" Thankyou for the order. ");
    const orderId = await page.locator(".em-spacer-1 .ng-star-inserted").textContent();
    console.log(orderId);

    await page.locator("button[routerlink*='myorders']").click();
   await page.locator("tbody").waitFor();
   const rows = await page.locator("tbody tr");
 
 
   for (let i = 0; i < await rows.count(); ++i) {
      const rowOrderId = await rows.nth(i).locator("th").textContent();
      if (orderId.includes(rowOrderId)) {
         await rows.nth(i).locator("button").first().click();
         break;
      }
   }
   const orderIdDetails = await page.locator(".col-text").textContent();
   expect(orderId.includes(orderIdDetails)).toBeTruthy();
})


test("Calendar validations",async({page})=>
    {
     
        const monthNumber = "6";
        const date = "15";
        const year = "2027";
        const expectedList = [monthNumber,date,year];
        await page.goto("https://rahulshettyacademy.com/seleniumPractise/#/offers");
        await page.locator(".react-date-picker__inputGroup").click();
        await page.locator(".react-calendar__navigation__label").click();
        await page.locator(".react-calendar__navigation__label").click();
        await page.getByText(year).click();
        await page.locator(".react-calendar__year-view__months__month").nth(Number(monthNumber)-1).click();
        await page.locator("//abbr[text()='"+date+"']").click();
        const inputs = await page.locator(".react-date-picker__inputGroup input");
        for (let index = 0; index <inputs.length; index++)
        {
            const value =inputs[index].getAttribute("value");
            expect(value).toEqual(expectedList[index]);
        }
    }

)


    
