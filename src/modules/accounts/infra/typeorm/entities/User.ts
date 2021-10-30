import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryColumn,
  UpdateDateColumn
} from 'typeorm';

import Video from '@lessons:entities/Video';

// ---------------------------------------------------------------------------------------------- //

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

  @Column({ name: 'last_name' })
  lastName!: string;

  @Column()
  admin!: boolean;

  @Column()
  verified!: boolean;

  @CreateDateColumn({ name: 'created_at' })
  createdAt!: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt!: Date;

  // * ---- Foreign Keys ------------------------------------------------------------------------ //

  @OneToMany(() => Video, video => video.user)
  videos!: Video[];
}

export default User;
