import { Column, CreateDateColumn, Entity, PrimaryColumn, UpdateDateColumn } from 'typeorm';

import { Email, Uuid } from '@accounts:types/User';

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
