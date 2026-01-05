import { Test, TestingModule } from '@nestjs/testing';
import { VacanciesService } from './vacancies.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Vacancy, Modality } from './entities/vacancy.entity';

describe('VacanciesService', () => {
  let service: VacanciesService;
  let mockRepo: any;

  beforeEach(async () => {
    mockRepo = {
      create: jest.fn().mockImplementation((dto) => dto),
      save: jest.fn().mockImplementation((vacancy) => Promise.resolve({ id: 1, ...vacancy })),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        VacanciesService,
        {
          provide: getRepositoryToken(Vacancy),
          useValue: mockRepo,
        },
      ],
    }).compile();

    service = module.get<VacanciesService>(VacanciesService);
  });

  it('debería crear una vacante', async () => {
    const dto = {
      title: 'Backend Developer',
      description: 'Desarrollo de APIs',
      technologies: 'Node.js, NestJS',
      seniority: 'Mid',
      softSkills: 'Trabajo en equipo',
      location: 'Medellín',
      modality: Modality.REMOTE,
      salaryRange: '4M - 6M COP',
      company: 'TechCorp',
      maxApplicants: 5,
    };

    const result = await service.create(dto as any);
    expect(result).toEqual({ id: 1, ...dto });
  });
});
