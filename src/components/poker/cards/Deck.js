// // src/components/Deck.js
// import React from "react";
// import Card from "./Card";
// import "./Cards.css";

// const suits = ["hearts", "spades", "diamonds", "clubs"];
// const ranks = [
//   "2",
//   "3",
//   "4",
//   "5",
//   "6",
//   "7",
//   "8",
//   "9",
//   "10",
//   "J",
//   "Q",
//   "K",
//   "A",
// ];

// const Deck = () => {
//   const deck = [];

//   suits.forEach((suit) => {
//     ranks.forEach((rank) => {
//       deck.push({ rank, suit });
//     });
//   });

//   return (
//     <div className="deck">
//       {deck.map((card, index) => (
//         <Card key={index} rank={card.rank} suit={card.suit} />
//       ))}
//     </div>
//   );
// };

// export default Deck;

// src/components/Deck.js
import React, { useState, useEffect } from "react";
import Card from "./Card";

const suits = ["hearts", "spades", "diamonds", "clubs"];
const ranks = [
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "10",
  "J",
  "Q",
  "K",
  "A",
];

const Deck = ({ numPlayers }) => {
  const [deck, setDeck] = useState([]);
  const [hands, setHands] = useState([]);

  useEffect(() => {
    // Generate a full deck of cards
    const generateDeck = () => {
      const newDeck = [];
      suits.forEach((suit) => {
        ranks.forEach((rank) => {
          newDeck.push({ rank, suit });
        });
      });
      // console.log(`deck ${newDeck}`);
      // console.log(newDeck);
      return newDeck;
    };

    // Shuffle the deck using Fisher-Yates shuffle algorithm
    const shuffleDeck = (deck) => {
      for (let i = deck.length - 1; i > 0; i--) {
        // console.log(deck.length);
        const j = Math.floor(Math.random() * (i + 1));
        // console.log(`j ${j} i ${i}`);
        [deck[i], deck[j]] = [deck[j], deck[i]];
      }
      // console.log(`shuffled deck ${deck}`);
      // console.log(deck);
      return deck;
    };

    // Distribute the cards to the players
    const distributeCards = (deck, numPlayers) => {
      const hands = Array.from({ length: numPlayers }, () => []);
      console.log(`hands ${hands}`);
      for (let i = 0; i < deck.length; i++) {
        hands[i % numPlayers].push(deck[i]);
        console.log(i % numPlayers);
      }
      return hands;
    };

    const newDeck = generateDeck();
    const shuffledDeck = shuffleDeck(newDeck);
    const playerHands = distributeCards(shuffledDeck, numPlayers);
    setDeck(shuffledDeck);
    setHands(playerHands);
  }, [numPlayers]);

  return (
    <div className="deck">
      {hands.map((hand, index) => (
        <div key={index} className="hand">
          <h2>Player {index + 1}</h2>
          {hand.map((card, idx) => (
            <Card key={idx} rank={card.rank} suit={card.suit} />
          ))}
        </div>
      ))}
    </div>
  );
};

export default Deck;
