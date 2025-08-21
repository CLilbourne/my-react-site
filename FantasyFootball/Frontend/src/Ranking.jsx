import PlayerItem from "./PlayerItem";
import adpData from "./assets/adp.json"; // example
import MockDraft from "./MockDraft"
function Ranking() {
  return (
    <ul style={{overflowY: "auto", padding: 0}}>
            {availablePlayers.map((player) =>
              draftPickOrder[currentPickIndex] === selectedTeam ? (
                <PlayerItem
                  key={player.id}
                  player={player}
                  buttonLabel="Draft"
                  onButtonClick={() => draftPlayer(player)}
                />
              ) : (
                <PlayerItem key={player.id} player={player} />
              )
            )}
          </ul>
  );
}

export default Ranking;