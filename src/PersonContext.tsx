import { createContext, Dispatch, SetStateAction } from "react";

export interface PersonProps {
  name: string;
  traits: string;
  role: string;
  expertise: string;
  company: string;
}

export interface PersonContextProps {
  person: PersonProps | null;
  setPerson: Dispatch<SetStateAction<PersonProps | null>>;
  persons: Array<PersonProps>;
  setPersons: Dispatch<SetStateAction<Array<PersonProps>>>;
}

export const PersonContext = createContext<PersonContextProps | null>(null);
