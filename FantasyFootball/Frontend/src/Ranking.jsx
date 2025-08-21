import React, { useState, useEffect } from "react";
import PlayerItem from "./PlayerItem";
import adpData from "./assets/adp.json";
import mockdraft from "./assets/mockdraft.png";
import { BACKEND_URL } from "./shared";
import { USER_TIMER_DURATION, AI_TIMER_DURATION, NUM_TEAMS, TOTAL_ROUNDS } from "./Global";
import normalizeName from "./helpers";

import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

function Ranking() {
  const [availablePlayers, setAvailablePlayers] = useState([]);
  const [draftPickOrder, setDraftPickOrder] = useState([]);
  const [currentPickIndex, setCurrentPickIndex] = useState(0);
  const [selectedTeam, setSelectedTeam] = useState(0);

  // placeholder to avoid crash
  const draftPlayer = (player) => console.log("Draft:", player.fullName);

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

  const handleOnDragEnd = (result) => {
    if (!result.destination) return;
    const items = Array.from(availablePlayers);
    const [moved] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, moved);
    setAvailablePlayers(items);
  };

  return (
    <div style={{ display: "flex", gap: 40 }}>
      <div className="draftPlayers" style={{ flex: 1 }}>
        {availablePlayers.length === 0 && <p>No players left / Server Down</p>}
        {availablePlayers.length === 0 && <img src={mockdraft} alt="mockdraft" />}

        <DragDropContext onDragEnd={handleOnDragEnd}>
          <Droppable droppableId="players">
            {(provided) => (
              <div
                {...provided.droppableProps}
                ref={provided.innerRef}
                style={{
                  maxHeight: "70vh",
                  overflowY: "auto",
                  background: "#f8f9fa",
                  padding: "8px",
                  borderRadius: "8px",
                }}
              >
                {availablePlayers.map((player, index) => (
                  <Draggable key={player.id} draggableId={String(player.id)} index={index}>
                    {(provided, snapshot) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        style={{
                          userSelect: "none",
                          margin: "0 0 8px 0",
                          borderRadius: "6px",
                          background: snapshot.isDragging ? "#e2e6ea" : "#fff",
                          boxShadow: snapshot.isDragging
                            ? "0 4px 8px rgba(0,0,0,0.1)"
                            : "0 1px 2px rgba(0,0,0,0.05)",
                          ...provided.draggableProps.style,
                        }}
                      >
                        {draftPickOrder[currentPickIndex] === selectedTeam ? (
                          <PlayerItem
                            player={player}
                            buttonLabel="Draft"
                            onButtonClick={() => draftPlayer(player)}
                          />
                        ) : (
                          <PlayerItem player={player} />
                        )}
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      </div>
    </div>
  );
}

export default Ranking;