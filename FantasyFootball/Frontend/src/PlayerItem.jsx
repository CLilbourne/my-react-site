import React from "react";
import "./Draft.css";

function PlayerItem({ player, index, primaryButton, secondaryButton }) {
  return (
    <li
      className="player-card"
      style={{ display: "flex", alignItems: "center", gap: "10px" }}
    >
      {/* Number before the photo */}
      <span style={{ width: "30px", fontWeight: "bold", textAlign: "center" }}>
        {index}.
      </span>

      <img src={player.headshot} alt={player.fullName} />
      <div>
        <span style={{ fontWeight: "bold" }}>{player.fullName}</span>{" "}
        <span style={{ color: "#bbb", fontSize: "0.9em" }}>
          ({player.position}) - {player.team}
        </span>
      </div>

      {primaryButton && (
        <button onClick={() => primaryButton.onClick(player)} style={{ marginLeft: "auto" }}>
          {primaryButton.label}
        </button>
      )}
      {secondaryButton && (
        <button onClick={() => secondaryButton.onClick(player)} style={{ marginLeft: "5px" }}>
          {secondaryButton.label}
        </button>
      )}
    </li>
  );
}

export default PlayerItem;