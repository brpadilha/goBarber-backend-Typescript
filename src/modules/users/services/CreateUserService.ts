import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import { hash } from 'bcryptjs';
import AppError from '@shared/errors/AppError';

import User from '@modules/users/infra/typeorm/entities/User';

interface IRequest {
  name: string;
  password: string;
  email: string;
} // criando a interface dos tipos que iremos receber no Request

class CreateUserService {
  constructor(private usersRepository: IUsersRepository) {}

  public async execute({ name, password, email }: IRequest): Promise<User> {
    // criando a função create
    const checkUserExists = await this.usersRepository.findByEmail(email);

    if (checkUserExists) throw new AppError('Email address already used.'); // se o usuario existir no banco de dados retorna um erro

    const passwordHashed = await hash(password, 8);

    const user = await this.usersRepository.create({
      name,
      password: passwordHashed,
      email,
    });

    return user;
  }
}

export default CreateUserService;
