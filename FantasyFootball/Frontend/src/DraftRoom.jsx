import React, { useState, useEffect } from "react";
import PlayerItem from "./PlayerItem";
import { BACKEND_URL } from "./shared";
import adpData from "./assets/adp.json";
import normalizeName from "./helpers";
import { useLocation, useNavigate } from "react-router-dom";
import "./DraftRoom.css"

function DraftRoom() {
    const location = useLocation();
    const navigate = useNavigate();
    
        // ✅ get username from state OR localStorage
    const username = location.state?.username || JSON.parse(localStorage.getItem("user"))?.name;
  useEffect(() => {
      if (!username) {
        navigate("/login", { replace: true });
      }
    }, [username, navigate]);
    if (!username) return null;

  const [players, setPlayers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterPos, setFilterPos] = useState("ALL");
  const [status, setStatus] = useState({});
  const [showGone, setShowGone] = useState(true); // default: show all 
  // status = { playerId: "gone" | "got" }

    useEffect(() => {
    async function fetchPlayers() {
        try {
        const res = await fetch(`${BACKEND_URL}/NflPlayers`);
        const data = await res.json();

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

        // ✅ fetch user's saved rankings
        const savedRes = await fetch(`${BACKEND_URL}/getRankings/${username}`);
        const savedRankings = await savedRes.json();

        if (savedRankings.length > 0) {
            // reorder players according to saved rankings (IDs in order)
            const rankedPlayers = savedRankings
            .map((id) => merged.find((p) => p.id === id))
            .filter(Boolean);
            // add any new players not in saved list at the end
            const remaining = merged.filter((p) => !savedRankings.includes(p.id));
            setPlayers([...rankedPlayers, ...remaining]);
        } else {
            // fallback to ADP order if no saved ranking
            merged.sort((a, b) => a.adp - b.adp);
            setPlayers(merged);
        }
        } catch (err) {
        console.error("Error fetching players:", err);
        }
    }

    fetchPlayers();
    }, [username]);
    
  const getPlayersWithPositionalRanks = (playerList) => {
  const positionCounters = {};
  return playerList.map((player) => {
    const pos = player.position;
    if (!positionCounters[pos]) positionCounters[pos] = 1;
    const rank = positionCounters[pos]++;
    return { ...player, positionRank: `${pos}${rank}` };
  });
};
  // Filtering logic
  const filteredPlayers = getPlayersWithPositionalRanks(players)
  .filter((p) => {
    const matchesSearch = p.fullName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesPos = filterPos === "ALL" || p.position === filterPos;
    const matchesGone = showGone || status[p.id] !== "gone"; // ✅ hide gone if needed
    return matchesSearch && matchesPos && matchesGone;
  });

  // Button actions
  const markGone = (player) => {
    setStatus((prev) => ({ ...prev, [player.id]: "gone" }));
  };

  const markGot = (player) => {
    setStatus((prev) => ({ ...prev, [player.id]: "got" }));
  };

  return (
    <div>
      <h1>{username}'s Draft Room</h1>

      {/* Search + Filter Controls */}
      <div style={{ marginBottom: "1rem", display: "flex", gap: "1rem" }}>
        <input
          type="text"
          placeholder="Search by name..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />

        <select  className="position-select" value={filterPos} onChange={(e) => setFilterPos(e.target.value)}>
          <option value="ALL">All Positions</option>
          <option value="QB">QB</option>
          <option value="RB">RB</option>
          <option value="WR">WR</option>
          <option value="TE">TE</option>
        </select>
      </div>
      <label>
          Show Gone Players: 
          <select
            value={showGone ? "yes" : "no"}
            onChange={(e) => setShowGone(e.target.value === "yes")}
          >
            <option value="yes">Yes</option>
            <option value="no">No</option>
          </select>
        </label>

      {/* Player List */}
      <ul style={{ listStyle: "none", padding: 0 }}>
        {filteredPlayers.map((player, index) => (
          <PlayerItem
            key={player.id}
            index={players.findIndex((p) => p.id === player.id) + 1}// global rank
            player={player}
            positionalRank={player.positionRank}
            primaryButton={{
              label: "Gone",
              onClick: () => markGone(player),
            }}
            secondaryButton={{
              label: "Got",
              onClick: () => markGot(player),
            }}
            status={status[player.id]} // <-- NEW
          />
        ))}
      </ul>
    </div>
  );
}

export default DraftRoom;
