/**
 * This module contains the `chatController` function which handles
 * incoming chat requests, interacts with the OpenAI API, and returns
 * AI-generated replies.
 */
import { Request, Response, RequestHandler } from 'express';
import axios from 'axios';
import { PersonProps } from '../types/types';
import dotenv from 'dotenv';
dotenv.config();
// import { createConversation, getConversation, addMessageToConversation } from '../models/conversations';

/**
 * Handle an incoming chat request. It processes the user's message,
 * sends it to the OpenAI API, and returns the AI-generated reply.
 *
 * @async
 * @function
 * @param {Request} req - The Express request object.
 * @param {Response} res - The Express response object.
 * @throws {Error} If there is an error processing the chat request.
 */

type ChatController = {
  chat: RequestHandler;
  initialMessage: RequestHandler;
};

const chatController: ChatController = {
  chat: async (req, res, next) => {
    try {
      const { message, person }: { message: string; person: PersonProps } =
        req.body;

      if (!message || !person) {
        return res
          .status(400)
          .json({ error: 'Message, person data are required' });
      }

      const initialMessage = {
        role: 'system',
        content: message,
      };
      // const response = await axios.post(
      // 'https://api.openai.com/v1/engines/chatgpt3.5-turbo/completions',
      const response = await axios.post(
        'https://api.openai.com/v1/chat/completions',
        {
          model: 'gpt-3.5-turbo',
          messages: [initialMessage],
          max_tokens: 150,
          n: 1,
          stop: null,
          temperature: 0.8,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
          },
        }
      );

      // console.log(response);

      const reply = response.data.choices[0].text.trim();
      res.json({ message: reply });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error processing chat request' });
    }
  },

  initialMessage: async (req, res) => {
    const { person }: { person: PersonProps } = req.body;

    if (!person) {
      return res.status(400).json({ error: 'Person data is required' });
    }

    const initialMessage = {
      role: 'system',
      content: `You are chatting as ${person.name}, 
        an interviewer for a software developer position at ${person.company}. 
        ${person.name} is a software developer with expertise in ${person.expertise}. 
        Your role is ${person.role} and they have the following traits: ${person.traits}.`,
    };
    try {
      const response = await axios.post(
        'https://api.openai.com/v1/engines/chatgpt3.5-turbo/completions',
        {
          messages: initialMessage,
          max_tokens: 150,
          n: 1,
          stop: null,
          temperature: 0.8,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
          },
        }
      );

      const reply = response.data.choices[0].text.trim();
      res.json({ message: reply });
    } catch (error) {
      console.error(error);
      res.status(501).json({ error: 'error in processing chat request' });
    }
  },
};

export default chatController;
