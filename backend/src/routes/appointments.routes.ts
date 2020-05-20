import { Router } from 'express';
import { getCustomRepository } from 'typeorm';
import { parseISO } from 'date-fns';

import AppointmentsRepository from '../repositories/AppointmentsRepository';
import CreateAppointmentService from '../services/CreateAppointmentService';

import ensureAuthenticated from '../middlewares/ensureAuthenticated';

const appointmentsRouter = Router();

appointmentsRouter.use(ensureAuthenticated);

//Rota: Receber a requisição, chamar outro arquivo, devolver uma resposta

appointmentsRouter.get('/', async (request, response) => {
  console.log(request.user);
  //Iniciar os métodos do repositório
  const appointmentsRepository = getCustomRepository(AppointmentsRepository);

  //Buscar todos os appointments da base de dados, o find = getAll
  const appointments = await appointmentsRepository.find();

  return response.json(appointments);
});

appointmentsRouter.post('/', async (request, response) => {
  try {
    /**
     * Provider -> Nome do barbeiro
     * Date -> Data do agendamento
     */
    const { provider_id, date } = request.body;

    // ParseISO é converter a data que recebemos de string para date
    const parsedDate = parseISO(date);

    // O service já tem acesso ao appointmentscrepository
    const createAppointment = new CreateAppointmentService();

    const appointment = await createAppointment.execute({
      provider_id,
      date: parsedDate,
    });

    return response.json(appointment);
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

export default appointmentsRouter;
