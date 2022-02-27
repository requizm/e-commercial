/* eslint-disable prettier/prettier */
/* src/user/user.service.spec.ts */
import { Connection } from 'typeorm';

import { Test } from '@nestjs/testing';

import { CreateMemDb } from '../db/CreateMemoryDb';
import { User } from '../db/entity/User';
import { UserRepository } from '../db/repository/UserRepository';
import { UserDto } from '../dto/UserDto';
import { AuthService } from '../service/AuthService';

describe("Auth Service", () => {
    let db: Connection;
    let authService: AuthService;
    let userRepository: UserRepository;

    beforeEach(async () => {
        db = await CreateMemDb();
        userRepository = db.getCustomRepository(UserRepository)
        const moduleRef = await Test.createTestingModule({
            providers: [
                AuthService,
                {
                    provide: "userRepository",
                    useValue: userRepository,
                },
            ],
        }).compile();

        authService = moduleRef.get<AuthService>(AuthService);
    });
    afterEach(async () => {
        await db.close();
    });

    it("should create a new user", async () => {
        const input = new UserDto({ firstName: "obama", lastName: "jackson", email: "asd@asd.com", password: "123" });
        const output = new User(input);

        jest.spyOn(userRepository, 'findOne').mockReturnValueOnce(null);
        jest.spyOn(userRepository, 'save').mockResolvedValueOnce(output);

        const result = await authService.register(input);
        expect(result.data.email).toEqual(input.email);
    });

    it("shouldn't create an existing user", async () => {
        const input = new UserDto({ firstName: "obama", lastName: "jackson", email: "asd@asd.com", password: "123" });
        const output = new User(input);

        jest.spyOn(userRepository, 'findOne').mockResolvedValueOnce(output);

        const result = await authService.register(input);
        expect(result.data).toBeUndefined();
    });

    it("shouldn't create an user with missing input", async () => {
        const user = new UserDto({ firstName: "obama", lastName: "jackson" });
        await authService.register(user);

        const result = await authService.register(user);
        expect(result.data).toBeUndefined();
    });

    it("should login", async () => {
        const input = new UserDto({ firstName: "obama", lastName: "jackson", email: "asd@asd.com", password: "123" });
        const output = new User(input);

        jest.spyOn(userRepository, 'findOne').mockResolvedValueOnce(output);

        const result = await authService.login(input);
        expect(result.data).toBeDefined();
    });

    it("shouldn't login", async () => {
        const input = new UserDto({ firstName: "obama", lastName: "jackson", email: "asd@asd.com", password: "123" });

        jest.spyOn(userRepository, 'findOne').mockReturnValueOnce(null);

        const result = await authService.login(input);
        expect(result.data).toBeUndefined();
    });

    it("should login with missing input", async () => {
        const user = new UserDto({ firstName: "obama", lastName: "jackson", email: "asd@asd.com" });
        const result = await authService.login(user);
        expect(result.data).toBeUndefined();
    });
});
