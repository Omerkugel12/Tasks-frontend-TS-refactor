import { cn } from "@/lib/utils";
import React from "react";

// interface PropsTypes {
//   children: React.ReactNode;
//   className: string;
//   success: boolean;
//   failure: boolean;
// }

function Modal({ children, className, success, failure }: PropsTypes) {
  return (
    <div
      className={cn(
        " fixed top-28 -translate-y-1/2 left-1/2 transform -translate-x-1/2 text-xl border p-4 rounded-lg shadow-2xl z-50 bg-secondary",
        className,
        success && "text-green-600 border border-green-600",
        failure && "text-red-700 border border-red-700"
      )}
    >
      {children}
    </div>
  );
}

export default Modal;
