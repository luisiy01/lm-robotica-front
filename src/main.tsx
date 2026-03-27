import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from "react-router";
import { Mainroutes } from './routes/Mainroutes';
import './main.css'
import { Toaster } from "sonner";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Toaster richColors position="top-right" />
        <Mainroutes />
      </BrowserRouter>
    </QueryClientProvider>
  </StrictMode>,
)
