// src/App.jsx
import React, { useEffect } from "react";
import "./App.css";
import "@chatscope/chat-ui-kit-styles/dist/default/styles.min.css";
import LandingPage from "./components/LandingPage";
import ChatContainer from "./components/ChatContainer";
import SessionSidebar from "./components/SessionSidebar";
import SessionManagement from "./components/SessionManagement";
import useSessions from "./hooks/useSessions";
import useChat from "./hooks/useChat";
import useFirebaseMessaging from "./hooks/useFirebaseMessaging";

function App() {
  const {
    sessions,
    currentSessionId,
    currentSession,
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
  }, [currentSessionId, sessions, selectSession]);

  // 调用自定义 Hook 来处理推送通知
  useFirebaseMessaging();

  const handleSend = (message) => {
    sendMessage(message);
  };

  return (
    <div style={{ display: "flex" }}>
      {currentSessionId !== null && (
        <SessionSidebar
          sessions={sessions}
          currentSessionId={currentSessionId}
          onSelectSession={selectSession}
          onClearSessions={clearSessions}
        />
      )}
      <div style={{ flex: 1 }}>
        {currentSessionId === null ? (
          <LandingPage onStartChat={startNewSession} />
        ) : (
          <>
            <ChatContainer
              messages={messages}
              typing={typing}
              handleSend={handleSend}
            />
            <SessionManagement
              handleEndSession={endSession}
              handleNewSession={startNewSession}
            />
          </>
        )}
      </div>
    </div>
  );
}

export default App;
