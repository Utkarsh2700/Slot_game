// import React, { useState, useEffect, useRef } from "react";
// import Reel from "./Reel";
// import Symbol from "./Symbol";
// import { FaHome } from "react-icons/fa";
// import { HiOutlineCurrencyDollar } from "react-icons/hi";
// import { FaPlusCircle } from "react-icons/fa";
// import { FaMinusCircle } from "react-icons/fa";

// const Slot = ({ config }) => {
//   const [currentSymbols, setCurrentSymbols] = useState(
//     Array(5).fill(Array(3).fill("death_star"))
//   );
//   const [nextSymbols, setNextSymbols] = useState(
//     Array(5).fill(Array(3).fill("death_star"))
//   );
//   const [isSpinning, setIsSpinning] = useState(false);

//   const spinButton = useRef(null);
//   // REMOVING AUTOPLAY
//   // const autoPlayCheckbox = useRef(null);

//   useEffect(() => {
//     Symbol.preload();
//   }, []);

//   const spin = () => {
//     setIsSpinning(true);
//     const newSymbols = Array(5)
//       .fill()
//       .map(() => Array(3).map(() => Symbol.random()));
//     setNextSymbols(newSymbols);

//     if (config.onSpinStart) {
//       config.onSpinStart(newSymbols);
//     }
//   };

//   const onSpinEnd = () => {
//     setIsSpinning(false);
//     setCurrentSymbols(nextSymbols);

//     if (config.onSpinEnd) {
//       config.onSpinEnd(nextSymbols);
//     }
//     // REMOVING AUTOPLAY
//     // if (autoPlayCheckbox.current.checked) {
//     //   setTimeout(spin, 200);
//     // }
//   };

//   return (
//     <div id="slot" className={config.inverted ? "inverted" : ""}>
//       {/* <div id="jackpot">
//         Jackpot: <span id="jp">5.555.555</span>
//       </div> */}
//       <h1 className="text-5xl text-yellow-300 font-extrabold " id="titleText">
//         STARBURST
//       </h1>
//       <div id="walletHome">
//         <div className="flex justify-between mt-3 mb-1 items-center">
//           <div className="flex items-center neon-purple">
//             <FaHome className=" text-white bg-fuchsia-800 rounded-full text-3xl mx-4 " />
//           </div>

//           <div className="flex items-center neon-yellow">
//             <HiOutlineCurrencyDollar className="bg-yellow-300 text-yellow-800 text-3xl rounded-full transform skew-x-6 mx-4" />
//             <p id="balance" className="pr-2 text-2xl text-white">{`0.06`}</p>
//           </div>
//         </div>
//       </div>
//       <div id="reels">
//         {currentSymbols.map((symbols, idx) => (
//           <div className="reel" key={idx}>
//             <Reel
//               idx={idx}
//               initialSymbols={symbols}
//               nextSymbols={nextSymbols[idx]}
//               onSpinEnd={onSpinEnd}
//             />
//           </div>
//         ))}
//       </div>
//       <div id="controls">
//         <button
//           className="rounded-full text-green-600 box- animate-pulse neon-pink"
//           type="button"
//           id="spin"
//           ref={spinButton}
//           onClick={spin}
//           disabled={isSpinning}
//         >
//           SPIN
//         </button>

//         {/* <label>
//           <input
//             type="checkbox"
//             name="autoplay"
//             id="autoplay"
//             ref={autoPlayCheckbox}
//           />
//           Autoplay
//         </label> */}
//       </div>
//     </div>
//   );
// };

// export default Slot;

import React, { useState, useEffect, useRef } from "react";
import Reel from "./Reel";
import Symbol from "./Symbol";
import { FaHome } from "react-icons/fa";
import { HiOutlineCurrencyDollar } from "react-icons/hi";
import { FaPlusCircle } from "react-icons/fa";
import { FaMinusCircle } from "react-icons/fa";

