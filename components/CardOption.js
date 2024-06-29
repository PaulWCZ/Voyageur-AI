import React from "react";

const CardOption = ({ label, value, onClick, selected }) => {
  return (
    <div
      className={`card w-full bg-base-100 shadow-md cursor-pointer ${
        selected ? "border-primary border-2" : ""
      }`}
      onClick={() => onClick(value)}
    >
      <div className="card-body text-center">
        <h2 className="card-title">{label}</h2>
      </div>
    </div>
  );
};

export default CardOption;
