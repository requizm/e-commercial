import { Inject, Injectable } from "@nestjs/common";
import { User } from "../db/entity/User";
import { UserRepository } from "../db/repository/UserRepository";
import { Result } from "../dto/Result";
import { getConnection } from "typeorm";

@Injectable()
export class AuthService {
    userRepository: UserRepository;
    constructor(@Inject("connectionName") private connectionName: string) {
        const connection = getConnection(this.connectionName);
        this.userRepository = connection.getCustomRepository(UserRepository);
    }

    async register(user: User): Promise<Result> {
        const availableUser = await this.userRepository.findOne({
            email: user.email,
        });
        if (availableUser) {
            return new Result({ message: "User already exists" });
        }
        const data = await this.userRepository.save(user);
        return new Result({ data: data });
    }

    async login(user: User): Promise<Result> {
        const data = await this.userRepository.findOne({
            email: user.email,
            password: user.password,
        });
        if (!data) {
            return new Result({ message: "Wrong username or password" });
        }
        return new Result({ data: data });
    }
}
