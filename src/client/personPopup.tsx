// PersonPopup.tsx
import React from "react";
import { PersonProps } from "../PersonContext";
import { useNavigate } from "react-router-dom";

interface PersonPopupProps {
  person: PersonProps | null;
  onClose: () => void;
}

const PersonPopup: React.FC<PersonPopupProps> = ({ person, onClose }) => {
  const navigate = useNavigate();

  if (!person) return null;

  const handleStartButtonClick = () => {
    navigate("/chat");
  };

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
      }}
    >
      <div
        style={{ backgroundColor: "black", margin: "50px", padding: "20px" }}
      >
        <h3>{person.name}</h3>
        <p>Traits: {person.traits}</p>
        <p>Role: {person.role}</p>
        <p>Expertise: {person.expertise}</p>
        <p>Company: {person.company}</p>
        <button onClick={handleStartButtonClick}>Start</button>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default PersonPopup;
