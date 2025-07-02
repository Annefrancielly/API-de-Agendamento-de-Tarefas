import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Task {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  title!: string;

  @Column()
  description!: string;

  @Column()
  executeAt!: string;

  @Column()
  webhookUrl!: string;

  @Column({ default: () => 'CURRENT_TIMESTAMP' })
  createdAt!: string;
}
