import { ReactNode } from 'react';

export interface PopupProps {
  title: string;
  isOpen: boolean;
  children?: ReactNode;
}

export function Popup({ title, isOpen, children }: PopupProps) {
  return isOpen ? (
    <div className="fixed w-screen h-screen flex align-middle justify-center">
      <div className="absolute w-full h-full opacity-60 bg-gray-900" />
      <div className="absolute top-4 w-10/12 max-h-[90%] overflow-scroll drop-shadow-lg flex flex-col bg-white rounded-2xl">
        <h2 className="p-2 text-2xl">{title}</h2>
        <div>{children}</div>
      </div>
    </div>
  ) : null;
}
