// src/components/Card.js
import React from "react";
import { FaHeart, FaSpade, FaDiamond, FaClub } from "react-icons/fa";
import { PiSpadeFill, PiDiamondFill, PiClubFill } from "react-icons/pi";

const suitIcons = {
  hearts: <FaHeart />,
  spades: <PiSpadeFill />,
  diamonds: <PiDiamondFill />,
  clubs: <PiClubFill />,
};

const Card = ({ rank, suit }) => {
  return (
    <div className="card">
      <div className="top-left-suit">{suitIcons[suit]}</div>
      <div className="rank">{rank}</div>
      <div className="bottom-right-suit">{suitIcons[suit]}</div>
    </div>
  );
};

export default Card;
