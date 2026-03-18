export class InventoryPage {
  private readonly inventoryItem = '.inventory_item';
  private readonly cartBadge = '.shopping_cart_badge';
  private readonly cartLink = '.shopping_cart_link';

  addProductToCartByIndex(index: number): void {
    cy.get(this.inventoryItem)
      .eq(index)
      .find('[data-test^="add-to-cart"]')
      .click();
  }

  getCartBadgeCount(): Cypress.Chainable<JQuery<HTMLLIElement>> {
    return cy.get(this.cartBadge);
  }

  goToCart(): void {
    cy.get(this.cartLink).click();
  }
}
