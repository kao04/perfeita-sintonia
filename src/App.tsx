import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Register from "./pages/Register";
import Quiz from "./pages/Quiz";
import Result from "./pages/Result";
import Premium from "./pages/Premium";
import Report from "./pages/Report";
import UserArea from "./pages/UserArea";
import AdminArea from "./pages/AdminArea"; // Se tiver a área admin
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/register" element={<Register />} />
          
          {/* MUDANÇA AQUI: Adicionamos /:person para aceitar /quiz/user ou /quiz/partner */}
          <Route path="/quiz/:person" element={<Quiz />} />
          
          <Route path="/result" element={<Result />} />
          <Route path="/premium" element={<Premium />} />
          <Route path="/report" element={<Report />} />
          <Route path="/user-area" element={<UserArea />} />
          <Route path="/admin" element={<AdminArea />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;