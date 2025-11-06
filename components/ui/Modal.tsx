import { cn } from "@/lib/cn";
import { PropsWithChildren } from "react";

interface ModalProps {
  open: boolean;
  onClose: () => void;
  title: string;
  subTitle?: string;
  contentClassName?: string;
}

export default function Modal({
  open,
  onClose,
  title,
  subTitle,
  contentClassName,
  children,
}: PropsWithChildren<ModalProps>) {
  return open ? (
    <div
      className="fixed inset-0 bg-[#000000a3] flex items-center justify-center p-4 z-50"
      onClick={() => onClose()}
    >
      <div
        className={cn(
          contentClassName,
          "bg-white rounded-lg shadow-lg max-w-md w-full"
        )}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-6 border-b border-slate-200">
          <h2 className="text-2xl font-bold text-slate-900">{title}</h2>
          {subTitle && <p className="text-slate-600 mt-1">{subTitle}</p>}
        </div>
        <div className="p-6">{children}</div>
      </div>
    </div>
  ) : null;
}
