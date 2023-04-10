import { ReactNode } from 'react';

export interface PopupProps {
  title: string;
  isOpen: boolean;
  children?: ReactNode;
}

export function Popup({ title, isOpen, children }: PopupProps) {
  return isOpen ? (
    <div className="fixed w-screen h-screen flex items-center justify-center">
      <div className="absolute w-full h-full opacity-80 bg-black" />
      <div className="absolute top-4 w-10/12 max-h-[90%] overflow-scroll drop-shadow-lg flex flex-col bg-slate-900 rounded-2xl">
        <h2 className="p-2 text-xl">{title}</h2>
        <div className="p-2">{children}</div>
      </div>
    </div>
  ) : null;
}
