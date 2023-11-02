import { ExpressRouter } from './express-router';
import { ExpressServer } from './express-server';
import { UserJSONService } from '../user/user.json-service';
import { UserService } from '../user/user.service';
import { AuthJSONService } from '../auth/auth.json-service';
import { AuthService } from '../auth/auth.service';
import * as dotenv from 'dotenv';

export class ExpressApplication {
    private expressRouter!: ExpressRouter;
    private port!: string;
    private server!: ExpressServer;
    private userService!: UserService;
    private authService!: AuthService;

    constructor() {
        this.configureApplication();
    }

    bootstrap(): void {
        this.server.bootstrap();
    }

    private configureApplication(): void {
        this.configureEnvironment();
        this.configureServerPort();
        this.configureServices();
        this.configureExpressRouter();
        this.configureServer();
    }

    private configureEnvironment(): void {
        dotenv.config({
            path: '.env',
        });
    }

    private configureServerPort(): void {
        this.port = this.getPort();
    }

    private configureServices(): void {
        this.userService = new UserJSONService();
        this.authService = new AuthJSONService();
    }

    private configureExpressRouter(): void {
        this.expressRouter = new ExpressRouter(
            this.userService,
            this.authService,
        );
    }

    private configureServer(): void {
        this.server = new ExpressServer(this.port, this.expressRouter);
    }

    private getPort(): string {
        const port = process.env.PORT;
        if (!port) {
            throw new Error('No port was found in env file.');
        }

        return port;
    }
}
