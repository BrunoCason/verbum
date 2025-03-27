import React from "react";

interface GameOverMessageProps {
  message: string;
  onRestart: () => void;
}

const GameOverMessage = ({ message, onRestart }: GameOverMessageProps) => {
  return (
    <>
      <div className="fixed top-0 left-0 right-0 bottom-0 bg-black opacity-50 z-50"></div>

      <div className="fixed flex justify-center items-center z-50">
        <div className="bg-white p-6 rounded-lg text-center">
          <h2 className="text-xl font-bold mb-4 text-teste">{message}</h2>
          <button
            onClick={onRestart}
            className="bg-teste1 text-white py-2 px-4 rounded cursor-pointer"
          >
            Jogar Novamente
          </button>
        </div>
      </div>
    </>
  );
};

export default GameOverMessage;
