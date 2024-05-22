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
    <dialog ref={dialogRef} onClose={onDismiss} className="w-full max-w-2xl">
      <div className="">
        <form method="dialog">
          {/* if there is a button in form, it will close the modal */}
          <button className="absolute right-2 top-1">
            <span className="text-xl">x</span>
          </button>
        </form>
        {children}
      </div>
    </dialog>,
    document.getElementById("modal-root")!,
  );
}
