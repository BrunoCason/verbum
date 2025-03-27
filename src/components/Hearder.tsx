import React, { useState } from "react";
import Tutorial from "./Tutorial";

export default function Header() {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(true);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <header className="bg-teste py-4 flex items-center justify-between px-4">
      <p className="text-xl">verbum</p>
      <button
        className="bg-white text-teste h-8 w-8 rounded-full font-bold cursor-pointer"
        onClick={handleOpenModal}
      >
        ?
      </button>

      {isModalOpen && (
        <>
          <div className="fixed inset-0 bg-black opacity-50 z-10"></div>
          <div
            onClick={handleCloseModal}
            className="fixed inset-0 flex items-center justify-center z-20"
          >
            <Tutorial />
          </div>
        </>
      )}
    </header>
  );
}
