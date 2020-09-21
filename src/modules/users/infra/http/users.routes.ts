import { Router } from 'express'; // importando o router
import multer from 'multer';
import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import uploadConfig from '@config/upload';
import CreateUserService from '@modules/users/services/CreateUserService';
import UpdateUserAvatarService from '@modules/users/services/UpdateUserAvatarService';
import UsersRepository from '@modules/users/infra/typeorm/repositories/UsersRepository';

const usersRouter = Router();
const upload = multer(uploadConfig);

usersRouter.post('/', async (request, response) => {
  try {
    const usersRepository = new UsersRepository();
    const { name, email, password } = request.body;

    const createUser = new CreateUserService(usersRepository); // criando a variável createUser referenciando o service

    const user = await createUser.execute({
      name,
      email,
      password,
    }); // enviando para o service os dados vindo do request

    delete user.password;

    return response.status(200).json(user);
  } catch (error) {
    console.log(error);
  }
});

usersRouter.use(ensureAuthenticated); // fazer com que a rota aceite o middleware
usersRouter.patch(
  '/avatar',
  ensureAuthenticated,
  upload.single('avatar'),
  async (request, response) => {
    const usersRepository = new UsersRepository();

    const updateUserAvatar = new UpdateUserAvatarService(usersRepository);

    const user = await updateUserAvatar.execute({
      user_id: request.user.id,
      avatarFilename: request.file.filename,
    });

    delete user.password;

    return response.json(user);
  },
);

export default usersRouter;
