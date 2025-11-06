"use client";

import { PropsWithChildren, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { cn } from "@/lib/cn";

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
  const [mounted, setMounted] = useState(false);
  const [portalEl, setPortalEl] = useState<Element | null>(null);

  useEffect(() => {
    setMounted(true);
    setPortalEl(document.getElementById("modal-root") || document.body);
  }, []);

  if (!mounted || !open || !portalEl) return null;

  const modalContent = (
    <div
      className="fixed inset-0 bg-[#000000a3] flex items-center justify-center p-4 z-50"
      onClick={onClose}
    >
      <div
        className={cn(
          "bg-white rounded-lg shadow-lg max-w-md w-full",
          contentClassName
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
  );

  return createPortal(modalContent, portalEl);
}
