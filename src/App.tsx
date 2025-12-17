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
import Notifications from "./pages/Notifications";
import InstituteProfile from "./pages/InstituteProfile";
// Removed Jobs page
import About from "./pages/About";
import AttendanceCalculator from "./pages/AttendanceCalculator";
import Spotlight from "./pages/Spotlight";
import Join from "./pages/Join";
import StudentAnalytics from "./pages/StudentAnalytics";
import AdminPanel from "./pages/AdminPanel";
import AddNotification from "./pages/admin/AddNotification";
import AddUpdate from "./pages/admin/AddUpdate";
import AddResource from "./pages/admin/AddResource";
import AddEvent from "./pages/admin/AddEvent";
import AddSpotlight from "./pages/admin/AddSpotlight";
import AddTestimonial from "./pages/admin/AddTestimonial";
import AddInstitute from "./pages/admin/AddInstitute";
import ResourceDetail from "./pages/ResourceDetail";
import InstituteDetail from "./pages/InstituteDetail";
import AdminLogin from "./pages/AdminLogin";
import UserManagement from "./pages/UserManagement";
import LoginLogs from "./pages/LoginLogs";
// ProtectedRoute removed - using simple localStorage check in components
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const queryClient = new QueryClient();

const ScrollToTop = () => {
  const location = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
  }, [location.pathname]);
  return null;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider>
      <AuthProvider>
        <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          {/* Global background accents */}
          <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
            <div className="absolute -top-24 -left-24 h-80 w-80 rounded-full bg-primary/10 blur-3xl" />
            <div className="absolute top-40 -right-32 h-96 w-96 rounded-full bg-secondary/10 blur-3xl" />
            <div className="absolute bottom-[-140px] left-1/3 h-[420px] w-[420px] rounded-full bg-primary/5 blur-3xl" />
          </div>
          {/* Scroll to top on route change */}
          <ScrollToTop />
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/about" element={<About />} />
            <Route path="/updates" element={<Updates />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/resources" element={<Resources />} />
            <Route path="/notifications" element={<Notifications />} />
            <Route path="/resources/:id" element={<ResourceDetail />} />
            <Route path="/institute-profile" element={<InstituteProfile />} />
            <Route path="/institute/:code" element={<InstituteDetail />} />
            {/* Jobs route removed */}
            <Route path="/attendance" element={<AttendanceCalculator />} />
            <Route path="/student-analytics" element={<StudentAnalytics />} />
            <Route path="/spotlight" element={<Spotlight />} />
            <Route path="/join" element={<Join />} />
            <Route path="/fxbot" element={<FXBot />} />
            <Route path="/subscribe" element={<Subscribe />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/get-started" element={<GetStarted />} />
            <Route path="/view-attendance" element={<ViewAttendance />} />
            <Route path="/view-results" element={<ViewResults />} />
            
            {/* Admin Routes */}
            <Route path="/admin-login" element={<AdminLogin />} />
            <Route path="/admin" element={<AdminPanel />} />
            <Route path="/admin/notifications" element={<AddNotification />} />
            <Route path="/admin/updates" element={<AddUpdate />} />
            <Route path="/admin/resources" element={<AddResource />} />
            <Route path="/admin/events" element={<AddEvent />} />
            <Route path="/admin/spotlight" element={<AddSpotlight />} />
            <Route path="/admin/testimonials" element={<AddTestimonial />} />
            <Route path="/admin/institutes" element={<AddInstitute />} />
            <Route path="/admin/users" element={<UserManagement />} />
            <Route path="/admin/logs" element={<LoginLogs />} />
            
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
