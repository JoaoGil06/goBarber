import { startOfHour } from 'date-fns'
import { getCustomRepository } from 'typeorm'

import AppError from '../errors/AppError'

import Appointment from '../models/Appointment'
import AppointmentsRepository from '../repositories/AppointmentsRepository'

interface Request {
  provider_id: string;
  date: Date;
}

class CreateAppointmentService {

  public async execute({provider_id, date}: Request): Promise<Appointment> {
    //Iniciar os métodos do repositório
    const appointmentsRepository = getCustomRepository(AppointmentsRepository)


    /* Start of Hour -> Reseta os minutos e os segundos, se for 13:25:10, fica 13:00:00
    Partindo do principio que cada sessão no barbeiro é de uma hora não podem existir dois agendamentos na mesma hora e no mesmo dia
    */
    const appointmentDate = startOfHour(date)

    const findAppointmentInSameDate = await appointmentsRepository.findByDate(appointmentDate);

    if(findAppointmentInSameDate) {
      throw new AppError('This appointment is already booked')
    }

    const appointment = appointmentsRepository.create({
      provider_id,
      date: appointmentDate
    })

    //guardar na base de dados
    await appointmentsRepository.save(appointment)

    return appointment
    }
}

export default CreateAppointmentService
