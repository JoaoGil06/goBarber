import AppError from '@shared/errors/AppError';

import FakeAppointmentsRepository from '../repositories/fakes/FakeAppointmentsRepository';
import CreateAppointmentService from './CreateAppointmentService';

describe('CreateAppointment', () => {
  it('should be able to create a new appointment', async () => {
    const fakeAppointmentsRepository = new FakeAppointmentsRepository();
    const createAppointment = new CreateAppointmentService(fakeAppointmentsRepository);

    const appointment = await createAppointment.execute({
      date: new Date(),
      provider_id: '123456'
    })

    expect(appointment).toHaveProperty('id');

  });

  it('should not be able to create two appointments at the same time', async () => {
    const fakeAppointmentsRepository = new FakeAppointmentsRepository();
    const createAppointment = new CreateAppointmentService(fakeAppointmentsRepository);

    const date = new Date(2020, 4, 24, 11);

    await createAppointment.execute({
      date: date,
      provider_id: '123456'
    });

    expect(createAppointment.execute({
      date: date,
      provider_id: '123456'
    })).rejects.toBeInstanceOf(AppError);
  });


});
