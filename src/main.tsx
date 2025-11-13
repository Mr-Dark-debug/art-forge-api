import { createRoot } from "react-dom/client"
import App from "./App.tsx"
import "./index.css"

// Initialize theme before rendering the app
const initializeTheme = () => {
  const savedTheme = localStorage.getItem("theme")
  const systemPrefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches
  
  // Default to light mode if no preference is saved
  const initialTheme = savedTheme === "dark" || (savedTheme !== "light" && systemPrefersDark)
  
  if (initialTheme) {
    document.documentElement.classList.add("dark")
  } else {
    document.documentElement.classList.remove("dark")
  }
}

initializeTheme()

createRoot(document.getElementById("root")!).render(<App />)