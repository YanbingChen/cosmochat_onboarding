// src/components/SessionSidebar.jsx
import React from "react";
import {
  ProSidebar,
  Menu,
  MenuItem,
  SubMenu,
  SidebarHeader,
  SidebarFooter,
  SidebarContent,
} from "react-pro-sidebar";
import "react-pro-sidebar/dist/css/styles.css";
import { Button } from "@mui/material";
import "./customSidebar.css";

const SessionSidebar = ({
  sessions,
  currentSessionId,
  onSelectSession,
  onClearSessions,
}) => {
  return (
    <div style={{ height: "80vh" }}>
      <ProSidebar>
        <SidebarHeader>
          <div
            style={{
              padding: "24px",
              textAlign: "center",
              fontWeight: "bold",
              marginRight: "24px",
            }}
          >
            Sessions
          </div>
        </SidebarHeader>
        <SidebarContent>
          <Menu iconShape="circle">
            {sessions.map((session, index) => (
              <MenuItem
                key={session.id}
                active={session.id === currentSessionId}
                onClick={() => onSelectSession(session.id)}
              >
                {`Session ${index + 1}`}
              </MenuItem>
            ))}
          </Menu>
        </SidebarContent>
        <SidebarFooter>
          <div style={{ padding: "10px", textAlign: "center" }}>
            <Button variant="contained" color="info" onClick={onClearSessions}>
              Clear All Sessions
            </Button>
          </div>
        </SidebarFooter>
      </ProSidebar>
    </div>
  );
};

export default SessionSidebar;
