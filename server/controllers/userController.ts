import {
  query,
  Request,
  Response,
  NextFunction,
  RequestHandler,
} from 'express';
import { db } from '../models/dbModel';
import bcrypt from 'bcrypt';

const SALT_WORK_FACTOR = 10;

interface UserController {
  signUp: (req: Request, res: Response, next: NextFunction) => void;
  verifyUser: (req: Request, res: Response, next: NextFunction) => void;
};


const userController: UserController = {
  signUp: async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { email, password } = req.body;

    const findParams: string[] = [email];
    const find = `SELECT email FROM users WHERE email = $1`;

    try {
      const existingEmailResult = await db.query(find, findParams);
      if (existingEmailResult.rowCount === 0) {
        // Salt password here
        const hashedPassword = await bcrypt.hash(password, SALT_WORK_FACTOR);
        
        const insertParams = [email, hashedPassword];
        const insert = `INSERT INTO users (email, password)
            VALUES ($1, $2) RETURNING *`;
            
        const result = await db.query(insert, insertParams);
        res.locals.users = result.rows[0];
        return next();
      } else {
        return next({
          log: 'userController.signUp',
          status: 400,
          message: {
            err: 'email is already in use'
          }
        });
      }
    } catch (error) {
      console.error('Error in signUp:', error);
      return next({
        log: 'userController.signUp',
        status: 500,
        message: {
          err: 'Error signing up'
        }
      });
    }
  },

  verifyUser: async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { email, password } = req.body;

    const findParams = [email];
    const find = `SELECT email, password FROM users WHERE email = $1`;

    try {
      const userResult = await db.query(find, findParams);
      if (userResult.rowCount > 0) {
        const storedPassword = userResult.rows[0].password;
        const isPasswordCorrect = await bcrypt.compare(password, storedPassword);

        if (isPasswordCorrect) {
          res.locals.users = userResult.rows[0];
          return next();
        } else {
          return next({
            log: 'userController.verifyUser',
            message: {
              err: 'Password is incorrect'
            }
          })
        }
      }
      return next({
        log: 'userController.verifyUser',
        message: {
          err: 'invalid email'
        }
      })
    } catch (error) {
      return next(error)
    }
  },
};

export default userController;
