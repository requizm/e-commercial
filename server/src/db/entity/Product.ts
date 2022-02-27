import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

import { Category } from './Category';

export interface IProduct {
    id?: number;
    name?: string;
    description?: string;
    price?: number;
    image?: string;
    category?: Category;
}

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

    constructor(product?: IProduct) {
        this.name = product?.name;
        this.description = product?.description;
        this.price = product?.price;
        this.image = product?.image;
        this.category = product?.category;
    }
}
