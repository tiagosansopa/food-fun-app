import { createContext, useContext } from "react";
import { io } from "socket.io-client";

const SocketContext = createContext();
const socket = io("http://localhost:3001");

export const SocketProvider = ({ children }) => {
  return (
    <SocketContext.Provider value={{ socket }}>
      {children}
    </SocketContext.Provider>
  );
};

// export const useSocket = () => {
//   return useContext(SocketContext);
// };

export default SocketContext;
