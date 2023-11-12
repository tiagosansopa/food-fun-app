import { useState } from "react";
import Deck from "./Deck";
import IngredientCard from "./Ingredient";
import OrderCard from "./Order";
const ingredientCards = [
  { type: "ingredient", value: "pineapple" },
  { type: "ingredient", value: "pineapple" },
  { type: "ingredient", value: "pineapple" },
  { type: "ingredient", value: "pineapple" },
  { type: "ingredient", value: "pineapple" },
  { type: "ingredient", value: "pineapple" },
  { type: "ingredient", value: "pineapple" },
  { type: "ingredient", value: "pineapple" },
  { type: "ingredient", value: "pineapple" },
  { type: "ingredient", value: "pineapple" },
  { type: "ingredient", value: "pineapple" },
  { type: "ingredient", value: "pineapple" },
  { type: "ingredient", value: "pineapple" },
  { type: "ingredient", value: "pineapple" },
  { type: "ingredient", value: "pineapple" },
  { type: "ingredient", value: "olive" },
  { type: "ingredient", value: "olive" },
  { type: "ingredient", value: "olive" },
  { type: "ingredient", value: "olive" },
  { type: "ingredient", value: "olive" },
  { type: "ingredient", value: "olive" },
  { type: "ingredient", value: "olive" },
  { type: "ingredient", value: "olive" },
  { type: "ingredient", value: "olive" },
  { type: "ingredient", value: "olive" },
  { type: "ingredient", value: "olive" },
  { type: "ingredient", value: "olive" },
  { type: "ingredient", value: "olive" },
  { type: "ingredient", value: "olive" },
  { type: "ingredient", value: "olive" },
  { type: "ingredient", value: "pepper" },
  { type: "ingredient", value: "pepper" },
  { type: "ingredient", value: "pepper" },
  { type: "ingredient", value: "pepper" },
  { type: "ingredient", value: "pepper" },
  { type: "ingredient", value: "pepper" },
  { type: "ingredient", value: "pepper" },
  { type: "ingredient", value: "pepper" },
  { type: "ingredient", value: "pepper" },
  { type: "ingredient", value: "pepper" },
  { type: "ingredient", value: "pepper" },
  { type: "ingredient", value: "pepper" },
  { type: "ingredient", value: "pepper" },
  { type: "ingredient", value: "pepper" },
  { type: "ingredient", value: "pepper" },
  { type: "ingredient", value: "mushroom" },
  { type: "ingredient", value: "mushroom" },
  { type: "ingredient", value: "mushroom" },
  { type: "ingredient", value: "mushroom" },
  { type: "ingredient", value: "mushroom" },
  { type: "ingredient", value: "mushroom" },
  { type: "ingredient", value: "mushroom" },
  { type: "ingredient", value: "mushroom" },
  { type: "ingredient", value: "mushroom" },
  { type: "ingredient", value: "mushroom" },
  { type: "ingredient", value: "mushroom" },
  { type: "ingredient", value: "mushroom" },
  { type: "ingredient", value: "mushroom" },
  { type: "ingredient", value: "mushroom" },
  { type: "ingredient", value: "mushroom" },
  { type: "ingredient", value: "salami" },
  { type: "ingredient", value: "salami" },
  { type: "ingredient", value: "salami" },
  { type: "ingredient", value: "salami" },
  { type: "ingredient", value: "salami" },
  { type: "ingredient", value: "salami" },
  { type: "ingredient", value: "salami" },
  { type: "ingredient", value: "salami" },
  { type: "ingredient", value: "salami" },
  { type: "ingredient", value: "salami" },
  { type: "ingredient", value: "salami" },
  { type: "ingredient", value: "salami" },
  { type: "ingredient", value: "salami" },
  { type: "ingredient", value: "salami" },
  { type: "ingredient", value: "salami" },
  { type: "ingredient", value: "salami" },
  { type: "ingredient", value: "shrimp" },
  { type: "ingredient", value: "shrimp" },
  { type: "ingredient", value: "shrimp" },
  { type: "ingredient", value: "shrimp" },
  { type: "ingredient", value: "shrimp" },
  { type: "ingredient", value: "shrimp" },
  { type: "ingredient", value: "shrimp" },
  { type: "ingredient", value: "shrimp" },
  { type: "ingredient", value: "shrimp" },
  { type: "ingredient", value: "shrimp" },
  { type: "ingredient", value: "shrimp" },
  { type: "ingredient", value: "shrimp" },
  { type: "ingredient", value: "shrimp" },
  { type: "ingredient", value: "shrimp" },
  { type: "ingredient", value: "shrimp" },
];
const orderCards = [
  {
    type: "order",
    value: {
      color: "red",
      ingredients: [
        { type: "pineapple", amount: 4 },
        { type: "salami", amount: 1 },
      ],
    },
  },
  {
    type: "order",
    value: {
      color: "red",
      ingredients: [
        { type: "olive", amount: 4 },
        { type: "salami", amount: 1 },
      ],
    },
  },
  {
    type: "order",
    value: {
      color: "red",
      ingredients: [
        { type: "pepper", amount: 4 },
        { type: "salami", amount: 1 },
      ],
    },
  },
  {
    type: "order",
    value: {
      color: "red",
      ingredients: [
        { type: "mushroom", amount: 4 },
        { type: "salami", amount: 1 },
      ],
    },
  },
  {
    type: "order",
    value: {
      color: "red",
      ingredients: [
        { type: "shrimp", amount: 4 },
        { type: "salami", amount: 1 },
      ],
    },
  },
  {
    type: "order",
    value: {
      color: "red",
      ingredients: [
        { type: "olive", amount: 4 },
        { type: "salami", amount: 1 },
      ],
    },
  },
  {
    type: "order",
    value: {
      color: "green",
      ingredients: [
        { type: "pineapple", amount: 4 },
        { type: "pepper", amount: 1 },
      ],
    },
  },
  {
    type: "order",
    value: {
      color: "green",
      ingredients: [
        { type: "olive", amount: 4 },
        { type: "pepper", amount: 1 },
      ],
    },
  },
  {
    type: "order",
    value: {
      color: "green",
      ingredients: [
        { type: "mushroom", amount: 4 },
        { type: "pepper", amount: 1 },
      ],
    },
  },
  {
    type: "order",
    value: {
      color: "green",
      ingredients: [
        { type: "salami", amount: 4 },
        { type: "pepper", amount: 1 },
      ],
    },
  },
  {
    type: "order",
    value: {
      color: "green",
      ingredients: [
        { type: "shrimp", amount: 4 },
        { type: "pepper", amount: 1 },
      ],
    },
  },
  {
    type: "order",
    value: {
      color: "yellow",
      ingredients: [
        { type: "olive", amount: 4 },
        { type: "pineapple", amount: 1 },
      ],
    },
  },
  {
    type: "order",
    value: {
      color: "yellow",
      ingredients: [
        { type: "pepper", amount: 4 },
        { type: "pineapple", amount: 1 },
      ],
    },
  },
  {
    type: "order",
    value: {
      color: "yellow",
      ingredients: [
        { type: "mushroom", amount: 4 },
        { type: "pineapple", amount: 1 },
      ],
    },
  },
  {
    type: "order",
    value: {
      color: "yellow",
      ingredients: [
        { type: "salami", amount: 4 },
        { type: "pineapple", amount: 1 },
      ],
    },
  },
  {
    type: "order",
    value: {
      color: "yellow",
      ingredients: [
        { type: "shrimp", amount: 4 },
        { type: "pineapple", amount: 1 },
      ],
    },
  },
  {
    type: "order",
    value: {
      color: "brown",
      ingredients: [
        { type: "mushroom", amount: 1 },
        { type: "pineapple", amount: 4 },
      ],
    },
  },
  {
    type: "order",
    value: {
      color: "brown",
      ingredients: [
        { type: "mushroom", amount: 1 },
        { type: "olive", amount: 4 },
      ],
    },
  },
  {
    type: "order",
    value: {
      color: "brown",
      ingredients: [
        { type: "mushroom", amount: 1 },
        { type: "pepper", amount: 4 },
      ],
    },
  },
  {
    type: "order",
    value: {
      color: "brown",
      ingredients: [
        { type: "mushroom", amount: 1 },
        { type: "salami", amount: 4 },
      ],
    },
  },
  {
    type: "order",
    value: {
      color: "brown",
      ingredients: [
        { type: "mushroom", amount: 1 },
        { type: "shrimp", amount: 4 },
      ],
    },
  },
  {
    type: "order",
    value: {
      color: "black",
      ingredients: [
        { type: "olive", amount: 1 },
        { type: "pineapple", amount: 4 },
      ],
    },
  },
  {
    type: "order",
    value: {
      color: "black",
      ingredients: [
        { type: "olive", amount: 1 },
        { type: "pepper", amount: 4 },
      ],
    },
  },
  {
    type: "order",
    value: {
      color: "black",
      ingredients: [
        { type: "olive", amount: 1 },
        { type: "mushroom", amount: 4 },
      ],
    },
  },
  {
    type: "order",
    value: {
      color: "black",
      ingredients: [
        { type: "olive", amount: 1 },
        { type: "salami", amount: 4 },
      ],
    },
  },
  {
    type: "order",
    value: {
      color: "black",
      ingredients: [
        { type: "olive", amount: 1 },
        { type: "shrimp", amount: 4 },
      ],
    },
  },
  {
    type: "order",
    value: {
      color: "pink",
      ingredients: [
        { type: "shrimp", amount: 1 },
        { type: "pineapple", amount: 4 },
      ],
    },
  },
  {
    type: "order",
    value: {
      color: "pink",
      ingredients: [
        { type: "shrimp", amount: 1 },
        { type: "olive", amount: 4 },
      ],
    },
  },
  {
    type: "order",
    value: {
      color: "pink",
      ingredients: [
        { type: "shrimp", amount: 1 },
        { type: "pepper", amount: 4 },
      ],
    },
  },
  {
    type: "order",
    value: {
      color: "pink",
      ingredients: [
        { type: "shrimp", amount: 1 },
        { type: "mushroom", amount: 4 },
      ],
    },
  },
  {
    type: "order",
    value: {
      color: "pink",
      ingredients: [
        { type: "shrimp", amount: 1 },
        { type: "salami", amount: 4 },
      ],
    },
  },
  {
    type: "order",
    value: {
      color: "pink",
      ingredients: [
        { type: "shrimp", amount: 1 },
        { type: "pineapple", amount: 1 },
        { type: "olive", amount: 1 },
        { type: "pepper", amount: 1 },
        { type: "mushroom", amount: 1 },
        { type: "salami", amount: 1 },
      ],
    },
  },
  {
    type: "order",
    value: {
      color: "black",
      ingredients: [
        { type: "shrimp", amount: 1 },
        { type: "pineapple", amount: 1 },
        { type: "olive", amount: 1 },
        { type: "pepper", amount: 1 },
        { type: "mushroom", amount: 1 },
        { type: "salami", amount: 1 },
      ],
    },
  },
  {
    type: "order",
    value: {
      color: "brown",
      ingredients: [
        { type: "shrimp", amount: 1 },
        { type: "pineapple", amount: 1 },
        { type: "olive", amount: 1 },
        { type: "pepper", amount: 1 },
        { type: "mushroom", amount: 1 },
        { type: "salami", amount: 1 },
      ],
    },
  },
  {
    type: "order",
    value: {
      color: "yellow",
      ingredients: [
        { type: "shrimp", amount: 1 },
        { type: "pineapple", amount: 1 },
        { type: "olive", amount: 1 },
        { type: "pepper", amount: 1 },
        { type: "mushroom", amount: 1 },
        { type: "salami", amount: 1 },
      ],
    },
  },
  {
    type: "order",
    value: {
      color: "green",
      ingredients: [
        { type: "shrimp", amount: 1 },
        { type: "pineapple", amount: 1 },
        { type: "olive", amount: 1 },
        { type: "pepper", amount: 1 },
        { type: "mushroom", amount: 1 },
        { type: "salami", amount: 1 },
      ],
    },
  },
  {
    type: "order",
    value: {
      color: "red",
      ingredients: [
        { type: "shrimp", amount: 1 },
        { type: "pineapple", amount: 1 },
        { type: "olive", amount: 1 },
        { type: "pepper", amount: 1 },
        { type: "mushroom", amount: 1 },
        { type: "salami", amount: 1 },
      ],
    },
  },
  {
    type: "order",
    value: {
      color: "red",
      ingredients: [{ type: "any", amount: "15+" }],
    },
  },
  {
    type: "order",
    value: {
      color: "green",
      ingredients: [{ type: "any", amount: "15+" }],
    },
  },
  {
    type: "order",
    value: {
      color: "yellow",
      ingredients: [{ type: "any", amount: "15+" }],
    },
  },
  {
    type: "order",
    value: {
      color: "brown",
      ingredients: [{ type: "any", amount: "15+" }],
    },
  },
  {
    type: "order",
    value: {
      color: "black",
      ingredients: [{ type: "any", amount: "15+" }],
    },
  },
  {
    type: "order",
    value: {
      color: "pink",
      ingredients: [{ type: "any", amount: "15+" }],
    },
  },
];
const Main = () => {
  const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };
  const [playerName, setPlayerName] = useState("uim");
  const [completedOrders, setCompletedOrders] = useState(0);
  const [playerHand, setPlayerHand] = useState([]);
  const [playerColor, setPlayerColor] = useState("red");
  const [playerOrderDeck, setPlayerOrderDeck] = useState(
    shuffleArray(orderCards.filter((order) => order.value.color === "red"))
  );
  const [ingredientsDeck, setIngredientsDeck] = useState(
    shuffleArray(ingredientCards)
  );
  const [ordersDeck, setOrdersDeck] = useState(orderCards);

  const takeOrderCard = () => {
    if (playerOrderDeck.length > 0 && playerHand.length < 9) {
      const drawnCard = playerOrderDeck[0];
      setPlayerHand((prevPlayerHand) => [...prevPlayerHand, drawnCard]);
      setPlayerOrderDeck((prevPlayerOrderDeck) => prevPlayerOrderDeck.slice(1));
    }
  };

  const takeIngredientCard = () => {
    if (ingredientsDeck.length > 0 && playerHand.length < 9) {
      const drawnCard = ingredientsDeck[0];
      setPlayerHand((prevPlayerHand) => [...prevPlayerHand, drawnCard]);
      setIngredientsDeck((prevIngredientsDeck) => prevIngredientsDeck.slice(1));
    }
  };

  return (
    <div>
      <div className="flex flex-col bg-blue-50 p-4 rounded-lg flex-wrap justify-center  max-w-screen-xl mx-4 my-4  relative">
        <h1 className="text-center">Pizza Fun Game</h1>
        <div className="flex-1 p-4 flex justify-center items-center">
          <img
            src="/elements/pizza.png"
            alt="Pizza Image"
            className="w-62 h-32 object-cover "
          />
        </div>
        <div className="flex justify-center">
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-300 focus:ring-opacity-50 w-48 mx-1">
            New Game
          </button>
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-300 focus:ring-opacity-50 w-48 mx-1">
            Join
          </button>
        </div>
      </div>
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
      <h1>Player 1</h1>
      <div className="flex">
        <div className="flex-1 p-4">
          <div className="flex flex-col">
            <span className="text-lg font-bold">{playerName}</span>
            <span>Orders Completed: {completedOrders}</span>
          </div>
        </div>

        <div className="flex-1 p-4 flex justify-center items-center">
          <img
            src="/elements/oven.png"
            alt="Player Image"
            className="w-62 h-32 object-cover "
          />
        </div>
        <div className="flex-1 p-4 flex justify-between items-center">
          <div className="flex flex-col">
            <img
              src="/elements/ingredients.png"
              alt="Ingredients"
              className="w-10 h-10 m-2"
            />
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-300 focus:ring-opacity-50"
              onClick={takeIngredientCard}
            >
              Take
            </button>
          </div>
          <div className="flex flex-col">
            <img
              src="/elements/waiter.png"
              alt="Orders"
              className="w-10 h-10 m-2"
            />

            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-300 focus:ring-opacity-50"
              onClick={takeOrderCard}
            >
              Take
            </button>
          </div>
        </div>
      </div>
      <div className="flex bg-blue-50 p-4 rounded-lg flex-wrap justify-center  max-w-screen-xl mx-4 my-4 mt-16 relative min-h-[176px]">
        {playerHand.map((card, index) => {
          if (card.type === "order") {
            return (
              <OrderCard key={index} type={card.type} value={card.value} />
            );
          } else if (card.type === "ingredient") {
            return (
              <IngredientCard key={index} type={card.type} value={card.value} />
            );
          }
        })}
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-300 focus:ring-opacity-50 absolute bottom-4 right-4">
          Next
        </button>
      </div>

      <h1>Player 2</h1>
      <div className="flex">
        <div className="flex-1 p-4">
          <div className="flex flex-col">
            <span className="text-lg font-bold">{playerName}</span>
            <span>Orders Completed: {completedOrders}</span>
          </div>
        </div>

        <div className="flex-1 p-4 flex justify-center items-center">
          <img
            src="/elements/oven.png"
            alt="Player Image"
            className="w-62 h-32 object-cover "
          />
        </div>
        <div className="flex-1 p-4 flex justify-between items-center">
          <div className="flex flex-col">
            <img
              src="/elements/ingredients.png"
              alt="Ingredients"
              className="w-10 h-10 m-2"
            />
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-300 focus:ring-opacity-50"
              onClick={takeIngredientCard}
            >
              Take
            </button>
          </div>
          <div className="flex flex-col">
            <img
              src="/elements/waiter.png"
              alt="Orders"
              className="w-10 h-10 m-2"
            />

            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-300 focus:ring-opacity-50"
              onClick={takeOrderCard}
            >
              Take
            </button>
          </div>
        </div>
      </div>
      <div className="flex bg-blue-50 p-4 rounded-lg flex-wrap justify-center  max-w-screen-xl mx-4 my-4 mt-16 relative min-h-[176px]">
        {playerHand.map((card, index) => {
          if (card.type === "order") {
            return (
              <OrderCard key={index} type={card.type} value={card.value} />
            );
          } else if (card.type === "ingredient") {
            return (
              <IngredientCard key={index} type={card.type} value={card.value} />
            );
          }
        })}
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-300 focus:ring-opacity-50 absolute bottom-4 right-4">
          Next
        </button>
      </div>

      {/*<Deck ingredientCards={ingredientsDeck} orderCards={playerOrderDeck} />*/}
    </div>
  );
};

export default Main;
