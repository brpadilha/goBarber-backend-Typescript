import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

import User from '../../../../users/infra/typeorm/entities/User';

@Entity('appointments') // estamos indicando que o model de appointments vai ser armazenado dentro da tabela de appointments
class Appointment {
  @PrimaryGeneratedColumn('uuid') // mostranod que é uma coluna primária
  id: string; // define o id do tipo string

  @Column()
  provider_id: string;

  @ManyToOne(() => User) // Pode ter muitos agendamentos em um usuário provider
  @JoinColumn({ name: 'provider_id' }) // Mostrando qual coluna do usuário está relacionado
  provider: User; // Mostrando qual é o Model que está sendo feito o relacionamento

  @Column('timestamp with time zone')
  date: Date;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Appointment;
