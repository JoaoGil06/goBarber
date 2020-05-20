import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

import User from './User';

@Entity('appointments')
class Appointment {
  /*Nós podemos ter propriedades dentro da classe que não são colunas da base de dados
  Mas é preciso dizer quais são e quais não são colunas */
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column() //Por padrão é varchar, mas podemos colocar lá dentro também
  provider_id: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'provider_id' })
  provider: User;

  @Column('time with time zone')
  date: Date;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Appointment;
