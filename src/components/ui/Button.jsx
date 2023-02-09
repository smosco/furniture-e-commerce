import React from "react";

export default function Button({ text, onClick, className }) {
  return (
    <button
      className={`block bg-ore-brand text-white py-2 px-4 rounded-md hover:opacity-80 ${className}`}
      onClick={onClick}
    >
      {text}
    </button>
  );
}
