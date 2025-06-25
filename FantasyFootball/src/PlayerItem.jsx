import React from "react";
import "./Draft.css"; // Optional styles

function PlayerItem({ player, buttonLabel, onButtonClick }) {
  return (
    <li className="player-card" style={{ display: "flex", alignItems: "center", gap: "10px" }}>
      <img
        src={player.headshot}
        alt={player.fullName}
        style={{ width: 80, height: 58 }}
      />
      <div>
        {player.fullName} ({player.position}) - {player.team}
      </div>
      {buttonLabel && onButtonClick && (
        <button onClick={() => onButtonClick(player)} style={{ marginLeft: "auto" }}>
          {buttonLabel}
        </button>
      )}
    </li>
  );
}

export default PlayerItem;