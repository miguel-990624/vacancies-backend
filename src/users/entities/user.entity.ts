import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Application } from '../../application/entities/application.entity';

export enum UserRole {
  ADMIN = 'admin',
  GESTOR = 'gestor',
  CODER = 'coder',
}

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column({
    type: 'enum',
    enum: UserRole,
    default: UserRole.CODER,
  })
  role: UserRole;

  @OneToMany(() => Application, (application) => application.user)
  applications: Application[];
}
