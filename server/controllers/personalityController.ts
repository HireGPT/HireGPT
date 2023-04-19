import {
  query,
  Request,
  Response,
  NextFunction,
  RequestHandler,
} from 'express';
import { db } from '../models/dbModel';
import { PersonalityProps } from '../types/types';

interface PersonalityController {
  getPersonalities: (req: Request, res: Response, next: NextFunction) => void;
};

const personalityController: PersonalityController = {
  getPersonalities: async (req, res, next) => {
    console.log('personalityController.getPersonalities invoked');
    const qry = `SELECT * FROM personality`;

    try {
      const personalitiesArr: PersonalityProps[] = [];
      const qryResult = await db.query(qry, []);

      for (let i = 0; i < qryResult.rows.length; i++) {
        const curRow = qryResult.rows[i];
        const personality: PersonalityProps = {
          name: curRow.name,
          traits: curRow.traits,
          role: curRow.role,
          expertise: curRow.expertise,
          company: curRow.company,
          interests: curRow.interests,
        };
        personalitiesArr.push(personality);
      }

      res.locals.personalities = personalitiesArr;

      return next();
    } catch (error) {
      console.error('Error in getPersonalities:', error);
      return next({
        log: 'personalityController.getPersonalities',
        status: 500,
        message: {
          err: 'Error in getPersonalities'
        }
      });
    }
  },

};


export default personalityController;