import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import { ThemeProvider } from "@/contexts/ThemeContext";
import Index from "./pages/Index";
import UnderDevelopment from "./pages/UnderDevelopment";
import Subscribe from "./pages/Subscribe";
import SignIn from "./pages/SignIn";
import GetStarted from "./pages/GetStarted";
import ViewAttendance from "./pages/ViewAttendance";
import ViewResults from "./pages/ViewResults";
import FXBot from "./pages/FXBot";
import NotFound from "./pages/NotFound";
import Updates from "./pages/Updates";
import Projects from "./pages/Projects";
import Resources from "./pages/Resources";
import Jobs from "./pages/Jobs";
import AttendanceCalculator from "./pages/AttendanceCalculator";
import Gallery from "./pages/Gallery";
import Join from "./pages/Join";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider>
      <AuthProvider>
        <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/updates" element={<Updates />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/resources" element={<Resources />} />
            <Route path="/jobs" element={<Jobs />} />
            <Route path="/attendance-calculator" element={<AttendanceCalculator />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/join" element={<Join />} />
            <Route path="/fxbot" element={<FXBot />} />
            <Route path="/subscribe" element={<Subscribe />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/get-started" element={<GetStarted />} />
            <Route path="/view-attendance" element={<ViewAttendance />} />
            <Route path="/view-results" element={<ViewResults />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
        </TooltipProvider>
      </AuthProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
