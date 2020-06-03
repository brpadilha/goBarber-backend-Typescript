import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('appointments') // estamos indicando que o model de appointments vai ser armazenado dentro da tabela de appointments
class Appointment {
  @PrimaryGeneratedColumn('uuid') // mostranod que é uma coluna primária
  id: string; // define o id do tipo string

  @Column('varchar')
  provider: string;

  @Column('timestamp with time zone')
  date: Date;
}

export default Appointment;
