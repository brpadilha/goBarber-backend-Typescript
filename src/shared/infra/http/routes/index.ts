import { Router } from 'express'; // importando rotas
import appointmentsRouter from '@modules/appointments/infra/http/appointments.routes';
import userRouter from '@modules/users/infra/http/users.routes';
import sessionsRouter from '@modules/users/infra/http/sessions.routes';

const routes = Router(); // criando a constante rotas

routes.use('/appointments', appointmentsRouter); // usando a r
routes.use('/users', userRouter); // usando a rota de usuários
routes.use('/sessions', sessionsRouter); // usando a rota de usuários

export default routes;
