export interface ICategoryDto {
    name?: string;
    parent?: number;
}

export class CategoryDto {
    name: string;
    parent: number;

    constructor(category?: ICategoryDto) {
        this.name = category?.name;
        this.parent = category?.parent;
    }

    toCategory(): any {
        if (this.parent) {
            return {
                name: this.name,
                parent: this.parent,
            };
        }
        return { name: this.name, parent: null };
    }
}
