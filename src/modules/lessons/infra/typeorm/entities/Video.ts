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

  @Column('channel_id')
  channelId!: string;

  @Column('user_id')
  userId!: string;

  @Column('subject_id')
  subjectId!: string;

  @Column()
  disabled!: boolean;

  @Column()
  institution?: string;

  @Column('published_at')
  publishedAt!: Date;

  @Column()
  teacher?: string;

  @Column()
  title!: string;

  @CreateDateColumn('created_at')
  createdAt!: Date;

  @UpdateDateColumn('updated_at')
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
