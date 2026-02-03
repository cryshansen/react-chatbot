
import { useChatbot } from "../../context/ChatbotContext";

import "./ChatMessageBox.css";


interface MessageProps {
  darkMode: boolean;
}

export default function ChatMessageBox({darkMode}:MessageProps){

const {messages,isTyping, chatRef} = useChatbot();

  const theme = darkMode
      ? "bg-slate-800 text-white border-slate-800"
      : "bg-white text-slate-950 border-slate-200";

    return (
        <>
         <div className={`chat-container max-h-[400px] ${theme}`} ref={chatRef}>
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`message ${
                msg.isUser ? "user-message " : "bot-message" 
              }`}
            >
              <div className={`avatar text-white ${
                msg.isUser ? " bg-gradient-to-br from-pink-300 to-pink-800" : " bg-gradient-to-br from-purple-400 to-indigo-600" //here is the color changes for bubbles
              }
              
              `}>{msg.isUser ? "U" : "AI"}</div>
              <div className={`message-bubble ${
                  msg.isUser 
                    ? darkMode 
                      ? "bg-indigo-600 text-white" 
                      : "bg-indigo-400 text-white" 
                    : darkMode
                      ? "bg-slate-600"  
                      : "bg-slate-100" 

                  
              }`}>{msg.content}</div> 
            </div>
          ))}
        </div>

        {isTyping && (
          <div className="typing-indicator  bg-slate-100">
            <div className="typing-dots bg-slate-200">
              <div className="typing-dot bg-blue-950" />
              <div className="typing-dot bg-blue-950" />
              <div className="typing-dot bg-blue-950" />
            </div>
          </div>
        )}

        </>
        
    );
}