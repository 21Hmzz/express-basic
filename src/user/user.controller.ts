import { User } from './user';
import { UserService } from './user.service';

export class UserController {
    constructor(private userService: UserService) {}

    add(username: string): User {
        if (this.isEmpty(username)) {
            throw new Error('Username cannot be empty '+ username);
        }
        // is the username whitespaced ?
        if (this.isWhitespaced(username)) {
            throw new Error('Username cannot be whitespaced');
        }

        return this.userService.add(username);
    }

    getById(id: number): User | null {
        // is the id a decimal ?
        // is the id a negative number ?
        // other checks...
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
