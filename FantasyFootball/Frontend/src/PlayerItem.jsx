import React from "react";
import "./Draft.css";
import {positionColors} from "./playerData";
import { GripVertical } from "lucide-react"; // ✅ simple drag icon

function PlayerItem({ player, index, primaryButton, secondaryButton, status, dragHandleProps }){
  let background = "rgb(28, 43, 70)"
  if (status === "gone") background = "#ff5353ff"; // light red
  if (status === "got") background = "#5bfa5bff"; // light green
  return (
    <li
      className="player-card"
      style={{ display: "flex", alignItems: "center", background}}
    >
       {/* Drag Handle */}
      {typeof dragHandleProps === true && (
        <span
        {...dragHandleProps}
        style={{
          cursor: "grab",
          display: "flex",
          alignItems: "center",
          padding: "0 8px",
        }}
      >
        <GripVertical size={18} color="#ccc" />
      </span>
      )}

      {/* Global rank number before the photo */}
      {typeof index === "number" && (
        <span
          style={{
            width: "30px",
            fontWeight: "bold",
            textAlign: "center",
          }}
        >
          {index}.
        </span>
      )}

      {/* Player headshot */}
      <img src={player.headshot} alt={player.fullName} />

      <div>
        {/* Player Name */}
        <span style={{ fontWeight: "bold" }}>{player.fullName}</span>{" "}
        <span style={{ color: "#bbb", fontSize: "0.9em" }}>
          ({player.position}) - {player.team}
        </span>
        <br />
        {/* ✅ Position-specific ranking (ex: WR3, RB7) */}
        {player.positionRank && (
          <span style={{
              color: positionColors[player.position.toLowerCase()] || "#29354e",
              fontSize: "0.85em",
              fontWeight: "bold",
            }}
          >
            {player.positionRank}
          </span>
        )}
      </div>

      {/* Buttons */}
      {primaryButton && (
        <button
          onClick={() => primaryButton.onClick(player)}
          style={{ marginLeft: "auto" }}
        >
          {primaryButton.label}
        </button>
      )}
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