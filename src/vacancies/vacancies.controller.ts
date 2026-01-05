import { Controller, Post, Get, Param, Body, Put, Delete, UseGuards } from '@nestjs/common';
import { VacanciesService } from './vacancies.service';
import { CreateVacancyDto } from './dto/create-vacancy.dto';
import { UpdateVacancyDto } from './dto/update-vacancy.dto';

import { RolesGuard } from '../auth/guards/roles.guard';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { Roles } from '../common/decorators/roles.decorator';

@Controller('vacancies')
@UseGuards(JwtAuthGuard, RolesGuard)
export class VacanciesController {
  constructor(private readonly vacanciesService: VacanciesService) {}

  @Post()
  @Roles('gestor', 'admin')
  async create(@Body() createVacancyDto: CreateVacancyDto) {
    return this.vacanciesService.create(createVacancyDto);
  }

  @Get()
  async findAll() {
    return this.vacanciesService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    return this.vacanciesService.findOne(id);
  }

  @Put(':id')
  @Roles('gestor', 'admin')
  async update(@Param('id') id: number, @Body() updateVacancyDto: UpdateVacancyDto) {
    return this.vacanciesService.update(id, updateVacancyDto);
  }

  @Put(':id/toggle')
  @Roles('gestor', 'admin')
  async toggle(@Param('id') id: number) {
    return this.vacanciesService.toggle(id);
  }

  @Delete(':id')
  @Roles('gestor', 'admin')
  async delete(@Param('id') id: number) {
    return this.vacanciesService.delete(id);
  }
}
