const Join = () => {
  return (
    <>
      Name
      <div className="flex flex-col bg-blue-50 p-4 rounded-lg flex-wrap justify-center  max-w-screen-xl mx-4 my-4  relative">
        <div>
          <label>Name</label>
          <input></input>
        </div>
      </div>
      Game ID
      <div className="flex flex-col bg-blue-50 p-4 rounded-lg flex-wrap justify-center  max-w-screen-xl mx-4 my-4  relative">
        <div>
          <label>Game ID</label>
          <input></input>
        </div>
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-300 focus:ring-opacity-50 w-48 mx-1">
          Join
        </button>
      </div>
    </>
  );
};

export default Join;
