// src/utils/api.js
const API_KEY = import.meta.env.VITE_OPENAI_API_KEY;

export const fetchChatGPTResponse = (chatMessages) => {
  let apiMessages = chatMessages.map((messageObject) => {
    return {
      role: messageObject.sender === "ChatGPT" ? "assistant" : "user",
      content: messageObject.message,
    };
  });

  const systemMessage = {
    role: "system",
    content: "You are a helpful assistant.",
  };

  return fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${API_KEY}`,
    },
    body: JSON.stringify({
      model: "gpt-3.5-turbo",
      messages: [systemMessage, ...apiMessages],
    }),
  }).then((response) => response.json());
};
