import React, { useState, useEffect, useCallback } from "react";
import PlayerItem from "./PlayerItem";
import adpData from "./assets/adp.json";
import mockdraft from "./assets/mockdraft.png";
import { BACKEND_URL } from "./shared";
import { USER_TIMER_DURATION, AI_TIMER_DURATION, NUM_TEAMS, TOTAL_ROUNDS } from "./Global";
import normalizeName from "./helpers";

import { IonList, IonReorderGroup, IonReorder, IonItem } from "@ionic/react";

function Ranking() {
  const [availablePlayers, setAvailablePlayers] = useState([]);
  const [draftPickOrder, setDraftPickOrder] = useState([]);
  const [currentPickIndex, setCurrentPickIndex] = useState(0);
  const [selectedTeam, setSelectedTeam] = useState(0);

  // placeholder to avoid ReferenceError if not wired yet
  const draftPlayer = useCallback((player) => {
    // TODO: implement or pass as prop
    console.log("draft", player.fullName);
  }, []);

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

  const handleReorderEnd = (event) => {
    const from = event.detail.from;
    const to = event.detail.to;

    setAvailablePlayers((prev) => {
      const updated = [...prev];
      const [moved] = updated.splice(from, 1);
      updated.splice(to, 0, moved);

      // Tell Ionic the new order so DOM & data stay in sync
      event.detail.complete(updated);
      return updated;
    });
  };

  return (
    <div>
      <div style={{ display: "flex", gap: 40 }}>
        <div className="draftPlayers" style={{ flex: 1 }}>
          {availablePlayers.length === 0 && <p>No players left / Server Down</p>}
          {availablePlayers.length === 0 && <img src={mockdraft} alt="mockdraft" />}

          <IonList style={{ overflowY: "auto", padding: 0, maxHeight: "75vh" }}>
            <IonReorderGroup disabled={false} onIonReorderEnd={handleReorderEnd}>
              {availablePlayers.map((player, index) => (
                <IonItem key={player.id ?? index} lines="none">
                  {draftPickOrder[currentPickIndex] === selectedTeam ? (
                    <PlayerItem
                      player={player}
                      buttonLabel="Draft"
                      onButtonClick={() => draftPlayer(player)}
                    />
                  ) : (
                    <PlayerItem player={player} />
                  )}
                  <IonReorder slot="end" />
                </IonItem>
              ))}
            </IonReorderGroup>
          </IonList>
        </div>
      </div>
    </div>
  );
}

export default Ranking;
