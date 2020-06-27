import AppError from '@shared/errors/AppError';

import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import FakeUserTokenssRepository from '../repositories/fakes/FakeUserTokensRepository';
import FakeMailProvider from '@shared/container/providers/MailProvider/fakes/FakeMailProvider';

import SendForgotPasswordEmailService from './SendForgotPasswordEmailService';

let fakeUsersRepository: FakeUsersRepository;
let fakeMailProvider: FakeMailProvider;
let fakeUserTokensRepository: FakeUserTokenssRepository;
let sendForgotPasswordEmail: SendForgotPasswordEmailService;

describe('SendForgotPasswordEmail', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeMailProvider = new FakeMailProvider();
    fakeUserTokensRepository = new FakeUserTokenssRepository();

    sendForgotPasswordEmail = new SendForgotPasswordEmailService(
      fakeUsersRepository,
      fakeMailProvider,
      fakeUserTokensRepository,
    );
  });

  it('should be able to recover the password using the email', async () => {
    const sendMail = jest.spyOn(fakeMailProvider, 'sendMail');

    await fakeUsersRepository.create({
      name: 'João Gil',
      email: 'joaogmonteiro06@gmail.com',
      password: '123456',
    });

    await sendForgotPasswordEmail.execute({
      email: 'joaogmonteiro06@gmail.com',
    });

    expect(sendMail).toHaveBeenCalled();
  });

  it('should not be able to recover the password if is not a user', async () => {
    await expect(
      sendForgotPasswordEmail.execute({
        email: 'joaogmonteiro06@gmail.com',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should generate a forgot password token', async () => {
    const generateToken = jest.spyOn(fakeUserTokensRepository, 'generate');

    const user = await fakeUsersRepository.create({
      name: 'João Gil',
      email: 'joaogmonteiro06@gmail.com',
      password: '123456',
    });

    await sendForgotPasswordEmail.execute({
      email: 'joaogmonteiro06@gmail.com',
    });

    expect(generateToken).toHaveBeenCalledWith(user.id);
  });
});
