import { useState } from "react";
import { PersonContext, PersonProps } from './PersonContext'

interface PersonProviderProps {
  children: React.ReactNode;
}

export const PersonProvider: React.FC<PersonProviderProps> = ({ children }) => {
  const [person, setPerson] = useState<PersonProps | null>(null);

  return (
    <PersonContext.Provider value={{ person, setPerson }}>
      {children}
    </PersonContext.Provider>
  );
};