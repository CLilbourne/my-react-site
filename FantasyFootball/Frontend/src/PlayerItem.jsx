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
      {/* Primary Button */}
      {primaryButton && (
        <button
          onClick={() => primaryButton.onClick(player)}
          style={{ marginLeft: "auto" }}
        >
          {primaryButton.label}
        </button>
      )}
      {/* Secondary Button */}
      {secondaryButton && (
        <button
          onClick={() => secondaryButton.onClick(player)}
          style={{ marginLeft: "5px" }}
        >
          {secondaryButton.label}
        </button>
      )}
    </li>
  );
}

export default PlayerItem;