import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./Welcome.css";

function Welcome() {
  const location = useLocation();
  const navigate = useNavigate();

  // ✅ get username either from state OR from localStorage
  const [username, setUsername] = useState(
    location.state?.username || JSON.parse(localStorage.getItem("user"))?.name
  );

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
    navigate("/draft-room", { state: { username } });
  };

  const handleCurrentLeagues = () => {
    navigate("/ranking", { state: { username } });
  };

  const handleMockDraft = () => {
    navigate("/mock-draft", { state: { username } });
  };

  return (
    <div style={{ textAlign: "center", padding: "2rem", color: "white" }}>
      <h1>Welcome, {username}!</h1>
      <div style={{ marginTop: "2rem" }}>
        <button className="welcomebuttons" onClick={handleCreateLeague}>
          Create League
        </button>
        <button className="welcomebuttons" onClick={handleJoinLeague}>
          Draft Room
        </button>
        <button className="welcomebuttons" onClick={handleCurrentLeagues}>
          Ranking
        </button>
        <button className="welcomebuttons" onClick={handleMockDraft}>
          Mock Draft
        </button>
      </div>
    </div>
  );
}

export default Welcome;