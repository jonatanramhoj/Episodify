import { useEffect } from "react";

type UseCloseOnEscapeProps = {
  isOpen: boolean;
  closeModal: () => void;
};

export default function useCloseOnEscape({
  isOpen,
  closeModal,
}: UseCloseOnEscapeProps) {
  const handleClose = (e: KeyboardEvent) => {
    if (e.key === "Escape") closeModal();
  };

  useEffect(() => {
    if (typeof document === "undefined") return;

    if (isOpen) document.addEventListener("keyup", handleClose);

    return () => {
      document.removeEventListener("keyup", handleClose);
    };
  }, [isOpen]);
}
