import { useState } from "react";
import { useRouter } from "next/router";
const Join = () => {
  const router = useRouter();
  const [playerName, setPlayerName] = useState("uim");
  const [roomId, setRoomId] = useState("0");

  const enterRoom = () => {
    router.push(`/game/${roomId}`);
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
        <div className="flex justify-center my-2">
          <label>Game ID</label>
          <input
            className="mx-2 p-1"
            value={roomId}
            onChange={(e) => setRoomId(e.target.value)}
          ></input>
        </div>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-300 focus:ring-opacity-50 w-48 mx-1  absolute bottom-4 right-4 "
          onClick={enterRoom}
        >
          Join
        </button>
      </div>
    </>
  );
};

export default Join;
