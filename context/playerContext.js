import { createContext, useState } from "react";

const PlayerContext = createContext();

export const PlayerProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  return (
    <PlayerContext.Provider value={{ user, setUser }}>
      {children}
    </PlayerContext.Provider>
  );
};

export default PlayerContext;
