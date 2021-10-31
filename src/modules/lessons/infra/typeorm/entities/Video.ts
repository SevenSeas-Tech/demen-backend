import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
  UpdateDateColumn
} from 'typeorm';

import User from '@accounts:entities/User';
import Channel from '@lessons:entities/Channel';
import Subject from '@lessons:entities/Subject';

// ---------------------------------------------------------------------------------------------- //

@Entity('videos')
class Video {
  @PrimaryColumn()
  id!: string;

  @Column({ name: 'channel_id' })
  channelId!: string;

  @Column({ name: 'user_id' })
  userId!: string;

  @Column({ name: 'subject_id' })
  subjectId!: string;

  @Column()
  disabled!: boolean;

  @Column()
  institution?: string;

  @Column({ name: 'published_at' })
  publishedAt!: Date;

  @Column()
  teacher?: string;

  @Column()
  title!: string;

  @Column()
  thumbnail!: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt!: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt!: Date;

  // * ------------------- Foreign Keys ------------------------------------------------------- * //

  @ManyToOne(() => Channel)
  @JoinColumn({ name: 'channelId' })
  channel!: Channel;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'userId' })
  user!: User;

  @ManyToOne(() => Subject)
  @JoinColumn({ name: 'subjectId' })
  subject!: Subject;
}

export default Video;
