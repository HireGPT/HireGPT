import {
  query,
  Request,
  Response,
  NextFunction,
  RequestHandler,
} from 'express';
import { db } from '../models/dbModel';

type SessionController = {
  signUp: (req: Request, res: Response, next: NextFunction) => void;
};

const sessionController: SessionController = {
    signUp: async (req, res, next): Promise<void> => {
      const { email, pw } = req.body;

      const findParams = [email];
      const find = `SELECT email FROM users
                          WHERE email = $1`;

      const insertParams = [email, pw];
      const insert = `INSERT INTO users (email, password)
          VALUES ($1, $2)`;

      try {
        const existingEmailResult = await db.query(find, findParams);

        

        console.log('result of find query:', result);
      } catch (error) {
        return next('Error getting signing up');
      }
    },
};

export default sessionController;
