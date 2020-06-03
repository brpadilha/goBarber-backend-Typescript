import { Router } from 'express'; // importando rotas
import appointmentsRouter from './appointments.routes';

const routes = Router(); // criando a constante rotas

routes.use('/appointments', appointmentsRouter); // usando a rota de appointments

export default routes;
