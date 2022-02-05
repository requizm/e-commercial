/* src/user/user.service.spec.ts */
import { Connection, Repository } from "typeorm";
import { CreateMemDb } from "../db/CreateMemoryDb";
import { AuthService } from "../service/AuthService";
import { User } from "../DB/entity/User";

describe("Auth Service", () => {
    let db: Connection;
    let authService: AuthService;
    let userRepository: Repository<User>;

    beforeEach(async () => {
        db = await CreateMemDb();
        userRepository = db.getRepository(User);
        authService = new AuthService("test");
    });
    afterEach(() => db.close());

    it("should create a new user", async () => {
        const user = new User("obama", "jackson", "asd@asd.com", "123");

        const result = await authService.register(user);
        const newUser = result.data;
        expect(newUser).toBeDefined();

        const newUserInDb = await userRepository.findOne(newUser.id);
        expect(newUserInDb.email).toBe(user.email);
    });

    it("should create an existing user", async () => {
        const user = new User("obama", "jackson", "asd@asd.com", "123");
        await authService.register(user);

        const result = await authService.register(user);
        const newUser = result.data;
        expect(newUser).toBeUndefined();
    });

    it("should login", async () => {
        const user = new User("obama", "jackson", "asd@asd.com", "123");
        await authService.register(user);

        const result = await authService.login(user);
        const newUser = result.data;
        expect(newUser).toBeDefined();
    });

    it("should not login", async () => {
        const user = new User("obama", "jackson", "asd@asd.com", "123");
        const result = await authService.login(user);
        const newUser = result.data;
        expect(newUser).toBeUndefined();
    });
});
