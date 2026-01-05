import { Injectable, NotFoundException, ConflictException, ForbiddenException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Application } from './entities/application.entity';
import { CreateApplicationDto } from './dto/create-application.dto';
import { UsersService } from '../users/users.service';
import { VacanciesService } from '../vacancies/vacancies.service';

@Injectable()
export class ApplicationService {
  constructor(
    @InjectRepository(Application)
    private applicationsRepository: Repository<Application>,
    private usersService: UsersService,
    private vacanciesService: VacanciesService,
  ) {}

  async create(userId: number, vacancyId: number): Promise<Application> {
  // 1. Validar que el usuario exista
  const user = await this.usersService.findOne(userId);

  // 2. Validar que la vacante exista y esté activa
  const vacancy = await this.vacanciesService.findOne(vacancyId);
  if (!vacancy.isActive) {
    throw new ForbiddenException('Vacancy is not active');
  }

  // 3. Validar que el cupo no esté lleno
  const applicationsCount = await this.applicationsRepository.count({ where: { vacancy: { id: vacancyId } } });
  if (applicationsCount >= vacancy.maxApplicants) {
    throw new ForbiddenException('Vacancy has reached max applicants');
  }

  // 4. Validar que el usuario no se haya postulado dos veces a la misma vacante
  const existingApplication = await this.applicationsRepository.findOne({
    where: { user: { id: userId }, vacancy: { id: vacancyId } },
  });
  if (existingApplication) {
    throw new ConflictException('User already applied to this vacancy');
  }

  // 5. Validar que el usuario no tenga más de 3 postulaciones activas
  const activeApplications = await this.applicationsRepository.count({
    where: { user: { id: userId }, vacancy: { isActive: true } },
  });
  if (activeApplications >= 3) {
    throw new ForbiddenException('User cannot apply to more than 3 active vacancies');
  }

  // Crear la postulación
  const application = this.applicationsRepository.create({
    user,
    vacancy,
  });
  return this.applicationsRepository.save(application);
}


  async findAll(): Promise<Application[]> {
    return this.applicationsRepository.find({ relations: ['user', 'vacancy'] });
  }

  async findOne(id: number): Promise<Application> {
    const application = await this.applicationsRepository.findOne({
      where: { id },
      relations: ['user', 'vacancy'],
    });
    if (!application) {
      throw new NotFoundException('Application not found');
    }
    return application;
  }

  async delete(id: number): Promise<void> {
    const application = await this.findOne(id);
    await this.applicationsRepository.remove(application);
  }
}
