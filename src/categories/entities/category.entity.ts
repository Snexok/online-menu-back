import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Category {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('text', { default: true })
  img?: string = '';

  @Column()
  name: string;
}
