import { User } from './user';
import { UserService } from './user.service';

export class UserJSONService implements UserService {
    add(
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

    getById(id: number): User | null {
        var fs = require('fs');
        var users = JSON.parse(fs.readFileSync('src/user/users.json'));
        var user = users.find((user: { id: number }) => user.id === id);
        if (user === undefined) {
            return null;
        }
        return user;
    }

    login(email: string, password: string): User | null {
        var fs = require('fs');
        var users = JSON.parse(fs.readFileSync('src/user/users.json'));
        var user = users.find(
            (user: { email: string; password: string }) =>
                user.email === email && user.password === password,
        );
        if (user === undefined) {
            return null;
        }

        return user;
    }

    addPalette(id: number, palette: string): string | null {
        var fs = require('fs');
        var users = JSON.parse(fs.readFileSync('src/user/users.json'));
        var user = users.find((user: { id: number }) => user.id === id);
        if (user === undefined) {
            return null;
        }
        palette = JSON.parse(palette);
        var newPalette = {
            id: user.palettesSaved.length + 1,
            name: 'palette' + (user.palettesSaved.length + 1),
            colors: palette,

        }
        user.palettesSaved.push(newPalette);
        fs.writeFile(
            'src/user/users.json',
            JSON.stringify(users),
            (err: any) => {
                if (err) {
                    console.error(err);
                }
            },
        );
        return "Palette added";
    }
}
