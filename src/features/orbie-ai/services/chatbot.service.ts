

import {requestPublic} from "../api/requestPublic";
import type {  MessageResponse  } from "../schemas/message.types";


export function createChatbotService(apiBaseUrl:string){
  return { 
    chatbotMessageApi(category: string ) {
        return requestPublic<MessageResponse>(
          `${apiBaseUrl}?category=${encodeURIComponent(category)}`
        );
      }
  }
}

