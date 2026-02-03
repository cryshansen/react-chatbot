# Orbie AI — Drop-In Chatbot Widget for React

Orbie AI is a self-contained, API-agnostic chatbot widget for React applications.

It’s designed to be:

-  Drop-in
- Feature-scoped
- API-agnostic
- Fully testable
- Themeable

No app-level providers required.

### Features

Plug-and-play React widget

Works with any GET-based chatbot API

Isolated internal state

Optional context + user identification

Dark / light theme support

Built-in loading + error handling

Widget-level integration tests

---

### Installation

Clone or copy the orbie-ai feature into your project:
```bash
src/features/orbie-ai
```

Or install via your internal package system if published.

---

### Environment Variables

Orbie does not read environment variables directly.

Your host app owns configuration.

Example .env:
```env
VITE_CHATBOT_API_URL=http://localhost:8080/api/fortune-ai
VITE_CHATBOT_API_ENDPOINT=?category=
VITE_CHATBOT_NAME=Oracle
```

### Host App Setup
```ts
src/config/env.ts
export const API_CONFIG = {
  CHATBOT_BASE_URL: import.meta.env.VITE_CHATBOT_API_URL,
  CHATBOT_API_ENDPOINT: import.meta.env.VITE_CHATBOT_API_ENDPOINT,
};
```
---

### Usage
```tsx
import { OrbieWidget } from "./features/orbie-ai/components/OrbieWidget";
import { API_CONFIG } from "./config/env";

const config = {
  apiUrl: API_CONFIG.CHATBOT_BASE_URL,
  endpoint: API_CONFIG.CHATBOT_API_ENDPOINT,
};

<OrbieWidget
  config={config}
  chatbotName="Oracle"
  theme="light"
  initialPrompt="Ask me about your future 🔮"
  context="home-page"
  userId="123"
/>;
```
---

### Props

|Prop	| Type	| Required	| Description |
| config |	{ apiUrl: string; endpoint: string }	| ✅	| API configuration |
| chatbotName	| string	| ✅	| Display name of the bot|
|initialPrompt |	string	| ❌	| First system message|
|theme	| "light | dark"	| ❌| 	UI theme|
|context	| string	| ❌	| Usage context (page, app area)|
|userId	| string	| ❌	| Optional user identifier |

---

### Testing

Widget-level tests are included:
```bash
features/orbie-ai/_tests_/
```

Run tests:
```bash
npm run test
```

The widget is tested independently of the host app, ensuring safe reuse.

--- 

### What Orbie Does NOT Do

- Enforce authentication
- Assume API response structure beyond what you define
- Modify global app state
- Depend on app-level routing

That’s intentional.

---

### Design Philosophy

Orbie is built around feature isolation.

If you can remove a feature without breaking your app — you’ve done it right.