import { useEffect, useState } from "react";
import { useLoading } from "../../context/LoadingContext";
import Layout from "./Layout";

type ChatWindowProps = {
  theme: 'light' | 'dark';
};

function ChatWindow({ theme }: ChatWindowProps) {
  const { showLoader, hideLoader } = useLoading();
  const [darkMode, setDarkMode] = useState(theme === 'dark');

  useEffect(() => {
    showLoader();
    const timeout = setTimeout(hideLoader, 800);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <div 
      className={`orbie-widget mt-6 p-4 ${
        darkMode ? "bg-slate-950" : "bg-white"
      }`}
    >
      <div id="orbie-root" data-testid="orbie-root" aria-label="orbie-root"
        className={`flex flex-col max-w-md mx-auto p-4 border border-slate-200 transition
        ${darkMode ? "bg-slate-950" : "bg-white"}
        `}
      >
        <Layout darkMode={darkMode} setDarkMode={setDarkMode} />
      </div>
    </div>
  );
}

export default ChatWindow;
