/**
 * This module contains the `chatController` function which handles
 * incoming chat requests, interacts with the OpenAI API, and returns
 * AI-generated replies.
 */
import { Request, Response } from 'express';
import axios from 'axios';
import { PersonProps } from '../types/types';
import { createConversation, getConversation, addMessageToConversation } from '../models/conversations';

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
const chatController = async (req: Request, res: Response) => {
  const { message, person, chatId }: { message: string; person: PersonProps; chatId: string } = req.body;

  if (!message || !person || !chatId) {
    return res.status(400).json({ error: 'Message, person data, and chatId are required' });
  }

  let conversation = getConversation(chatId);

  if (!conversation) {
    const initialMessage =`You are chatting as ${person.name}, 
    an interviewer for a software developer position at ${person.company}. 
    ${person.name} is a software developer with expertise in ${person.expertise}. 
    Your role is ${person.role} and they have the following traits: ${person.traits}.`,
    conversation = createConversation(chatId, initialMessage);
  }

  addMessageToConversation(chatId, { role: 'user', content: message });

  try {
    const response = await axios.post(
      'https://api.openai.com/v1/engines/chatgpt3.5-turbo/completions',
      {
        messages: conversation!.messages,
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
    addMessageToConversation(chatId, { role: 'assistant', content: reply });
    res.json({ message: reply });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error processing chat request' });
  }
};

export default chatController;