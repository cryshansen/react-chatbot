// features/orbie/components/OrbieWidget.tsx
import { LoadingProvider } from '../context/LoadingContext';
import { ChatbotProvider } from '../context/ChatbotContext';
import ChatWindow from './layout/ChatWindow';
import type { OrbieConfig } from '../schemas/OrbieConfig';
import { ORBIE_FEATURE_CONFIG } from "../config/orbieFeatureConfig";



type OrbieWidgetProps = {
  config:OrbieConfig; 
  chatbotName: string;
  context?: string;
  initialPrompt?: string;
  userId?: string;
  theme?: 'light' | 'dark';
//   onEvent?: (event: OrbieEvent) => void;
};

export function OrbieWidget({
  config,
  chatbotName,
  context,
  initialPrompt,
  userId,
  theme = 'light',
//   onEvent,
}: OrbieWidgetProps) {

const resolvedName =
    chatbotName ?? ORBIE_FEATURE_CONFIG.chatbotName ?? "Orbie AI";

const resolvedInitialPrompt =
    initialPrompt ??
    `Hello ${userId} ! I'm ${resolvedName}. How can I help you today?`;

  return (
    <div data-orbie-root data-theme={theme}>
      <LoadingProvider>
        <ChatbotProvider
          config={config}
          chatbotName={resolvedName}
          context={context}
          initialPrompt={resolvedInitialPrompt}
          userId={userId}
        //   onEvent={onEvent}
        >
          <ChatWindow theme={theme} />
        </ChatbotProvider>
      </LoadingProvider>
    </div>
  );
}

