export class CheckoutStepTwoPage {
  private readonly finishButton = '[data-test="finish"]';

  finish(): void {
    cy.get(this.finishButton).click();
  }
}
