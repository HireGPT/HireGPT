import express, { Request, Response, NextFunction, RequestHandler } from 'express';
import { ServerError } from '../types';
const path = require('path');
const app = express();
const cookieParser = require('cookie-parser');
const PORT = 3000;

app.use(express.json());
app.use(express.urlencoded({
    extended: true
}))
app.use(cookieParser());











// Global Error Handler
app.use((error: ServerError, req: Request, res: Response, next: NextFunction) => {
const defaultErr = {
    log: 'Express error handler caught unknown middleware error',
    status: 500,
    message: { err: 'An error occured' },
};
const errorObj = Object.assign({}, defaultErr, error);
console.log(errorObj.log);
return res.status(errorObj.status).json(errorObj.message);
});

app.listen(PORT, () => {
    console.log(`Server listening on port: ${PORT}`);
});
