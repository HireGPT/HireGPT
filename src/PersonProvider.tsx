import { useState } from "react";
import { PersonContext, PersonProps } from './PersonContext'

interface PersonProviderProps {
  children: React.ReactNode;
}

export const PersonProvider: React.FC<PersonProviderProps> = ({ children }) => {
  const [person, setPerson] = useState<PersonProps | null>(null);
  const [persons, setPersons] = useState<Array<PersonProps>>([]); // Add this line

  return (
    <PersonContext.Provider value={{ person, setPerson, persons, setPersons }}> // Update the value prop
      {children}
    </PersonContext.Provider>
  );
};
