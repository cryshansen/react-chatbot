/*=================
//UI Type definitions
===================*/
export interface Message {
  id: number;
  content: string;
  isUser: boolean;
};


/*=================
//Context Arguments
===================*/
export interface MessageArgs{
  userMessage: string;
}


/*=================
//API Request used in service call
===================*/
export interface MessageRequest{
  userMessage: string;
}


/*=================
//API Response
===================*/
export interface MessageResponse {
  fortune:string;
}


export interface ChatbotMessageMap {
  messages:string;
}
export type FortuneCategory = string;