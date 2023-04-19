import React from "react";
import { PersonProps } from "../PersonContext";

const Person: React.FC<PersonProps & { onClick: () => void }> = ({
  name,
  traits,
  role,
  expertise,
  company,
  onClick,
}) => {
  return (
    <div onClick={onClick}>
      <h3>{name}</h3>
      <h5>{[role, company].join(", ")}</h5>
    </div>
  );
};

export default Person;
