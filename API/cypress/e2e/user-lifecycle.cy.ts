import { UserApiClient } from '../api/UserApiClient';
import { User } from '../types/User';

interface UserFixture {
  initial: User;
  updated: Pick<User, 'firstName' | 'email'>;
}

describe('PetStore API — User Lifecycle', () => {
  const client = new UserApiClient();

  let user: User;
  let updatedData: Pick<User, 'firstName' | 'email'>;

  before(() => {
    cy.fixture<UserFixture>('user').then((fixture) => {
      const timestamp = Date.now();
      user = {
        ...fixture.initial,
        username: `${fixture.initial.username}_${timestamp}`,
      };
      updatedData = fixture.updated;
    });
  });

  it('crea un nuevo usuario', () => {
    client.create(user).then((response) => {
      expect(response.status).to.equal(200);
      expect(response.body.code).to.equal(200);
    });
  });

  it('busca el usuario creado', () => {
    client.getByUsername(user.username).then((response) => {
      expect(response.status).to.equal(200);
      expect(response.body.username).to.equal(user.username);
      expect(response.body.firstName).to.equal(user.firstName);
      expect(response.body.email).to.equal(user.email);
    });
  });

  it('actualiza el nombre y el correo del usuario', () => {
    const payload: User = { ...user, ...updatedData };

    client.update(user.username, payload).then((response) => {
      expect(response.status).to.equal(200);
      expect(response.body.code).to.equal(200);
    });
  });

  it('verifica los datos actualizados del usuario', () => {
    client.getByUsername(user.username).then((response) => {
      expect(response.status).to.equal(200);
      expect(response.body.firstName).to.equal(updatedData.firstName);
      expect(response.body.email).to.equal(updatedData.email);
    });
  });

  it('elimina el usuario', () => {
    client.delete(user.username).then((response) => {
      expect(response.status).to.equal(200);
    });
  });
});
