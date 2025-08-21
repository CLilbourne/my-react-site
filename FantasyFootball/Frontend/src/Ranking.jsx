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
  const [teams, setTeams] = useState(Array.from({ length: NUM_TEAMS }, () => []));
  const [draftedPlayers, setDraftedPlayers] = useState([]);
  const [draftPickOrder, setDraftPickOrder] = useState([]);
  const [currentPickIndex, setCurrentPickIndex] = useState(0);
  const [timer, setTimer] = useState(null);
  const [selectedTeam, setSelectedTeam] = useState(0);

  // Whether draft is complete
  const draftComplete = currentPickIndex >= draftPickOrder.length;

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

          {availablePlayers.length === 0 && <p>No players left / Server Down</p>}
          {availablePlayers.length === 0 && <img src={mockdraft}></img>}
          
          <ul style={{overflowY: "auto", padding: 0}}>
            {availablePlayers.map((player) =>
              draftPickOrder[currentPickIndex] === selectedTeam ? (
                <PlayerItem
                  key={player.id}
                  player={player}
                  buttonLabel="Draft"
                  onButtonClick={() => draftPlayer(player)}
                />
              ) : (
                <PlayerItem key={player.id} player={player} />
              )
            )}
          </ul>
        </div>

        <div style={{ flex: 1 }}>
          <h3 style={{ color: "white" }}>All Teams</h3>
          {teams.map((team, i) => (
            <div key={i} style={{ marginBottom: "1rem" }}>
              <strong style={{ color: "white" }}>Team {i + 1}</strong>
              <ul style={{ padding: 0 }}>
                {team.map((player) => (
                  <PlayerItem
                    key={player.id}
                    player={player}
                    buttonLabel="Drafted"
                    onButtonClick={() => {}}
                  />
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
export default Ranking;