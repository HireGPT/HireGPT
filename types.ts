import { SessionData } from "express-session";

// Error type
export type ServerError = {
  log: string;
  status: number;
  message: {
    err: string;
  };
};


declare module 'express-session' {
  export interface SessionData {
    email: string;
  }
}