import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm';

import { Video } from '@lessons:entities/Video';

// ---------------------------------------------------------------------------------------------- //

@Entity('users')
export class Employee {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  username!: string;

  @Column()
  password!: string;

  @Column()
  email!: string;

  @Column()
  name!: string;

  @Column({ name: 'last_name' })
  lastName!: string;

  @Column()
  phone!: string;

  @OneToMany(() => Video, video => video.user)
  videos!: Video[];

  @CreateDateColumn({ name: 'created_at' })
  createdAt!: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt!: Date;
}
