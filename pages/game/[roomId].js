import { useContext, useState, useEffect } from "react";
import { useRouter } from "next/router";
import Deck from "../../components/Deck";
import IngredientCard from "../../components/Ingredient";
import OrderCard from "../../components/Order";
import { shuffleArray } from "../../helpers";
import { orderCards, ingredientCards } from "../../constants";

import SocketContext from "../../context/socketContext";
import PlayerContext from "../../context/playerContext";

const Room = () => {
  const router = useRouter();
  const { roomId } = router.query;
  const { socket } = useContext(SocketContext);
  const { user } = useContext(PlayerContext);

  const [playersNames, setPlayersNames] = useState([]);
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
  const [roundOver, setRoundOver] = useState(false);

  socket.on("player-joined", (data) => {
    console.log("Players:", data.players);
    setPlayersNames(data.players);
  });

  socket.on("start-game", (initialHand) => {
    console.log("VAMOS A COMENZAR");
    //setHand(initialHand);
    //setGameStarted(true);
  });

  useEffect(() => {
    const handleBeforeUnload = () => {
      socket.emit("disconnecting", { user });
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);

      // Clean up resources, if needed
      socket.disconnect({ user });
    };
  }, []);

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
      </div>

      <div className="flex">
        <div className="flex-1 p-4">
          <div className="flex flex-col">
            <span className="text-lg font-bold">{user}</span>
            <span>Orders Completed: {completedOrders}</span>
            {playersNames.map((player) => (
              <>
                <span className="text-lg font-bold">{player}</span>
                <span>Orders Completed: </span>
              </>
            ))}
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
          {playerOrderDeck.length < 1 && (
            <img
              src="/elements/door.png"
              alt="door"
              className="w-62 h-32 object-cover absolute top-6"
            />
          )}
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

      {roundOver && (
        <div className="flex bg-blue-50 p-4 rounded-lg flex-wrap justify-center  max-w-screen-xl mx-4 my-4  relative">
          <div className="flex">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-300 focus:ring-opacity-50"
              onClick={handleTakeOut}
            >
              Take Out
            </button>
          </div>
          <div className="flex flex-col bg-blue-50 p-4 rounded-lg flex-wrap justify-center max-w-screen-sm mx-4 relative min-h-[176px]">
            <div className="flex bg-blue-50 p-4 rounded-lg flex-wrap justify-center min-w-screen-xl max-w-screen-xl mx-4 my-4 relative min-h-[176px]">
              {tableDeck.map((card, index) => (
                <div
                  className={`w-11 h-11 flex flex-col bg-white rounded-lg shadow-md text-center m-1 p-2 hover:cursor-pointer ${
                    tableSelectedDeck.includes(card)
                      ? " ring ring-green-500"
                      : ""
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
                className="bg-green-700 hover:bg-green-500 text-white font-semibold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-300 focus:ring-opacity-50 m-auto"
                onClick={() => {
                  setTableSelectedDeck([]);
                }}
              >
                Clear
              </button>
              <button
                className="bg-red-500 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-300 focus:ring-opacity-50 m-auto"
                onClick={handleReturnOrder}
              >
                Return
              </button>
            </div>
          </div>

          <div className="flex p-4">
            <div className="m-auto">
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
      )}

      <div className="flex bg-blue-50 p-4 rounded-lg flex-wrap justify-center  max-w-screen-xl mx-4 my-4 relative min-h-[176px]">
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
        <div className="absolute bottom-4 right-4 flex justify-center">
          <button
            className="bg-orange-500 hover:bg-orange-700 text-white font-semibold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-300 focus:ring-opacity-50 mx-1 "
            onClick={handlePlayCards}
          >
            Put In
          </button>
          <button
            className="bg-orange-600 hover:bg-orange-800 text-white font-semibold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-300 focus:ring-opacity-50 mx-1 "
            onClick={handlePlayCards}
          >
            Complete
          </button>
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-300 focus:ring-opacity-50 mx-1"
            onClick={handlePlayCards}
          >
            End Turn
          </button>
        </div>
      </div>
    </>
  );
};

export default Room;
