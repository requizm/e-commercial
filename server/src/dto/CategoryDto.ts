export interface ICategoryDto {
    name?: string;
    parent?: ICategoryDto;
}

export class CategoryDto {
    name: string;
    parent: ICategoryDto;

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
