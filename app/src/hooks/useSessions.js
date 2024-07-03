// src/hooks/useSessions.js
import { useState, useEffect } from "react";

const initialMessage = [
  {
    message: "Hello, I am ChatGPT!",
    sender: "ChatGPT",
    direction: "incoming",
  },
];

const useSessions = () => {
  const [sessions, setSessions] = useState(() => {
    const storedSessions = localStorage.getItem("sessions");
    return storedSessions ? JSON.parse(storedSessions) : [];
  });
  const [currentSessionId, setCurrentSessionId] = useState(null);

  useEffect(() => {
    localStorage.setItem("sessions", JSON.stringify(sessions));
  }, [sessions]);

  const startNewSession = () => {
    const newSession = { id: Date.now(), messages: initialMessage };
    setSessions([...sessions, newSession]);
    setCurrentSessionId(newSession.id);
  };

  const endSession = () => {
    const newSessions = sessions.filter(
      (session) => session.id !== currentSessionId
    );
    setSessions(newSessions);
    if (newSessions.length > 0) {
      setCurrentSessionId(newSessions[newSessions.length - 1].id);
    } else {
      startNewSession();
    }
  };

  const selectSession = (id) => {
    setCurrentSessionId(id);
  };

  const clearSessions = () => {
    setSessions([]);
    setCurrentSessionId(null);
    localStorage.removeItem("sessions");
  };

  const addMessageToSession = (sessionId, message) => {
    setSessions(
      sessions.map((session) => {
        if (session.id === sessionId) {
          return { ...session, messages: [...session.messages, message] };
        }
        return session;
      })
    );
  };

  const currentSession = sessions.find(
    (session) => session.id === currentSessionId
  ) || { messages: initialMessage };

  return {
    sessions,
    currentSessionId,
    currentSession,
    startNewSession,
    endSession,
    selectSession,
    clearSessions,
    addMessageToSession,
  };
};

export default useSessions;
