/**
 * This module contains utility functions to manage conversations
 * between users and the AI interviewer.
 */

/**
 * Represents a single message in a conversation.
 */

export interface Conversation {
  id: string;
  messages: Array<{ role: string; content: string }>;
}
/**
 * Represents a conversation object.
 */
const conversations: Record<string, Conversation> = {};

/**
 * Create a new conversation with the given `chatId` and `initialMessage`.
 *
 * @param {string} chatId - A unique identifier for the conversation.
 * @param {string} initialMessage - The initial message to start the conversation.
 * @returns {Conversation} - The created conversation object.
 */
export const createConversation = (id: string, initialMessage: string): Conversation => {
  const conversation: Conversation = { id, messages: [{ role: 'system', content: initialMessage }] };
  conversations[id] = conversation;
  return conversation;
};

/**
 * Get the conversation object for the given `chatId`.
 *
 * @param {string} chatId - A unique identifier for the conversation.
 * @returns {Conversation | undefined} - The conversation object, or `undefined` if not found.
 */
export const getConversation = (id: string): Conversation | undefined => {
  return conversations[id];
};

/**
 * Add a message to the conversation with the given `chatId`.
 *
 * @param {string} chatId - A unique identifier for the conversation.
 * @param {Message} message - The message to be added.
 */
export const addMessageToConversation = (id: string, message: { role: string; content: string }): void => {
  if (conversations[id]) {
    conversations[id].messages.push(message);
  }
};