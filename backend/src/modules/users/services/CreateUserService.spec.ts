import AppError from '@shared/errors/AppError';

import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';

import CreateUsersService from './CreateUserService';

describe('CreateUser', () => {
  it('should be able to create a new user', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeHashProvider = new FakeHashProvider();

    const createUser = new CreateUsersService(fakeUsersRepository, fakeHashProvider);

    const user = await createUser.execute({
      name: 'Joao Gil',
      email: 'joaogmonteiro06@gmail.com',
      password: '123456'
    })

    expect(user).toHaveProperty('id');

  });

  it('should not be able to create a new user with an email that already exists', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeHashProvider = new FakeHashProvider();

    const createUser = new CreateUsersService(fakeUsersRepository, fakeHashProvider);

    await createUser.execute({
      name: 'Joao Gil',
      email: 'joaogmonteiro06@gmail.com',
      password: '123456'
    })

    expect(createUser.execute({
      name: 'Joao Gil',
      email: 'joaogmonteiro06@gmail.com',
      password: '123456'
    })).rejects.toBeInstanceOf(AppError)

  });

});
