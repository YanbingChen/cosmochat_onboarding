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
  const [additionalInfo, setAdditionalInfo] = useState(() => {
    const storedInfo = localStorage.getItem("additionalInfo");
    return storedInfo ? JSON.parse(storedInfo) : {};
  });

  useEffect(() => {
    localStorage.setItem("sessions", JSON.stringify(sessions));
    localStorage.setItem("additionalInfo", JSON.stringify(additionalInfo));
    console.log(
      "Sessions and additionalInfo updated:",
      sessions,
      additionalInfo
    ); // Debug log
  }, [sessions, additionalInfo]);

  const startNewSession = () => {
    const newSessionId = Date.now();
    const newSession = { id: newSessionId, messages: initialMessage };
    setSessions([...sessions, newSession]);
    setCurrentSessionId(newSessionId);
    setAdditionalInfo({
      ...additionalInfo,
      [newSessionId]: {
        startTime: new Date().toISOString(),
        endTime: null,
        messageCount: 1, // Initial message from ChatGPT
        dailyMessageCount: {
          [new Date().toISOString().split("T")[0]]: 1,
        },
      },
    });
    console.log("New session started:", newSession); // Debug log
  };

  const endSession = () => {
    const endTime = new Date().toISOString();
    setSessions(sessions.filter((session) => session.id !== currentSessionId));
    setAdditionalInfo((prevInfo) => ({
      ...prevInfo,
      [currentSessionId]: {
        ...prevInfo[currentSessionId],
        endTime: endTime,
      },
    }));
    if (sessions.length > 1) {
      setCurrentSessionId(sessions[sessions.length - 2].id);
    } else {
      setCurrentSessionId(null);
    }
    console.log("Session ended. Current sessions:", sessions); // Debug log
  };

  const selectSession = (id) => {
    setCurrentSessionId(id);
    console.log("Session selected:", id); // Debug log
  };

  const clearSessions = () => {
    setSessions([]);
    setAdditionalInfo({});
    setCurrentSessionId(null);
    localStorage.removeItem("sessions");
    localStorage.removeItem("additionalInfo");
    console.log("All sessions cleared"); // Debug log
  };

  const addMessageToSession = (sessionId, message) => {
    const currentDate = new Date().toISOString().split("T")[0];
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
    setAdditionalInfo((prevInfo) => {
      const prevDailyCount =
        prevInfo[sessionId].dailyMessageCount[currentDate] || 0;
      return {
        ...prevInfo,
        [sessionId]: {
          ...prevInfo[sessionId],
          messageCount: prevInfo[sessionId].messageCount + 1,
          dailyMessageCount: {
            ...prevInfo[sessionId].dailyMessageCount,
            [currentDate]: prevDailyCount + 1,
          },
        },
      };
    });
  };

  const currentSession = sessions.find(
    (session) => session.id === currentSessionId
  ) || { messages: initialMessage };

  return {
    sessions,
    currentSessionId,
    currentSession,
    additionalInfo,
    startNewSession,
    endSession,
    selectSession,
    clearSessions,
    addMessageToSession,
  };
};

export default useSessions;
