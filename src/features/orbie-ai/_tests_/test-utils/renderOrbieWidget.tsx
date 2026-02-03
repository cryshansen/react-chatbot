import { render } from "@testing-library/react";
import { OrbieWidget } from "../../components/OrbieWidget";
import type { OrbieConfig } from "../../schemas/OrbieConfig";

const defaultConfig: OrbieConfig = {
  apiUrl: "https://example.com",
  endpoint: "/chatbot",
};

type RenderOptions = {
  config?: OrbieConfig;
  chatbotName?: string;
  initialPrompt?: string;
  theme?: "light" | "dark";
};

export function renderOrbieWidget({
  config = defaultConfig,
  chatbotName = "Oracle",
  initialPrompt = "Hello!",
  theme = "light",
}: RenderOptions = {}) {
  return render(
    <OrbieWidget
      config={config}
      chatbotName={chatbotName}
      initialPrompt={initialPrompt}
      theme={theme}
    />
  );
}
