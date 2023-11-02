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

    getByJWT(id: number): User | null {
        var fs = require('fs');
        var users = JSON.parse(fs.readFileSync('src/user/users.json'));
        var user = users.find((user: { id: number }) => user.id === id);

        if (user === undefined) {
            return null;
        }
        delete user.password;
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

    addPalette(id: number, palette: object, name: string): string | null {
        var fs = require('fs');
        var users = JSON.parse(fs.readFileSync('src/user/users.json'));
        var user = users.find((user: { id: number }) => user.id === id);
        if (user === undefined) {
            return null;
        }
        if (name === undefined || name === '') {
            name = 'New Palette';
        }
        var newPalette = {
            id: user.palettesSaved.length + 1,
            name: name,
            colors: palette,
        };
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
        return 'Palette added';
    }
    deletePalette(id: number, paletteId: number): string | null {
        var fs = require('fs');
        var users = JSON.parse(fs.readFileSync('src/user/users.json'));
        var user = users.find((user: { id: number }) => user.id === id);
        if (user === undefined) {
            return null;
        }
        var palette = user.palettesSaved.find(
            (palette: { id: number }) => palette.id === paletteId,
        );
        if (palette === undefined) {
            return null;
        }
        var index = user.palettesSaved.indexOf(palette);
        user.palettesSaved.splice(index, 1);
        fs.writeFile(
            'src/user/users.json',
            JSON.stringify(users),
            (err: any) => {
                if (err) {
                    console.error(err);
                }
            },
        );
        return 'Palette deleted';
    }
}
