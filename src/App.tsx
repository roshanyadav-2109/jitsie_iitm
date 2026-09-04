import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import { Analytics } from "@vercel/analytics/react";
import Index from "./pages/Index";
import Companies from "./pages/Companies";
import CompanyDetail from "./pages/CompanyDetail";
import Initiatives from "./pages/Initiatives";
import InitiativeDetail from "./pages/InitiativeDetail";
import Team from "./pages/Team";
import Events from "./pages/Events";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import StartupOpenings from "./pages/StartupOpenings";
import Membership from "./pages/Membership";
import PostOpening from "./pages/PostOpening";
import PastSpeakers from "./pages/PastSpeakers";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/companies" element={<Companies />} />
            <Route path="/companies/:slug" element={<CompanyDetail />} />
            <Route path="/initiatives" element={<Initiatives />} />
            <Route path="/initiatives/:id" element={<InitiativeDetail />} />
            <Route path="/openings" element={<StartupOpenings />} />
            <Route path="/speakers" element={<PastSpeakers />} />
            <Route path="/leadership" element={<Team />} />
            <Route path="/events" element={<Events />} />
            <Route path="/membership" element={<Membership />} />
            <Route path="/post-opening" element={<PostOpening />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
      <Analytics />
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
