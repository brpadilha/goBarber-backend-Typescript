import { Router } from 'express'; // importando o router
import { parseISO } from 'date-fns';

import { container } from 'tsyringe';
import CreateAppointmentService from '@modules/appointments/services/CreateAppointmentService';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';

const appointmentsRouter = Router();

// appointmentsRouter.use(ensureAuthenticated); // fazer com que a rota aceite o middleware

// appointmentsRouter.get('/', ensureAuthenticated, async (request, response) => {
//   const appointments = await appointmentsRepository.find();

//   return response.json(appointments);
// });

appointmentsRouter.post('/', ensureAuthenticated, async (request, response) => {
  const createAppointment = container.resolve(CreateAppointmentService);
  const { provider_id, date } = request.body; // recebendo o provider e o date do req.body

  const parsedDate = parseISO(date); // passando a data para um horário com número absoluto

  const appointment = await createAppointment.execute({
    date: parsedDate,
    provider_id,
  });

  return response.json(appointment);
});

export default appointmentsRouter;
