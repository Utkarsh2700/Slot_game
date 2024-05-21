// import React, { useEffect, useRef } from "react";
// import Symbol from "./Symbol";

// const Reel = ({ idx, initialSymbols, nextSymbols, onSpinEnd }) => {
//   const symbolContainer = useRef(null);

//   useEffect(() => {
//     const container = symbolContainer.current;

//     const factor = 1 + Math.pow(idx / 2, 2);
//     const animation = container.animate(
//       [
//         { top: "0", filter: "blur(0)" },
//         { filter: "blur(2px)", offset: 0.5 },
//         {
//           top: `calc(${Math.floor(factor) * 10} / 3 * -100% - ${
//             Math.floor(factor) * 10 * 3
//           }px)`,
//           filter: "blur(0)",
//         },
//       ],
//       {
//         duration: factor * 1000,
//         easing: "ease-in-out",
//       }
//     );
//     animation.cancel();

//     const renderSymbols = () => {
//       const fragment = document.createDocumentFragment();
//       for (let i = 3; i < 3 + Math.floor(factor) * 10; i++) {
//         const icon = new Symbol(
//           i >= 10 * Math.floor(factor) - 2
//             ? nextSymbols[i - Math.floor(factor) * 10]
//             : Symbol.random()
//         );
//         fragment.appendChild(icon.img);
//       }
//       container.appendChild(fragment);
//     };

//     const spin = () => {
//       const animationPromise = new Promise(
//         (resolve) => (animation.onfinish = resolve)
//       );
//       const timeoutPromise = new Promise((resolve) =>
//         setTimeout(resolve, factor * 1000)
//       );

//       animation.cancel();
//       animation.play();

//       return Promise.race([animationPromise, timeoutPromise]).then(() => {
//         if (animation.playState !== "finished") animation.finish();

//         const max = container.children.length - 3;
//         for (let i = 0; i < max; i++) {
//           container.firstChild.remove();
//         }

//         onSpinEnd();
//       });
//     };

//     renderSymbols();
//     spin();

//     //CHATGPT SMOOTH
//     // Cleanup function to remove children on unmount
//     return () => {
//       while (container.firstChild) {
//         container.removeChild(container.firstChild);
//       }
//     };

//     //CHATGPT SMOOTH
//   }, [nextSymbols, idx, onSpinEnd]);

//   return <div className="icons" ref={symbolContainer} />;
//   console.log(symbolContainer.current);
// };

// export default Reel;

import React, { useEffect, useRef } from "react";
import Symbol from "./Symbol";

const Reel = ({ idx, initialSymbols, nextSymbols, onSpinEnd }) => {
  const symbolContainer = useRef(null);

  useEffect(() => {
    const container = symbolContainer.current;

    const factor = 1 + Math.pow(idx / 2, 2);
    const animation = container.animate(
      [
        { top: "0", filter: "blur(0)" },
        { filter: "blur(2px)", offset: 0.5 },
        {
          top: `calc(${Math.floor(factor) * 10} / 3 * -100% - ${
            Math.floor(factor) * 10 * 3
          }px)`,
          filter: "blur(0)",
        },
      ],
      {
        duration: factor * 400,
        easing: "ease-in-out",
      }
    );
    animation.cancel();

    const renderSymbols = () => {
      const fragment = document.createDocumentFragment();
      for (let i = 3; i < 3 + Math.floor(factor) * 10; i++) {
        const icon = new Symbol(
          i >= 10 * Math.floor(factor) - 2
            ? nextSymbols[i - Math.floor(factor) * 10]
            : Symbol.random()
        );
        fragment.appendChild(icon.img);
      }
      container.appendChild(fragment);
    };

    const spin = () => {
      const animationPromise = new Promise(
        (resolve) => (animation.onfinish = resolve)
      );
      const timeoutPromise = new Promise((resolve) =>
        setTimeout(resolve, factor * 1000)
      );

      animation.cancel();
      animation.play();

      return Promise.race([animationPromise, timeoutPromise]).then(() => {
        if (animation.playState !== "finished") animation.finish();

        const max = container.children.length - 3;
        for (let i = 0; i < max; i++) {
          container.firstChild.remove();
        }

        onSpinEnd();
      });
    };

    renderSymbols();
    spin();
  }, [nextSymbols, idx, onSpinEnd]);

  return <div className="icons" ref={symbolContainer} />;
};

export default Reel;
