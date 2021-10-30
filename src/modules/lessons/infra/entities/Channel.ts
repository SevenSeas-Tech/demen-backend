import { Column, CreateDateColumn, Entity, PrimaryColumn, UpdateDateColumn } from 'typeorm';

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

  @CreateDateColumn('created_at')
  createdAt!: Date;

  @UpdateDateColumn('updated_at')
  updatedAt!: Date;
}

export default Channel;
