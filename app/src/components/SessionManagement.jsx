// src/components/SessionManagement.jsx
import React from "react";

const SessionManagement = ({ handleEndSession, handleNewSession }) => {
  return (
    <div style={{ marginTop: "10px" }}>
      <button onClick={handleEndSession}>End This Session</button>
      <button onClick={handleNewSession}>Start A New Session</button>
    </div>
  );
};

export default SessionManagement;
