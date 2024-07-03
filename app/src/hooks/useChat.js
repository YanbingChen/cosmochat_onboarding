// src/hooks/useChat.js
import { useState } from "react";
import { fetchChatGPTResponse } from "../utils/api";

const useChat = () => {
  const [messages, setMessages] = useState([
    {
      message: "Hello, I am ChatGPT!",
      sender: "ChatGPT",
      direction: "incoming",
    },
  ]);

  const [typing, setTyping] = useState(false);

  const sendMessage = async (message) => {
    const newMessage = {
      message: message,
      sender: "user",
      direction: "outgoing",
    };

    const newMessages = [...messages, newMessage];
    setMessages(newMessages);
    setTyping(true);

    try {
      const data = await fetchChatGPTResponse(newMessages);
      if (data.choices && data.choices.length > 0) {
        setMessages((prevMessages) => [
          ...prevMessages,
          {
            message: data.choices[0].message.content,
            sender: "ChatGPT",
            direction: "incoming",
          },
        ]);
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
  };

  return { messages, typing, sendMessage };
};

export default useChat;
