"use client";

import * as Dialog from "@radix-ui/react-dialog";
import { IoMdClose } from "react-icons/io";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  description: string;
  children: React.ReactNode;
};

const Modal = ({ children, title, isOpen, onClose, description }: Props) => {
  const onOpenChange = (open: boolean) => {
    if (!open) {
      onClose();
    }
  };

  return (
    <Dialog.Root open={isOpen} defaultOpen={isOpen} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="bg-neutral-900/90 backdrop-blur-sm fixed inset-0" />
        <Dialog.Content
          className="
          fixed
          drop-shadow-md
          border
          border-neutral-700
          top-[50%]
          left-[50%]
          max-h-full
          h-full
          md:h-auto
          w-full
          md:max-w-[450px]
          -translate-x-[50%]
          -translate-y-[50%]
          md:rounded-md
          p-[25px]
          bg-neutral-800
          focus:outline-none
        "
        >
          <Dialog.Title className="text-xl text-center font-bold mb-4">
            {title}
          </Dialog.Title>

          <Dialog.Description className="text-sm mb-5 text-center leading-normal">
            {description}
          </Dialog.Description>

          <div>{children}</div>

          <Dialog.Close asChild>
            <button
              className="absolute top-[10px] right-[10px] h-[25px] w-[25px] inline-flex items-center justify-center 
              focus:outline-none"
            >
              <IoMdClose className="text-neutral-400 hover:text-white" />
            </button>
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default Modal;
