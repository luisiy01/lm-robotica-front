import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from "react-router";
import { Mainroutes } from './routes/Mainroutes';
import './main.css'
import { Toaster } from "sonner";

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Toaster richColors position="top-right" />
      <Mainroutes />
    </BrowserRouter>
  </StrictMode>,
)
