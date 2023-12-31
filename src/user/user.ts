export class User {
    constructor(
        public id: number,
        public username: string,
        public password: string,
        public email: string,
        public firstName: string,
        public lastName: string,
        public palettesSaved: Array<number> = [],
    ) {}
}
