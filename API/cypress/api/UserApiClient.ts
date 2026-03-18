import { User } from '../types/User';

export class UserApiClient {
  private readonly basePath = '/user';

  create(user: User): Cypress.Chainable<Cypress.Response<{ code: number; type: string; message: string }>> {
    return cy.request({
      method: 'POST',
      url: this.basePath,
      body: user,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  getByUsername(username: string): Cypress.Chainable<Cypress.Response<User>> {
    return cy.request<User>({
      method: 'GET',
      url: `${this.basePath}/${username}`,
    });
  }

  update(username: string, payload: User): Cypress.Chainable<Cypress.Response<{ code: number; type: string; message: string }>> {
    return cy.request({
      method: 'PUT',
      url: `${this.basePath}/${username}`,
      body: payload,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  delete(username: string): Cypress.Chainable<Cypress.Response<unknown>> {
    return cy.request({
      method: 'DELETE',
      url: `${this.basePath}/${username}`,
    });
  }
}
