import { useContext, useState } from "react";
import { useRouter } from "next/router";
import SocketContext from "../context/socketContext";
import PlayerContext from "../context/playerContext";

const New = () => {
  const router = useRouter();
  const [playerName, setPlayerName] = useState("");
  const [players, setPlayers] = useState(0);

  const { socket } = useContext(SocketContext);
  const { setUser } = useContext(PlayerContext);

  const handleStart = () => {
    if (playerName !== "" && players > 1) {
      setUser(playerName);
      socket.emit("new-game", { numPlayers: players, playerName });
    }
  };

  socket.on("player-joined", ({ players, roomId }) => {
    console.log("Players:", players);
    router.push(`/game/${roomId}`);
  });

  return (
    <>
      <div className="flex flex-col bg-blue-50 p-4 rounded-lg flex-wrap justify-center  max-w-screen-xl mx-4 my-4  relative">
        <div className="flex justify-center">
          <label>Enter your name</label>
          <input
            className="mx-2 p-1"
            value={playerName}
            onChange={(e) => setPlayerName(e.target.value)}
          ></input>
        </div>
        <span>Players</span>
        <div className="flex bg-blue-50 p-4 rounded-lg flex-wrap justify-center  max-w-screen-xl mx-4 my-4 relative">
          {[2, 3, 4, 5, 6].map((n) => {
            return (
              <button
                className={`w-24 h-36 flex ${
                  players === n
                    ? "text-white bg-blue-950"
                    : "bg-white text-black"
                } rounded-lg shadow-md text-center mx-1 hover:shadow-white hover:cursor-pointer `}
                onClick={() => setPlayers(n)}
                disabled={n > 2 ? true : false}
              >
                <span className="m-auto text-2xl">{n}</span>
              </button>
            );
          })}
        </div>
        <button
          className="bg-red-500 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-300 focus:ring-opacity-50 absolute bottom-4 right-4"
          onClick={handleStart}
        >
          Start
        </button>
      </div>
    </>
  );
};
export default New;
