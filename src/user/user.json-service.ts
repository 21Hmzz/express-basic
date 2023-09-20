import { User } from './user';
import { UserService } from './user.service';


export class UserJSONService implements UserService {

    
    add(username: string): User {
       
        var fs = require('fs');
        var users =JSON.parse(fs.readFileSync('src/user/users.json'));
        
        var nbUsers = users.length;
        const newUser = new User(nbUsers + 1,username);
        users.push(newUser);
        fs.writeFile('src/user/users.json', JSON.stringify(users), (err: any) => {
            if (err) {
              console.error(err);
            }
          }
        );
        return newUser ;


    }

    getById(id: number): User | null {
        
        var fs = require('fs');
        var users =JSON.parse(fs.readFileSync('src/user/users.json'));
        var user = users.find((user: { id: number; }) => user.id === id);
        if (user === undefined) {
            return null;
        }
        return user;
    }
}
