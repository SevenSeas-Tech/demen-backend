import { Column, CreateDateColumn, Entity, PrimaryColumn, UpdateDateColumn } from 'typeorm';

import { Uuid } from '@shared/@types/Uuid';

@Entity('subjects')
class Subject {
  @PrimaryColumn()
  id!: Uuid;

  @Column()
  title!: string;

  @Column()
  description?: string;

  @CreateDateColumn('created_at')
  createdAt!: Date;

  @UpdateDateColumn('updated_at')
  updatedAt!: Date;
}

export default Subject;
