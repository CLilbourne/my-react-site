import React, { useEffect, useRef, useState } from "react";
import PlayerItem from "./PlayerItem";
import { Draggable } from "gsap/Draggable";
import gsap from "gsap";

function Ranking({ availablePlayers }) {
  const containerRef = useRef(null);
  const [sortables, setSortables] = useState([]);

  useEffect(() => {
    if (!availablePlayers.length) return;

    const rowSize = 130;
    const colSize = 300; // width of player row
    const cells = availablePlayers.map((_, index) => ({
      index,
      x: 0,
      y: index * rowSize,
    }));

    const container = containerRef.current;
    const newSortables = Array.from(container.children).map((el, index) => {
      const sortable = {
        element: el,
        index,
        cell: cells[index],
        setIndex: function (i) {
          this.index = i;
          this.cell = cells[i];
          gsap.to(this.element, { x: this.cell.x, y: this.cell.y, duration: 0.3 });
        },
      };

      Draggable.create(el, {
        type: "y",
        bounds: container,
        onDrag: function () {
          const newIndex = Math.round(this.y / rowSize);
          if (newIndex !== sortable.index && newIndex >= 0 && newIndex < availablePlayers.length) {
            const temp = newSortables[newIndex];
            newSortables[newIndex] = sortable;
            newSortables[sortable.index] = temp;
            newSortables.forEach((s, i) => s.setIndex(i));
          }
        },
      });

      gsap.set(el, { x: sortable.cell.x, y: sortable.cell.y });
      return sortable;
    });

    setSortables(newSortables);
  }, [availablePlayers]);

  return (
    <div
      className="player-grid"
      ref={containerRef}
      style={{ position: "relative", height: availablePlayers.length * 130 }}
    >
      {availablePlayers.map((player, index) => (
        <div
          key={player.id}
          className="player-item"
          style={{
            position: "absolute",
            width: "280px",
            height: "120px",
            margin: "5px",
          }}
        >
          <PlayerItem player={player} />
        </div>
      ))}
    </div>
  );
}
export default Ranking;
