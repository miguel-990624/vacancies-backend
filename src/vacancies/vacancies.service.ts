import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Vacancy } from './entities/vacancy.entity';
import { CreateVacancyDto } from './dto/create-vacancy.dto';
import { UpdateVacancyDto } from './dto/update-vacancy.dto';

@Injectable()
export class VacanciesService {
  constructor(
    @InjectRepository(Vacancy)
    private vacanciesRepository: Repository<Vacancy>,
  ) { }

  async create(createVacancyDto: CreateVacancyDto): Promise<Vacancy> {
    const vacancy = this.vacanciesRepository.create(createVacancyDto);
    return this.vacanciesRepository.save(vacancy);
  }

  async findAll(): Promise<Vacancy[]> {
    return this.vacanciesRepository.find();
  }

  async findOne(id: number): Promise<Vacancy> {
    const vacancy = await this.vacanciesRepository.findOneBy({ id });
    if (!vacancy) {
      throw new NotFoundException('Vacancy not found');
    }
    return vacancy;
  }

  async update(id: number, updateVacancyDto: UpdateVacancyDto): Promise<Vacancy> {

    const vacancy = await this.vacanciesRepository.findOneBy({ id });

    if (!vacancy) {
      throw new NotFoundException("Vacancy not found")
    }
    Object.assign(vacancy, updateVacancyDto);
    return this.vacanciesRepository.save(vacancy);
  }

  async toggle(id: number) {
    const vacancy = await this.vacanciesRepository.findOneBy({ id })
    if (!vacancy) {
      throw new NotFoundException("Vacancy not found")
    }

    vacancy.isActive = !vacancy.isActive;
    return this.vacanciesRepository.save(vacancy);
  }

  async delete(id: number) {
    const vacancy = await this.vacanciesRepository.findOneBy({ id })
    if (!vacancy) {
      throw new NotFoundException("Vacancy not found")
    }

    return await this.vacanciesRepository.remove(vacancy);
  }
}
