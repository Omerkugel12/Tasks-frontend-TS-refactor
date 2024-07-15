// import React, { createContext, useState, useContext } from "react";

// interface loggedInUserTasksContextTypes {}

// const loggedInUserTasksContext = createContext(null);

// export function LoggedInUserTasksProvider({
//   children,
// }: {
//   children: React.ReactNode;
// }) {
//   const [loggedInUserTasks, setLoggedInUserTasks] = useState([]);

//   return (
//     <loggedInUserTasksContext.Provider
//       value={{ loggedInUserTasks, setLoggedInUserTasks }}
//     >
//       {children}
//     </loggedInUserTasksContext.Provider>
//   );
// }

// export function useLoggedInUserTasks() {
//   const context = useContext(loggedInUserTasksContext);
//   if (!context) {
//     throw new Error("useAuth must be used within a UserProvider");
//   }
//   return context;
// }
