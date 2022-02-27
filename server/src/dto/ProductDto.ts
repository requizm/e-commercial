import { ICategory } from '../db/entity/Category';

export interface IProductDto {
    name?: string;
    description?: string;
    price?: number;
    image?: string;
    category?: ICategory;
}

export class ProductDto {
    name: string;
    description: string;
    price: number;
    image: string;
    category: ICategory;

    constructor(product?: IProductDto) {
        this.name = product?.name;
        this.description = product?.description;
        this.price = product?.price;
        this.image = product?.image;
        this.category = product?.category;
    }

    toProduct(): any {
        return {
            name: this.name,
            description: this.description,
            price: this.price,
            image: this.image,
            category: this.category,
        };
    }
}
