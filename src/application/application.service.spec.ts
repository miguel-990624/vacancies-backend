import { Test, TestingModule } from '@nestjs/testing';
import { ApplicationService } from './application.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Application } from './entities/application.entity';
import { Repository } from 'typeorm';

describe('ApplicationService', () => {
  let service: ApplicationService;
  let repo: Repository<Application>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ApplicationService,
        {
          provide: getRepositoryToken(Application),
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<ApplicationService>(ApplicationService);
    repo = module.get<Repository<Application>>(getRepositoryToken(Application));
  });

  it('debería crear una aplicación', async () => {
    const mockApp = {
      id: 1,
      user: { id: 3, name: 'Coder User' },
      vacancy: { id: 1, title: 'Backend Developer' },
      appliedAt: new Date(),
    };

    jest.spyOn(repo, 'save').mockResolvedValue(mockApp);

    const result = await service.create(3, 1);
    expect(result).toEqual(mockApp);
  });
});
