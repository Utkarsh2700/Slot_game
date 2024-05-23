import React from "react";
// import img1 from "../../public/ICONS/";
// Cache to store already created image elements
const cache = {};

class Symbol {
  constructor(name = Symbol.random()) {
    if (!name || !Symbol.symbols.includes(name)) {
      throw new Error(`Invalid symbol name: ${name}`);
    }

    this.name = name;

    // Check cache first to avoid creating multiple Image elements for the same symbol
    if (cache[name]) {
      this.img = cache[name].cloneNode();
    } else {
      console.log(name, "name");

      this.img = new Image();
      // this.img.src = require(`../assets/symbols/${name}.svg`);
      // this.img.src = require(`../assets/images/${name}.jpg`);
      // this.img.src = require(`../assets/graphics/${name}.png`);
      this.img.src = require(`../../public/ICONS/${name}.png`);
      this.img.src = require(`../../public/icons 12/${name}.png`);
      cache[name] = this.img;
    }
  }

  static preload() {
    Symbol.symbols.forEach((symbol) => new Symbol(symbol));
  }

  static get symbols() {
    // return [
    //   "at_at",
    //   "c3po",
    //   "darth_vader",
    //   "death_star",
    //   "falcon",
    //   "r2d2",
    //   "stormtrooper",
    //   "tie_ln",
    //   "yoda",
    // ];
    // return [
    //   "7",
    //   "banana",
    //   "bar",
    //   "berry",
    //   "bigwin",
    //   "blue",
    //   "dollar",
    //   "lemon",
    //   "melon",
    // ];

    return ["1", "2", "3", "4", "5", "1", "2", "3", "4", "5"];
  }

  static random() {
    const symbols = this.symbols;
    return symbols[Math.floor(Math.random() * symbols.length)];
  }
}

export default Symbol;

// import React from "react";
// import { createClient } from "pexels";

// // All requests made with the client will be authenticated
// const client = createClient(
//   "L7HSYiUPWfISUDR7xCCWW6o4RFoBWOmQIFtEIz7n6vqWncUVmtejwmmL"
// );

// // Cache to store already created image elements
// const cache = {};

// class Symbol {
//   constructor(name = Symbol.random()) {
//     if (!name || !Symbol.symbols.includes(name)) {
//       throw new Error(`Invalid symbol name: ${name}`);
//       console.log(name, "name");
//     }

//     this.name = name;

//     // Check cache first to avoid creating multiple Image elements for the same symbol
//     if (cache[name]) {
//       this.img = cache[name].cloneNode();
//     } else {
//       // console.log(name, "name");

//       this.img = new Image();
//       this.img.src = Symbol.getUrl(name); // Get the URL dynamically
//       cache[name] = this.img;
//     }
//   }

//   static preload() {
//     Symbol.symbols.forEach((symbol) => new Symbol(symbol));
//   }

//   static get symbols() {
//     return ["1", "2", "3", "4", "5", "1", "2", "3", "4", "5"];
//   }

//   static random() {
//     const symbols = this.symbols;
//     return symbols[Math.floor(Math.random() * symbols.length)];
//   }

//   static setSymbols(symbols) {
//     Symbol.symbols = symbols;
//   }

//   static getUrl(name) {
//     return `https://api.pexels.com/v1/curated?page=1&per_page=9`; // Replace with your actual API URL
//   }
// }

// export default Symbol;

// // // GET
// // // https://your-api.com/path/to/images/${name}.png

// //getting image from array

// // import img1 from "../assets/graphics/1.png";
// // import img2 from "../assets/graphics/2.png";
// // import img3 from "../assets/graphics/3.png";
// // import img4 from "../assets/graphics/4.png";
// // import img5 from "../assets/graphics/5.png";

// // export const images = [img1, img2, img3, img4, img5];

// // const cache = {};

// // class Symbol {
// //   constructor(index = Symbol.randomIndex()) {
// //     if (index < 0 || index >= images.length) {
// //       throw new Error(`Invalid symbol index: ${index}`);
// //     }

// //     this.index = index;

// //     // Check cache first to avoid creating multiple Image elements for the same symbol
// //     if (cache[index]) {
// //       this.img = cache[index].cloneNode();
// //     } else {
// //       this.img = new Image();
// //       this.img.src = images[index]; // Use the image from the array
// //       cache[index] = this.img;
// //     }
// //   }

// //   static preload() {
// //     Symbol.symbols.forEach((_, index) => new Symbol(index));
// //   }

// //   static get symbols() {
// //     return images;
// //   }

// //   static randomIndex() {
// //     return Math.floor(Math.random() * images.length);
// //   }

// //   static setSymbols(newImages) {
// //     Symbol.symbols = newImages;
// //   }
// // }

// // export default Symbol;

// fetching images from pexels api

// class Symbol {
//   constructor(url) {
//     this.url = url;

//     if (Symbol.cache[url]) {
//       this.img = Symbol.cache[url].cloneNode();
//     } else {
//       this.img = new Image();
//       this.img.src = url;
//       Symbol.cache[url] = this.img;
//     }
//   }

//   static preload(images) {
//     images.forEach((url) => new Symbol(url));
//   }

//   static random() {
//     if (!Symbol.images || Symbol.images.length === 0) {
//       throw new Error("Images array is undefined or empty");
//     }
//     return Symbol.images[Math.floor(Math.random() * Symbol.images.length)];
//   }

//   static setImages(images) {
//     Symbol.images = images;
//     Symbol.preload(images);
//   }

//   static getImages() {
//     return Symbol.images;
//   }
// }

// Symbol.cache = {};
// Symbol.images = [];

// export default Symbol;
