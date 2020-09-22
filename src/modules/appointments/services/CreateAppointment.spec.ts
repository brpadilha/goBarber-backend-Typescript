import FakeAppointmentsRepository from '../repositories/fakes/FakeAppointmentsRepository';
// eslint-disable-next-line import/order
import CreateAppointmentService from '@modules/appointments/services/CreateAppointmentService';

describe('CreateAppointment', () => {
  it('Should create a new appointment', async () => {
    const fakeAppointmentsRepository = new FakeAppointmentsRepository();
    const createAppointment = new CreateAppointmentService(
      fakeAppointmentsRepository,
    );

    const appointment = await createAppointment.execute({
      date: new Date(),
      provider_id: '12312312321',
    });
    expect(appointment).toHaveProperty('id');
    expect(appointment.provider_id).toBe('12312312321');
  });
});
