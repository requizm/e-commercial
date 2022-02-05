import { Inject, Injectable } from "@nestjs/common";
import { User } from "../db/entity/User";
import { UserRepository } from "../db/repository/UserRepository";
import { Result } from "../dto/Result";
import { getConnection } from "typeorm";

@Injectable()
export class AuthService {
    userRepository: UserRepository;
    constructor(@Inject('connectionName') private connectionName: string) {
        const connection = getConnection(this.connectionName);
        this.userRepository = connection.getCustomRepository(UserRepository);
    }

    async register(user: User): Promise<Result> {
        let result: Result = new Result();
        const availableUser = await this.userRepository.findOne({
            email: user.email,
        });
        if (availableUser) {
            result.message = "User already exists";
        } else {
            result.data = await this.userRepository.save(user);
        }
        return result;
    }

    async login(user: User): Promise<Result> {
        let result: Result = new Result();
        result.data = await this.userRepository.findOne({
            email: user.email,
            password: user.password,
        });
        if (!result.data) {
            result.message = "Wrong username or password";
        }
        return result;
    }
}
