import { User } from './user';

export interface UserService {
    add(
        username: string,
        password: string,
        email: string,
        firstName: string,
        lastName: string,
    ): User;
    getById(id: number): User | null;
    login(email: string, password: string): User | null;
    addPalette(id: number, palette: object, name: string): string | null;
    deletePalette(id: number, paletteId: number): string | null;
    getByJWT(id: number): User | null;
}
