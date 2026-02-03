import { useState } from 'react';
import { Mic,Paperclip, SendHorizonal } from 'lucide-react';

import { useChatbot } from "../../context/ChatbotContext"; 

import "./MessageForm.css";


interface MessageFormProps {
  darkMode: boolean;
}
export default function MessageForm({darkMode}:MessageFormProps){  
  const {chatbotMessage,addMessage, isTyping } = useChatbot();
  const [input, setInput] = useState("");

  //const [isTyping, setIsTyping] = useState(false);

  const theme = darkMode
      ? "bg-slate-800 text-white border-slate-800"
      : "bg-slate-50 text-slate-950 border-slate-200";

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!input.trim()) return;

    const message = input.trim().toString();
    addMessage(message, true);
    setInput("");

    try{
      //callAPI(message);
      await chatbotMessage({userMessage:message});

    }catch (err:any) {
     
      console.log(err.message);
    }
  };





    return(
        <form className={`input-wrapper flex items-center w-full gap-2 ${theme}`} onSubmit={handleSend}>
          <input
            id="message-input"
            type="text"
            className="message-input"
            placeholder="Type your message..."
            aria-label="Message input"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />

          <div className="action-buttons ">
            <button
              className="action-button"
              aria-label="Add attachment"
              type="button"
            >
              <Paperclip size={24} />
            </button>

            <button
              className="action-button "
              aria-label="Voice input"
              type="button"
            >
            <Mic size={24} />
            </button>

            <button aria-label="Send" data-testid="send" className="send-button" type="submit" disabled={isTyping}> 
              <SendHorizonal size={24}/>
            </button>

          </div>
        </form>
    );
}

/**
 * 
 * 
   const handleSend = async (e: React.FormEvent) => {
     e.preventDefault();
 
     if (!input.trim()) return;
 
     const message = input.trim();
     addMessage(message, true);
     setInput("");
     
     try{
       callAPI(message);
 
     }catch (err:any) {
      
       console.log(err.message);
     }
   };
 
 
   const callAPI = async (userMessage: string) => {
     setIsTyping(true);
 
     try {
       const category = encodeURIComponent(userMessage);
       const response = await fetch(
         `http://18.218.69.99:8080/api/fortune-ai?category=${category}`
       );
 
       if (!response.ok) {
         throw new Error("Server error");
       }
 
       const data = await response.json();
       addMessage(data.fortune, false);
     } catch (err) {
       console.error(err);
       addMessage("Sorry, something went wrong.", false);
     } finally {
       setIsTyping(false);
     }
   };
 
 * 
 */