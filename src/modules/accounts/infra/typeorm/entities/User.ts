import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm';

// ---------------------------------------------------------------------------------------------- //

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  googleId!: string;

  @Column()
  email!: string;

  @Column()
  name!: string;

  @Column({ name: 'last_name' })
  lastName!: string;

  @Column()
  avatar!: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt!: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt!: Date;
}
