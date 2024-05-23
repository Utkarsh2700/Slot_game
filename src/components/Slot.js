import React, { useState, useEffect, useRef } from "react";
import Reel from "./Reel";
import Symbol from "./Symbol";
import { FaHome } from "react-icons/fa";
import { HiOutlineCurrencyDollar } from "react-icons/hi";
import { FaPlusCircle } from "react-icons/fa";
import { FaMinusCircle } from "react-icons/fa";
// import home from "HomeIcon.png";
// import dollar from "/public/DollarIcon.png";
import home from "../assets/HomeIcon.png";
import dollar from "../assets/Dollaricon.png";
import minus from "../assets/minus.png";
import plus from "../assets/plus.png";
import betNow from "../assets/Betnow.png";

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
      {/* <h1 className="text-5xl text-yellow-300 font-extrabold " id="titleText">
        STARBURST
      </h1> */}
      <div id="walletHome" className="mt-1">
        <h1
          className="text-5xl text-yellow-300 font-extrabold mb-5"
          id="titleText"
        >
          STARBURST
        </h1>

        <div className="flex justify-between items-center">
          <div className="flex items-center" id="home-btn">
            {/* <FaHome className=" text-white bg-fuchsia-800 rounded-full text-3xl mx-4 " /> */}
            <img
              className="w-[50px] absolute left-12 top-12"
              src={home}
              id="home-img"
              alt=""
            />
          </div>

          <div className="flex items-center absolute top-12 right-12">
            {/* <HiOutlineCurrencyDollar className="bg-yellow-300 text-yellow-800 text-3xl rounded-full transform skew-x-6 mx-4" /> */}
            <img className="w-[50px] " src={dollar} alt="" />
            <p id="balance" className="pl-2 text-2xl text-white">{`0.06`}</p>
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
          <img src="red.png" alt="" id="play_img" />
          {/* SPIN */}
        </button>

        <div className="flex mr-4 mt-4 bg-blue-gradient rounded">
          <button>
            <img
              src={minus}
              className={`text-red-600 text-3xl w-[32px]  ${
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
            {/* <FaMinusCircle
              className={`text-red-600 text-3xl  ${
                betAmount === 0
                  ? "opacity-50 cursor-not-allowed"
                  : "animate-pulse"
              }`}
              onClick={() => {
                if (betAmount > 0) {
                  setBetAmount(betAmount - 100);
                }
              }}
            /> */}
          </button>
          <ul className="text-center text-white">
            <li className="">
              <img className="w-[96px]" src={betNow} alt="" />
            </li>
            <li>{betAmount}</li>
          </ul>
          <button>
            <img
              src={plus}
              className={`text-green-600 text-3xl w-[32px] ${
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
            {/* <FaPlusCircle
              className={`text-green-600 text-3xl  ${
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
            /> */}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Slot;

// import React, { useState, useEffect, useRef } from "react";
// import Reel from "./Reel";
// import Symbol from "./Symbol";
// import { FaHome } from "react-icons/fa";
// import { HiOutlineCurrencyDollar } from "react-icons/hi";
// import { FaPlusCircle, FaMinusCircle } from "react-icons/fa";
// // import { images } from "./Symbol";

// const Slot = ({ config }) => {
//   const [currentSymbols, setCurrentSymbols] = useState(
//     Array(5).fill(Array(3).fill("img1"))
//   );
//   const [nextSymbols, setNextSymbols] = useState(
//     Array(5).fill(Array(3).fill("img"))
//   );
//   const [isSpinning, setIsSpinning] = useState(false);
//   const [resultMessage, setResultMessage] = useState("");
//   const [betAmount, setBetAmount] = useState(100);

//   const spinButton = useRef(null);

//   useEffect(() => {
//     fetchSymbols();
//   }, []);

//   const fetchSymbols = async () => {
//     try {
//       const response = await fetch(
//         "https://api.pexels.com/v1/curated?page=1&per_page=9"
//       );
//       const data = await response.json();
//       console.log(data);
//       const symbols = data.symbols; // Assuming the API returns a list of symbol names
//       Symbol.setSymbols(symbols);
//       Symbol.preload();
//     } catch (error) {
//       console.error("Failed to fetch symbols:", error);
//     }
//   };

//   const generateRandomSymbols = () => {
//     return Array(5)
//       .fill()
//       .map(() => Array(3).map(() => Symbol.random()));
//   };

//   const onSpinEnd = (newSymbols) => {
//     setCurrentSymbols(newSymbols);
//     setIsSpinning(false);

//     if (config.onSpinEnd) {
//       config.onSpinEnd(newSymbols);
//     }

//     const middleRowSymbols = newSymbols.map((column) => column[1]);
//     const counts = middleRowSymbols.reduce((acc, symbol) => {
//       acc[symbol] = (acc[symbol] || 0) + 1;
//       return acc;
//     }, {});

//     const hasThreeOrMoreMatches = Object.values(counts).some(
//       (count) => count >= 3
//     );

//     if (hasThreeOrMoreMatches) {
//       setResultMessage("You win!");
//     } else {
//       setResultMessage("Play again");
//     }
//   };

//   const spin = () => {
//     setIsSpinning(true);
//     setResultMessage("");

//     const newSymbols = generateRandomSymbols();
//     setNextSymbols(newSymbols);

//     if (config.onSpinStart) {
//       config.onSpinStart(newSymbols);
//     }

//     setTimeout(() => {
//       onSpinEnd(newSymbols);
//     }, 1500);
//   };

//   return (
//     <div id="slot" className={config.inverted ? "inverted" : ""}>
//       <h1 className="text-5xl text-yellow-300 font-extrabold " id="titleText">
//         STARBURST
//       </h1>
//       <div id="walletHome">
// <div className="flex justify-between mt-3 items-center">
//   <div className="flex items-center">
//     <FaHome className=" text-white bg-fuchsia-800 rounded-full text-3xl mx-4 " />
//   </div>
//   <div className="flex items-center">
//     <HiOutlineCurrencyDollar className="bg-yellow-300 text-yellow-800 text-3xl rounded-full transform skew-x-6 mx-4" />
//     <p id="balance" className="pr-2 text-2xl text-white">{`0.06`}</p>
//   </div>
// </div>
//       </div>
//       <div id="reels">
//         {currentSymbols.map((symbols, idx) => (
//           <div className="reel" key={idx}>
//             <Reel
//               idx={idx}
//               initialSymbols={symbols}
//               nextSymbols={nextSymbols[idx]}
//               onSpinEnd={() => onSpinEnd(nextSymbols)}
//             />
//           </div>
//         ))}
//       </div>
//       <div id="controls">
//         <button
//           className="rounded-full text-green-600 box- animate-pulse shadow-[0_0_10px_white]"
//           type="button"
//           id="spin"
//           ref={spinButton}
//           onClick={spin}
//           disabled={isSpinning}
//         >
//           SPIN
//         </button>
// <div className="flex mr-4 bg-blue-gradient rounded">
//   <button>
//     <FaMinusCircle
//       className={`text-red-600 text-3xl  ${
//         betAmount === 0
//           ? "opacity-50 cursor-not-allowed"
//           : "animate-pulse"
//       }`}
//       onClick={() => {
//         if (betAmount > 0) {
//           setBetAmount(betAmount - 100);
//         }
//       }}
//     />
//   </button>
//   <ul className="text-center text-white">
//     <li className="">Total Bet</li>
//     <li>{betAmount}</li>
//   </ul>
//   <button>
//     <FaPlusCircle
//       className={`text-green-600 text-3xl  ${
//         betAmount >= 1000
//           ? "opacity-50 cursor-not-allowed"
//           : "animate-pulse"
//       }`}
//       onClick={() => {
//         if (betAmount < 1000) {
//           setBetAmount(betAmount + 100);
//         }
//       }}
//     />
//   </button>
// </div>
//       </div>
//       <div id="resultMessage" className="text-center mt-4 text-2xl text-white">
//         {resultMessage}
//       </div>
//     </div>
//   );
// };

// export default Slot;

// // Using array of images

// // import React, { useState, useEffect, useRef } from "react";
// // import Reel from "./Reel";
// // import Symbol from "./Symbol";
// // import { FaHome } from "react-icons/fa";
// // import { HiOutlineCurrencyDollar } from "react-icons/hi";
// // import { FaPlusCircle, FaMinusCircle } from "react-icons/fa";

// // const Slot = ({ config }) => {
// //   const [currentSymbols, setCurrentSymbols] = useState(
// //     Array(5).fill(Array(3).fill(0))
// //   );
// //   const [nextSymbols, setNextSymbols] = useState(
// //     Array(5).fill(Array(3).fill(0))
// //   );
// //   const [isSpinning, setIsSpinning] = useState(false);
// //   const [resultMessage, setResultMessage] = useState("");

// //   const [betAmount, setBetAmount] = useState(100);

// //   const spinButton = useRef(null);

// //   useEffect(() => {
// //     Symbol.preload();
// //   }, []);

// //   const generateRandomSymbols = () => {
// //     return Array(5)
// //       .fill()
// //       .map(() => Array(3).map(() => Symbol.randomIndex()));
// //   };

// //   const onSpinEnd = (newSymbols) => {
// //     setCurrentSymbols(newSymbols);
// //     setIsSpinning(false);

// //     if (config.onSpinEnd) {
// //       config.onSpinEnd(newSymbols);
// //     }

// //     const middleRowSymbols = newSymbols.map((column) => column[1]);
// //     const counts = middleRowSymbols.reduce((acc, symbol) => {
// //       acc[symbol] = (acc[symbol] || 0) + 1;
// //       return acc;
// //     }, {});

// //     const hasThreeOrMoreMatches = Object.values(counts).some(
// //       (count) => count >= 3
// //     );

// //     if (hasThreeOrMoreMatches) {
// //       setResultMessage("You win!");
// //     } else {
// //       setResultMessage("Play again");
// //     }
// //   };

// //   const spin = () => {
// //     setIsSpinning(true);
// //     setResultMessage("");

// //     const newSymbols = generateRandomSymbols();
// //     setNextSymbols(newSymbols);

// //     if (config.onSpinStart) {
// //       config.onSpinStart(newSymbols);
// //     }

// //     setTimeout(() => {
// //       onSpinEnd(newSymbols);
// //     }, 10);
// //   };

// //   return (
// //     <div id="slot" className={config.inverted ? "inverted" : ""}>
// //       <h1 className="text-5xl text-yellow-300 font-extrabold " id="titleText">
// //         STARBURST
// //       </h1>
// //       <div id="walletHome" className="mt-1">
// //         <div className="flex justify-between items-center">
// //           <div className="flex items-center">
// //             <FaHome className=" text-white bg-fuchsia-800 rounded-full text-3xl mx-4 " />
// //           </div>
// //           <div className="flex items-center">
// //             <HiOutlineCurrencyDollar className="bg-yellow-300 text-yellow-800 text-3xl rounded-full transform skew-x-6 mx-4" />
// //             <p id="balance" className="pr-2 text-2xl text-white">{`0.06`}</p>
// //           </div>
// //         </div>
// //       </div>
// //       <div id="reels">
// //         {currentSymbols.map((symbols, idx) => (
// //           <div className="reel" key={idx}>
// //             <Reel
// //               idx={idx}
// //               initialSymbols={symbols}
// //               nextSymbols={nextSymbols[idx]}
// //               onSpinEnd={() => onSpinEnd(nextSymbols)}
// //             />
// //           </div>
// //         ))}
// //       </div>
// //       <div id="controls">
// //         <button
// //           className="rounded-full text-green-600 box- animate-pulse shadow-[0_0_10px_white]"
// //           type="button"
// //           id="spin"
// //           ref={spinButton}
// //           onClick={spin}
// //           disabled={isSpinning}
// //         >
// //           SPIN
// //         </button>

// //         <div className="flex mr-4 bg-blue-gradient rounded">
// //           <button>
// //             <FaMinusCircle
// //               className={`text-red-600 text-3xl  ${
// //                 betAmount === 0
// //                   ? "opacity-50 cursor-not-allowed"
// //                   : "animate-pulse"
// //               }`}
// //               onClick={() => {
// //                 if (betAmount > 0) {
// //                   setBetAmount(betAmount - 100);
// //                 }
// //               }}
// //             />
// //           </button>
// //           <ul className="text-center text-white">
// //             <li className="">Total Bet</li>
// //             <li>{betAmount}</li>
// //           </ul>
// //           <button>
// //             <FaPlusCircle
// //               className={`text-green-600 text-3xl  ${
// //                 betAmount >= 1000
// //                   ? "opacity-50 cursor-not-allowed"
// //                   : "animate-pulse"
// //               }`}
// //               onClick={() => {
// //                 if (betAmount < 1000) {
// //                   setBetAmount(betAmount + 100);
// //                 }
// //               }}
// //             />
// //           </button>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // export default Slot;

//fetching data from pexels api

// import React, { useState, useEffect, useRef } from "react";
// import Reel from "./Reel";
// import Symbol from "./Symbol";
// import axios from "axios";
// import { FaHome } from "react-icons/fa";
// import { HiOutlineCurrencyDollar } from "react-icons/hi";
// import { FaPlusCircle, FaMinusCircle } from "react-icons/fa";

// const Slot = ({ config }) => {
//   const [currentSymbols, setCurrentSymbols] = useState(
//     Array(5).fill(Array(3).fill(0))
//   );
//   const [nextSymbols, setNextSymbols] = useState(
//     Array(5).fill(Array(3).fill(0))
//   );
//   const [isSpinning, setIsSpinning] = useState(false);
//   const [resultMessage, setResultMessage] = useState("");
//   const [images, setImages] = useState([]);

//   const [betAmount, setBetAmount] = useState(100);

//   const spinButton = useRef(null);

//   useEffect(() => {
//     const fetchImages = async () => {
//       try {
//         const response = await axios.get("https://api.pexels.com/v1/curated", {
//           headers: {
//             Authorization:
//               "L7HSYiUPWfISUDR7xCCWW6o4RFoBWOmQIFtEIz7n6vqWncUVmtejwmmL",
//           },
//           params: {
//             per_page: 10,
//           },
//         });
//         const imageUrls = response.data.photos.map((photo) => photo.src.medium);
//         setImages(imageUrls);
//         Symbol.preload(imageUrls); // Preload the images for the slot symbols
//       } catch (error) {
//         console.error("Error fetching images from Pexels:", error);
//       }
//     };

//     fetchImages();
//   }, []);

//   const generateRandomSymbols = () => {
//     return Array(5)
//       .fill()
//       .map(() =>
//         Array(3).map(() => images[Math.floor(Math.random() * images.length)])
//       );
//   };

//   const onSpinEnd = (newSymbols) => {
//     setCurrentSymbols(newSymbols);
//     setIsSpinning(false);

//     if (config.onSpinEnd) {
//       config.onSpinEnd(newSymbols);
//     }

//     const middleRowSymbols = newSymbols.map((column) => column[1]);
//     const counts = middleRowSymbols.reduce((acc, symbol) => {
//       acc[symbol] = (acc[symbol] || 0) + 1;
//       return acc;
//     }, {});

//     const hasThreeOrMoreMatches = Object.values(counts).some(
//       (count) => count >= 3
//     );

//     if (hasThreeOrMoreMatches) {
//       setResultMessage("You win!");
//     } else {
//       setResultMessage("Play again");
//     }
//   };

//   const spin = () => {
//     setIsSpinning(true);
//     setResultMessage("");

//     const newSymbols = generateRandomSymbols();
//     setNextSymbols(newSymbols);

//     if (config.onSpinStart) {
//       config.onSpinStart(newSymbols);
//     }

//     setTimeout(() => {
//       onSpinEnd(newSymbols);
//     }, 10);
//   };

//   return (
//     <div id="slot" className={config.inverted ? "inverted" : ""}>
//       <h1 className="text-5xl text-yellow-300 font-extrabold " id="titleText">
//         STARBURST
//       </h1>
//       <div id="walletHome" className="mt-1">
//         <div className="flex justify-between mt-3 items-center">
//           <div className="flex items-center">
//             <FaHome className=" text-white bg-fuchsia-800 rounded-full text-3xl mx-4 " />
//           </div>
//           <div className="flex items-center">
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
//               onSpinEnd={() => onSpinEnd(nextSymbols)}
//             />
//           </div>
//         ))}
//       </div>
//       <div id="controls">
//         <button
//           className="rounded-full text-green-600 box- animate-pulse shadow-[0_0_10px_white]"
//           type="button"
//           id="spin"
//           ref={spinButton}
//           onClick={spin}
//           disabled={isSpinning}
//         >
//           SPIN
//         </button>

//         <div className="flex mr-4 bg-blue-gradient rounded">
//           <button>
//             <FaMinusCircle
//               className={`text-red-600 text-3xl  ${
//                 betAmount === 0
//                   ? "opacity-50 cursor-not-allowed"
//                   : "animate-pulse"
//               }`}
//               onClick={() => {
//                 if (betAmount > 0) {
//                   setBetAmount(betAmount - 100);
//                 }
//               }}
//             />
//           </button>
//           <ul className="text-center text-white">
//             <li className="">Total Bet</li>
//             <li>{betAmount}</li>
//           </ul>
//           <button>
//             <FaPlusCircle
//               className={`text-green-600 text-3xl  ${
//                 betAmount >= 1000
//                   ? "opacity-50 cursor-not-allowed"
//                   : "animate-pulse"
//               }`}
//               onClick={() => {
//                 if (betAmount < 1000) {
//                   setBetAmount(betAmount + 100);
//                 }
//               }}
//             />
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Slot;

// import React, { useState, useEffect, useRef } from "react";
// import Reel from "./Reel";
// import Symbol from "./Symbol";
// import axios from "axios";
// import { FaHome } from "react-icons/fa";
// import { HiOutlineCurrencyDollar } from "react-icons/hi";
// import { FaPlusCircle, FaMinusCircle } from "react-icons/fa";

// const Slot = ({ config }) => {
//   const [currentSymbols, setCurrentSymbols] = useState(
//     Array(5).fill(Array(3).fill(0))
//   );
//   const [nextSymbols, setNextSymbols] = useState(
//     Array(5).fill(Array(3).fill(0))
//   );
//   const [isSpinning, setIsSpinning] = useState(false);
//   const [resultMessage, setResultMessage] = useState("");
//   const [images, setImages] = useState([]);

//   const [betAmount, setBetAmount] = useState(100);

//   const spinButton = useRef(null);

//   useEffect(() => {
//     const fetchImages = async () => {
//       try {
//         const response = await axios.get("https://api.pexels.com/v1/curated", {
//           headers: {
//             Authorization:
//               "L7HSYiUPWfISUDR7xCCWW6o4RFoBWOmQIFtEIz7n6vqWncUVmtejwmmL",
//           },
//           params: {
//             per_page: 10,
//           },
//         });
//         const imageUrls = response.data.photos.map((photo) => photo.src.medium);
//         setImages(imageUrls);
//         Symbol.preload(imageUrls); // Preload the images for the slot symbols
//       } catch (error) {
//         console.error("Error fetching images from Pexels:", error);
//       }
//     };

//     fetchImages();
//   }, []);

//   const generateRandomSymbols = () => {
//     return Array(5)
//       .fill()
//       .map(() => Array(3).map(() => Symbol.random(images)));
//   };

//   const onSpinEnd = (newSymbols) => {
//     setCurrentSymbols(newSymbols);
//     setIsSpinning(false);

//     if (config.onSpinEnd) {
//       config.onSpinEnd(newSymbols);
//     }

//     const middleRowSymbols = newSymbols.map((column) => column[1]);
//     const counts = middleRowSymbols.reduce((acc, symbol) => {
//       acc[symbol] = (acc[symbol] || 0) + 1;
//       return acc;
//     }, {});

//     const hasThreeOrMoreMatches = Object.values(counts).some(
//       (count) => count >= 3
//     );

//     if (hasThreeOrMoreMatches) {
//       setResultMessage("You win!");
//     } else {
//       setResultMessage("Play again");
//     }
//   };

//   const spin = () => {
//     if (!images || images.length === 0) {
//       console.error("Images are not loaded yet");
//       return;
//     }

//     setIsSpinning(true);
//     setResultMessage("");

//     const newSymbols = generateRandomSymbols();
//     setNextSymbols(newSymbols);

//     if (config.onSpinStart) {
//       config.onSpinStart(newSymbols);
//     }

//     setTimeout(() => {
//       onSpinEnd(newSymbols);
//     }, 10);
//   };

//   return (
//     <div id="slot" className={config.inverted ? "inverted" : ""}>
//       <h1 className="text-5xl text-yellow-300 font-extrabold " id="titleText">
//         STARBURST
//       </h1>
//       <div id="walletHome" className="mt-1">
//         <div className="flex justify-between mt-3 items-center">
//           <div className="flex items-center">
//             <FaHome className=" text-white bg-fuchsia-800 rounded-full text-3xl mx-4 " />
//           </div>
//           <div className="flex items-center">
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
//               onSpinEnd={() => onSpinEnd(nextSymbols)}
//               images={images} // Pass images to Reel component
//             />
//           </div>
//         ))}
//       </div>
//       <div id="controls">
//         <button
//           className="rounded-full text-green-600 box- animate-pulse shadow-[0_0_10px_white]"
//           type="button"
//           id="spin"
//           ref={spinButton}
//           onClick={spin}
//           disabled={isSpinning}
//         >
//           SPIN
//         </button>

//         <div className="flex mr-4 bg-blue-gradient rounded">
//           <button>
//             <FaMinusCircle
//               className={`text-red-600 text-3xl  ${
//                 betAmount === 0
//                   ? "opacity-50 cursor-not-allowed"
//                   : "animate-pulse"
//               }`}
//               onClick={() => {
//                 if (betAmount > 0) {
//                   setBetAmount(betAmount - 100);
//                 }
//               }}
//             />
//           </button>
//           <ul className="text-center text-white">
//             <li className="">Total Bet</li>
//             <li>{betAmount}</li>
//           </ul>
//           <button>
//             <FaPlusCircle
//               className={`text-green-600 text-3xl  ${
//                 betAmount >= 1000
//                   ? "opacity-50 cursor-not-allowed"
//                   : "animate-pulse"
//               }`}
//               onClick={() => {
//                 if (betAmount < 1000) {
//                   setBetAmount(betAmount + 100);
//                 }
//               }}
//             />
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Slot;

// import React, { useState, useEffect, useRef } from "react";
// import Reel from "./Reel";
// import Symbol from "./Symbol";
// import axios from "axios";
// import { FaHome } from "react-icons/fa";
// import { HiOutlineCurrencyDollar } from "react-icons/hi";
// import { FaPlusCircle, FaMinusCircle } from "react-icons/fa";

// const Slot = ({ config }) => {
//   const [currentSymbols, setCurrentSymbols] = useState(
//     Array(5).fill(Array(3).fill(null))
//   );
//   const [nextSymbols, setNextSymbols] = useState(
//     Array(5).fill(Array(3).fill(null))
//   );
//   const [isSpinning, setIsSpinning] = useState(false);
//   const [resultMessage, setResultMessage] = useState("");
//   const [betAmount, setBetAmount] = useState(0); // Initialize betAmount state

//   const spinButton = useRef(null);

//   useEffect(() => {
//     const fetchImages = async () => {
//       try {
//         const response = await axios.get("https://api.pexels.com/v1/curated", {
//           headers: {
//             Authorization:
//               "L7HSYiUPWfISUDR7xCCWW6o4RFoBWOmQIFtEIz7n6vqWncUVmtejwmmL",
//           },
//           params: {
//             per_page: 10,
//           },
//         });
//         const imageUrls = response.data.photos.map((photo) => photo.src.medium);
//         Symbol.setImages(imageUrls);
//       } catch (error) {
//         console.error("Error fetching images from Pexels:", error);
//       }
//     };

//     fetchImages();
//   }, []);

//   const generateRandomSymbols = () => {
//     return Array(5)
//       .fill()
//       .map(() => Array(3).map(() => Symbol.random()));
//   };

//   const onSpinEnd = (newSymbols) => {
//     setCurrentSymbols(newSymbols);
//     setIsSpinning(false);

//     if (config.onSpinEnd) {
//       config.onSpinEnd(newSymbols);
//     }

//     const middleRowSymbols = newSymbols.map((column) => column[1]);
//     const counts = middleRowSymbols.reduce((acc, symbol) => {
//       acc[symbol] = (acc[symbol] || 0) + 1;
//       return acc;
//     }, {});

//     const hasThreeOrMoreMatches = Object.values(counts).some(
//       (count) => count >= 3
//     );

//     if (hasThreeOrMoreMatches) {
//       setResultMessage("You win!");
//     } else {
//       setResultMessage("Play again");
//     }
//   };

//   const spin = () => {
//     if (!Symbol.getImages() || Symbol.getImages().length === 0) {
//       console.error("Images are not loaded yet");
//       return;
//     }

//     setIsSpinning(true);
//     setResultMessage("");

//     const newSymbols = generateRandomSymbols();
//     setNextSymbols(newSymbols);

//     if (config.onSpinStart) {
//       config.onSpinStart(newSymbols);
//     }

//     setTimeout(() => {
//       onSpinEnd(newSymbols);
//     }, 10);
//   };

//   return (
//     <div id="slot" className={config.inverted ? "inverted" : ""}>
//       <h1 className="text-5xl text-yellow-300 font-extrabold " id="titleText">
//         STARBURST
//       </h1>
//       <div id="walletHome" className="mt-1">
//         <div className="flex justify-between mt-3 items-center">
//           <div className="flex items-center">
//             <FaHome className=" text-white bg-fuchsia-800 rounded-full text-3xl mx-4 " />
//           </div>
//           <div className="flex items-center">
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
//               onSpinEnd={() => onSpinEnd(nextSymbols)}
//             />
//           </div>
//         ))}
//       </div>
//       <div id="controls">
//         <button
//           className="rounded-full text-green-600 box- animate-pulse shadow-[0_0_10px_white]"
//           type="button"
//           id="spin"
//           ref={spinButton}
//           onClick={spin}
//           disabled={isSpinning}
//         >
//           SPIN
//         </button>

//         <div className="flex mr-4 bg-blue-gradient rounded">
//           <button>
//             <FaMinusCircle
//               className={`text-red-600 text-3xl  ${
//                 betAmount === 0
//                   ? "opacity-50 cursor-not-allowed"
//                   : "animate-pulse"
//               }`}
//               onClick={() => {
//                 if (betAmount > 0) {
//                   setBetAmount(betAmount - 100);
//                 }
//               }}
//             />
//           </button>
//           <ul className="text-center text-white">
//             <li className="">Total Bet</li>
//             <li>{betAmount}</li>
//           </ul>
//           <button>
//             <FaPlusCircle
//               className={`text-green-600 text-3xl  ${
//                 betAmount >= 1000
//                   ? "opacity-50 cursor-not-allowed"
//                   : "animate-pulse"
//               }`}
//               onClick={() => {
//                 if (betAmount < 1000) {
//                   setBetAmount(betAmount + 100);
//                 }
//               }}
//             />
//           </button>
//         </div>
//       </div>
//       {resultMessage && <div className="result-message">{resultMessage}</div>}
//     </div>
//   );
// };

// export default Slot;

// fetching data from pexels api and making slot independent of symbol

// import React, { useState, useEffect, useRef } from "react";
// import Reel from "./Reel";
// import axios from "axios";
// import { FaHome } from "react-icons/fa";
// import { HiOutlineCurrencyDollar } from "react-icons/hi";
// import { FaPlusCircle, FaMinusCircle } from "react-icons/fa";

// const Slot = ({ config }) => {
//   const [currentSymbols, setCurrentSymbols] = useState(
//     Array(5).fill(
//       Array(3).fill(
//         "https://images.pexels.com/photos/24560468/pexels-photo-24560468.jpeg?auto=compress&cs=tinysrgb&dpr=1&fit=crop&h=200&w=280"
//       )
//     )
//   );
//   const [nextSymbols, setNextSymbols] = useState(
//     Array(5).fill(
//       Array(3).fill(
//         "https://images.pexels.com/photos/24029820/pexels-photo-24029820.jpeg?auto=compress&cs=tinysrgb&dpr=1&fit=crop&h=200&w=280"
//       )
//     )
//   );
//   const [isSpinning, setIsSpinning] = useState(false);
//   const [resultMessage, setResultMessage] = useState("");
//   const [betAmount, setBetAmount] = useState(0);
//   const [images, setImages] = useState([]);
//   const [isLoading, setIsLoading] = useState(true);
//   const spinButton = useRef(null);

//   // console.log(images);

//   useEffect(() => {
//     const fetchImages = async () => {
//       try {
//         const response = await axios.get("https://api.pexels.com/v1/curated", {
//           headers: {
//             Authorization:
//               "L7HSYiUPWfISUDR7xCCWW6o4RFoBWOmQIFtEIz7n6vqWncUVmtejwmmL",
//           },
//           params: {
//             per_page: 10,
//           },
//         });
//         const imageUrls = response.data.photos.map((photo) => photo.src.medium);
//         setImages(imageUrls);
//         preloadImages(imageUrls);
//         setIsLoading(false); // Set loading to false once images are loaded
//       } catch (error) {
//         console.error("Error fetching images from Pexels:", error);
//         setIsLoading(false); // Set loading to false even if there is an error
//       }
//     };

//     fetchImages();
//   }, []);

//   const preloadImages = (images) => {
//     images.forEach((url) => {
//       const img = new Image();
//       img.src = url;
//       console.log(`Preloaded image: ${url}`);
//     });
//   };

//   const randomImage = () => {
//     if (images.length === 0) {
//       throw new Error("Images array is undefined or empty");
//     }
//     return images[Math.floor(Math.random() * images.length)];
//   };

//   const generateRandomSymbols = () => {
//     return Array(5)
//       .fill()
//       .map(() => Array(3).map(() => randomImage()));
//   };

//   const onSpinEnd = (newSymbols) => {
//     setCurrentSymbols(newSymbols);
//     setIsSpinning(false);

//     if (config.onSpinEnd) {
//       config.onSpinEnd(newSymbols);
//     }

//     const middleRowSymbols = newSymbols.map((column) => column[1]);
//     const counts = middleRowSymbols.reduce((acc, symbol) => {
//       acc[symbol] = (acc[symbol] || 0) + 1;
//       return acc;
//     }, {});

//     const hasThreeOrMoreMatches = Object.values(counts).some(
//       (count) => count >= 3
//     );

//     if (hasThreeOrMoreMatches) {
//       setResultMessage("You win!");
//     } else {
//       setResultMessage("Play again");
//     }
//   };

//   const spin = () => {
//     if (images.length === 0) {
//       console.error("Images are not loaded yet");
//       return;
//     }

//     setIsSpinning(true);
//     setResultMessage("");

//     const newSymbols = generateRandomSymbols();
//     setNextSymbols(newSymbols);

//     if (config.onSpinStart) {
//       config.onSpinStart(newSymbols);
//     }

//     setTimeout(() => {
//       onSpinEnd(newSymbols);
//     }, 10);
//   };

//   if (isLoading) {
//     return <div>Loading...</div>; // Display loading message while images are being fetched
//   }

//   return (
//     <div id="slot" className={config.inverted ? "inverted" : ""}>
//       <h1 className="text-5xl text-yellow-300 font-extrabold " id="titleText">
//         STARBURST
//       </h1>
//       <div id="walletHome" className="mt-1">
//         <div className="flex justify-between mt-3 items-center">
//           <div className="flex items-center">
//             <FaHome className=" text-white bg-fuchsia-800 rounded-full text-3xl mx-4 " />
//           </div>
//           <div className="flex items-center">
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
//               onSpinEnd={() => onSpinEnd(nextSymbols)}
//               images={images}
//             />
//           </div>
//         ))}
//       </div>
//       <div id="controls">
//         <button
//           className="rounded-full text-green-600 box- animate-pulse shadow-[0_0_10px_white]"
//           type="button"
//           id="spin"
//           ref={spinButton}
//           onClick={spin}
//           disabled={isSpinning}
//         >
//           SPIN
//         </button>

//         <div className="flex mr-4 bg-blue-gradient rounded">
//           <button>
//             <FaMinusCircle
//               className={`text-red-600 text-3xl  ${
//                 betAmount === 0
//                   ? "opacity-50 cursor-not-allowed"
//                   : "animate-pulse"
//               }`}
//               onClick={() => {
//                 if (betAmount > 0) {
//                   setBetAmount(betAmount - 100);
//                 }
//               }}
//             />
//           </button>
//           <ul className="text-center text-white">
//             <li className="">Total Bet</li>
//             <li>{betAmount}</li>
//           </ul>
//           <button>
//             <FaPlusCircle
//               className={`text-green-600 text-3xl  ${
//                 betAmount >= 1000
//                   ? "opacity-50 cursor-not-allowed"
//                   : "animate-pulse"
//               }`}
//               onClick={() => {
//                 if (betAmount < 1000) {
//                   setBetAmount(betAmount + 100);
//                 }
//               }}
//             />
//           </button>
//         </div>
//       </div>
//       {resultMessage && <div className="result-message">{resultMessage}</div>}
//     </div>
//   );
// };

// export default Slot;
