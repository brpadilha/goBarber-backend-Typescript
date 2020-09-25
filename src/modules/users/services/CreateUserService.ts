// import 'reflect-metadata';

import IHashProvider from '../providers/HashProvider/models/IHashProvider';

import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';

import User from '@modules/users/infra/typeorm/entities/User';

interface IRequest {
  name: string;
  password: string;
  email: string;
} // criando a interface dos tipos que iremos receber no Request
@injectable()
class CreateUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
    @inject('HashProvider')
    private hashProvider: IHashProvider,
  ) {}

  public async execute({ name, password, email }: IRequest): Promise<User> {
    // criando a função create
    const checkUserExists = await this.usersRepository.findByEmail(email);

    if (checkUserExists) throw new AppError('Email address already used.'); // se o usuario existir no banco de dados retorna um erro

    const passwordHashed = await this.hashProvider.generateHash(password);

    const user = await this.usersRepository.create({
      name,
      password: passwordHashed,
      email,
    });

    return user;
  }
}

export default CreateUserService;
