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

@Entity('channels')
class Channel {
  @PrimaryColumn()
  id!: string;

  @Column()
  title!: string;

  @Column()
  description!: string;

  @Column()
  thumbnail!: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt!: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt!: Date;

  // * ---- Foreign Keys ------------------------------------------------------------------------ //

  @OneToMany(() => Video, video => video.channel)
  videos!: Video[];
}

export default Channel;
