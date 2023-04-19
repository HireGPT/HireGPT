import express from 'express';
import { Request, Response } from 'express';
import sessionController from '../controllers/sessionController';
import userController from '../controllers/userController';
import chatController from '../controllers/openAIController';

require('dotenv').config();

const router = express.Router();

router.post(
  '/login',
  userController.verifyUser,
  sessionController.startSession,
  (req: Request, res: Response): Response => {
    return res.status(200).json(res.locals.users);
  }
);

router.post(
  '/signup',
  userController.signUp,
  sessionController.startSession,
  (req: Request, res: Response): Response => {
    return res.status(200).json();
  }
);

router.post('/logout', sessionController.endSession, (req, res) => {
  res.json('byeee felicia');
});

router.get('/loggedIn', sessionController.isLoggedIn, (req, res) => {
  res.json({ message: 'you are logged in' });
});

router.post('/chat', chatController.chat, (req, res) => {});

export default router;
