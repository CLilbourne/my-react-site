import PlayerItem from "./PlayerItem";

function Ranking({ availablePlayers, draftPickOrder, currentPickIndex, selectedTeam, draftPlayer }) {
  return (
    <ul style={{ overflowY: "auto", padding: 0 }}>
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