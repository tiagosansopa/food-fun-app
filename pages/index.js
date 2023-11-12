import { useState } from "react";
import { useRouter } from "next/router";
const Main = () => {
  const router = useRouter();

  const handleNewGame = () => {
    router.push(`/new`);
  };

  const handleJoinRoom = () => {
    router.push(`/join`);
  };
  return (
    <div>
      <div className="flex flex-col bg-blue-50 p-4 rounded-lg flex-wrap justify-center  max-w-screen-xl mx-4 my-4  relative">
        <h1 className="text-center">Fun Pizza Game</h1>
        <div className="flex-1 p-4 flex justify-center items-center">
          <img
            src="/elements/pizza.png"
            alt="Pizza Image"
            className="w-62 h-32 object-cover "
          />
        </div>
        <div className="flex justify-center">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-300 focus:ring-opacity-50 w-48 mx-1"
            onClick={handleNewGame}
          >
            New Game
          </button>
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-300 focus:ring-opacity-50 w-48 mx-1"
            onClick={handleJoinRoom}
          >
            Join
          </button>
        </div>
      </div>
    </div>
  );
};

export default Main;
