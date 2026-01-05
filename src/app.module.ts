import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { ApplicationModule } from './application/application.module';
import { VacanciesModule } from './vacancies/vacancies.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users/entities/user.entity';
import { Vacancy } from './vacancies/entities/vacancy.entity';
import { Application } from './application/entities/application.entity';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({ 
      isGlobal: true, 
    }),
    TypeOrmModule.forRoot({ 
      type: 'postgres', 
      host: process.env.DB_HOST, 
      port: parseInt(process.env.DB_PORT!, 10) || 5432, 
      username: process.env.DB_USER, 
      password: process.env.DB_PASS, 
      database: process.env.DB_NAME, 
      entities: [User, Vacancy, Application], 
      synchronize: true, 

    }),
    UsersModule, 
    ApplicationModule, 
    VacanciesModule, AuthModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
