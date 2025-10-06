import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";
import Index from "./pages/Index";
import CandidateRegister from "./pages/Candidate/Register";
import CandidateInterview from "./pages/Candidate/Interview";
import InterviewerSignIn from "./pages/Interviewer/SignIn";
import InterviewerDashboard from "./pages/Interviewer/Dashboard";
import InterviewerCandidateDetail from "./pages/Interviewer/CandidateDetail";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Index />} />
          
          {/* Candidate Routes - No Auth Required */}
          <Route path="/candidate/register" element={<CandidateRegister />} />
          <Route path="/candidate/interview/:candidateId" element={<CandidateInterview />} />
          
          {/* Interviewer Routes - Auth Required */}
          <Route path="/interviewer/signin" element={<InterviewerSignIn />} />
          <Route 
            path="/interviewer/dashboard" 
            element={
              <ProtectedRoute>
                <InterviewerDashboard />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/interviewer/candidate/:id" 
            element={
              <ProtectedRoute>
                <InterviewerCandidateDetail />
              </ProtectedRoute>
            } 
          />
          
          {/* Catch-all 404 */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
