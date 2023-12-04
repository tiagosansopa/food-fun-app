import { useState, useContext, useEffect } from "react";
import { useRouter } from "next/router";
import { useSocket } from "../context/socketContext";
import PlayerContext from "../context/playerContext";

const Join = () => {
  const router = useRouter();
  const { socket } = useSocket();
  const { setUser } = useContext(PlayerContext);
  const [playerName, setPlayerName] = useState("");
  const [roomId, setRoomId] = useState("");
  const [playerColor, setColor] = useState("");
  const [error, setError] = useState(null);

  const colors = ["red", "yellow", "green", "pink", "brown", "black"];

  useEffect(() => {
    const playerJoin = ({ players, roomId }) => {
      socket.off("player-joined", playerJoin);
      router.push(`/game/${roomId}`);
    };

    const changeColor = ({ message }) => {
      setError(message);
    };

    socket.on("player-joined", playerJoin);
    socket.on("change-color", changeColor);

    return () => {
      socket.off("player-joined", playerJoin);
      socket.off("change-color", changeColor);
    };
  }, [socket, router]);

  const enterRoom = () => {
    if (playerName !== "" && roomId !== "") {
      setUser(playerName);
      socket.emit("joined", { playerName, roomId, playerColor });
    }
  };

  return (
    <>
      <div className="flex flex-col bg-blue-50 p-4 rounded-lg flex-wrap justify-center  max-w-screen-xl mx-4 my-4  relative">
        <div className="flex justify-center my-2">
          <label>Enter your name</label>
          <input
            className="mx-2 p-1"
            value={playerName}
            onChange={(e) => setPlayerName(e.target.value)}
          ></input>
        </div>
        <div className="flex justify-center">
          <label>Choose your color</label>
          {colors.map((color) => {
            return (
              <button
                className={`mx-auto my-4 bg-white p-1 rounded-lg w-24 h-24 ${color}-pattern  ${
                  playerColor === color
                    ? " ring-4 ring-offset-4 ring-blue-950"
                    : ""
                }`}
                onClick={() => setColor(color)}
              ></button>
            );
          })}
        </div>
        <div className="flex justify-center my-2">
          <label>Game ID</label>
          <input
            className="mx-2 p-1"
            value={roomId}
            onChange={(e) => setRoomId(e.target.value)}
          ></input>
        </div>
        <div className="flex justify-center bg-red-900 text-white">
          {error && <>{error}</>}
        </div>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-300 focus:ring-opacity-50 w-48 mx-1  absolute bottom-4 right-4 "
          onClick={() => enterRoom()}
        >
          Join
        </button>
      </div>
    </>
  );
};

export default Join;
