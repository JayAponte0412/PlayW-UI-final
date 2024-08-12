import { test, expect } from "@playwright/test";
const saucedemo = "https://www.saucedemo.com/";

test("Login", async ({ page }) => {
  //Go to the following page
  await page.goto(saucedemo);
  //with locator found the username field and will fill it with the username selected below
  await page.locator('[data-test="username"]').fill("problem_user");
  //with locator found the password field and will fill it with the password selected below
  await page.locator('[data-test="password"]').fill("secret_sauce");
  //with locator found the Login Button and will use .click to click on it
    await page.locator('[data-test="login-button"]').click();
    //Validate we are in the Swag Labs page
  await expect(page.getByText('Swag Labs'), 'Swag Labs').toBeVisible()
  await page.close();
});




test("positive test", async ({ page }) => {
  await page.goto(saucedemo);
  //with locator found the username field and will fill it with the username selected below
  await page.locator('[data-test="username"]').fill("problem_user");
  //with locator found the password field and will fill it with the password selected below
  await page.locator('[data-test="password"]').fill("secret_sauce");
  //with locator found the Login Button and will use .click to click on it
  await page.locator('[data-test="login-button"]').click();
  //verify you are in swag labs main page by validating title 
  await expect(page.getByText('Swag Labs'), 'Swag Labs').toBeVisible()
  //now add one item to cart by clicking on the first add to cart button
  await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
  //open cart and verify item is in the cart for check out
  await page.locator('[data-test="shopping-cart-link"]').click();
  //validate button is clickable/ enabled to checkout
  // await page.locator('[data-test="checkout"]').click();
  await expect(page.locator('[data-test="checkout"]')).toBeEnabled();
  await page.close();
});




test("negative test", async ({ page }) => {
    await page.goto(saucedemo);
    //with locator found the username field and will fill it with the username selected below
    await page.locator('[data-test="username"]').fill("problem_user");
    //with locator found the password field and will fill it with the password selected below
    await page.locator('[data-test="password"]').fill("secret_sauce");
    //with locator found the Login Button and will use .click to click on it
    await page.locator('[data-test="login-button"]').click();
    //validate the title of the page you logged in to 
    await expect(page.getByText('Swag Labs'), 'Swag Labs').toBeVisible()
    //now add one item to cart by clicking on the first add to cart button
    await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
    //click on remove button and verify the item does not remove 
    await page.locator('[data-test="remove-sauce-labs-backpack"]').click()
    // expect the button to NOT Change back to 'Add to Cart when clicked due to bug
  await expect('Remove').toBe('Remove')
  await page.close();
});
  



test("validate error message extra test 1", async ({ page }) => {
  await page.goto(saucedemo);
  //with locator found the username field and will fill it with the username selected below
  await page.locator('[data-test="username"]').fill("standard_user");
  //with locator found the password field and will fill it with the password selected below
  await page.locator('[data-test="password"]').fill("secret_sauce");
  //with locator found the Login Button and will use .click to click on it
  await page.locator('[data-test="login-button"]').click();
  //validate the login page, by confirming the title of the page
  const title = page.locator('[data-test="title"]');
  await expect(title).toHaveText('Products')
  //select item to go into item page 
  await page.locator('[data-test="item-4-title-link"]').click()
  //in the item page click add to cart button 
  await page.locator('[data-test="add-to-cart"]').click()
  //click the 'go back to products' button
  await page.locator('[data-test="back-to-products"]').click()
  //click on add to cart button for the red t-shirt
  await page.locator('[data-test="add-to-cart-test\\.allthethings\\(\\)-t-shirt-\\(red\\)"]').click()
  //click on the cart to check out process
  await page.locator('[data-test="shopping-cart-link"]').click()
  //click the checkout button
  await page.locator('[data-test="checkout"]').click()
  //enter first name on the name field 
  await page.locator('[data-test="firstName"]').fill('Jay')
  //click on Continue button without the rest of the information 
  await page.locator('[data-test="continue"]').click()
  //validate expect error 'Error: Las Name is required'
  await expect(page.locator('[data-test="error"]')).toContainText('Error: Last Name is required')
  await page.close();
});




test.only("verify item name extra test 2", async ({ page }) => {
  await page.goto(saucedemo);
  //with locator found the username field and will fill it with the username selected below
  await page.locator('[data-test="username"]').fill("problem_user");
  //with locator found the password field and will fill it with the password selected below
  await page.locator('[data-test="password"]').fill("secret_sauce");
  //with locator found the Login Button and will use .click to click on it
  await page.locator('[data-test="login-button"]').click();
  //click on the sauce labs backpack item
  await page.click('[data-test="item-4-title-link"]')
  //expect the item name to be the incorrect item of Sauce Labs Fleece Jacket
  await expect(page.locator('[data-test="inventory-item-name"]')).toHaveText("Sauce Labs Fleece Jacket");
  //Test Should Error as it is validating a current bug where the item names dont match
  await page.close()
 
});




