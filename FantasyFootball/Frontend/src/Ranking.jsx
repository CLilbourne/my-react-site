import React, { useEffect, useState} from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { useLocation, useNavigate } from "react-router-dom";
import "./Welcome.css"

function Ranking() {
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
}
export default Ranking;
