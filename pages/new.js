import { useState } from "react";
const New = () => {
  const [playerName, setPlayerName] = useState("uim");

  return (
    <>
      Name
      <div className="flex flex-col bg-blue-50 p-4 rounded-lg flex-wrap justify-center  max-w-screen-xl mx-4 my-4  relative">
        <div>
          <label>Name</label>
          <input></input>
        </div>
      </div>
      Players
      <div className="flex flex-col bg-blue-50 p-4 rounded-lg flex-wrap justify-center  max-w-screen-xl mx-4 my-4  relative">
        <h2 className="text-center">Players</h2>
        <div className="flex bg-blue-50 p-4 rounded-lg flex-wrap justify-center  max-w-screen-xl mx-4 my-4 mt-16 relative">
          {[2, 3, 4, 5, 6].map((n) => {
            return (
              <div className="w-24 h-36 flex bg-white rounded-lg shadow-md text-center mx-1 hover:shadow-white hover:cursor-pointer">
                <span className="m-auto text-2xl">{n}</span>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};
export default New;
