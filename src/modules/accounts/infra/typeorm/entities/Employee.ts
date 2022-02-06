import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm';

// ---------------------------------------------------------------------------------------------- //

@Entity('users')
class Employee {
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

  // @Column()
  // admin!: boolean;
  @Column()
  phone!: string;
  // @Column()
  // verified!: boolean;

  @CreateDateColumn({ name: 'created_at' })
  createdAt!: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt!: Date;
}

export { Employee };
