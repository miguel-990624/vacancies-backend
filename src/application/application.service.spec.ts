import { Test, TestingModule } from '@nestjs/testing';
import { ApplicationService } from './application.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Application } from './entities/application.entity';
import { Repository } from 'typeorm';
import { UsersService } from '../users/users.service';
import { VacanciesService } from '../vacancies/vacancies.service';

describe('ApplicationService', () => {
  let service: ApplicationService;
  let repo: Repository<Application>;
  let usersService: UsersService;
  let vacanciesService: VacanciesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ApplicationService,
        {
          provide: getRepositoryToken(Application),
          useValue: {
            create: jest.fn(),
            save: jest.fn(),
            count: jest.fn(), // ✅ mockeamos count
          },
        },
        {
          provide: UsersService,
          useValue: {
            findOne: jest.fn().mockResolvedValue({ id: 3, name: 'Coder User' }),
          },
        },
        {
          provide: VacanciesService,
          useValue: {
            findOne: jest.fn().mockResolvedValue({
              id: 1,
              title: 'Backend Developer',
              company: 'TechCorp',
              isActive: true,
              maxApplicants: 5,
            }),
          },
        },
      ],
    }).compile();

    service = module.get<ApplicationService>(ApplicationService);
    repo = module.get<Repository<Application>>(getRepositoryToken(Application));
    usersService = module.get<UsersService>(UsersService);
    vacanciesService = module.get<VacanciesService>(VacanciesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('debería crear una aplicación', async () => {
    // Simulamos que aún no hay aplicaciones para esa vacante
    (repo.count as jest.Mock).mockResolvedValue(0);
    const mockApp = { id: 1, appliedAt: new Date() };
    (repo.save as jest.Mock).mockResolvedValue(mockApp);

    const result = await service.create(3, 1);

    expect(result).toEqual(mockApp);
    expect(vacanciesService.findOne).toHaveBeenCalledWith(1);
    expect(usersService.findOne).toHaveBeenCalledWith(3);
    expect(repo.count).toHaveBeenCalledWith({ where: { vacancy: { id: 1 } } });
  });
});
