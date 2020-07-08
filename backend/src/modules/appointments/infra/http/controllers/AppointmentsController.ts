import { Request, Response } from 'express';
import { parseISO } from 'date-fns';
import { container } from 'tsyringe';

import CreateAppointmentService from '@modules/appointments/services/CreateAppointmentService';

export default class AppointmentsController {
  public async create(request: Request, response: Response): Promise<Response> {
    /**
     * Provider -> Nome do barbeiro
     * Date -> Data do agendamento
     */
    const user_id = request.user.id;
    const { provider_id, date } = request.body;

    // ParseISO é converter a data que recebemos de string para date
    const parsedDate = parseISO(date);

    // O service já tem acesso ao appointmentscrepository
    const createAppointment = container.resolve(CreateAppointmentService);

    const appointment = await createAppointment.execute({
      provider_id,
      user_id,
      date: parsedDate,
    });

    return response.json(appointment);
  }
}
