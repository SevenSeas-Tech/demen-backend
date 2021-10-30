import { Column, CreateDateColumn, Entity, PrimaryColumn, UpdateDateColumn } from 'typeorm';

@Entity('subjects')
class Subject {
  @PrimaryColumn()
  id!: string;

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
