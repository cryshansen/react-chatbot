
import {  useChatbot } from "../context/ChatbotContext";

export default function TestConsumer() {
  const { messages, addMessage, chatbotMessage, isTyping } = useChatbot();

  return (
    <>
      <div data-testid="count">{messages.length}</div>
      <div data-testid="typing">{String(isTyping)}</div>
      <button onClick={() => addMessage("Hi", true)}>add</button>
      <button
        onClick={() =>
          chatbotMessage({ userMessage: "test" })
        }
      >
        send
      </button>
    </>
  );
}
