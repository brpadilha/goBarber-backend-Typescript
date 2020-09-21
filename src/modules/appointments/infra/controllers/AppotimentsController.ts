import { Request, Response } from 'express';

import { container } from 'tsyringe';
import { parseISO } from 'date-fns';

import CreateAppointmentService from '@modules/appointments/services/CreateAppointmentService';

export default class AppointmentsController {
  public async create(request: Request, response: Response): Promise<Response> {
    const createAppointment = container.resolve(CreateAppointmentService);
    const { provider_id, date } = request.body; // recebendo o provider e o date do req.body

    const parsedDate = parseISO(date); // passando a data para um horário com número absoluto

    const appointment = await createAppointment.execute({
      date: parsedDate,
      provider_id,
    });

    return response.json(appointment);
  }
}
