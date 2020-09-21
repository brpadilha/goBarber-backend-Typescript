import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateUserService from '@modules/users/services/CreateUserService';

export default class UsersController {
  async create(request: Request, response: Response): Promise<Response> {
    const createUser = container.resolve(CreateUserService); // criando a variável createUser referenciando o service
    const { name, email, password } = request.body;

    const user = await createUser.execute({
      name,
      email,
      password,
    }); // enviando para o service os dados vindo do request

    delete user.password;

    return response.status(200).json(user);
  }
}
