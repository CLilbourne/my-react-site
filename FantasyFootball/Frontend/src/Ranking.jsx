import React, { useEffect, useState} from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { useLocation, useNavigate } from "react-router-dom";
import "./Welcome.css"

function Ranking() {
  const [players, setPlayers] = useState(
    adpData.map((p, index) => ({ ...p, rank: index + 1 }))
  );

  function handleOnDragEnd(result) {
    if (!result.destination) return;

    const reordered = Array.from(players);
    const [moved] = reordered.splice(result.source.index, 1);
    reordered.splice(result.destination.index, 0, moved);

    // Re-assign ranks after move
    const reRanked = reordered.map((p, i) => ({ ...p, rank: i + 1 }));
    setPlayers(reRanked);
  }

  function saveRankings() {
    localStorage.setItem("customRankings", JSON.stringify(players));
    alert("✅ Rankings saved to localStorage!");
  }

  return (
    <div style={{ padding: "1rem", color: "white" }}>
      <h2>📊 Edit Player Rankings</h2>
      <p>Drag and drop players to reorder their ADP rankings.</p>

      <DragDropContext onDragEnd={handleOnDragEnd}>
        <Droppable droppableId="players">
          {(provided) => (
            <ul
              {...provided.droppableProps}
              ref={provided.innerRef}
              style={{
                listStyle: "none",
                padding: 0,
                maxHeight: "70vh",
                overflowY: "auto",
                border: "1px solid gray",
              }}
            >
              {players.map((player, index) => (
                <Draggable
                  key={player.Player}
                  draggableId={player.Player}
                  index={index}
                >
                  {(provided) => (
                    <li
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      style={{
                        padding: "8px",
                        marginBottom: "4px",
                        background: "#222",
                        borderRadius: "8px",
                        ...provided.draggableProps.style,
                      }}
                    >
                      <strong>{player.rank}. {player.Player}</strong>{" "}
                      <span style={{ opacity: 0.7 }}>
                        ({player.Pos}, Team: {player.Team})
                      </span>
                    </li>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </ul>
          )}
        </Droppable>
      </DragDropContext>

      <button
        onClick={saveRankings}
        style={{
          marginTop: "1rem",
          padding: "10px 20px",
          borderRadius: "8px",
          border: "none",
          background: "limegreen",
          color: "black",
          fontWeight: "bold",
        }}
      >
        Save Rankings
      </button>
    </div>
  );
}
export default Ranking;
