import { LoginPage } from '../pages/LoginPage';
import { InventoryPage } from '../pages/InventoryPage';
import { CartPage } from '../pages/CartPage';
import { CheckoutStepOnePage } from '../pages/CheckoutStepOnePage';
import { CheckoutStepTwoPage } from '../pages/CheckoutStepTwoPage';
import { CheckoutCompletePage } from '../pages/CheckoutCompletePage';

interface UserFixture {
  credentials: {
    username: string;
    password: string;
  };
  checkout: {
    firstName: string;
    lastName: string;
    postalCode: string;
  };
}

describe('SauceDemo — Purchase Flow', () => {
  const loginPage = new LoginPage();
  const inventoryPage = new InventoryPage();
  const cartPage = new CartPage();
  const checkoutStepOne = new CheckoutStepOnePage();
  const checkoutStepTwo = new CheckoutStepTwoPage();
  const checkoutComplete = new CheckoutCompletePage();

  it('completes a full purchase flow from login to order confirmation', () => {
    cy.fixture<UserFixture>('users').then((data) => {
      loginPage.visit();
      loginPage.login(data.credentials.username, data.credentials.password);

      cy.url().should('include', '/inventory.html');

      inventoryPage.addProductToCartByIndex(0);
      inventoryPage.addProductToCartByIndex(1);
      inventoryPage.getCartBadgeCount().should('have.text', '2');

      inventoryPage.goToCart();

      cy.url().should('include', '/cart.html');
      cartPage.getCartItems().should('have.length', 2);
      cartPage.checkout();

      cy.url().should('include', '/checkout-step-one.html');
      checkoutStepOne.fillForm(
        data.checkout.firstName,
        data.checkout.lastName,
        data.checkout.postalCode
      );
      checkoutStepOne.continue();

      cy.url().should('include', '/checkout-step-two.html');
      checkoutStepTwo.finish();

      cy.url().should('include', '/checkout-complete.html');
      checkoutComplete
        .getConfirmationMessage()
        .should('have.text', 'Thank you for your order!');
    });
  });
});
