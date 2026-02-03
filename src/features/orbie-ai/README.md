# Orbie Widget

An embeddable AI chatbot widget built with React and TypeScript.

Orbie is designed as a **feature**, not an app — meaning it can be dropped into any React page without routing, global state, or app-level assumptions.

---

## Features

- Drop-in React widget
- Fully isolated state & context
- Multi-instance safe
- Configurable via props
- No routing required
- Clean feature-based architecture

---

## Installation

Clone the repo:

```bash
git clone https://github.com/cryshansen/react-chatbot
cd react-chatbot
npm install
```

--- 

## Usage

```tsx

import { OrbieWidget } from "./features/orbie";

function App() {
  return (
    <OrbieWidget
      theme="dark"
      initialPrompt="Ask me about your future 🔮"
    />
  );
}

```

⚙️ Configuration
```text
Prop	Type	Description
theme	"light" | "dark"	Widget theme
initialPrompt	string	Initial system message
context	string	Optional page/context hint
userId	string	Optional user identifier
```

🧠 Architecture
```text
features/orbie/
├─ components
├─ context
├─ services
├─ schemas
└─ index.ts
```

- OrbieWidget is the public API
- All state is feature-scoped
- No global dependencies

---

## Development

The included app serves as a demo host.
```bash
npm run dev
```

Testing 
```bash
npm install -D vitest jsdom @testing-library/react @testing-library/jest-dom @testing-library/user-event

```