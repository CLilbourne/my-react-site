import React, { useState, useEffect, useCallback } from "react";
import PlayerItem from "./PlayerItem";
import SnakeDraft from "./SnakeDraft";
import adpData from "./assets/adp.json";
import mockdraft from "./assets/mockdraft.png"
import { BACKEND_URL } from "./shared"
import { useLocation, useNavigate } from "react-router-dom";

import {USER_TIMER_DURATION, AI_TIMER_DURATION, NUM_TEAMS, TOTAL_ROUNDS} from "./Global"

import normalizeName from "./helpers";

export default function Draft() {

  const location = useLocation();
  const navigate = useNavigate();

  // ✅ get username from state OR localStorage (needed to load saved rankings)
  const username =
    location.state?.username || JSON.parse(localStorage.getItem("user"))?.name;

  useEffect(() => {
    if (!username) navigate("/login", { replace: true });
  }, [username, navigate]);
  if (!username) return null;

  // ✅ Separate lists:
  //    - adpPlayers: bots draft by ADP
  //    - userPlayers: you draft by your saved ranking
  const [adpPlayers, setAdpPlayers] = useState([]);
  const [userPlayers, setUserPlayers] = useState([]);

  const [teams, setTeams] = useState(Array.from({ length: NUM_TEAMS }, () => []));
  const [draftedPlayers, setDraftedPlayers] = useState([]);
  const [draftPickOrder, setDraftPickOrder] = useState([]);
  const [currentPickIndex, setCurrentPickIndex] = useState(0);
  const [timer, setTimer] = useState(null);
  const [selectedTeam, setSelectedTeam] = useState(0);

  const draftComplete = currentPickIndex >= draftPickOrder.length;

  // ✅ Fetch players + merge ADP + load user's saved rankings to build both lists
  useEffect(() => {
    async function load() {
      try {
        const res = await fetch(`${BACKEND_URL}/NflPlayers`);
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        const data = await res.json();

        // Merge ADP on to each player
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

        // Bots' list: ADP order
        const adpSorted = [...merged].sort((a, b) => a.adp - b.adp);

        // Try to fetch user's saved ranking
        let userSorted = null;
        try {
          const savedRes = await fetch(`${BACKEND_URL}/getRankings/${username}`);
          const savedRankings = await savedRes.json(); // expected: array of player IDs in desired order

          if (Array.isArray(savedRankings) && savedRankings.length > 0) {
            // Put players in user's saved order first
            const ranked = savedRankings
              .map((id) => merged.find((p) => p.id === id))
              .filter(Boolean);
            // Append any players not in saved list at the end (keep ADP among them)
            const remaining = merged
              .filter((p) => !savedRankings.includes(p.id))
              .sort((a, b) => a.adp - b.adp);

            userSorted = [...ranked, ...remaining];
          }
        } catch (e) {
          // If rankings fetch fails, we'll just fall back to ADP
          console.warn("Could not load saved rankings, using ADP for user list.", e);
        }

        setAdpPlayers(adpSorted);
        setUserPlayers(userSorted ?? adpSorted); // fallback to ADP if no saved rankings
      } catch (err) {
        console.error(err);
      }
    }

    load();
  }, [username]);

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

  // ✅ Draft function removes from both lists (keeps lists in sync)
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

      // Remove from both lists
      setAdpPlayers((prev) => prev.filter((p) => p.id !== player.id));
      setUserPlayers((prev) => prev.filter((p) => p.id !== player.id));

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
      // ✅ Bots choose from ADP list only
      if (adpPlayers.length === 0) return;

      const teamIndex = draftPickOrder[currentPickIndex];
      if (teamIndex === undefined) return;

      // Get current team players
      const currentTeamPlayers = teams[teamIndex] || [];

      function needsPosition(position) {
        const posCount = (pos) => currentTeamPlayers.filter((p) => p.position === pos).length;
        const rbCount = posCount("RB");
        const wrCount = posCount("WR");
        const totalRbWr = rbCount + wrCount;
        const qbCount = posCount("QB");
        const teCount = posCount("TE");

        switch (position) {
          case "QB":
            return qbCount < 2 && (qbCount === 0 || Math.random() < 0.01);
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

      // Try randomizing from top 5 upfront (ADP list)
      const top5 = adpPlayers.slice(0, 5);
      const top10 = adpPlayers.slice(0, 10);
      const shuffled = [...top5].sort(() => Math.random() - 0.5);

      // 1. Try top 5 randomized
      let playerToDraft = shuffled.find((p) => needsPosition(p.position));

      // 2. Try top 10, obeying team needs
      if (!playerToDraft) {
        playerToDraft = top10.find((p) => needsPosition(p.position));
      }

      // 3. Try full ADP list, top-to-bottom, obeying team needs
      if (!playerToDraft) {
        playerToDraft = adpPlayers.find((p) => needsPosition(p.position));
      }

      // 4. Desperate fallback
      if (!playerToDraft) {
        console.warn("⚠️ No player fits position needs — falling back.");
        playerToDraft = adpPlayers[0];
      }

      draftPlayer(playerToDraft);
      return;
    }

    // Countdown timer every second
    const interval = setInterval(() => {
      setTimer((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [
    timer,
    draftComplete,
    currentPickIndex,
    draftPickOrder,
    selectedTeam,
    adpPlayers, // ✅ bots use this list
    teams,
    draftPlayer,
  ]);

  // ✅ The list you see is always your ranked order
  const displayPlayers = userPlayers;

  return (
    <div>
      <div style={{ marginBottom: "1rem" }}>
        <h3 style={{ color: "white" }}>⏱️ Time remaining: {timer ?? "-"}s</h3>
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
        <SnakeDraft
          draftedPlayers={draftedPlayers}
          draftOrder={draftPickOrder}
          numTeams={NUM_TEAMS}
        />
        {draftComplete && <p style={{ color: "lightgreen" }}>Draft Complete!</p>}
      </div>

      <div style={{ display: "flex", gap: 40 }}>
        <div className="draftPlayers" style={{ flex: 1 }}>
          {displayPlayers.length === 0 && <p>No players left / Server Down</p>}
          {displayPlayers.length === 0 && <img src={mockdraft} alt="mock draft" />}

          <ul style={{ overflowY: "auto", padding: 0 }}>
            {displayPlayers.map((player) =>
              // ✅ When it's your turn (selectedTeam), you draft from YOUR list
              draftPickOrder[currentPickIndex] === selectedTeam ? (
                <PlayerItem
                  key={player.id}
                  player={player}
                  primaryButton={{
                    label: "Draft",
                    onClick: () => draftPlayer(player),
                  }}
                />
              ) : (
                // ✅ When it's a bot's turn, still show YOUR list (read-only)
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
                    primaryButton={{
                      label: "Drop",
                      onClick: () => {},
                    }}
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