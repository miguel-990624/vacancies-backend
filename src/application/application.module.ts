import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ApplicationService } from './application.service';
import { ApplicationController } from './application.controller';
import { Application } from './entities/application.entity';
import { UsersModule } from '../users/users.module';
import { VacanciesModule } from '../vacancies/vacancies.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Application]),
    UsersModule,                             
    VacanciesModule,                        
  ],
  controllers: [ApplicationController],
  providers: [ApplicationService],
  exports: [ApplicationService], 
})
export class ApplicationModule {}
