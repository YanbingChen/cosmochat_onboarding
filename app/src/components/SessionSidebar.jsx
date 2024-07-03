// src/components/SessionSidebar.jsx
import React from "react";
import { List, ListItem, ListItemText, Button } from "@mui/material";

const SessionSidebar = ({
  sessions,
  currentSessionId,
  onSelectSession,
  onClearSessions,
}) => {
  return (
    <div
      style={{ width: "200px", padding: "10px", borderRight: "1px solid #ccc" }}
    >
      <List>
        {sessions.map((session, index) => (
          <ListItem
            button
            key={session.id}
            selected={session.id === currentSessionId}
            onClick={() => onSelectSession(session.id)}
          >
            <ListItemText primary={`Session ${index + 1}`} />
          </ListItem>
        ))}
      </List>
      <Button variant="contained" color="secondary" onClick={onClearSessions}>
        Clear All Sessions
      </Button>
    </div>
  );
};

export default SessionSidebar;