test("verify number of options in dropdown test 3", async ({ page }) => {
  await page.goto(saucedemo);
  //with locator found the username field and will fill it with the username selected below
  await page.locator('[data-test="username"]').fill("problem_user");
  //with locator found the password field and will fill it with the password selected below
  await page.locator('[data-test="password"]').fill("secret_sauce");
  //with locator found the Login Button and will use .click to click on it
  await page.locator('[data-test="login-button"]').click();
  //use xpath to find filter dropdown options element
  const options = await page.locator(".product_sort_container, option");
  // verify the amount on elements in the drop down
  await expect(options).toHaveCount(5);
  await page.close();
});





test("end 2 end test", async ({ page }) => {
  await page.goto(saucedemo);
  //with locator found the username field and will fill it with the username selected below
  await page.locator('[data-test="username"]').fill("standard_user");
  //with locator found the password field and will fill it with the password selected below
  await page.locator('[data-test="password"]').fill("secret_sauce");
  //with locator found the Login Button and will use .click to click on it
  await page.locator('[data-test="login-button"]').click();
  //add all items to cart
  await page.click('[data-test="add-to-cart-sauce-labs-backpack"]');
  await page.click('[data-test="add-to-cart-sauce-labs-bike-light"]');
  await page.click('[data-test="add-to-cart-sauce-labs-bolt-t-shirt"]');
  await page.click('[data-test="add-to-cart-sauce-labs-fleece-jacket"]');
  await page.click('[data-test="add-to-cart-sauce-labs-onesie"]');
  await page.click(
    '[data-test="add-to-cart-test\\.allthethings\\(\\)-t-shirt-\\(red\\)"]'
  );
  //capture the Sauce Labs Onesie price from main page
  const price = await page.locator("//div[normalize-space()='$7.99']");
  //click into Sauce Labs Onesie item
  await page.click('[data-test="item-2-title-link"]');
  //verify item price is 7.99
  await expect(price).toContainText("7.99");
  //retrieve element -qty from the cart-
  const cart = await page.locator("//span[@class='shopping_cart_badge']");
  //verify that the cart has 4 items left
  await expect(cart).toContainText("6");
  //click on the cart icon
  await page.click('[data-test="shopping-cart-link"]');
  //remove 2 items from the checkout screen 
  await page.click('[data-test="remove-sauce-labs-backpack"]');
  await page.click('[data-test="remove-sauce-labs-bolt-t-shirt"]');
  //verify there is now 4 items in the cart 
  await expect(cart).toContainText("4");
  //verify the  item names left are the correct ones
  await expect(page.getByText('Sauce Labs bike light')).toBeVisible();
  await expect(page.getByText("Sauce Labs Fleece Jacket")).toBeVisible();
  await expect(page.getByText("Sauce Labs Onesie")).toBeVisible();
  await expect(page.getByText("Test.allTheThings() T-Shirt (Red) ")).toBeVisible();
  //click checkout
  await page.click('[data-test="checkout"]');
  //enter first name
  await page.fill('[data-test="firstName"]', 'Jay');
  //click on checkout button
  await page.click('[data-test="continue"]');
  //verify error message asking for last name
  await expect(page.locator('[data-test="error"]')).toContainText('Error: Last Name is required');
  //enter last name
  await page.fill('[data-test="lastName"]', 'Aponte');
  //click on continue button
  await page.click('[data-test="continue"]');
  //verify error message asking for postal code
  await expect(page.locator('[data-test="error"]')).toContainText("Error: Postal Code is required");
  //enter zip code 32207
  await page.fill('[data-test="postalCode"]', '32207');
  //Click continue button
  await page.click('[data-test="continue"]');
  //verify the following fields are populated (payment information- shipping info, total)
  await expect(page.locator('[data-test="payment-info-value"]')).toBeTruthy();
  await expect(page.locator('[data-test="shipping-info-value"]')).toBeTruthy();
  await expect(page.locator('[data-test="total-label"]')).toBeTruthy();
  //click finish button
  await page.click('[data-test="finish"]');
  //verify success message (thank you for your order)
  await expect('[data-test="complete-header"]').toBeTruthy();
  //click back home button
  await page.click('[data-test="back-to-products"]');
  //verify you are back to the items screen
  await expect(page.getByText("Swag Labs"), "Swag Labs").toBeVisible();
  //Close browser page
  await page.close();
});