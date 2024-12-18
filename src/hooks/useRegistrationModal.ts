import { useState } from "react";

type ModalType = "container" | "field" | null;

export function useRegistrationModal() {
  const [modalType, setModalType] = useState<ModalType>(null);

  const openModal = (type: ModalType) => setModalType(type);
  const closeModal = () => setModalType(null);

  return {
    modalType,
    openModal,
    closeModal,
    isOpen: modalType !== null
  };
}
