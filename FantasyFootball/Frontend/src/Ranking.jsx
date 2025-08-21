import React, { useState, useEffect, useCallback } from "react";
import PlayerItem from "./PlayerItem";
import adpData from "./assets/adp.json";
import mockdraft from "./assets/mockdraft.png";
import { BACKEND_URL } from "./shared";
import { USER_TIMER_DURATION, AI_TIMER_DURATION, NUM_TEAMS, TOTAL_ROUNDS } from "./Global";
import normalizeName from "./helpers";


import React from 'react';
import { IonItem, IonLabel, IonList, IonReorder, IonReorderGroup, ReorderEndCustomEvent } from '@ionic/react';

function Example() {
  function handleReorderEnd(event: ReorderEndCustomEvent) {
    // The `from` and `to` properties contain the index of the item
    // when the drag started and ended, respectively
    console.log('Dragged from index', event.detail.from, 'to', event.detail.to);

    // Finish the reorder and position the item in the DOM based on
    // where the gesture ended. This method can also be called directly
    // by the reorder group.
    event.detail.complete();
  }

  return (
    <IonList>
      {/* The reorder gesture is disabled by default, enable it to drag and drop items */}
      <IonReorderGroup disabled={false} onIonReorderEnd={handleReorderEnd}>
        <IonItem>
          <IonLabel>Item 1</IonLabel>
          <IonReorder slot="end"></IonReorder>
        </IonItem>

        <IonItem>
          <IonLabel>Item 2</IonLabel>
          <IonReorder slot="end"></IonReorder>
        </IonItem>

        <IonItem>
          <IonLabel>Item 3</IonLabel>
          <IonReorder slot="end"></IonReorder>
        </IonItem>

        <IonItem>
          <IonLabel>Item 4</IonLabel>
          <IonReorder slot="end"></IonReorder>
        </IonItem>

        <IonItem>
          <IonLabel>Item 5</IonLabel>
          <IonReorder slot="end"></IonReorder>
        </IonItem>
      </IonReorderGroup>
    </IonList>
  );
}
export default Example;