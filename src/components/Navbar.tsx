import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useTheme } from '@/contexts/ThemeContext';
import { Menu, X, Moon, Sun } from 'lucide-react';
import { useState } from 'react';
import feedxLogo from '@/assets/feedx-logo.png';
import fxbotIcon from '@/assets/fxbot-icon.svg';

const Navbar = () => {
  const { isAuthenticated, user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-40 glass backdrop-blur-xl border-b border-white/20 shadow-lg">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center py-5">
          {/* Logo - Left */}
          <Link to="/" className="flex items-center space-x-3 flex-shrink-0">
            <img src={feedxLogo} alt="FEEDX Polytechnic Logo" className="h-10 w-10 sm:h-12 sm:w-12" />
            <div>
              <h1 className="text-lg sm:text-xl font-bold text-gradient">FEEDX Polytechnic</h1>
              <p className="text-xs text-muted-foreground hidden sm:block">Connecting Students, Careers & Growth</p>
            </div>
          </Link>

          {/* Desktop Navigation Links - Center */}
          <div className="hidden lg:flex items-center justify-center space-x-6 flex-1">
            <Link to="/" className="text-xs font-medium text-foreground hover:text-primary transition-smooth">
              Home
            </Link>
            <a href="#about" className="text-xs font-medium text-foreground hover:text-primary transition-smooth">
              About
            </a>
            <Link to="/updates" className="text-xs font-medium text-foreground hover:text-primary transition-smooth">
              Updates
            </Link>
            <Link to="/projects" className="text-xs font-medium text-foreground hover:text-primary transition-smooth">
              Projects
            </Link>
            <Link to="/resources" className="text-xs font-medium text-foreground hover:text-primary transition-smooth">
              Resources
            </Link>
            <Link to="/jobs" className="text-xs font-medium text-foreground hover:text-primary transition-smooth">
              Jobs
            </Link>
            <Link to="/view-attendance" className="text-xs font-medium text-foreground hover:text-primary transition-smooth">
              Attendance
            </Link>
            <Link to="/spotlight" className="text-xs font-medium text-foreground hover:text-primary transition-smooth">
              Spotlight
            </Link>
            <Link to="/join" className="text-xs font-medium text-foreground hover:text-primary transition-smooth">
              Join
            </Link>
          </div>

          {/* Right Side Buttons */}
          <div className="flex items-center space-x-3 flex-shrink-0 ml-auto">
            {/* Theme Toggle - Animated Sun/Moon */}
            <button
              onClick={toggleTheme}
              className={`relative inline-flex h-5 w-10 items-center rounded-full transition-all duration-500 focus:outline-none focus:ring-1 focus:ring-primary focus:ring-offset-1 shadow-sm ${
                theme === 'dark' ? 'bg-[hsl(var(--primary))]' : 'bg-[hsl(var(--secondary))]'
              }`}
              aria-label="Toggle theme"
            >
              {/* Sliding Circle */}
              <span
                className={`inline-flex h-4 w-4 items-center justify-center transform rounded-full bg-white shadow-sm transition-all duration-500 ${
                  theme === 'dark' ? 'translate-x-5' : 'translate-x-0.5'
                }`}
              >
                {theme === 'light' ? (
                  <svg className="h-2.5 w-2.5" viewBox="0 0 24 24" fill="none">
                    <circle cx="12" cy="12" r="4" fill="hsl(var(--secondary))" />
                    <path d="M12 2v2m0 16v2M4.22 4.22l1.42 1.42m12.72 12.72l1.42 1.42M2 12h2m16 0h2M4.22 19.78l1.42-1.42m12.72-12.72l1.42-1.42" 
                      stroke="hsl(var(--secondary))" strokeWidth="2" strokeLinecap="round"/>
                  </svg>
                ) : (
                  <svg className="h-2.5 w-2.5" viewBox="0 0 24 24" fill="none">
                    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" fill="hsl(var(--primary))" />
                    <circle cx="15" cy="8" r="1.2" fill="hsl(var(--muted-foreground))" opacity="0.6" />
                    <circle cx="18" cy="12" r="0.8" fill="hsl(var(--muted-foreground))" opacity="0.5" />
                    <circle cx="16" cy="15" r="0.6" fill="hsl(var(--muted-foreground))" opacity="0.4" />
                  </svg>
                )}
              </span>
            </button>

            {/* FX Bot Button - Desktop only */}
            <Link to="/fxbot" className="hidden lg:block">
              <Button size="sm" variant="outline" className="flex items-center gap-2 hover:bg-primary hover:text-primary-foreground transition-smooth">
                <img src={fxbotIcon} alt="FX Bot" className="w-4 h-4" />
                FX Bot
              </Button>
            </Link>

            {/* Desktop Auth Buttons */}
            {isAuthenticated ? (
              <div className="hidden lg:flex items-center space-x-3">
                <span className="text-sm text-muted-foreground hidden sm:inline">
                  Welcome, {user?.name || user?.email}
                </span>
                <Button size="sm" variant="ghost" onClick={logout}>
                  Sign Out
                </Button>
              </div>
            ) : (
              <div className="hidden lg:flex items-center space-x-3">
                <Link to="/join">
                  <Button size="sm" className="bg-gradient-brand hover:opacity-90 transition-smooth">
                    Join Community
                  </Button>
                </Link>
              </div>
            )}

            {/* Mobile Menu Toggle */}
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden py-4 border-t border-white/20">
            <div className="flex flex-col space-y-3">
              <Link 
                to="/" 
                className="text-sm font-medium text-foreground hover:text-primary transition-smooth px-3 py-2 rounded-md hover:bg-primary/10"
                onClick={() => setMobileMenuOpen(false)}
              >
                Home
              </Link>
              <a 
                href="#about" 
                className="text-sm font-medium text-foreground hover:text-primary transition-smooth px-3 py-2 rounded-md hover:bg-primary/10"
                onClick={() => setMobileMenuOpen(false)}
              >
                About
              </a>
              <Link 
                to="/updates" 
                className="text-sm font-medium text-foreground hover:text-primary transition-smooth px-3 py-2 rounded-md hover:bg-primary/10"
                onClick={() => setMobileMenuOpen(false)}
              >
                Updates
              </Link>
              <Link 
                to="/projects" 
                className="text-sm font-medium text-foreground hover:text-primary transition-smooth px-3 py-2 rounded-md hover:bg-primary/10"
                onClick={() => setMobileMenuOpen(false)}
              >
                Projects
              </Link>
              <Link 
                to="/resources" 
                className="text-sm font-medium text-foreground hover:text-primary transition-smooth px-3 py-2 rounded-md hover:bg-primary/10"
                onClick={() => setMobileMenuOpen(false)}
              >
                Resources
              </Link>
              <Link 
                to="/jobs" 
                className="text-sm font-medium text-foreground hover:text-primary transition-smooth px-3 py-2 rounded-md hover:bg-primary/10"
                onClick={() => setMobileMenuOpen(false)}
              >
                Jobs
              </Link>
              <Link 
                to="/view-attendance" 
                className="text-sm font-medium text-foreground hover:text-primary transition-smooth px-3 py-2 rounded-md hover:bg-primary/10"
                onClick={() => setMobileMenuOpen(false)}
              >
                Attendance
              </Link>
              <Link 
                to="/spotlight" 
                className="text-sm font-medium text-foreground hover:text-primary transition-smooth px-3 py-2 rounded-md hover:bg-primary/10"
                onClick={() => setMobileMenuOpen(false)}
              >
                Spotlight
              </Link>
              <Link 
                to="/join" 
                className="text-sm font-medium text-foreground hover:text-primary transition-smooth px-3 py-2 rounded-md hover:bg-primary/10"
                onClick={() => setMobileMenuOpen(false)}
              >
                Join
              </Link>
              
              {/* Mobile FX Bot */}
              <Link 
                to="/fxbot" 
                className="text-sm font-medium text-foreground hover:text-primary transition-smooth px-3 py-2 rounded-md hover:bg-primary/10 flex items-center gap-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                <img src={fxbotIcon} alt="FX Bot" className="w-4 h-4" />
                FX Bot
              </Link>

              {/* Mobile Auth */}
              {isAuthenticated ? (
                <>
                  <div className="px-3 py-2 text-sm text-muted-foreground">
                    Welcome, {user?.name || user?.email}
                  </div>
                  <Button 
                    size="sm" 
                    variant="ghost" 
                    onClick={() => {
                      logout();
                      setMobileMenuOpen(false);
                    }}
                    className="w-full justify-start"
                  >
                    Sign Out
                  </Button>
                </>
              ) : (
                <Link to="/join" onClick={() => setMobileMenuOpen(false)}>
                  <Button size="sm" className="w-full bg-gradient-brand hover:opacity-90 transition-smooth">
                    Join Community
                  </Button>
                </Link>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;