import { useState } from "react";
import { useRouter } from "next/router";
import Deck from "../../components/Deck";
import IngredientCard from "../../components/Ingredient";
import OrderCard from "../../components/Order";
import { shuffleArray } from "../../helpers";
import { orderCards, ingredientCards } from "../../constants";

const Room = () => {
  const router = useRouter();
  const { roomId } = router.query;
  const [playerName, setPlayerName] = useState("uim");
  const [completedOrders, setCompletedOrders] = useState(0);
  const [playerHand, setPlayerHand] = useState([]);
  const [playerColor, setPlayerColor] = useState("red");
  const [playerOrderDeck, setPlayerOrderDeck] = useState(
    shuffleArray(orderCards.filter((order) => order.value.color === "yellow"))
  );
  const [ingredientsDeck, setIngredientsDeck] = useState(
    shuffleArray(ingredientCards)
  );
  const [ordersDeck, setOrdersDeck] = useState(orderCards);
  const [selectedCards, setSelectedCards] = useState([]);
  const [ovenDeck, setOvenDeck] = useState([]);
  const [lastIngredient, setLastIngredient] = useState(null);
  const [tableDeck, setTableDeck] = useState([]);
  const [tableSelectedDeck, setTableSelectedDeck] = useState([]);
  const [tableOrder, setTableOrder] = useState(null);

  const handleReset = () => {
    setCompletedOrders(0);
    setPlayerHand([]);
    setPlayerOrderDeck(
      shuffleArray(orderCards.filter((order) => order.value.color === "yellow"))
    );
    setIngredientsDeck(shuffleArray(ingredientCards));
    setSelectedCards([]);
    setOvenDeck([]);
    setLastIngredient(null);
    setTableDeck([]);
    setTableSelectedDeck([]);
    setTableOrder(null);
  };

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

  const handleCardClick = (clickedCard) => {
    const isCardSelected = selectedCards.includes(clickedCard);
    setSelectedCards(
      isCardSelected
        ? selectedCards.filter((card) => card !== clickedCard)
        : [...selectedCards, clickedCard]
    );
  };

  const handlePlayCards = () => {
    setOvenDeck([...ovenDeck, ...selectedCards]);
    setPlayerHand(playerHand.filter((card) => !selectedCards.includes(card)));
    setSelectedCards([]);
    setLastIngredient(selectedCards[selectedCards.length - 1]);
  };

  const handleTakeOut = () => {
    const lastElement = ovenDeck[0];
    setOvenDeck((prevOvenDeck) => prevOvenDeck.slice(1));
    if (lastElement.type === "ingredient") {
      setTableDeck([...tableDeck, lastElement]);
    } else {
      setTableOrder(lastElement);
    }
    setLastIngredient(ovenDeck[1]);
  };

  const handleTableCardClick = (clickedCard) => {
    const isCardSelected = tableSelectedDeck.includes(clickedCard);
    setTableSelectedDeck(
      isCardSelected
        ? tableSelectedDeck.filter((card) => card !== clickedCard)
        : [...tableSelectedDeck, clickedCard]
    );
  };

  const handleReturnOrder = () => {
    setPlayerOrderDeck((prevPlayerOrderDeck) => [
      ...prevPlayerOrderDeck,
      tableOrder,
    ]);
    setTableOrder(null);
  };
  const validateIngredients = (tableIngredients, orderIngredients) => {
    const ingredientCount = {};
    tableIngredients.forEach((ingredient) => {
      const { value } = ingredient;
      ingredientCount[value] = (ingredientCount[value] || 0) + 1;
    });
    const missingIngredients = [];
    orderIngredients.forEach((ingredient) => {
      const { type, amount } = ingredient;
      const count = ingredientCount[type] || 0;

      if (count !== amount) {
        missingIngredients.push({ type, amount: amount - count });
      }
    });

    return missingIngredients;
  };

  const handleServeOrder = () => {
    const missingIngredients = validateIngredients(
      tableSelectedDeck,
      tableOrder.value.ingredients
    );
    if (missingIngredients.length > 0) {
      window.alert(
        "Missing ingredients to complete order: ",
        JSON.stringify(missingIngredients)
      );
    } else {
      setTableDeck(
        tableDeck.filter((card) => !tableSelectedDeck.includes(card))
      );
      setTableSelectedDeck([]);
      setTableOrder(null);
      setCompletedOrders(completedOrders + 1);
    }
  };

  return (
    <>
      <div className="flex bg-purple-100 p-4 rounded-lg flex-wrap justify-center  max-w-screen-xl mx-4 my-4  relative">
        <h1>Game Room: {roomId}</h1>
        <h2 className="mx-auto">Player 1</h2>
        <button
          className="bg-red-500 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-300 focus:ring-opacity-50 ml-auto mr-1"
          onClick={handleReset}
        >
          Reset
        </button>
      </div>
      <div className="flex">
        <div className="flex-1 p-4">
          <div className="flex flex-col">
            <span className="text-lg font-bold">{playerName}</span>
            <span>Orders Completed: {completedOrders}</span>
          </div>
        </div>

        <div className="flex-1 p-4 flex justify-center items-center relative">
          <img
            src="/elements/oven.png"
            alt="Player Image"
            className="w-62 h-32 object-cover "
          />
          {lastIngredient &&
            (lastIngredient.type === "ingredient" ? (
              <img
                src={`/ingredients/${lastIngredient.value}.png`}
                alt={`${lastIngredient.value}`}
                className="absolute top-1/2 w-10 h-10 shadow-slate-50 shadow-md"
              />
            ) : (
              <img
                src={`/elements/pizza_new.png`}
                alt="pizza"
                className="absolute top-1/2 w-20 h-15"
              />
            ))}
        </div>
        <div className="flex-1 p-4 flex justify-center">
          <div className="flex flex-col m-auto mr-4">
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
          <div className="flex flex-col m-auto ml-4">
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
              <OrderCard
                key={index}
                type={card.type}
                value={card.value}
                onClick={() => handleCardClick(card)}
                selected={selectedCards.includes(card)}
              />
            );
          } else if (card.type === "ingredient") {
            return (
              <IngredientCard
                key={index}
                type={card.type}
                value={card.value}
                onClick={() => handleCardClick(card)}
                selected={selectedCards.includes(card)}
              />
            );
          }
        })}
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-300 focus:ring-opacity-50 absolute bottom-4 right-4"
          onClick={handlePlayCards}
        >
          Put In
        </button>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-300 focus:ring-opacity-50 absolute bottom-4 right-4"
          onClick={handlePlayCards}
        >
          End Turn
        </button>
      </div>
      Order Backlog
      <div className="flex bg-pink-50 p-4 rounded-lg flex-wrap justify-center  max-w-screen-xl mx-4 my-4  relative">
        {playerOrderDeck.map((card, index) => (
          <OrderCard key={card.type} type={card.type} value={card.value} />
        ))}
      </div>
      Oven
      <div className="flex bg-red-50 p-4 rounded-lg flex-wrap justify-center  max-w-screen-xl mx-4 my-4  relative">
        {ovenDeck.map((card, index) => (
          <div className="w-7 h-7 flex flex-col bg-white rounded-lg shadow-md text-center m-1">
            <img src={`/ingredients/${card.value}.png`} alt={`${card.value}`} />
          </div>
        ))}
      </div>
      <h1>Fin de ronda</h1>
      <div className="flex bg-blue-50 p-4 rounded-lg flex-wrap justify-center  max-w-screen-xl mx-4 my-4  relative">
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-300 focus:ring-opacity-50"
          onClick={handleTakeOut}
        >
          Take Out
        </button>
        <div className="flex flex-col bg-blue-50 p-4 rounded-lg flex-wrap justify-center  max-w-screen-xl mx-4 my-4 mt-16 relative min-h-[176px]">
          <div className="flex bg-blue-50 p-4 rounded-lg flex-wrap justify-center  max-w-screen-xl mx-4 my-4 mt-16 relative min-h-[176px]">
            {tableDeck.map((card, index) => (
              <div
                className={`w-11 h-11 flex flex-col bg-white rounded-lg shadow-md text-center m-1 p-2 hover:cursor-pointer ${
                  tableSelectedDeck.includes(card) ? " ring ring-green-500" : ""
                }`}
                onClick={() => handleTableCardClick(card)}
              >
                <img
                  src={`/ingredients/${card.value}.png`}
                  alt={`${card.value}`}
                />
              </div>
            ))}
          </div>
          <div className="flex justify-center">
            <button
              className="bg-green-500 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-300 focus:ring-opacity-50 m-auto"
              onClick={handleServeOrder}
            >
              Serve
            </button>
            <button
              className="bg-red-500 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-300 focus:ring-opacity-50 m-auto"
              onClick={handleReturnOrder}
            >
              Return
            </button>
          </div>
        </div>

        <div className="flex">
          <div className="flex-1 p-4">
            {tableOrder && (
              <OrderCard
                key={tableOrder.type}
                type={tableOrder.type}
                value={tableOrder.value}
              />
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Room;
