import React, { useState, useEffect } from "react";
import PlayerItem from "./PlayerItem";
import adpData from "./assets/adp.json";
import mockdraft from "./assets/mockdraft.png";
import { BACKEND_URL } from "./shared";
import { USER_TIMER_DURATION, AI_TIMER_DURATION, NUM_TEAMS, TOTAL_ROUNDS } from "./Global";
import normalizeName from "./helpers";


// DnD imports
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

function Ranking() {
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

  // Handle drag end (reorder players)
  const handleOnDragEnd = (result) => {
    if (!result.destination) return; // dropped outside the list
    const items = Array.from(availablePlayers);
    const [reordered] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reordered);
    setAvailablePlayers(items);
  };

  return (
    <div>
      <div style={{ display: "flex", gap: 40 }}>
        <div className="draftPlayers" style={{ flex: 1 }}>
          {availablePlayers.length === 0 && <p>No players left / Server Down</p>}
          {availablePlayers.length === 0 && <img src={mockdraft} alt="mockdraft" />}

          <DragDropContext onDragEnd={handleOnDragEnd}>
            <Droppable droppableId="players">
              {(provided) => (
                <ul
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                  style={{ overflowY: "auto", padding: 0 }}
                >
                  {availablePlayers.map((player, index) => (
                    <Draggable key={player.id} draggableId={String(player.id)} index={index}>
                      {(provided) => (
                        <li
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          style={{
                            ...provided.draggableProps.style,
                            listStyle: "none",
                            marginBottom: "8px",
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