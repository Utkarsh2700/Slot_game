import React, { useState, useEffect, useRef } from 'react';
import Reel from './Reel';
import Symbol from './Symbol';

const Slot = ({ config }) => {
  const [currentSymbols, setCurrentSymbols] = useState(Array(5).fill(Array(3).fill('death_star')));
  const [nextSymbols, setNextSymbols] = useState(Array(5).fill(Array(3).fill('death_star')));
  const [isSpinning, setIsSpinning] = useState(false);

  const spinButton = useRef(null);
  const autoPlayCheckbox = useRef(null);

  useEffect(() => {
    Symbol.preload();
  }, []);

  const spin = () => {
    setIsSpinning(true);
    const newSymbols = Array(5).fill().map(() => Array(3).map(() => Symbol.random()));
    setNextSymbols(newSymbols);

    if (config.onSpinStart) {
      config.onSpinStart(newSymbols);
    }
  };

  const onSpinEnd = () => {
    setIsSpinning(false);
    setCurrentSymbols(nextSymbols);

    if (config.onSpinEnd) {
      config.onSpinEnd(nextSymbols);
    }

    if (autoPlayCheckbox.current.checked) {
      setTimeout(spin, 200);
    }
  };

  return (
    <div id="slot" className={config.inverted ? 'inverted' : ''}>
      <div id="jackpot">
        Jackpot: <span id="jp">5.555.555</span>
      </div>
      <div id="reels">
        {currentSymbols.map((symbols, idx) => (
          <div className="reel" key={idx}>
            <Reel idx={idx} initialSymbols={symbols} nextSymbols={nextSymbols[idx]} onSpinEnd={onSpinEnd} />
          </div>
        ))}
      </div>
      <div id="controls">
        <button type="button" id="spin" ref={spinButton} onClick={spin} disabled={isSpinning}>
          SPIN
        </button>
        <label>
          <input type="checkbox" name="autoplay" id="autoplay" ref={autoPlayCheckbox} />
          Autoplay
        </label>
      </div>
    </div>
  );
};

export default Slot;
