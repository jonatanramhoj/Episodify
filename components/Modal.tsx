import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import useCloseOnEscape from "@/hooks/useCloseOnEscape";

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
};

export default function Modal({ isOpen, onClose, children }: ModalProps) {
  useCloseOnEscape({ isOpen, closeModal: onClose });

  if (typeof window === "undefined") return null;

  const modalRoot = document.getElementById("modal-root");
  if (!modalRoot) return null;

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -50 }}
          className="h-screen overflow-auto gradient-overlay bg-gradient-to-tr from-blue-400 to-indigo-700 z-[9999] fixed top-0 left-0 right-0 bottom-0"
        >
          <motion.button
            onClick={onClose}
            whileHover={{ scale: 0.9 }}
            className="absolute top-6 sm:top-12 right-6 sm:right-12"
          >
            <svg
              className="fill-white w-8 h-8 ml-2"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
            >
              <path d="M24 20.188l-8.315-8.209 8.2-8.282-3.697-3.697-8.212 8.318-8.31-8.203-3.666 3.666 8.321 8.24-8.206 8.313 3.666 3.666 8.237-8.318 8.285 8.203z" />
            </svg>
          </motion.button>
          <div className="absolute top-[10%] left-[50%] translate-x-[-50%] w-full max-w-[1100px] flex flex-col items-center px-6 pb-20">
            {children}
          </div>
        </motion.div>
      )}
    </AnimatePresence>,
    modalRoot
  );
}
