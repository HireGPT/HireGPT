import express, { Request, Response, NextFunction } from 'express';
import { ServerError } from './types/types'
import session from 'express-session';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import * as path from 'path';
import router from './routes/api';


const app = express();
const PORT = 3000;
const ONE_DAY = 1000 * 60 * 60 * 24;

dotenv.config();

app.use(express.json());

app.use(
    express.urlencoded({
        extended: true,
    })
);

app.use(
    session({
        secret: process.env.SECRET!,
        resave: false,
        saveUninitialized: true,
        name: 'sessionID',
        cookie: {
            secure: false,
            maxAge: ONE_DAY,
            sameSite: 'lax'
        },
    })
);

app.use(cookieParser());

app.use((req, res, next) => {
    console.log(`Received request: ${req.method} ${req.path}`);
    next();
});

app.use('/api', router);

// Global Error Handler
app.use(
    (error: ServerError, req: Request, res: Response, next: NextFunction) => {
        const defaultErr = {
            log: 'Express error handler caught unknown middleware error',
            status: 500,
            message: { err: 'An error occured' },
        };
        const errorObj = Object.assign({}, defaultErr, error);
        console.log(errorObj.log);
        return res.status(errorObj.status).json(errorObj.message);
    }
);

app.listen(PORT, () => {
    console.log(`Server listening on port: ${PORT}`);
});
