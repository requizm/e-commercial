import { EntityRepository, Repository } from 'typeorm';

import { Category } from '../entity/Category';

@EntityRepository(Category)
export class CategoryRepository extends Repository<Category> {
    async findByName(name: string) {
        return await this.findOne({ name: name });
    }

    async getAll(): Promise<Category[]> {
        return await this.find({ relations: ["parent"] });
    }

    async getById(id: number): Promise<Category> {
        return await this.findOne({
            where: { id: id },
            relations: ["parent"],
        });
    }

    async getChildren(category: Category) {
        const children = await this.find({
            where: { parent: category },
            relations: ["parent"],
        });
        return children;
    }

    async getRootChildren() {
        const children = await this.find({
            where: { parent: null },
            relations: ["parent"],
        });
        return children;
    }
}
