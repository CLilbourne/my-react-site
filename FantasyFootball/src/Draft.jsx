import React, { useState, useEffect } from "react";
import PlayerItem from "./PlayerItem";
import SnakeDraft from "./SnakeDraft";
import adpData from './assets/adp.json'; // make sure path is correct
export default function Draft() {

  const [availablePlayers, setAvailablePlayers] = useState([]); //Draft
  const [myTeam, setMyTeam] = useState([]); //Team Storage
  const [timer, setTimer] = useState(30); //Counter on Time
  const [snakeDraft, setSnakeDraft] = useState([]); //Snake Draft Function

function normalize(name) { // ADP - ESPN DATA
  return name.toLowerCase().replace(/\s+jr\.?$/i, '').replace(/\./g, '').trim();
}

useEffect(() => { //Pulls ESPN Players from MongoDB
  fetch("http://localhost:3001/NflPlayers")
    .then((res) => {
      if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
      return res.json();
    })
    .then((data) => {
      // Merge ADP data and MongoDB
      const merged = data.map(player => {
      const normalizedPlayerName = normalize(player.fullName);
      const adpMatch = adpData.find(adp => normalize(adp.Player) === normalizedPlayerName);
        return {
          ...player,
          adp: adpMatch ? parseFloat(adpMatch['AVG']) : Infinity,
        };
      });
       merged.sort((a, b) => a.adp - b.adp); //Sorts by ADP Fantasy Pros
      setAvailablePlayers(merged);
    })
    .catch(console.error);
}, []);

  // Timer and auto-pick logic (same as before)
  useEffect(() => {
    if (timer <= 0) {
      if (availablePlayers.length > 0) {
        draftPlayer(availablePlayers[0]);
      }
      return;
    }
    const interval = setInterval(() => {
      setTimer((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [timer, availablePlayers]);

  function draftPlayer(player) { //Draft Player Button
    setSnakeDraft((draft) => [...draft, player]);
    setMyTeam((team) => [...team, player]);
    setAvailablePlayers((players) => players.filter((p) => p.id !== player.id));
    setTimer(30);
  }

  function dropPlayer(player) { //Drop Player Button
    setMyTeam((team) => team.filter((p) => p.id !== player.id));
    setAvailablePlayers((players) => [...players, player]);
  }

  return (
    <div>
      <div style={{ marginBottom: "1rem" }}>
        <SnakeDraft draftedPlayers={snakeDraft} numTeams={12} />
        <h3>⏱️ Time remaining: {timer}s</h3>
      </div>

      <div style={{ display: "flex", gap: 40 }}>
        <div className="draftPlayers">
          <h3 style={{ color: "white" }}>Available Players</h3>
          {availablePlayers.length === 0 && <p>No players left!</p>}
          <ul>
            {availablePlayers.map((player) => (
              <PlayerItem
                key={player.id}
                player={player}
                buttonLabel="Draft"
                onButtonClick={draftPlayer}
              />
            ))}
          </ul>
        </div>

        <div>
          <h3>My Team</h3>
          {myTeam.length === 0 && <p>You haven't drafted any players yet.</p>}
          <ul>
            {myTeam.map((player) => (
              <PlayerItem
                key={player.id}
                player={player}
                buttonLabel="Drop"
                onButtonClick={dropPlayer}
              />
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}