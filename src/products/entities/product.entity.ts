import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  img: string;

  @Column()
  title: string;

  @Column()
  composition: boolean;
}
