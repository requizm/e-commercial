import { Injectable } from "@nestjs/common";
import { User } from "src/db/entity/User";
import { UserRepository } from "src/db/repository/UserRepository";
import { getConnection } from "typeorm";

@Injectable()
export class AuthService {
    userRepository: UserRepository;
    constructor() {
        const connection = getConnection("default");
        this.userRepository = connection.getCustomRepository(UserRepository);
    }

    async register(user: User): Promise<boolean> {
        const availableUser = await this.userRepository.findOne({
            email: user.email,
        });
        if (availableUser) {
            return false;
        }
        this.userRepository.save(user);
        return true;
    }

    async login(user: User): Promise<boolean> {
        const availableUser = await this.userRepository.findOne({
            email: user.email,
            password: user.password,
        });
        if (availableUser) {
            return true;
        }
        return false;
    }
}
