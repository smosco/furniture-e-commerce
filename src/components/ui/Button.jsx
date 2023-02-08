import React from "react";

export default function Button({ text, onClick }) {
  return (
    <button
      className="bg-ore-brand text-white py-2 px-4 rounded-md hover:opacity-80"
      onClick={onClick}
    >
      {text}
    </button>
  );
}
