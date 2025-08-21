import React, { useState, useEffect } from "react";
import PlayerItem from "./PlayerItem";
import { useLocation, useNavigate } from "react-router-dom";

import adpData from "./assets/adp.json";
import { BACKEND_URL } from "./shared";
import normalizeName from "./helpers";

function Ranking() {
  const location = useLocation();
  const navigate = useNavigate();
  const username = location.state?.username;
  const [availablePlayers, setAvailablePlayers] = useState([]);
   
  //check username
  useEffect(() => {
    if (!username) {
      navigate("/login", { replace: true });
    }
  }, [username, navigate]);
  if (!username) return null;

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
      if (index >= 950) return prevPlayers; // Can't move up the first player
      const newPlayers = [...prevPlayers];
      // Swap with the player above
      [newPlayers[index + 1], newPlayers[index]] = [newPlayers[index], newPlayers[index + 1]];
      return newPlayers;
    });
  };
  return (
    <div>
      <h1>{username}'s Player Rankings</h1>
    <div style={{ marginBottom: "1rem" }}></div>
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