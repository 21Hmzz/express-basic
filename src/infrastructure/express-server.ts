import express from 'express';
import { ExpressRouter } from './express-router';
import bodyParser from 'body-parser';
import cors from 'cors';

export class ExpressServer {
    private express = express();

    constructor(
        private port: string,
        private expressRouter: ExpressRouter,
    ) {
        this.express.use(cors());
        this.configureBodyParser();
        this.configureRoutes();
    }

    bootstrap(): void {
        this.express.listen(this.port, () =>
            console.log(`> Listening on port ${this.port}`),
        );
    }
    private configureBodyParser(): void {
        this.express.use(bodyParser.json());
    }

    private configureRoutes(): void {
        this.express.use('/api', this.expressRouter.router);
        this.express.use(
            cors({
                origin: '*',
                credentials: true,
            }),
        );
        this.express.options('*', cors());
    }
}
