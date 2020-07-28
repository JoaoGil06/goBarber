import FakeAppointmentsRepository from '@modules/appointments/repositories/fakes/FakeAppointmentsRepository';
import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import ListProviderAppointmentsService from './ListProviderAppointmentsService';

let fakeAppointmentsRepository: FakeAppointmentsRepository;
let listProviderAppointmentsService: ListProviderAppointmentsService;

describe('ListProviderAppointments', () => {
  beforeEach(() => {
    fakeAppointmentsRepository = new FakeAppointmentsRepository();
    listProviderAppointmentsService = new ListProviderAppointmentsService(
      fakeAppointmentsRepository,
    );
  });
  it('should be able to list the appointments on an specific day', async () => {
    const appointment1 = await fakeAppointmentsRepository.create({
      provider_id: '86545185-67da-4ec8-96df-041bd00f2e0a',
      user_id: '86545185-67da-4ec8-96df-041bd00f2e0b',
      date: new Date(2020, 4, 20, 14, 0, 0),
    });

    const appointment2 = await fakeAppointmentsRepository.create({
      provider_id: '86545185-67da-4ec8-96df-041bd00f2e0a',
      user_id: '86545185-67da-4ec8-96df-041bd00f2e0b',
      date: new Date(2020, 4, 20, 15, 0, 0),
    });

    const appointments = await listProviderAppointmentsService.execute({
      provider_id: '86545185-67da-4ec8-96df-041bd00f2e0a',
      day: 20,
      year: 2020,
      month: 5,
    });

    expect(appointments).toEqual([appointment1, appointment2]);
  });
});
