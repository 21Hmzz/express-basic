import { Router } from 'express';
import { UserController } from './user.controller';
const jwt = require('jsonwebtoken');

export class UserRouter {
    router = Router();

    constructor(private userController: UserController) {
        this.configureRoutes();
    }

    private configureRoutes(): void {
        this.router.get('/', (req, res, next) => {
            jwt.verify(
                req.headers.authorization,
                process.env.JWT_SECRET,
                (err: any, decoded: any) => {
                    if (err) {
                        res.status(401).json({
                            message: 'Unauthorized',
                        });
                    } else {
                        const result = this.userController.getByJWT(decoded.id);
                        res.status(200).json(result);
                    }
                },
            );
        });
        this.router.get('/:id', (req, res, next) => {
            jwt.verify(
                req.headers.authorization,
                process.env.JWT_SECRET,
                (err: any, decoded: any) => {
                    if (err) {
                        res.status(401).json({
                            message: 'Unauthorized',
                        });
                    } else {
                        const result = this.userController.getById(
                            parseInt(req.params.id),
                        );
                        res.status(200).json(result);
                    }
                },
            );
        });

        this.router.patch('/palettes/:id', (req, res, next) => {
            jwt.verify(
                req.headers.authorization,
                process.env.JWT_SECRET,
                (err: any, decoded: any) => {
                    if (err) {
                        res.status(401).json({
                            message: 'Unauthorized',
                        });
                    } else {
                        const result = this.userController.addPalette(
                            parseInt(req.params.id),
                            req.body.palette,
                            req.body.paletteName,
                        );
                        res.status(200).json(result);
                    }
                },
            );
        });
        this.router.patch('/palettes/delete/:id', (req, res, next) => {
            jwt.verify(
                req.headers.authorization,
                process.env.JWT_SECRET,
                (err: any, decoded: any) => {
                    if (err) {
                        res.status(401).json({
                            message: 'Unauthorized',
                        });
                    } else {
                        const result = this.userController.deletePalette(
                            parseInt(req.params.id),
                            parseInt(req.body.paletteId),
                        );
                        res.status(200).json(result);
                    }
                },
            );
        });
        this.router.post('/add-user', (req, res, next) => {
            jwt.verify(
                req.headers.authorization,
                process.env.JWT_SECRET,
                (err: any, decoded: any) => {
                    if (err) {
                        res.status(401).json({
                            message: 'Unauthorized',
                        });
                    } else {
                        const result = this.userController.add(
                            req.body.username,
                            req.body.password,
                            req.body.email,
                            req.body.firstName,
                            req.body.lastName,
                        );
                        res.status(200).json(result);
                    }
                },
            );
        });
    }
}
