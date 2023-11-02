import { AuthService } from './auth.service';
import { User } from '../user/user';

export class AuthController {
    constructor(private authService: AuthService) {}

    login(email: string, password: string): string | null {
        if (this.isEmpty(email)) {
            throw new Error('Email cannot be empty');
        }
        if (this.isWhitespaced(email)) {
            throw new Error('Email cannot be whitespaced');
        }
        if (this.isEmpty(password)) {
            throw new Error('Password cannot be empty');
        }
        if (this.isWhitespaced(password)) {
            throw new Error('Password cannot be whitespaced');
        }

        return this.authService.login(email, password);
    }

    register(
        username: string,
        password: string,
        email: string,
        firstName: string,
        lastName: string,
    ): User | null {
        if (this.isEmpty(username)) {
            throw new Error('Username cannot be empty');
        }
        if (this.isWhitespaced(username)) {
            throw new Error('Username cannot be whitespaced');
        }
        if (this.isEmpty(password)) {
            throw new Error('Password cannot be empty');
        }
        if (this.isWhitespaced(password)) {
            throw new Error('Password cannot be whitespaced');
        }
        if (this.isEmpty(email)) {
            throw new Error('Email cannot be empty');
        }
        if (this.isWhitespaced(email)) {
            throw new Error('Email cannot be whitespaced');
        }
        if (this.isEmpty(firstName)) {
            throw new Error('First Name cannot be empty');
        }
        if (this.isWhitespaced(firstName)) {
            throw new Error('First Name cannot be whitespaced');
        }
        if (this.isEmpty(lastName)) {
            throw new Error('Last Name cannot be empty');
        }
        if (this.isWhitespaced(lastName)) {
            throw new Error('Last Name cannot be whitespaced');
        }

        return this.authService.register(
            username,
            password,
            email,
            firstName,
            lastName,
        );
    }

    logout(): void {
        this.authService.logout();
    }

    getCurrentUser(): User | null {
        return this.authService.getCurrentUser();
    }

    isLoggedIn(): boolean {
        return this.authService.isLoggedIn();
    }

    isLoggedOut(): boolean {
        return this.authService.isLoggedOut();
    }

    private isEmpty(str: string): boolean {
        return !str || 0 === str.length;
    }

    private isWhitespaced(str: string): boolean {
        return str.trim().length === 0;
    }
}
