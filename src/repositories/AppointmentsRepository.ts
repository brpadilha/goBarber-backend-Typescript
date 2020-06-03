import { isEqual } from 'date-fns';
import Appointment from '../models/Appointment';

// DTO = Data Transfer Object
interface CreateApppointmentDTO {
  provider: string;
  date: Date;
}

class AppointmentsRepository {
  appointments: Appointment[];

  constructor() {
    this.appointments = [];
  }

  public all(): Appointment[] {
    return this.appointments || null;
  }

  public findByDate(date: Date): Appointment | null {
    const findAppointment = this.appointments.find(
      appointment =>
        // faz uma varredura pelos appointments
        isEqual(date, appointment.date), // verifica se já tem horário igual no banco de dados
    );

    return findAppointment || null;
  }

  // provider: string, date: Date
  public create({ provider, date }: CreateApppointmentDTO): Appointment {
    const appointment = new Appointment({ provider, date });

    this.appointments.push(appointment);

    return appointment;
  }
}

export default AppointmentsRepository;
