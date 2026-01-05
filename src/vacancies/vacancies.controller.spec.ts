import { Test, TestingModule } from '@nestjs/testing';
import { VacanciesController } from './vacancies.controller';
import { VacanciesService } from './vacancies.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Vacancy } from './entities/vacancy.entity';
import { Repository } from 'typeorm';

describe('VacanciesController', () => {
  let controller: VacanciesController;
  let service: VacanciesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [VacanciesController],
      providers: [
        VacanciesService,
        {
          provide: getRepositoryToken(Vacancy),
          useClass: Repository,
        },
      ],
    }).compile();

    controller = module.get<VacanciesController>(VacanciesController);
    service = module.get<VacanciesService>(VacanciesService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
    expect(service).toBeDefined();
  });
});
