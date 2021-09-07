import { Email, Uuid } from '@modules/accounts/@types/User';
import { Column, CreateDateColumn, Entity, PrimaryColumn, UpdateDateColumn } from 'typeorm';

@Entity()
class User {
  @PrimaryColumn('uuid')
  id!: Uuid;

  @Column()
  username!: string;

  @Column()
  password!: string;

  @Column()
  email!: Email;

  @Column()
  name!: string;

  @Column()
  last_name!: string;

  @Column()
  admin!: boolean;

  @CreateDateColumn()
  created_at!: Date;

  @UpdateDateColumn()
  updated_at!: Date;
}

export default User;
