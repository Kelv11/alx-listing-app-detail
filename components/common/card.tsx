import React from "react";
import { CardProps } from "../../interfaces";

const Card: React.FC<CardProps> = ({ title, description, children }) => {
  return (
    <div className="rounded-lg shadow-md overflow-hidden">
      <div className="p-4">
        {title && <h3 className="text-lg font-semibold">{title}</h3>}
        {description && <p className="text-gray-600 mt-1">{description}</p>}
        {children}
      </div>
    </div>
  );
};

export default Card;
