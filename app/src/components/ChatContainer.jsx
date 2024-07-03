// src/components/ChatContainer.jsx
import React from "react";
import {
  MainContainer,
  ChatContainer as ChatUIContainer,
  MessageList,
  Message,
  MessageInput,
  TypingIndicator,
} from "@chatscope/chat-ui-kit-react";

const ChatContainer = ({ messages, typing, handleSend }) => {
  return (
    <div style={{ position: "relative", height: "800px", width: "700px" }}>
      <MainContainer>
        <ChatUIContainer>
          <MessageList
            typingIndicator={
              typing ? <TypingIndicator content="ChatGPT is typing..." /> : null
            }
          >
            {messages.map((message, index) => (
              <Message key={index} model={message} />
            ))}
          </MessageList>
          <MessageInput
            placeholder="Type message here..."
            onSend={handleSend}
          />
        </ChatUIContainer>
      </MainContainer>
    </div>
  );
};

export default ChatContainer;
