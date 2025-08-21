import PlayerItem from "./PlayerItem";
import adpData from "./assets/adp.json"; 

function Ranking() {
  return (
    <ul style={{ padding: 0 }}>
      {adpData.map((player) => (
        <PlayerItem
          key={player.id}
          player={player}
          buttonLabel="Drafted"
          onButtonClick={() => {}}
        />
      ))}
    </ul>
  );
}

export default Ranking;