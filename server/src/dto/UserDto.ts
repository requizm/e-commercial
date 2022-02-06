export interface IUserDto {
    firstName?: string;
    lastName?: string;
    email?: string;
    password?: string;
}

export class UserDto {
    firstName: string;
    lastName: string;
    email: string;
    password: string;

    constructor(user?: IUserDto) {
        this.firstName = user?.firstName;
        this.lastName = user?.lastName;
        this.email = user?.email;
        this.password = user?.password;
    }

    toUser(): any {
        return {
            firstName: this.firstName,
            lastName: this.lastName,
            email: this.email,
            password: this.password,
        };
    }
}
