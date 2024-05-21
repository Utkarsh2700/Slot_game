import React from "react";

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
      this.img.src = require(`../assets/graphics/${name}.png`);
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
