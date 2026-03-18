import { defineConfig } from 'cypress';

export default defineConfig({
  e2e: {
    baseUrl: 'https://petstore.swagger.io/v2',
    video: false,
    responseTimeout: 30000,
    defaultCommandTimeout: 10000,
    specPattern: 'cypress/e2e/**/*.cy.ts',
    supportFile: 'cypress/support/e2e.ts',
  },
});
