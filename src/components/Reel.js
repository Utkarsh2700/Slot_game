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

// //using images from an array

// // import React, { useEffect, useRef } from "react";
// // import Symbol from "./Symbol";

// // const Reel = ({ idx, initialSymbols, nextSymbols, onSpinEnd }) => {
// //   const symbolContainer = useRef(null);

// //   useEffect(() => {
// //     const container = symbolContainer.current;

// //     const factor = 1 + Math.pow(idx / 2, 2);
// //     const animation = container.animate(
// //       [
// //         { top: "0", filter: "blur(0)" },
// //         { filter: "blur(2px)", offset: 0.5 },
// //         {
// //           top: `calc(${Math.floor(factor) * 10} / 3 * -100% - ${
// //             Math.floor(factor) * 10 * 3
// //           }px)`,
// //           filter: "blur(0)",
// //         },
// //       ],
// //       {
// //         duration: factor * 400,
// //         easing: "ease-in-out",
// //       }
// //     );
// //     animation.cancel();

// //     const renderSymbols = () => {
// //       const fragment = document.createDocumentFragment();
// //       for (let i = 3; i < 3 + Math.floor(factor) * 10; i++) {
// //         const symbolIndex =
// //           i >= 10 * Math.floor(factor) - 2
// //             ? nextSymbols[i - Math.floor(factor) * 10]
// //             : Symbol.randomIndex();
// //         const icon = new Symbol(symbolIndex);
// //         fragment.appendChild(icon.img);
// //       }
// //       container.appendChild(fragment);
// //     };

// //     const spin = () => {
// //       const animationPromise = new Promise(
// //         (resolve) => (animation.onfinish = resolve)
// //       );
// //       const timeoutPromise = new Promise((resolve) =>
// //         setTimeout(resolve, factor * 1000)
// //       );

// //       animation.cancel();
// //       animation.play();

// //       return Promise.race([animationPromise, timeoutPromise]).then(() => {
// //         if (animation.playState !== "finished") animation.finish();

// //         const max = container.children.length - 3;
// //         for (let i = 0; i < max; i++) {
// //           container.firstChild.remove();
// //         }

// //         onSpinEnd();
// //       });
// //     };

// //     renderSymbols();
// //     spin();
// //   }, [nextSymbols, idx, onSpinEnd]);

// //   return <div className="icons" ref={symbolContainer} />;
// // };

// // export default Reel;

//Fetching data from pexels api

// import React, { useEffect, useRef } from "react";
// import Symbol from "./Symbol";

// const Reel = ({ idx, initialSymbols, nextSymbols, onSpinEnd, images }) => {
//   const symbolContainer = useRef(null);

//   useEffect(() => {
//     if (!images || images.length === 0) {
//       console.error("Images array is not available");
//       return;
//     }

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
//         duration: factor * 400,
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
//             : Symbol.random(images)
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
//   }, [nextSymbols, idx, onSpinEnd, images]);

//   return <div className="icons" ref={symbolContainer} />;
// };

// export default Reel;

// import React, { useEffect, useRef } from "react";
// import Symbol from "./Symbol";

// const Reel = ({ idx, initialSymbols, nextSymbols, onSpinEnd }) => {
//   const symbolContainer = useRef(null);

//   useEffect(() => {
//     const images = Symbol.getImages();
//     if (!images || images.length === 0) {
//       console.error("Images array is not available");
//       return;
//     }

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
//         duration: factor * 400,
//         easing: "ease-in-out",
//       }
//     );
//     animation.cancel();

//     const renderSymbols = () => {
//       container.innerHTML = ""; // Clear the container before appending new symbols
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
//   }, [nextSymbols, idx, onSpinEnd]);

//   return <div className="icons" ref={symbolContainer} />;
// };

// export default Reel;

// using api from pexels and making slot independent of symbol
// import React, { useEffect, useRef } from "react";

// const Reel = ({ idx, initialSymbols, nextSymbols, onSpinEnd, images }) => {
//   const symbolContainer = useRef(null);
//   console.log(images);

//   useEffect(() => {
//     if (!images || images.length === 0) {
//       console.error("Images array is not available");
//       return;
//     }

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
//         duration: factor * 400,
//         easing: "ease-in-out",
//       }
//     );
//     animation.cancel();

//     const renderSymbols = (symbols) => {
//       container.innerHTML = ""; // Clear the container before appending new symbols
//       const fragment = document.createDocumentFragment();
//       symbols.forEach((symbol) => {
//         const img = new Image();
//         img.src =
//           "https://images.pexels.com/photos/24560468/pexels-photo-24560468.jpeg?auto=compress&cs=tinysrgb&dpr=1&fit=crop&h=200&w=280";
//         fragment.appendChild(img);
//       });
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

//         renderSymbols(nextSymbols); // Render the final symbols after the spin
//         onSpinEnd();
//       });
//     };

//     renderSymbols(initialSymbols); // Render initial symbols
//     spin();
//   }, [nextSymbols, idx, onSpinEnd, images]);

//   return <div className="icons" ref={symbolContainer} />;
// };

// export default Reel;
