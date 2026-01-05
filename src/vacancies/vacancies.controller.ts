import { Controller, Post, Get, Param, Body, Put, Delete, UseGuards } from '@nestjs/common';
import { VacanciesService } from './vacancies.service';
import { CreateVacancyDto } from './dto/create-vacancy.dto';
import { UpdateVacancyDto } from './dto/update-vacancy.dto';
import { RolesGuard } from '../auth/guards/roles.guard';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { Roles } from '../common/decorators/roles.decorator';
import { ApiTags, ApiBearerAuth, ApiSecurity, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';

@ApiTags('Vacancies')
@ApiBearerAuth() // JWT
@ApiSecurity('api-key') // x-api-key
@Controller('vacancies')
@UseGuards(JwtAuthGuard, RolesGuard)
export class VacanciesController {
  constructor(private readonly vacanciesService: VacanciesService) {}

  @Post()
  @Roles('coder', 'admin')
  @ApiOperation({ summary: 'Crear una nueva vacante (coder/admin)' })
  @ApiResponse({ status: 201, description: 'Vacante creada exitosamente' })
  async create(@Body() createVacancyDto: CreateVacancyDto) {
    return this.vacanciesService.create(createVacancyDto);
  }

  @Get()
  @ApiOperation({ summary: 'Listar todas las vacantes (autenticado)' })
  @ApiResponse({ status: 200, description: 'Lista de vacantes retornada' })
  async findAll() {
    return this.vacanciesService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener una vacante por ID (autenticado)' })
  @ApiParam({ name: 'id', type: Number, description: 'ID de la vacante' })
  @ApiResponse({ status: 200, description: 'Vacante encontrada' })
  async findOne(@Param('id') id: number) {
    return this.vacanciesService.findOne(id);
  }

  @Put(':id')
  @Roles('gestor', 'admin')
  @ApiOperation({ summary: 'Actualizar una vacante por ID (gestor/admin)' })
  @ApiParam({ name: 'id', type: Number, description: 'ID de la vacante' })
  @ApiResponse({ status: 200, description: 'Vacante actualizada exitosamente' })
  async update(@Param('id') id: number, @Body() updateVacancyDto: UpdateVacancyDto) {
    return this.vacanciesService.update(id, updateVacancyDto);
  }

  @Put(':id/toggle')
  @Roles('gestor', 'admin')
  @ApiOperation({ summary: 'Activar/Desactivar una vacante (gestor/admin)' })
  @ApiParam({ name: 'id', type: Number, description: 'ID de la vacante' })
  @ApiResponse({ status: 200, description: 'Estado de la vacante actualizado' })
  async toggle(@Param('id') id: number) {
    return this.vacanciesService.toggle(id);
  }

  @Delete(':id')
  @Roles('gestor', 'admin')
  @ApiOperation({ summary: 'Eliminar una vacante por ID (gestor/admin)' })
  @ApiParam({ name: 'id', type: Number, description: 'ID de la vacante' })
  @ApiResponse({ status: 200, description: 'Vacante eliminada exitosamente' })
  async delete(@Param('id') id: number) {
    return this.vacanciesService.delete(id);
  }
}
