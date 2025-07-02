import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

@Entity()
export class Task {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  title!: string;

  @Column()
  description!: string;

  @Column()
  executeAt!: Date;

  @Column()
  webhookUrl!: string;

  @CreateDateColumn()
  createdAt!: Date;
}
