// src/components/Header.tsx
import React from 'react';
import {Sun, Moon } from 'lucide-react';

import { useChatbot } from '../../context/ChatbotContext';

import './ChatHeader.css'; // Optional: for styling


interface HeaderProps {
  darkMode: boolean;
  setDarkMode: React.Dispatch<React.SetStateAction<boolean>>;
}
export default function  ChatHeader({darkMode,setDarkMode}:HeaderProps) {

const {chatbotName} = useChatbot();

const theme = darkMode
      ? "bg-slate-950 text-white border-slate-800"
      : "bg-white text-slate-950 border-slate-200";
const themeTextColor = darkMode
      ? "text-slate-100"
      : "text-slate-900"

  return (
    <>    
    <header
        className={`flex  items-center p-2 border-b shadow-sm transition-colors
          ${theme}
        `}
      >
        <div className="flex flex-col gap-2">
          <h1 className={`text-4xl  ${themeTextColor}`}>{chatbotName}</h1>
          <div className="bot-status flex items-center gap-2">     
            <div className="status-indicator" />
            <span className="text-slate-400">Online</span>
          </div>
        </div>
        <div className="flex gap-2 ml-auto">
            <button
              onClick={() => setDarkMode((prev)=>!prev)}
              className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-colors
                  ${darkMode
                    ? "bg-slate-800 hover:bg-slate-700 text-white"
                    : "bg-slate-100 hover:bg-slate-200 text-slate-900"}
                `}
              >
              {darkMode ? <Sun size={18} /> : <Moon size={18} />}

            </button>
          </div>
    </header>
  
    
    </>
  );
};


