import { Router } from 'express';
import { UserController } from './user.controller';

export class UserRouter {
    router = Router();

    constructor(private userController: UserController) {
        this.configureRoutes();
    }

    private configureRoutes(): void {
        this.router.get('/:id', (req, res, next) => {
            try {
                const result = this.userController.getById(
                    parseInt(req.params.id),
                );
                res.status(200).json(result);
            } catch (error: unknown) {
                next(error);
            }
        });

        this.router.patch('/palettes/:id', (req, res, next) => {
            try {
                const result = this.userController.addPalette(
                    parseInt(req.params.id),
                    req.body.palette,
                );
                res.status(200).json(result);
            } catch (error: unknown) {
                next(error);
            }
        });
        this.router.post('/add-user', (req, res, next) => {
            try {
                const result = this.userController.add(
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
        this.router.post('/login', (req, res, next) => {
            res.header('Access-Control-Allow-Origin', '*');
            try {
                const result = this.userController.login(
                    req.body.email,
                    req.body.password,
                );
                res.status(200).json(result);
            } catch (error: unknown) {
                next(error);
            }
        });
    }
}
