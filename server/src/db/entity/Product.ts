import {
    Column,
    Entity,
    JoinColumn,
    ManyToOne,
    PrimaryGeneratedColumn,
} from "typeorm";

import { Category } from "./Category";

@Entity()
export class Product {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    description: string;

    @Column()
    price: number;

    @Column()
    image: string;

    @ManyToOne(() => Category)
    @JoinColumn()
    category: Category;

    constructor(
        name: string,
        description: string,
        price: number,
        image: string,
        category: Category
    ) {
        this.name = name;
        this.description = description;
        this.price = price;
        this.image = image;
        this.category = category;
    }
}
