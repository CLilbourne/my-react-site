import React, { useState, useEffect } from "react";
import PlayerItem from "./PlayerItem";
import { useLocation, useNavigate } from "react-router-dom";
import adpData from "./assets/adp.json";
import { BACKEND_URL } from "./shared";
import normalizeName from "./helpers";
import "./DraftRoom.css";

import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

function Ranking() {
  const location = useLocation();
  const navigate = useNavigate();

  // ✅ get username from state OR localStorage
  const username =
    location.state?.username || JSON.parse(localStorage.getItem("user"))?.name;

  const [availablePlayers, setAvailablePlayers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterPos, setFilterPos] = useState("ALL");

  // check username
  useEffect(() => {
    if (!username) {
      navigate("/login", { replace: true });
    }
  }, [username, navigate]);
  if (!username) return null;

  // ✅ Load players, then fetch saved rankings if any
  useEffect(() => {
    async function fetchPlayers() {
      try {
        const res = await fetch(`${BACKEND_URL}/NflPlayers`);
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
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

        // ✅ fetch saved rankings from backend
        const savedRes = await fetch(`${BACKEND_URL}/getRankings/${username}`);
        const savedRankings = await savedRes.json();

        if (savedRankings.length > 0) {
          const rankedPlayers = savedRankings
            .map((id) => merged.find((p) => p.id === id))
            .filter(Boolean);
          const remaining = merged.filter(
            (p) => !savedRankings.includes(p.id)
          );
          setAvailablePlayers([...rankedPlayers, ...remaining]);
        } else {
          setAvailablePlayers(merged);
        }
      } catch (err) {
        console.error("Error fetching players:", err);
      }
    }

    fetchPlayers();
  }, [username]);

  // ✅ Save rankings helper
  const saveRankings = (newPlayers) => {
    const rankings = newPlayers.map((p) => p.id);
    fetch(`${BACKEND_URL}/saveRankings`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, rankings }),
    }).catch((err) => console.error("Error saving rankings:", err));
  };

  // ✅ Compute positional ranks dynamically
  const getPlayersWithPositionalRanks = () => {
    const positionCounters = {};
    return availablePlayers.map((player) => {
      const pos = player.position;
      if (!positionCounters[pos]) positionCounters[pos] = 1;
      const rank = positionCounters[pos]++;
      return { ...player, positionRank: `${pos}${rank}` };
    });
  };

  // ✅ Filtering logic
  const filteredPlayers = getPlayersWithPositionalRanks().filter((p) => {
    const matchesSearch = p.fullName
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesPos = filterPos === "ALL" || p.position === filterPos;
    return matchesSearch && matchesPos;
  });

  // ✅ Drag end handler
  const handleDragEnd = (result) => {
    if (!result.destination) return;

    const from = result.source.index;
    const to = result.destination.index;

    const visibleIds = filteredPlayers.map((p) => p.id);
    const vis = Array.from(visibleIds);
    const [movedId] = vis.splice(from, 1);
    vis.splice(to, 0, movedId);

    setAvailablePlayers((prev) => {
      const idToPlayer = new Map(prev.map((p) => [p.id, p]));
      const visSet = new Set(vis);
      let visCursor = 0;

      const merged = prev.map((p) => {
        if (visSet.has(p.id)) {
          const nextId = vis[visCursor++];
          return idToPlayer.get(nextId);
        }
        return p;
      });

      saveRankings(merged);
      return merged;
    });
  };

  return (
    <div>
      <h1>{username}'s Player Rankings</h1>

      {/* Search + Filter Controls */}
      <div style={{ marginBottom: "1rem", display: "flex", gap: "1rem" }}>
        <input
          type="text"
          placeholder="Search by name..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />

        <select
          className="position-select"
          value={filterPos}
          onChange={(e) => setFilterPos(e.target.value)}
        >
          <option value="ALL">All Positions</option>
          <option value="QB">QB</option>
          <option value="RB">RB</option>
          <option value="WR">WR</option>
          <option value="TE">TE</option>
        </select>
      </div>

      {/* Drag & Drop Ranking List */}
      <div style={{ display: "flex", gap: 40 }}>
        <div className="draftPlayers" style={{ flex: 1, paddingTop: 8 }}>
          {filteredPlayers.length === 0 && <p>No players found...</p>}

          <DragDropContext onDragEnd={handleDragEnd}>
            <Droppable droppableId="players" direction="vertical">
              {(provided) => (
                <ul
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                  style={{ padding: 0, listStyle: "none" }}
                >
                  {filteredPlayers.map((player, index) => (
                    <Draggable
                      key={player.id}
                      draggableId={String(player.id)}
                      index={index}
                    >
                      {(provided) => (
                        <li
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          style={{
                            marginBottom: 8,
                            background: "#f9f9f9",
                            borderRadius: 8,
                            boxShadow: "0 1px 3px rgba(0,0,0,0.2)",
                            userSelect: "none",
                            transition: "transform 150ms ease",
                            ...provided.draggableProps.style,
                          }}
                        >
                          <PlayerItem
                            player={player}
                            index={
                              availablePlayers.findIndex(
                                (p) => p.id === player.id
                              ) + 1
                            }
                            positionalRank={player.positionRank}
                            dragHandleProps={provided.dragHandleProps} // 👈 pass handle down
                          />
                        </li>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </ul>
              )}
            </Droppable>
          </DragDropContext>
        </div>
      </div>
    </div>
  );
}

export default Ranking;