import { Router } from 'express'; // importando o router
import SessionsController from '../controllers/SessionsController';

const sessionsController = new SessionsController();

const sessionsRouter = Router();

sessionsRouter.post('/', sessionsController.create);

export default sessionsRouter;
