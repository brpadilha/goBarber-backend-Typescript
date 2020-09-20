import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('users') // estamos indicando que o model de Users vai ser armazenado dentro da tabela de Users
class User {
  @PrimaryGeneratedColumn('uuid') // mostranod que é uma coluna primária
  id: string; // define o id do tipo string

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column()
  avatar: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default User;