const Slot = ({ config }) => {
  const [currentSymbols, setCurrentSymbols] = useState(
    Array(5).fill(Array(3).fill("1"))
  );
  const [nextSymbols, setNextSymbols] = useState(
    Array(5).fill(Array(3).fill("1"))
  );
  const [isSpinning, setIsSpinning] = useState(false);
  const [resultMessage, setResultMessage] = useState("");

  const [betAmount, setBetAmount] = useState(100);

  const spinButton = useRef(null);

  useEffect(() => {
    Symbol.preload();
  }, []);

  const generateRandomSymbols = () => {
    return Array(5)
      .fill()
      .map(() => Array(3).map(() => Symbol.random()));
  };

  const onSpinEnd = (newSymbols) => {
    setCurrentSymbols(newSymbols);
    setIsSpinning(false);

    if (config.onSpinEnd) {
      config.onSpinEnd(newSymbols);
    }

    // Check for matching icons in the middle row
    const middleRowSymbols = newSymbols.map((column) => column[1]); // Get the middle row symbols
    const counts = middleRowSymbols.reduce((acc, symbol) => {
      console.log(acc[symbol]);
      acc[symbol] = (acc[symbol] || 0) + 1;
      console.log(acc);
      return acc;
    }, {});

    const hasThreeOrMoreMatches = Object.values(counts).some(
      (count) => count >= 3
    );

    if (hasThreeOrMoreMatches) {
      setResultMessage("You win!");
    } else {
      setResultMessage("Play again");
    }

    // setTimeout(() => {
    //   setResultMessage("");
    // }, 3000);
  };

  const spin = () => {
    setIsSpinning(true);
    setResultMessage(""); // Clear the message when spinning starts

    const newSymbols = generateRandomSymbols();
    setNextSymbols(newSymbols);

    if (config.onSpinStart) {
      config.onSpinStart(newSymbols);
    }

    // Simulate the duration of spinning
    setTimeout(() => {
      onSpinEnd(newSymbols);
    }, 10); // Assume the total duration of spin animation
  };

  return (
    <div id="slot" className={config.inverted ? "inverted" : ""}>
      <h1 className="text-5xl text-yellow-300 font-extrabold " id="titleText">
        STARBURST
      </h1>
      <div id="walletHome">
        <div className="flex justify-between mt-3 items-center">
          <div className="flex items-center">
            <FaHome className=" text-white bg-fuchsia-800 rounded-full text-3xl mx-4 " />
          </div>

          <div className="flex items-center">
            <HiOutlineCurrencyDollar className="bg-yellow-300 text-yellow-800 text-3xl rounded-full transform skew-x-6 mx-4" />
            <p id="balance" className="pr-2 text-2xl text-white">{`0.06`}</p>
          </div>
        </div>
      </div>
      {/* <div id="resultMessage" className="text-center mt-4 text-2xl text-white">
        {resultMessage}
      </div> */}
      <div id="reels">
        {currentSymbols.map((symbols, idx) => (
          <div className="reel" key={idx}>
            <Reel
              idx={idx}
              initialSymbols={symbols}
              nextSymbols={nextSymbols[idx]}
              onSpinEnd={() => onSpinEnd(nextSymbols)}
            />
          </div>
        ))}
      </div>
      <div id="controls">
        <button
          className="rounded-full text-green-600 box- animate-pulse shadow-[0_0_10px_white]"
          type="button"
          id="spin"
          ref={spinButton}
          onClick={spin}
          disabled={isSpinning}
        >
          SPIN
        </button>

        <div className="flex mr-4 bg-blue-gradient  rounded">
          <button>
            <FaMinusCircle
              className={`text-red-600 text-4xl  ${
                betAmount === 0
                  ? "opacity-50 cursor-not-allowed"
                  : "animate-pulse"
              }`}
              onClick={() => {
                if (betAmount > 0) {
                  setBetAmount(betAmount - 100);
                }
              }}
            />
          </button>
          <ul className="text-center text-white">
            <li className="uppercase">Total Bet</li>
            <li>{betAmount}</li>
          </ul>
          <button>
            <FaPlusCircle
              className={`text-green-600 text-4xl  ${
                betAmount >= 1000
                  ? "opacity-50 cursor-not-allowed"
                  : "animate-pulse"
              }`}
              onClick={() => {
                if (betAmount < 1000) {
                  setBetAmount(betAmount + 100);
                }
              }}
              // onMouseDown={setBetAmount(betAmount++)}
            />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Slot;
