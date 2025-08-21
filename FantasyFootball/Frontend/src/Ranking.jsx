import React, { useState, useEffect, useCallback } from "react";
import PlayerItem from "./PlayerItem";

import adpData from "./assets/adp.json";
import mockdraft from "./assets/mockdraft.png"
import { BACKEND_URL } from "./shared"
import {USER_TIMER_DURATION, AI_TIMER_DURATION, NUM_TEAMS, TOTAL_ROUNDS} from "./Global"
import normalizeName from "./helpers"


function Ranking() {
   // State declarations
  const [availablePlayers, setAvailablePlayers] = useState([]);
  const [draftPickOrder, setDraftPickOrder] = useState([]);
  const [currentPickIndex, setCurrentPickIndex] = useState(0);
  const [selectedTeam, setSelectedTeam] = useState(0);


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


  return (
    <div>
      <div style={{ display: "flex", gap: 40 }}>

        <div className="draftPlayers" style={{ flex: 1 }}>

          {availablePlayers.length === 0 && <p> Server Down</p>}
          
          <ul style={{overflowY: "auto", padding: 0}}>
            {availablePlayers.map((player) =>
                <PlayerItem
                  key={player.id}
                  player={player}
                  buttonLabel="Draft"
                  onButtonClick={() => draftPlayer(player)}
                />
            )}
          </ul>
        </div>
      </div>
    </div>
  );
}
export default Ranking;