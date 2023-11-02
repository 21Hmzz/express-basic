import { User } from '../user/user';
import { AuthService } from './auth.service';

const jwt = require('jsonwebtoken');

export class AuthJSONService implements AuthService {
    login(email: string, password: string): string | null {
        var fs = require('fs');
        var users = JSON.parse(fs.readFileSync('src/user/users.json'));
        var user = users.find(
            (user: { email: string; password: string }) =>
                user.email === email && user.password === password,
        );
        if (user === undefined) {
            return null;
        }

        const token = jwt.sign({ id: user.id }, 'secret', { expiresIn: '1h' });
        return token;
    }

    register(
        username: string,
        password: string,
        email: string,
        firstName: string,
        lastName: string,
    ): User {
        var fs = require('fs');
        var users = JSON.parse(fs.readFileSync('src/user/users.json'));

        var nbUsers = users.length;
        const newUser = new User(
            nbUsers + 1,
            username,
            password,
            email,
            firstName,
            lastName,
        );
        users.push(newUser);
        fs.writeFile(
            'src/user/users.json',
            JSON.stringify(users),
            (err: any) => {
                if (err) {
                    console.error(err);
                }
            },
        );
        return newUser;
    }

    logout(): void {
        throw new Error('Method not implemented.');
    }

    getCurrentUser(): User | null {
        throw new Error('Method not implemented.');
    }

    isLoggedIn(): boolean {
        throw new Error('Method not implemented.');
    }

    isLoggedOut(): boolean {
        throw new Error('Method not implemented.');
    }
}
