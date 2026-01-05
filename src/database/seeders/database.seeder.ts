import 'reflect-metadata';
import { DataSource } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { User, UserRole } from '../../users/entities/user.entity';
import { Vacancy, Modality } from '../../vacancies/entities/vacancy.entity';
import { Application } from '../../application/entities/application.entity';
import * as dotenv from 'dotenv';

dotenv.config();
// Configuración directa del DataSource
const dataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST ?? 'localhost',
  port: +(process.env.DB_PORT ?? 5432),
  username: process.env.DB_USER ?? 'postgres',
  password: process.env.DB_PASS ?? 'postgres',
  database: process.env.DB_NAME ?? 'vacantes_db',
  entities: [User, Vacancy, Application],
  synchronize: true, // ⚠️ solo para desarrollo
});

async function runSeeder() {
  await dataSource.initialize();

  console.log('🧹 Limpiando tablas...');
  await dataSource.query('TRUNCATE TABLE "application" RESTART IDENTITY CASCADE;');
  await dataSource.query('TRUNCATE TABLE "vacancy" RESTART IDENTITY CASCADE;');
  await dataSource.query('TRUNCATE TABLE "user" RESTART IDENTITY CASCADE;');

  // ============================
  // Usuarios
  // ============================
  console.log('🔑 Insertando usuarios...');
  const userRepo = dataSource.getRepository(User);

  const admin = userRepo.create({
    name: 'Admin User',
    email: 'admin@example.com',
    password: await bcrypt.hash('admin123', 10),
    role: UserRole.ADMIN,
  });

  const gestor = userRepo.create({
    name: 'Gestor User',
    email: 'gestor@example.com',
    password: await bcrypt.hash('gestor123', 10),
    role: UserRole.GESTOR,
  });

  const coder = userRepo.create({
    name: 'Coder User',
    email: 'coder@example.com',
    password: await bcrypt.hash('coder123', 10),
    role: UserRole.CODER,
  });

  await userRepo.save([admin, gestor, coder]);

  // ============================
  // Vacantes
  // ============================
  console.log('📄 Insertando vacantes...');
  const vacancyRepo = dataSource.getRepository(Vacancy);

  const backendVacancy = vacancyRepo.create({
    title: 'Backend Developer',
    description: 'Desarrollo de APIs escalables con NestJS',
    technologies: 'TypeScript, Node.js, PostgreSQL',
    seniority: 'Mid',
    softSkills: 'Trabajo en equipo, comunicación',
    location: 'Medellín',
    modality: Modality.REMOTE,
    salaryRange: '4M - 6M COP',
    company: 'TechCorp',
    maxApplicants: 5,
    isActive: true,
  });

  const frontendVacancy = vacancyRepo.create({
    title: 'Frontend Developer',
    description: 'Construcción de interfaces con React',
    technologies: 'React, TypeScript, CSS',
    seniority: 'Junior',
    softSkills: 'Creatividad, aprendizaje rápido',
    location: 'Bogotá',
    modality: Modality.HYBRID,
    salaryRange: '3M - 5M COP',
    company: 'WebSolutions',
    maxApplicants: 3,
    isActive: true,
  });

  await vacancyRepo.save([backendVacancy, frontendVacancy]);

  // ============================
  // Aplicaciones
  // ============================
  console.log('📝 Insertando aplicaciones...');
  const applicationRepo = dataSource.getRepository(Application);

  const app1 = applicationRepo.create({
    user: coder,
    vacancy: backendVacancy,
  });

  const app2 = applicationRepo.create({
    user: coder,
    vacancy: frontendVacancy,
  });

  await applicationRepo.save([app1, app2]);

  console.log('✅ Seed completado con éxito');
  await dataSource.destroy();
}

runSeeder().catch((err) => {
  console.error('❌ Error ejecutando el seeder:', err);
  process.exit(1);
});
