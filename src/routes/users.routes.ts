import { Router } from 'express'; // importando o router
import CreateUserService from '../services/CreateUserService';

const usersRouter = Router();

usersRouter.post('/', async (request, response) => {
  try {
    const { name, email, password } = request.body;

    const createUser = new CreateUserService(); // criando a variável createUser referenciando o service

    const user = await createUser.execute({
      name,
      email,
      password,
    }); //enviando para o service os dados vindo do request

    return response.status(200).json(user);
  } catch (error) {
    return response.status(400).json({ error: error.message });
  }
});

export default usersRouter;
