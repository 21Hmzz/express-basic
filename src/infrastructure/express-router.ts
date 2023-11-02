import { Router } from 'express';
import { UserService } from '../user/user.service';
import { UserController } from '../user/user.controller';
import { UserRouter } from '../user/user.router';
import { AuthController } from '../auth/auth.controller';
import { AuthRouter } from '../auth/auth.router';
import { AuthService } from '../auth/auth.service';

export class ExpressRouter {
    router = Router();

    private userController!: UserController;
    private userRouter!: UserRouter;
    private authController!: AuthController;
    private authRouter!: AuthRouter;

    constructor(
        private userService: UserService,
        private authService: AuthService,
    ) {
        this.configureControllers();
        this.configureRouters();
        this.configureRoutes();
    }

    private configureControllers(): void {
        this.userController = new UserController(this.userService);
        this.authController = new AuthController(this.authService);
    }

    private configureRouters(): void {
        this.userRouter = new UserRouter(this.userController);
        this.authRouter = new AuthRouter(this.authController);
    }

    private configureRoutes(): void {
        this.router.use('/user', this.userRouter.router);
        this.router.use('/auth', this.authRouter.router);
    }
}
