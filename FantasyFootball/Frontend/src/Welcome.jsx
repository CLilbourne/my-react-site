import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./Welcome.css"
function Welcome() {
  const location = useLocation();
  const navigate = useNavigate();
  const username = location.state?.username;

  useEffect(() => {
    if (!username) {
      navigate("/login", { replace: true });
    }
  }, [username, navigate]);

  if (!username) return null;

  const handleCreateLeague = () => {
    navigate("/create-league", { state: { username } });
  };

  const handleJoinLeague = () => {
    navigate("/join-league", { state: { username } });
  };

  const handleCurrentLeagues = () => {
    navigate("/current-leagues", { state: { username } });
  };
   const handleMockDraft = () => {
    navigate("/mock-draft", { state: { username } });
  };

  return (
    <div style={{ textAlign: "center", padding: "2rem", color: "white" }}>
      <h1>Welcome, {username}!</h1>
      <div style={{ marginTop: "2rem" }}>
        <button className="welcomebuttons" onClick={handleCreateLeague} >
          Create League
        </button>
        <button className="welcomebuttons"onClick={handleJoinLeague} >
          Join League
        </button>
        <button className="welcomebuttons" onClick={handleCurrentLeagues}>
          Current Leagues
        </button>
        <button className="welcomebuttons" onClick={handleMockDraft}>
          Mock Draft
        </button>
      </div>
    </div>
  );
}
export default Welcome;
