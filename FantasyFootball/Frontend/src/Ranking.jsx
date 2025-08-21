
import PlayerItem from "./PlayerItem";
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
