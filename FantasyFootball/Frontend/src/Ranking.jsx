import React, { useState, useEffect } from "react";
import PlayerItem from "./PlayerItem";
import { useLocation, useNavigate } from "react-router-dom";
import adpData from "./assets/adp.json";
import { BACKEND_URL } from "./shared";
import normalizeName from "./helpers";
import "./DraftRoom.css";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";

function Ranking() {
  const location = useLocation();
  const navigate = useNavigate();

  const username =
    location.state?.username || JSON.parse(localStorage.getItem("user"))?.name;

  const [availablePlayers, setAvailablePlayers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterPos, setFilterPos] = useState("ALL");

  useEffect(() => {
    if (!username) navigate("/login", { replace: true });
  }, [username, navigate]);
  if (!username) return null;

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

        const savedRes = await fetch(`${BACKEND_URL}/getRankings/${username}`);
        const savedRankings = await savedRes.json();

        if (savedRankings.length > 0) {
          const rankedPlayers = savedRankings
            .map((id) => merged.find((p) => p.id === id))
            .filter(Boolean);
          const remaining = merged.filter((p) => !savedRankings.includes(p.id));
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

  const saveRankings = (newPlayers) => {
    const rankings = newPlayers.map((p) => p.id);
    fetch(`${BACKEND_URL}/saveRankings`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, rankings }),
    }).catch((err) => console.error("Error saving rankings:", err));
  };

  const handleOnDragEnd = (result) => {
    if (!result.destination) return;
    const newPlayers = Array.from(availablePlayers);
    const [reordered] = newPlayers.splice(result.source.index, 1);
    newPlayers.splice(result.destination.index, 0, reordered);
    setAvailablePlayers(newPlayers);
    saveRankings(newPlayers);
  };

  const getPlayersWithPositionalRanks = () => {
    const positionCounters = {};
    return availablePlayers.map((player) => {
      const pos = player.position;
      if (!positionCounters[pos]) positionCounters[pos] = 1;
      const rank = positionCounters[pos]++;
      return { ...player, positionRank: `${pos}${rank}` };
    });
  };

  const filteredPlayers = getPlayersWithPositionalRanks().filter((p) => {
    const matchesSearch = p.fullName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesPos = filterPos === "ALL" || p.position === filterPos;
    return matchesSearch && matchesPos;
  });

  return (
    <div>
      <h1>{username}'s Player Rankings</h1>

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

      <div className="draftPlayers" style={{ flex: 1, paddingTop: 8 }}>
        {filteredPlayers.length === 0 && <p>No players found...</p>}

        <DragDropContext onDragEnd={handleOnDragEnd}>
          <Droppable droppableId="players">
            {(provided) => (
              <ul
                {...provided.droppableProps}
                ref={provided.innerRef}
                style={{ padding: 0 }}
              >
                {filteredPlayers.map((player, index) => (
                  <Draggable
                    key={player.id}
                    draggableId={player.id.toString()}
                    index={index}
                  >
                    {(provided, snapshot) => (
                      <PlayerItem
                        player={player}
                        index={availablePlayers.findIndex((p) => p.id === player.id) + 1}
                        positionalRank={player.positionRank}
                        dragHandleProps={provided.dragHandleProps} // ✅ only this small handle is draggable
                        ref={provided.innerRef}
                        style={{
                          ...provided.draggableProps.style,
                          marginBottom: "8px",
                        }}
                      />
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
  );
}

export default Ranking;