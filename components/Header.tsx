import { useState } from "react";
import Link from "next/link";
import SearchEpisode from "./SearchEpisode";
import CreateEpisode from "./CreateEpisode";
import Modal from "./Modal";

export default function Header() {
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [searchModalOpen, setSearchModalOpen] = useState(false);

  const handleOpenModal = (setModal: (state: boolean) => void) => {
    setModal(true);
  };

  const handleCloseModal = (setModal: (state: boolean) => void) => {
    setModal(false);
  };

  return (
    <>
      <header className="py-6 px-6 flex flex-col md:flex-row md:items-center justify-between border-b border-white/20">
        <Link href="/" className="mb-8 md:mb-0 font-bold text-xl uppercase">
          Episodify
        </Link>
        <ul className="flex flex-col md:flex-row">
          <li className="mb-4 md:mb-0 md:mr-6">
            <button
              onClick={() => handleOpenModal(setAddModalOpen)}
              className="outline-none w-full md:w-auto text-sm font-bold py-4 px-4 rounded-md flex justify-center items-center bg-[#7ECEE7] hover:bg-[#4B9BB4] ease-in duration-150"
            >
              Add episode
              <svg
                className="fill-white w-4 h-4 ml-2"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
              >
                <path d="M24 10h-10v-10h-4v10h-10v4h10v10h4v-10h10z" />
              </svg>
            </button>
          </li>
          <li>
            <button
              onClick={() => handleOpenModal(setSearchModalOpen)}
              className="outline-none w-full md:w-auto text-sm font-bold py-4 px-4 rounded-md flex justify-center items-center bg-[#816FF6] hover:bg-[#4E3CC3] ease-in duration-150"
            >
              Search episodes
              <svg
                className="fill-white w-4 h-4 ml-2"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
              >
                <path d="M23.809 21.646l-6.205-6.205c1.167-1.605 1.857-3.579 1.857-5.711 0-5.365-4.365-9.73-9.731-9.73-5.365 0-9.73 4.365-9.73 9.73 0 5.366 4.365 9.73 9.73 9.73 2.034 0 3.923-.627 5.487-1.698l6.238 6.238 2.354-2.354zm-20.955-11.916c0-3.792 3.085-6.877 6.877-6.877s6.877 3.085 6.877 6.877-3.085 6.877-6.877 6.877c-3.793 0-6.877-3.085-6.877-6.877z" />
              </svg>
            </button>
          </li>
        </ul>
      </header>
      <Modal
        isOpen={addModalOpen}
        onClose={() => handleCloseModal(setAddModalOpen)}
      >
        <CreateEpisode onClose={() => handleCloseModal(setAddModalOpen)} />
      </Modal>
      <Modal
        isOpen={searchModalOpen}
        onClose={() => handleCloseModal(setSearchModalOpen)}
      >
        <SearchEpisode onClose={() => handleCloseModal(setSearchModalOpen)} />
      </Modal>
    </>
  );
}
