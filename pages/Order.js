const Order = ({ value }) => {
  const cards = [
    { value: "pineapple", img: "/ingredients/pineapple.png" },
    { value: "olive", img: "/ingredients/olive.png" },
    { value: "pepper", img: "/ingredients/pepper.png" },
    { value: "mushroom", img: "/ingredients/mushroom.png" },
    { value: "salami", img: "/ingredients/salami.png" },
    { value: "shrimp", img: "/ingredients/shrimp.png" },
    { value: "any", img: "/ingredients/vegetables.png" },
  ];
  return (
    <div
      className={`w-24 h-36 flex flex-col bg-white rounded-lg shadow-md text-center m-1 ${value.color}-pattern hover:shadow-white hover:cursor-pointer`}
    >
      <div className="text-center bg-white m-1.5 flex flex-col flex-grow">
        {value.ingredients.map((ingredient) => {
          return (
            <div className="flex text-1xl m-auto">
              <img
                className="m-auto w-6"
                src={cards.find((card) => card.value === ingredient.type)?.img}
                alt={value}
              />
              x{ingredient.amount}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Order;
