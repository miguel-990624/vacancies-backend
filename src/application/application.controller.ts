import { Controller, Post, Get, Param, Delete, Body, Req, UseGuards } from '@nestjs/common';
import { ApplicationService } from './application.service';
import { RolesGuard } from '../auth/guards/roles.guard';
import { CreateApplicationDto } from './dto/create-application.dto';
import { Roles } from '../common/decorators/roles.decorator';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { ApiTags, ApiBearerAuth, ApiSecurity } from '@nestjs/swagger';

@ApiTags('Applications')
@ApiBearerAuth() // JWT
@ApiSecurity('api-key') // x-api-key
@Controller('applications')
@UseGuards(JwtAuthGuard, RolesGuard)
export class ApplicationController {
  constructor(private readonly applicationService: ApplicationService) {}

  // 👉 Coder se postula a una vacante
  @Post()
  @Roles('coder')
  async create(@Req() req, @Body() createApplicationDto: CreateApplicationDto) {
    const userId = req.user.userId; // viene del JWT
    return this.applicationService.create(userId, createApplicationDto.vacancyId);
  }

  // 👉 Gestor/Admin pueden ver todas las postulaciones
  @Get()
  @Roles('gestor', 'admin')
  async findAll() {
    return this.applicationService.findAll();
  }

  // 👉 Consultar una postulación específica (cualquier usuario autenticado)
  @Get(':id')
  async findOne(@Param('id') id: number) {
    return this.applicationService.findOne(id);
  }

  // 👉 Eliminar una postulación (admin o coder)
  @Delete(':id')
  @Roles('admin', 'coder')
  async delete(@Param('id') id: number, @Req() req) {
    return this.applicationService.delete(id);
  }
}
