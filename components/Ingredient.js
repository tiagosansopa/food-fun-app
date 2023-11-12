import React from "react";

const Ingredient = ({ value, selected, onClick }) => {
  const cards = [
    { value: "pineapple", img: "/ingredients/pineapple.png" },
    { value: "olive", img: "/ingredients/olive.png" },
    { value: "pepper", img: "/ingredients/pepper.png" },
    { value: "mushroom", img: "/ingredients/mushroom.png" },
    { value: "salami", img: "/ingredients/salami.png" },
    { value: "shrimp", img: "/ingredients/shrimp.png" },
  ];
  return (
    <div
      className={`w-24 h-36 flex flex-col bg-white rounded-lg shadow-md text-center m-1 hover:shadow-white hover:cursor-pointer 
      ${selected ? "my-[-20px] ring ring-green-500" : ""}`}
      onClick={onClick}
    >
      <img
        className="m-auto  w-10 h-10"
        src={cards.find((ingredient) => ingredient.value === value)?.img}
        alt={value}
      />
      {/*<div className="mt-1 text-1xl">{value}</div>*/}
    </div>
  );
};

export default Ingredient;
