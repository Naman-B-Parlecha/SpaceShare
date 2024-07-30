import { createContext, useContext, useEffect, useState } from "react";
import { io } from "socket.io-client";
import { AuthContext } from "./AuthContext";
export const SocketContext = createContext();

export const SocketContextProvider = ({ children }) => {
  const [socket, setsocket] = useState(null);
  const { currentUser } = useContext(AuthContext);
  useEffect(() => {
    setsocket(io("http://localhost:4000"));
  }, []);

  useEffect(() => {
    currentUser && socket?.emit("newUser", currentUser.id);
  }, [currentUser]);
  return (
    <SocketContext.Provider value={{ socket }}>
      {children}
    </SocketContext.Provider>
  );
};
