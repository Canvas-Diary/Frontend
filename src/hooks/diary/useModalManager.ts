import { useState } from "react";
import { MODAL_STATE } from "@/constants/MODAL_STATE";
import { ModalManager } from "@/types/types";

const useModalManager = (): { modalManager: ModalManager } => {
  const [activeModal, setActiveModal] = useState<string | null>(MODAL_STATE.NONE);

  const closeModal = () => setActiveModal(MODAL_STATE.NONE);
  const openModal = (modalState: string) => setActiveModal(modalState);

  return { modalManager: { activeModal, openModal, closeModal } };
};

export default useModalManager;
