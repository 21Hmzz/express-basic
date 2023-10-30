import { User } from './user';
import { UserService } from './user.service';

export class UserController {
    constructor(private userService: UserService) {}

    add(
        username: string,
        password: string,
        email: string,
        firstName: string,
        lastName: string,
    ): User {
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

        return this.userService.add(
            username,
            password,
            email,
            firstName,
            lastName,
        );
    }

    login(email: string, password: string): User | null {
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

        return this.userService.login(email, password);
    }

    getById(id: number): User | null {
        return this.userService.getById(id);
    }

    private isEmpty(value: string): boolean {
        if (value === null || value === undefined) {
            return true;
        } else {
            return false;
        }
    }
    private isWhitespaced(value: string): boolean {
        if (value.trim().length === 0) {
            return true;
        } else {
            return false;
        }
    }
}
