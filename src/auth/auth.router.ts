import { Router } from 'express';
import { AuthController } from './auth.controller';

export class AuthRouter {
    router = Router();

    constructor(private authController: AuthController) {
        this.configureRoutes();
    }

    private configureRoutes(): void {
        this.router.post('/login', (req, res, next) => {
            try {
                const result = this.authController.login(
                    req.body.email,
                    req.body.password,
                );
                res.status(200).json(result);
            } catch (error: unknown) {
                next(error);
            }
        });
        this.router.post('/register', (req, res, next) => {
            try {
                const result = this.authController.register(
                    req.body.username,
                    req.body.password,
                    req.body.email,
                    req.body.firstName,
                    req.body.lastName,
                );
                res.status(200).json(result);
            } catch (error: unknown) {
                next(error);
            }
        });
    }
}
