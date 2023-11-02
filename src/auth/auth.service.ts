import { User } from '../user/user';
export interface AuthService {
    login(email: string, password: string): string | null;
    register(
        username: string,
        password: string,
        email: string,
        firstName: string,
        lastName: string,
    ): User;
    logout(): void;
    getCurrentUser(): User | null;
    isLoggedIn(): boolean;
    isLoggedOut(): boolean;
}
