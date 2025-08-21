import React, { useState, useEffect } from "react";
import PlayerItem from "./PlayerItem";
import { BACKEND_URL } from "./shared";
import adpData from "./assets/adp.json";
import normalizeName from "./helpers";
import { useLocation, useNavigate } from "react-router-dom";

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

        merged.sort((a, b) => a.adp - b.adp);
        setPlayers(merged);
      } catch (err) {
        console.error("Error fetching players:", err);
      }
    }

    fetchPlayers();
  }, []);

  // Filtering logic
  const filteredPlayers = players.filter((p) => {
    const matchesSearch = p.fullName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesPos = filterPos === "ALL" || p.position === filterPos;
    return matchesSearch && matchesPos;
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
        />

        <select value={filterPos} onChange={(e) => setFilterPos(e.target.value)}>
          <option value="ALL">All Positions</option>
          <option value="QB">QB</option>
          <option value="RB">RB</option>
          <option value="WR">WR</option>
          <option value="TE">TE</option>
        </select>
      </div>

      {/* Player List */}
      <ul style={{ listStyle: "none", padding: 0 }}>
        {filteredPlayers.map((player, index) => (
          <PlayerItem
            key={player.id}
            index={index + 1} // global rank
            player={player}
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
