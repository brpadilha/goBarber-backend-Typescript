import { Router } from 'express'; // importando rotas
import appointmentsRouter from './appointments.routes';
import userRouter from './users.routes';

const routes = Router(); // criando a constante rotas

routes.use('/appointments', appointmentsRouter); // usando a r
routes.use('/users', userRouter); // usando a rota de usuários

export default routes;
