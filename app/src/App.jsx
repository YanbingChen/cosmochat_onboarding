// src/App.jsx
import React, { useEffect, useState } from "react";
import "./App.css";
import "@chatscope/chat-ui-kit-styles/dist/default/styles.min.css";
import LandingPage from "./components/LandingPage";
import ChatContainer from "./components/ChatContainer";
import SessionSidebar from "./components/SessionSidebar";
import SessionManagement from "./components/SessionManagement";
import useSessions from "./hooks/useSessions";
import useChat from "./hooks/useChat";
import useFirebaseMessaging from "./hooks/useFirebaseMessaging";
import { Box, Button, IconButton, Typography } from "@mui/material";
import ArrowBackOutlinedIcon from "@mui/icons-material/ArrowBackOutlined";
import ActivityDashboard from "./components/ActivityDashboard";

function App() {
  const [currentView, setCurrentView] = useState("landingPage"); // 'landingPage', 'chat', 'activity'

  const {
    sessions,
    currentSessionId,
    currentSession,
    additionalInfo,
    startNewSession,
    endSession,
    selectSession,
    clearSessions,
    addMessageToSession,
  } = useSessions();

  const { messages, typing, sendMessage } = useChat(
    currentSession.messages,
    addMessageToSession,
    currentSessionId
  );

  useEffect(() => {
    if (!currentSessionId && sessions.length > 0) {
      selectSession(sessions[0].id);
    }
    console.log("App initialized. Current sessions:", sessions); // Debug log
    console.log("Addtional info:", additionalInfo); // Debug log
  }, [currentSessionId, sessions, selectSession]);

  useFirebaseMessaging();

  const handleSend = (message) => {
    sendMessage(message);
  };

  const handleStartChat = () => {
    if (!currentSessionId) {
      startNewSession();
    }
    setCurrentView("chat");
  };

  const handleStartSession = () => {
    startNewSession();
    setCurrentView("chat");
  };

  const handleEndSession = () => {
    if (sessions.length === 1) {
      endSession();
      setCurrentView("landingPage");
    } else {
      endSession();
    }
  };

  const handleClearSessions = () => {
    clearSessions();
    setCurrentView("landingPage");
  };

  return (
    <div style={{ display: "flex" }}>
      {currentView !== "landingPage" && currentView !== "activity" && (
        <SessionSidebar
          sessions={sessions}
          currentSessionId={currentSessionId}
          onSelectSession={selectSession}
          onClearSessions={handleClearSessions}
        />
      )}
      <div style={{ flex: 1 }}>
        {currentView === "landingPage" ? (
          <LandingPage onStartChat={handleStartChat} />
        ) : currentView === "chat" ? (
          <>
            <ChatContainer
              messages={messages}
              typing={typing}
              handleSend={handleSend}
            />
            <SessionManagement
              handleEndSession={handleEndSession}
              handleNewSession={handleStartSession}
              setCurrentView={setCurrentView}
            />
          </>
        ) : currentView === "activity" ? (
          <Box style={{ padding: "20px" }}>
            <Box display="flex" alignItems="center" marginBottom="20px">
              <IconButton
                onClick={() => setCurrentView("chat")}
                color="primary"
              >
                <ArrowBackOutlinedIcon />
              </IconButton>
            </Box>
            <ActivityDashboard additionalInfo={additionalInfo} />
          </Box>
        ) : null}
      </div>
    </div>
  );
}

export default App;
