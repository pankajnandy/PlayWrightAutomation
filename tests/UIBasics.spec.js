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


test.only('UI Controls' , async({page})=>
{
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    const userName = page.locator('#username');
    const signIn = page.locator("#signInBtn");
    const dropdown = page.locator("select.form-control");
    await dropdown.selectOption("consult")    

    await page.locator(".radiotextsty").last().click();
    await page.locator("#okayBtn").click();
    console.log(await expect(page.locator(".radiotextsty").last()).toBeChecked());
    await page.locator(".radiotextsty").last().isChecked();

    await page.locator("#terms").click();
    await expect(page.locator("#terms").isChecked()).toBeTruthy();



    //await page.pause();

})
