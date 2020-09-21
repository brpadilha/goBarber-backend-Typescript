import { Router } from 'express'; // importando o router

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import AppointmentsController from '../controllers/AppotimentsController';

const appointmentsController = new AppointmentsController();
const appointmentsRouter = Router();

appointmentsRouter.use(ensureAuthenticated); // fazer com que a rota aceite o middleware

// appointmentsRouter.get('/', ensureAuthenticated, async (request, response) => {
//   const appointments = await appointmentsRepository.find();

//   return response.json(appointments);
// });

appointmentsRouter.post(
  '/',

  appointmentsController.create,
);

export default appointmentsRouter;
