import React from "react";
import "./Draft.css"; // Optional styles

function PlayerItem({ player, buttonLabel, onButtonClick }) {
  return (
    <li className="player-card" style={{ display: "flex", alignItems: "center", gap: "10px" }}>
      <img
        src={player.headshot}
        alt={player.fullName}
      />
      <div>
        <span style={{ fontWeight: "bold" }}>{player.fullName}</span>{" "}
        <span style={{ color: "#bbb", fontSize: "0.9em" }}>
          ({player.position}) - {player.team}
        </span>
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