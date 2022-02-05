import {
    Column,
    Entity,
    JoinColumn,
    ManyToOne,
    PrimaryGeneratedColumn,
} from "typeorm";

@Entity()
export class Category {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @ManyToOne(() => Category, { nullable: true })
    @JoinColumn()
    parent: Category;

    constructor(name: string, parent?: Category) {
        this.name = name;
        this.parent = parent;
    }
}
