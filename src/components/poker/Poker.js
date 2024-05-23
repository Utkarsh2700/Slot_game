// import React from "react";
// import Table from "./Table";
// import Deck from "./cards/Deck";

// const Poker = () => {
//   let palyers = [];
//   let cards = [];
//   return (
//     <div>
//       <Table></Table>
//       <Deck />
//     </div>
//   );
// };

// export default Poker;

// src/App.js
import React, { useState } from "react";
import Deck from "./cards/Deck";
import "./cards/Cards.css";

function App() {
  const [numPlayers, setNumPlayers] = useState(2);

  return (
    <div className="App">
      <h1>Poker Game</h1>
      <label htmlFor="numPlayers">Number of Players: </label>
      <select
        id="numPlayers"
        value={numPlayers}
        onChange={(e) => setNumPlayers(Number(e.target.value))}
      >
        {[...Array(5).keys()].map((i) => (
          <option key={i} value={i + 2}>
            {i + 2}
          </option>
        ))}
      </select>
      <Deck numPlayers={numPlayers} />
    </div>
  );
}

export default App;
