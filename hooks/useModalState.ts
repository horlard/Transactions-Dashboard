import * as React from "react";

export default function useModalState(initialVal = false) {
  const [isOpen, setIsOpen] = React.useState(initialVal);

  const closeModal = React.useCallback(() => setIsOpen(false), []);

  const openModal = React.useCallback(() => setIsOpen(true), []);

  return { isOpen, setIsOpen, closeModal, openModal };
}
