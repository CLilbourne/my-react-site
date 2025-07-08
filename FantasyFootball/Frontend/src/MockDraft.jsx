import React, { useState, useEffect, useCallback } from "react";
import PlayerItem from "./PlayerItem";
import SnakeDraft from "./SnakeDraft";
import adpData from "./assets/adp.json";
import mockdraft from "./assets/mockdraft.png"
import { BACKEND_URL } from "./shared"
const BACKEND_URL = process.env.REACT_APP_BACKEND_URL || 'https://my-react-site-production.up.railway.app';
// Timer durations in seconds
const USER_TIMER_DURATION = 30;
const AI_TIMER_DURATION = 0;
const NUM_TEAMS = 12;
const TOTAL_ROUNDS = 15;


// Utility to normalize player names for matching
function normalizeName(name) {
  return name
    .toLowerCase()
    .replace(/\s+jr\.?$/i, "")
    .replace(/\./g, "")
    .trim();
}

export default function Draft() {
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

  // Create snake draft order
  useEffect(() => {
    const order = [];
    for (let round = 0; round < TOTAL_ROUNDS; round++) {
      const roundOrder = [...Array(NUM_TEAMS).keys()];
      if (round % 2 === 1) roundOrder.reverse();
      order.push(...roundOrder);
    }
    setDraftPickOrder(order);
  }, []);

  // Draft a player for the current team
  const draftPlayer = useCallback(
    (player) => {
      if (draftComplete) return;

      const teamIndex = draftPickOrder[currentPickIndex];
      if (teamIndex === undefined) return;

      // Add to drafted players (overall)
      setDraftedPlayers((prev) => [...prev, player]);

      // Add player to the correct team
      setTeams((prev) => {
        const newTeams = [...prev];
        newTeams[teamIndex] = [...newTeams[teamIndex], player];
        return newTeams;
      });

      // Remove from available players
      setAvailablePlayers((prev) => prev.filter((p) => p.id !== player.id));

      // Advance pick index
      setCurrentPickIndex((prev) => prev + 1);

      // Reset timer for next pick based on next team's turn
      const nextPick = currentPickIndex + 1;
      if (nextPick >= draftPickOrder.length) {
        setTimer(null);
      } else {
        const nextTeam = draftPickOrder[nextPick];
        setTimer(nextTeam === selectedTeam ? USER_TIMER_DURATION : AI_TIMER_DURATION);
      }
    },
    [currentPickIndex, draftPickOrder, selectedTeam, draftComplete]
  );

  // Timer and auto-draft effect
  useEffect(() => {
    if (draftComplete) return;

    // On pick change or timer reset, set initial timer if null
    if (timer === null) {
      const currentTeam = draftPickOrder[currentPickIndex];
      setTimer(currentTeam === selectedTeam ? USER_TIMER_DURATION : AI_TIMER_DURATION);
      return;
    }

    // Auto draft if timer hits zero
    if (timer <= 0) {
  if (availablePlayers.length === 0) return;

  const teamIndex = draftPickOrder[currentPickIndex];
  if (teamIndex === undefined) return;

  // Get current team players
  const currentTeamPlayers = teams[teamIndex] || [];
  
function needsPosition(position) {
  const posCount = (pos) => currentTeamPlayers.filter(p => p.position === pos).length;
  const rbCount = posCount("RB");
  const wrCount = posCount("WR");
  const totalRbWr = rbCount + wrCount;
  const qbCount = posCount("QB");
  const teCount = posCount("TE");

  switch (position) {
    case "QB":
      return qbCount < 2 && (qbCount === 0 || Math.random() < 0.01); // max 2, lower chance for 2nd QB
    case "RB":
      return rbCount < 3 || (totalRbWr < 10 && wrCount >= 2);
    case "WR":
      return wrCount < 3 || (totalRbWr < 10 && rbCount >= 2);
    case "TE":
      return teCount < 2 && (teCount === 0 || Math.random() < 0.01);
    case "PK":
      return posCount("PK") === 0;
    case "DEF":
      return posCount("DEF") === 0;
    default:
      return true;
  }
}

// Try randomizing from top 5 upfront
const top5 = availablePlayers.slice(0, 5);
const top10 = availablePlayers.slice(0, 10);
const shuffled = top5.sort(() => Math.random() - 0.5);

// 1. Try top 5 randomized
let playerToDraft = shuffled.find(p => needsPosition(p.position));

// 2. Try top 10, obeying team needs
if (!playerToDraft) {
  playerToDraft = top10.find(p => needsPosition(p.position));
}

// 3. Try full list, top-to-bottom, obeying team needs
if (!playerToDraft) {
  playerToDraft = availablePlayers.find(p => needsPosition(p.position));
}

// 4. Desperate fallback (only if all else fails)
if (!playerToDraft) {
  console.warn("⚠️ No player fits position needs — falling back.");
  playerToDraft = availablePlayers[0]; // or null-check if needed
}

draftPlayer(playerToDraft);

  return;
}
    // Countdown timer every second
    const interval = setInterval(() => {
      setTimer((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [timer, draftComplete, currentPickIndex, draftPickOrder, selectedTeam, availablePlayers, draftPlayer]);

  return (
    <div>
      <div style={{ marginBottom: "1rem" }}>
        <h3 style={{ color: "white" }}>⏱️ Time remaining: {timer ?? "-" }s</h3>
         <label style={{ color: "white" }}>
          Select your team slot:{" "}
          <select
            value={selectedTeam}
            onChange={(e) => setSelectedTeam(Number(e.target.value))}
            style={{ marginLeft: 8 }}
          >
            {[...Array(NUM_TEAMS).keys()].map((team) => (
              <option key={team} value={team}>
                Team {team + 1}
              </option>
            ))}
          </select>
        </label>
        <SnakeDraft draftedPlayers={draftedPlayers} draftOrder={draftPickOrder} numTeams={NUM_TEAMS} />
        {draftComplete && <p style={{ color: "lightgreen" }}>Draft Complete!</p>}

      </div>

      <div style={{ display: "flex", gap: 40 }}>

        <div className="draftPlayers" style={{ flex: 1 }}>

          {availablePlayers.length === 0 && <p>No players left / Server Down</p>}
          {availablePlayers.length === 0 && <img src={mockdraft}></img>}
          <input type="text" placeholder="Search by name..." ></input>
           <select>
            <option value="">All Positions</option>
            <option value="QB">QB</option>
            <option value="RB">RB</option>
            <option value="WR">WR</option>
            <option value="TE">TE</option>
            <option value="DEF">DEF</option>
            <option value="K">K</option>
          </select>
          
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