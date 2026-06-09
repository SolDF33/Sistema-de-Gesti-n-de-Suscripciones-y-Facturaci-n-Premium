import { IUserRepository } from './IUserRepository';
import { User } from '../Models/User';
import { DatabaseConnection } from '../Config/DatabaseConnection';
export class UserRepository implements IUserRepository {
private db = DatabaseConnection.getInstance();
public save(user: User): void {
this.db.users.set(user.id, user);
}
public findById(id: string): User | undefined {
return this.db.users.get(id);
}
}