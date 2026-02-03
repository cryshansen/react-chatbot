import { createContext, useContext, useEffect, useState,useRef} from "react";
import type { ReactNode, RefObject } from "react";
import type { Message, MessageArgs, MessageResponse } from "../schemas/message.types";
import { createChatbotService } from "../services/chatbot.service"
import type { OrbieConfig } from "../schemas/OrbieConfig";


type ChatbotProviderProps = {
  children: ReactNode;
  config:OrbieConfig;
  chatbotName:string;
  context?:string;
  initialPrompt?: string;
  userId?:string;
};

interface ChatbotContextValue {
  chatbotName:string;
  messages: Message[];
  addMessage: (content: string, isUser: boolean) => void;
  chatbotMessage: (args: MessageArgs) => Promise<MessageResponse>;
  isTyping: boolean;
  chatRef: RefObject<HTMLDivElement | null>;
}


const ChatbotContext = createContext<ChatbotContextValue | null>(null);


export function ChatbotProvider({ 
    children,
    config,
    chatbotName,
    initialPrompt,
    context,
    userId, 
  } : ChatbotProviderProps) {

    const chatbotApiRef = useRef<ReturnType<typeof createChatbotService > | null >(null);
    const fullApiUrl = `${config.apiUrl}${config.endpoint}`;
    
    if (!chatbotApiRef.current) {
      chatbotApiRef.current = createChatbotService(fullApiUrl);
    }
    const createSystemMessage = (content: string): Message => ({
      id: Date.now(),
      content,
      isUser: false,
    });

    const [messages, setMessages] = useState<Message[]>([
     createSystemMessage( initialPrompt!),
    ]);
    const [isTyping, setIsTyping] = useState(false);
    const chatRef = useRef<HTMLDivElement | null>(null);

    const addMessage = (content: string, isUser: boolean) => {
        setMessages((prev) => [
          ...prev,
          { id: Date.now(), content, isUser },
      ]);
    };


  useEffect(() => {
    const el = chatRef.current;
    if (!el) return;
    if(typeof el.scrollTo === "function"){
      el.scrollTo({
        top:el.scrollHeight,
        behavior: "smooth",
      });
    }

  }, [ messages ]);



const chatbotMessage = async ({userMessage}:MessageArgs): Promise<MessageResponse> => {
    setIsTyping(true);

    try {

      const response = await chatbotApiRef.current!.chatbotMessageApi(userMessage);
      console.log(response);
      //addMessage(data.fortune, false);
      addMessage(response.fortune, false );
      return response;
    } catch (err:any) {
      console.error(err.message);
      addMessage("Sorry, something went wrong.", false);
      throw err;
    } finally {
      setIsTyping(false);
    }
  };

return (
    <ChatbotContext.Provider
      value={{
        chatbotName,
        messages,
        addMessage,
        chatbotMessage,
        isTyping,
        chatRef,
      }}
    >
      {children}
    </ChatbotContext.Provider>
  );

} 


export function useChatbot(): ChatbotContextValue {
  const ctx = useContext(ChatbotContext);
  if (!ctx) throw new Error("useChatbot must be used inside ChatbotProvider");
  return ctx;
}
