import AppError from '@shared/errors/AppError';
import FakeAppointmentsRepository from '../repositories/fakes/FakeUsersRepository';
import CreateUserService from '@modules/users/services/CreateUserService';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';

describe('CreateUser', () => {
  it('Should be able to create a new user', async () => {
    const fakeUsersRepository = new FakeAppointmentsRepository();
    const fakeHashProvider = new FakeHashProvider();

    const createUser = new CreateUserService(
      fakeUsersRepository,
      fakeHashProvider,
    );

    const user = await createUser.execute({
      email: 'bruno@email.com',
      name: 'Bruno Padilha',
      password: '123455',
    });
    expect(user).toHaveProperty('id');
  });

  it('Should not be able to create a new user if email already exists', async () => {
    const fakeUsersRepository = new FakeAppointmentsRepository();
    const fakeHashProvider = new FakeHashProvider();

    const createUser = new CreateUserService(
      fakeUsersRepository,
      fakeHashProvider,
    );

    await createUser.execute({
      email: 'bruno@email.com',
      name: 'Bruno Padilha',
      password: '123455',
    });

    expect(
      createUser.execute({
        email: 'bruno@email.com',
        name: 'Bruno Padilha',
        password: '123455',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
