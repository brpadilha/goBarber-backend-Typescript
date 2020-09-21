import { container } from 'tsyringe';
import { Router } from 'express'; // importando o router

import AuthenticateUserService from '@modules/users/services/AuthenticateUserService';

const sessionsRouter = Router();

sessionsRouter.post('/', async (request, response) => {
  const authenticateUser = container.resolve(AuthenticateUserService);
  const { email, password } = request.body;

  const { user, token } = await authenticateUser.execute({
    email,
    password,
  });

  delete user.password;
  return response.json({ user, token });
});

export default sessionsRouter;
