import {
  query,
  Request,
  Response,
  NextFunction,
  RequestHandler,
} from 'express';
import { db } from '../models/dbModel';

type SessionController = {
  isLoggedIn:(req: Request, res: Response, next: NextFunction) => void;
  startSession:(req: Request, res: Response, next: NextFunction) => void;
  endSession:(req: Request, res: Response) => void;
};

const sessionController: SessionController = {
  isLoggedIn: (req, res, next) => {
    if (req.session && req.session.email) {
      return next()
    } else {
      return res.status(401).json({ message: 'User is not logged in' })
    }
  },

  startSession: (req, res, next) => {
    const { email } = res.locals.users;
    if (email) {
      req.session.email = email
      return next()
    } else {
    return res.status(500).json({ message: 'Error in starting sessions' })
    }
  },

  endSession: (req, res) => {
    if (req.session) {
      req.session.destroy((err) => {
        if (err) {
          return res.status(500).json({ message: "Error in deleting session" })
        }
        return res.status(200).json({ message: 'Session deleted' })
      })
    } else {
      return res.status(400).json({ message: 'no active session' })
    }
  },
};

export default sessionController;
