import { Test, TestingModule } from '@nestjs/testing';
import { VacanciesService } from './vacancies.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Vacancy } from './entities/vacancy.entity';
import { Repository } from 'typeorm';

describe('VacanciesService', () => {
  let service: VacanciesService;
  let repo: Repository<Vacancy>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        VacanciesService,
        {
          provide: getRepositoryToken(Vacancy),
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<VacanciesService>(VacanciesService);
    repo = module.get<Repository<Vacancy>>(getRepositoryToken(Vacancy));
  });

  it('debería estar definido', () => {
    expect(service).toBeDefined();
  });

  it('debería crear una vacante', async () => {
    const vacancyData = {
      title: 'Backend Developer',
      description: 'Desarrollo de APIs',
      technologies: 'Node.js, NestJS',
      seniority: 'Mid',
      softSkills: 'Trabajo en equipo',
      location: 'Medellín',
      modality: 'remote',
      salaryRange: '4M - 6M COP',
      company: 'TechCorp',
      maxApplicants: 5,
    };

    jest.spyOn(repo, 'save').mockResolvedValue({ id: 1, ...vacancyData });

    const result = await service.create(vacancyData as any);
    expect(result).toEqual({ id: 1, ...vacancyData });
  });
});
