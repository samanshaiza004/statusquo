"use client";

import { useRouter } from "next/navigation";
import { ElementRef, useEffect, useRef } from "react";
import { createPortal } from "react-dom";

export function Modal({ children }: { children: React.ReactNode }) {
  const dialogRef = useRef<ElementRef<"dialog">>(null);
  const router = useRouter();

  useEffect(() => {
    if (!dialogRef.current?.open) {
      dialogRef.current?.showModal();
    }
  }, []);

  function onDismiss() {
    router.back();
  }

  return createPortal(
    <dialog
      ref={dialogRef}
      onClose={onDismiss}
      className="m-0 h-screen w-screen bg-zinc-900/50 text-white"
    >
      {children}
    </dialog>,
    document.getElementById("modal-root")!,
  );
}
