import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('text', { default: true })
  img?: string = '';

  @Column()
  title: string;

  @Column()
  composition: string;
}
