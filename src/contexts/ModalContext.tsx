// import React, { createContext, useState, useContext } from "react";

// type ModalType =
//   | "loggedInModal"
//   | "loginFailure"
//   | "failureReturn"
//   | "successReturn"
//   | "failureCreateArchive"
//   | "successCreateArchive"
//   | "failureCreateTask"
//   | "successCreateTask"
//   | "failureCreateTodo"
//   | "failureTodoDelete"
//   | "successEditTodo"
//   | "failureEditTodo"
//   | "successCreateTodo"
//   | "successTodoDelete"
//   | "failureTodoUnchecked"
//   | "successTodoUnchecked"
//   | "successTodoChecked"
//   | "failureUnPinned"
//   | "successPinned"
//   | "failureEditTask"
//   | "successEditTask"
//   | "failureDelete"
//   | "successDelete"
//   | null;

// const ModalContext = createContext(null);

// export function ModalProvider({ children }: { children: React.ReactNode }) {
//   const [modal, setModal] = useState<ModalType>(null);

//   return (
//     <ModalContext.Provider value={{ modal, setModal }}>
//       {children}
//     </ModalContext.Provider>
//   );
// }

// export function useModalContext() {
//   const context = useContext(ModalContext);
//   if (!context) {
//     throw new Error("useModalContext must be used within a UserProvider");
//   }
//   return context;
// }
