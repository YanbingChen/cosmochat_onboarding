import { useState, useEffect, useCallback } from "react";
import { fetchChatGPTResponse } from "../utils/api";

const useChat = (initialMessages, addMessageToSession, sessionId) => {
  const [messages, setMessages] = useState(initialMessages);
  const [typing, setTyping] = useState(false);

  useEffect(() => {
    setMessages(initialMessages);
  }, [initialMessages]);

  const updateMessages = useCallback(
    (newMessage) => {
      setMessages((prevMessages) => [...prevMessages, newMessage]);
      addMessageToSession(sessionId, newMessage);
    },
    [addMessageToSession, sessionId]
  );

  const sendMessage = useCallback(
    async (message) => {
      const newMessage = {
        message: message,
        sender: "user",
        direction: "outgoing",
      };

      updateMessages(newMessage);
      setTyping(true);

      try {
        const data = await fetchChatGPTResponse([...messages, newMessage]);
        if (data.choices && data.choices.length > 0) {
          const chatGPTMessage = {
            message: data.choices[0].message.content,
            sender: "ChatGPT",
            direction: "incoming",
          };
          updateMessages(chatGPTMessage);
        } else {
          console.error("Error:", data);
          alert("Error: " + data.error.message);
        }
      } catch (error) {
        console.error("Error:", error);
        alert("Error: " + error.message);
      } finally {
        setTyping(false);
      }
    },
    [messages, updateMessages]
  );

  return { messages, typing, sendMessage };
};

export default useChat;
