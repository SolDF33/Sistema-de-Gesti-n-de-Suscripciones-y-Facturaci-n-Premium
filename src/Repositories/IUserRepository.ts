import { User } from '../Models/User';

export interface IUserRepository {
    save(user: User): void;
    findById(id: string): User | undefined;
}