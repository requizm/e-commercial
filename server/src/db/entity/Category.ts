import {
    Column,
    Entity,
    JoinColumn,
    ManyToOne,
    PrimaryGeneratedColumn,
} from "typeorm";

export interface ICategory {
    name?: string;
    parent?: Category;
}

@Entity()
export class Category {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @ManyToOne(() => Category, { nullable: true })
    @JoinColumn()
    parent: Category;

    constructor(category?: ICategory) {
        this.name = category?.name;
        this.parent = category?.parent;
    }
}
