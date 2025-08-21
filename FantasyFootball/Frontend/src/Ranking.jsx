import PlayerItem from "./PlayerItem";
import adpData from "./assets/adp.json"; // example

function Ranking() {
  return (
     <div className="draftPlayers" style={{ flex: 1 }}>

          {availablePlayers.length === 0 && <p>No players left / Server Down</p>}
          {availablePlayers.length === 0 && <img src={mockdraft}></img>}
          
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
        </div>

  );
}

export default Ranking;