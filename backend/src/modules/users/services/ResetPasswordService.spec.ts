import AppError from '@shared/errors/AppError';

import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import FakeUserTokenssRepository from '../repositories/fakes/FakeUserTokensRepository';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';

import ResetPasswordService from './ResetPasswordService';

let fakeUsersRepository: FakeUsersRepository;
let fakeUserTokensRepository: FakeUserTokenssRepository;
let fakeHashProvider: FakeHashProvider;
let resetPassword: ResetPasswordService;

describe('ResetPassword', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeUserTokensRepository = new FakeUserTokenssRepository();
    fakeHashProvider = new FakeHashProvider();

    resetPassword = new ResetPasswordService(
      fakeUsersRepository,
      fakeUserTokensRepository,
      fakeHashProvider,
    );
  });

  it('should be able to reset the user password', async () => {
    let user = await fakeUsersRepository.create({
      name: 'João Gil',
      email: 'joaogmonteiro06@gmail.com',
      password: '123456',
    });

    const userToken = await fakeUserTokensRepository.generate(user.id);

    const generateHash = jest.spyOn(fakeHashProvider, 'generateHash');

    await resetPassword.execute({
      password: '123234',
      token: userToken.token,
    });

    const updatedUser = await fakeUsersRepository.findById(user.id);

    expect(generateHash).toHaveBeenCalledWith('123234');
    expect(updatedUser?.password).toBe('123234');
  });

  it('should not be able to reset the user password with an desactivated token', async () => {
    await expect(
      resetPassword.execute({
        token: 'non-existing-token',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to reset the user password with non-existing user', async () => {
    const userToken = await fakeUserTokensRepository.generate(
      'non-existing-user',
    );
    await expect(
      resetPassword.execute({
        token: userToken.token,
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to reset the user password if passed more than 2 hours', async () => {
    let user = await fakeUsersRepository.create({
      name: 'João Gil',
      email: 'joaogmonteiro06@gmail.com',
      password: '123456',
    });

    const userToken = await fakeUserTokensRepository.generate(user.id);

    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      const customDate = new Date();

      return customDate.setHours(customDate.getHours() + 3);
    });

    expect(
      resetPassword.execute({
        password: '123234',
        token: userToken.token,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
