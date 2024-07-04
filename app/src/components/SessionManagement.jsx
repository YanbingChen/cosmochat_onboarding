// src/components/SessionManagement.jsx
import React from "react";
import { Button } from "@mui/material";

const SessionManagement = ({
  handleEndSession,
  handleNewSession,
  setCurrentView,
}) => (
  <div
    style={{
      marginTop: "10px",
      display: "flex",
      justifyContent: "space-around",
    }}
  >
    <Button variant="outlined" onClick={handleEndSession}>
      End This Session
    </Button>
    <Button variant="outlined" onClick={handleNewSession}>
      Start New Session
    </Button>
    <Button variant="outlined" onClick={() => setCurrentView("activity")}>
      View Activity Dashboard
    </Button>
  </div>
);

export default SessionManagement;
