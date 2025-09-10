import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

/* 🚫 Kill Lovable before React loads */
const killLovable = () => {
  document.querySelectorAll('[title="Edit with Lovable"], .lovable-badge, .lovable-edit, a[href*="lovable.dev"], iframe[src*="lovable.dev"]').forEach(el => el.remove());
};
killLovable();
new MutationObserver(killLovable).observe(document.documentElement, { childList: true, subtree: true });

createRoot(document.getElementById("root")!).render(<App />);
