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
    console.log("Sessions updated:", sessions); // Debug log
  }, [sessions]);

  const startNewSession = () => {
    const newSession = { id: Date.now(), messages: initialMessage };
    setSessions([...sessions, newSession]);
    setCurrentSessionId(newSession.id);
    console.log("New session started:", newSession); // Debug log
  };

  const endSession = () => {
    const newSessions = sessions.filter(
      (session) => session.id !== currentSessionId
    );
    setSessions(newSessions);
    if (newSessions.length > 0) {
      setCurrentSessionId(newSessions[newSessions.length - 1].id);
    } else {
      setCurrentSessionId(null);
    }
    console.log("Session ended. Current sessions:", newSessions); // Debug log
  };

  const selectSession = (id) => {
    setCurrentSessionId(id);
    console.log("Session selected:", id); // Debug log
  };

  const clearSessions = () => {
    setSessions([]);
    setCurrentSessionId(null);
    localStorage.removeItem("sessions");
    console.log("All sessions cleared"); // Debug log
  };

  const addMessageToSession = (sessionId, message) => {
    setSessions((prevSessions) =>
      prevSessions.map((session) => {
        if (session.id === sessionId) {
          const updatedSession = {
            ...session,
            messages: [...session.messages, message],
          };
          console.log("Message added to session:", updatedSession); // Debug log
          return updatedSession;
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
