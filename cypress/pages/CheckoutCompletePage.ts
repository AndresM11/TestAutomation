export class CheckoutCompletePage {
  private readonly confirmationHeader = '.complete-header';

  getConfirmationMessage(): Cypress.Chainable<JQuery<HTMLLIElement>> {
    return cy.get(this.confirmationHeader);
  }
}
