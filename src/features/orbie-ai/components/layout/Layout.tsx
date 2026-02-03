// src/components/Layout.tsx
import React from 'react';


import ChatHeader from  "./ChatHeader";
import MessageForm from "../elements/MessageForm";
import ChatMessageBox from "../elements/ChatMessageBox";
// Import Footer or any other shared components here

interface LayoutProps {
  darkMode: boolean;
  setDarkMode: React.Dispatch<React.SetStateAction<boolean>>;
}


export default function Layout({darkMode, setDarkMode }:LayoutProps ) {
   //const [darkMode, setDarkMode] = useState(false);
   // Define header props here or pass them from a higher level
  
  return (
    <>
      <ChatHeader  darkMode={darkMode} setDarkMode={setDarkMode}/>
      <ChatMessageBox darkMode={darkMode} />
      <div className={`input-container  ${darkMode ? "bg-slate-950 " : "bg-white "} `}>
        <MessageForm darkMode={darkMode}/>
      </div>
    </>
  );
};


