import { Column, CreateDateColumn, Entity, PrimaryColumn, UpdateDateColumn } from 'typeorm';

@Entity('users')
class User {
  @PrimaryColumn('uuid')
  id!: string;

  @Column()
  username!: string;

  @Column()
  password!: string;

  @Column()
  email!: string;

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
