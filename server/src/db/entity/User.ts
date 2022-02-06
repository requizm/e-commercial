import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

export interface IUser {
    id?: number;
    firstName?: string;
    lastName?: string;
    email?: string;
    password?: string;
}

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    firstName: string;

    @Column()
    lastName: string;

    @Column()
    email: string;

    @Column()
    password: string;

    constructor(user?: IUser) {
        this.firstName = user?.firstName;
        this.lastName = user?.lastName;
        this.email = user?.email;
        this.password = user?.password;
    }
}
