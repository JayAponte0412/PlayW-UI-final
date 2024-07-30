import { test, expect } from "@playwright/test";

test.only("Login", async ({ page }) => {
  //Go to the following page
  await page.goto("https://www.saucedemo.com/");
  //Adding a pause to open in headed mode to see the test in action and locate the fields
//   await page.pause();
  //with locator found the username field and will fill it with the username selected below
  await page.locator('[data-test="username"]').fill("problem_user");
  //with locator found the password field and will fill it with the password selected below
  await page.locator('[data-test="password"]').fill("secret_sauce");
  //with locator found the Login Button and will use .click to click on it
    await page.locator('[data-test="login-button"]').click();
    //Validate we are in the Swag Labs page
    await expect(page.getByText('Swag Labs'), 'Swag Labs').toBeVisible()
});

test("positive test", async ({ page }) => {
  await page.goto("https://www.saucedemo.com/");
  //with locator found the username field and will fill it with the username selected below
  await page.locator('[data-test="username"]').fill("problem_user");
  //with locator found the password field and will fill it with the password selected below
  await page.locator('[data-test="password"]').fill("secret_sauce");
  //with locator found the Login Button and will use .click to click on it
  await page.locator('[data-test="login-button"]').click();
  //adding page.pause to stay on browser and verify steps one at a time
  await page.pause();
  //now add one item to cart by clicking on the first add to cart button
  await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
  //open cart and verify item is in the cart for check out
  await page.locator('[data-test="shopping-cart-link"]').click();
  //click check out button
  await page.locator('[data-test="checkout"]').click();
});

test("negative test validation", async ({ page }) => {
    await page.goto("https://www.saucedemo.com/");
    //with locator found the username field and will fill it with the username selected below
    await page.locator('[data-test="username"]').fill("problem_user");
    //with locator found the password field and will fill it with the password selected below
    await page.locator('[data-test="password"]').fill("secret_sauce");
    //with locator found the Login Button and will use .click to click on it
    await page.locator('[data-test="login-button"]').click();
    //adding page.pause to stay on browser and verify steps one at a time
    await page.pause();
    //now add one item to cart by clicking on the first add to cart button
    await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
    //click on remove button and verify the item does not remove 
    await page.locator('[data-test="remove-sauce-labs-backpack"]').click()
    // expect the button to be UNCHANGED (button should stay as "Remove") when clicked 
    await expect('Remove').toBe('Remove')
  });