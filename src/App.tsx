import { useState } from "react";
import { API_CONFIG } from "./config/env";
import { OrbieWidget } from "./features/orbie-ai/components/OrbieWidget";
import { ORBIE_FEATURE_CONFIG } from "./features/orbie-ai/config/orbieFeatureConfig";


import './App.css'

const  CHATBOT_BASE_URL  = API_CONFIG.CHATBOT_BASE_URL;
const  CHATBOT_BASE_ENDPOINT = API_CONFIG.CHATBOT_API_ENDPOINT;
const config = {
  apiUrl: CHATBOT_BASE_URL,
  endpoint: CHATBOT_BASE_ENDPOINT,
};
const chatbotName = ORBIE_FEATURE_CONFIG.chatbotName;

function App() {
  //pass these vars to the Layout
  const [darkMode, setDarkMode] = useState(false);

  const resolvedInitialPrompt =
    `Hello! I'm ${chatbotName}. Ask me about your future 🔮`;

  return (
    <>
      <div className={` mt-6 p-6  ${darkMode ? "bg-slate-950 " : "bg-white "}`}>
        <div className={`flex flex-col w-1/2 m-auto mt-6 p-6 transition duration-300 ease-in-out  border border-slate-200
        ${darkMode ? "bg-slate-950 " : "bg-white "}
        `}>
          {/* Orbie embedded as a widget usage */}
          <OrbieWidget
            config={config}
            chatbotName= {chatbotName}
            theme={darkMode ? "dark" : "light"}
            initialPrompt={resolvedInitialPrompt}
            context="home-page"
            userId="123"
          />
        </div>
      </div>
    </>
  );
}
export default App;
