import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Category {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @OneToOne(() => Category, { nullable: true })
  @JoinColumn()
  parent: Category;

  constructor(name: string, parent?: Category) {
    this.name = name;
    this.parent = parent;
  }
}
