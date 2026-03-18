export class CartPage {
  private readonly cartItem = '.cart_item';
  private readonly checkoutButton = '[data-test="checkout"]';

  getCartItems(): Cypress.Chainable<JQuery<HTMLLIElement>> {
    return cy.get(this.cartItem);
  }

  checkout(): void {
    cy.get(this.checkoutButton).click();
  }
}
