/**
 * This module contains the `chatController` function which handles
 * incoming chat requests, interacts with the OpenAI API, and returns
 * AI-generated replies.
 */
import { Request, Response, RequestHandler } from 'express';
import axios from 'axios';
import { PersonProps } from '../types/types';
import {
  Configuration,
  OpenAIApi,
  ChatCompletionRequestMessageRoleEnum,
  CreateChatCompletionRequest,
} from 'openai';
import dotenv from 'dotenv';
dotenv.config();

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);
const model = 'gpt-3.5-turbo';

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
  chat: async (req, res) => {
    try {
      const {
        messages,
      }: { messages: CreateChatCompletionRequest['messages'] } = req.body;

      if (!messages || messages.length === 0) {
        return res.status(400).json({ error: 'Messages are required' });
      }

      const response = await openai.createChatCompletion({
        model: model,
        messages: messages,
        max_tokens: 150,
        n: 1,
        temperature: 0.8,
      });

      // console.log(response);

      const reply =
        response.data.choices && response.data.choices.length > 0
          ? response.data.choices[0].message!.content.trim()
          : '';

      // Append the assistant's reply to the conversation history
      const updatedMessages = [
        ...messages,
        {
          role: ChatCompletionRequestMessageRoleEnum.Assistant,
          content: reply,
        },
      ];
      res.json({ messages: updatedMessages });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error processing chat request' });
    }
  },

  initialMessage: async (req, res) => {
    const { person }: { person: PersonProps } = req.body;
    console.log(person);
    if (!person) {
      return res.status(400).json({ error: 'Person data is required' });
    }

    const initialMessage: CreateChatCompletionRequest['messages'] = [
      {
        role: ChatCompletionRequestMessageRoleEnum.System,
        content: `You are chatting as ${person.name}, 
        an interviewer for a software developer position at ${person.company}. 
        ${person.name} is a software developer with expertise in ${person.expertise}. 
        ${person.name} role is ${person.role} and has the following traits: ${person.traits}.`,
      },
    ];
    try {
      const response = await openai.createChatCompletion({
        model: model,
        messages: initialMessage,
        max_tokens: 100,
        n: 1,
        temperature: 0.8,
      });

      const reply =
        response.data.choices && response.data.choices.length > 0
          ? response.data.choices[0].message!.content.trim()
          : '';

      res.json({ message: reply });
    } catch (error) {
      console.error(error);
      res.status(501).json({ error: 'error in processing chat request' });
    }
  },
};

export default chatController;
