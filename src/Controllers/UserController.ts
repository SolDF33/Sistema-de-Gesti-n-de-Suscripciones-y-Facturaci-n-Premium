import { IUserRepository } from '../Repositories/IUserRepository';
import { User } from '../Models/User';

export class UserController {
    // Aplicando Inversión de Dependencias (D de SOLID)
    constructor(private userRepository: IUserRepository) {}

    public registerUser(id: string, name: string, email: string, preference: 'EMAIL' | 'SMS'): User {
        const newUser = new User(id, name, email, preference);
        this.userRepository.save(newUser);
        console.log(`[USER CONTROLLER]: Usuario ${name} registrado exitosamente.`);
        return newUser;
    }
}


