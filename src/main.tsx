import { createRoot } from "react-dom/client"
import App from "./App.tsx"
import "./index.css"

// Initialize theme before rendering the app
const initializeTheme = () => {
  const savedTheme = localStorage.getItem("theme")
  
  // Always default to light mode regardless of system preferences
  const initialTheme = savedTheme === "dark"
  
  if (initialTheme) {
    document.documentElement.classList.add("dark")
  } else {
    document.documentElement.classList.remove("dark")
  }
}

initializeTheme()

createRoot(document.getElementById("root")!).render(<App />)