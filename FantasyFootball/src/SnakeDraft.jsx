// SnakeDraft.jsx
import React from "react";
import "./SnakeDraft.css"
import { positionColors, teamAbbreviations } from "./playerData";
import reactIcon from './assets/react.svg';

export default function SnakeDraft({ draftedPlayers, numTeams }) {
  // Helper: return team index based on snake pattern
  function getTeamIndex(pickIndex) {
    const round = Math.floor(pickIndex / numTeams);
    const positionInRound = pickIndex % numTeams;
    return round % 2 === 0
      ? positionInRound
      : numTeams - 1 - positionInRound;
  }

  // Group players by team using snake draft logic
  const teams = Array.from({ length: numTeams }, () => []);
  draftedPlayers.forEach((player, index) => {
    const teamIndex = getTeamIndex(index);
    teams[teamIndex].push(player);
  });

  return (
  <div>

    <div className="DraftVisual">
      {teams.map((team, i) => (
        <div key={i}>

          <div className="TeamTitleSnake"><img style={{ width: 30, height: 30}} src={reactIcon} alt="icon" />Team {i + 1}</div>
          
          <div className="SnakeCard">
            {[...Array(12)].map((_, index) => {
              const player = team[index]; // get player at pick index, if any
              const globalPickNumber = i + 1  + index * 12;
              return (
                <li key={index} className="pick-slot" style={{backgroundColor: player? positionColors[player.position.toLowerCase()]|| 'black' : 'inherit'}}>
                  {player ? (
                    <div className="text-info">
                    
                       <span className="player-name">{player.fullName}</span>
                        <span className="player-position">({player.position} - {teamAbbreviations[player.team] || player.team})</span>
                       <img className="snakeImg" src={player.headshot} alt={player.fullName} style={{ width: 50, height: 35}}/>
                      
          
                    </div>
                    
                  ) : (
                    <span style={{ color: "white", fontWeight: "Bold"}}>Pick {globalPickNumber}</span>
                  )}
                </li>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  </div>
);
}