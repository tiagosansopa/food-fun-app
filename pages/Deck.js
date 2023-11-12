import React from "react";
import IngredientCard from "./Ingredient";
import OrderCard from "./Order";

const Deck = ({ ingredientCards, orderCards }) => {
  return (
    <div className="flex">
      <div className="flex bg-blue-50 p-4 rounded-lg flex-wrap justify-center  max-w-screen-xl mx-4 my-4">
        {ingredientCards.map((card, index) => (
          <IngredientCard key={index} type={card.type} value={card.value} />
        ))}
        {orderCards.map((card, index) => (
          <OrderCard key={index} type={card.type} value={card.value} />
        ))}
      </div>
    </div>
  );
};

export default Deck;
