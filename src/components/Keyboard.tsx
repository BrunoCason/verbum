import React from "react";

interface KeyboardProps {
  onKeyPress: (key: string) => void;
  keyboardColors: { [key: string]: string };
}

const Keyboard: React.FC<KeyboardProps> = ({ onKeyPress, keyboardColors }) => {
  const keys = ["QWERTYUIOP", "ASDFGHJKL", "ZXCVBNM"];

  return (
    <div className="flex flex-col items-center gap-2 mt-4">
      {keys.map((row, rowIndex) => (
        <div key={rowIndex} className="flex gap-1">
          {row.split("").map((key) => (
            <button
              key={key}
              className={`w-10 h-12 text-lg font-bold rounded-md active:scale-95 transition-all duration-100 ease-in-out ${
                keyboardColors[key] || "bg-teste1"
              }`}
              onClick={() => onKeyPress(key)}
            >
              {key}
            </button>
          ))}
        </div>
      ))}
      <div className="flex gap-1">
        <button
          className="w-20 h-12 text-lg font-bold bg-teste1 text-white rounded-md active:scale-95"
          onClick={() => onKeyPress("Backspace")}
        >
          ⌫
        </button>
        <button
          className="w-20 h-12 text-lg font-bold bg-teste1 text-white rounded-md active:scale-95"
          onClick={() => onKeyPress("Enter")}
        >
          ENTER
        </button>
      </div>
    </div>
  );
};

export default Keyboard;
