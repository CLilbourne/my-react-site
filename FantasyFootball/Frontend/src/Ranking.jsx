import React, { useState, useEffect } from "react";
import PlayerItem from "./PlayerItem";

import adpData from "./assets/adp.json";
import { BACKEND_URL } from "./shared";
import normalizeName from "./helpers";

function Ranking() {
  const [availablePlayers, setAvailablePlayers] = useState([]);

  // Fetch players + merge ADP, sort by ADP
  useEffect(() => {
    fetch(`${BACKEND_URL}/NflPlayers`)
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        return res.json();
      })
      .then((data) => {
        const merged = data.map((player) => {
          const normalizedPlayerName = normalizeName(player.fullName);
          const adpMatch = adpData.find(
            (adp) => normalizeName(adp.Player) === normalizedPlayerName
          );
          return {
            ...player,
            adp: adpMatch ? parseFloat(adpMatch["AVG"]) : Infinity,
          };
        });
        merged.sort((a, b) => a.adp - b.adp);
        setAvailablePlayers(merged);
      })
      .catch(console.error);
  }, []);

  // Function to move a player up in the list
  const movePlayerUp = (player) => {
    setAvailablePlayers((prevPlayers) => {
      const index = prevPlayers.findIndex((p) => p.id === player.id);
      if (index <= 0) return prevPlayers; // Can't move up the first player
      const newPlayers = [...prevPlayers];
      // Swap with the player above
      [newPlayers[index - 1], newPlayers[index]] = [newPlayers[index], newPlayers[index - 1]];
      return newPlayers;
    });
  };

   const movePlayerDown = (player) => {
    setAvailablePlayers((prevPlayers) => {
      const index = prevPlayers.findIndex((p) => p.id === player.id);
      if (index >= 400) return prevPlayers; // Can't move up the first player
      const newPlayers = [...prevPlayers];
      // Swap with the player above
      [newPlayers[index + 1], newPlayers[index]] = [newPlayers[index], newPlayers[index + 1]];
      return newPlayers;
    });
  };
  return (
    <div>
      <div style={{ display: "flex", gap: 40 }}>
        <div className="draftPlayers" style={{ flex: 1 }}>
          {availablePlayers.length === 0 && <p>Server Down</p>}

          <ul style={{ overflowY: "auto", padding: 0 }}>
            {availablePlayers.map((player, index) => (
                <PlayerItem
                key={player.id}
                player={player}
                index={index + 1} // <-- This will display the number
                primaryButton={{
                    label: "Up",
                    onClick: () => movePlayerUp(player),
                }}
                secondaryButton={{
                    label: "Down",
                    onClick: () => movePlayerDown(player),
                }}
                />
            ))}
            </ul>
        </div>
      </div>
    </div>
  );
}
export default Ranking;