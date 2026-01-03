import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Menu, X } from 'lucide-react';
import { useState } from 'react';
import feedxLogo from '@/assets/feedx-logo.png';
import fxbotIcon from '@/assets/fxbot-icon.svg';

const Navbar = () => {
  const { isAuthenticated, user, logout } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-40 border-b border-border bg-background/80 backdrop-blur-xl shadow-sm">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center py-3">
          {/* Logo - Left */}
          <Link to="/" className="flex items-center space-x-3 flex-shrink-0">
            <img src={feedxLogo} alt="FEEDX Logo" className="h-10 w-10 sm:h-12 sm:w-12" />
            <div>
              <h1 className="text-lg sm:text-xl font-bold text-[hsl(var(--foreground))]">FEEDX</h1>
              <p className="text-[11px] font-bold text-[hsl(var(--foreground))] leading-tight">Listen • Respond • Resolve</p>
            </div>
          </Link>

          {/* Desktop Navigation Links - Center */}
          <div className="hidden lg:flex items-center justify-center space-x-6 flex-1">
            <Link to="/" className="text-xs font-medium text-foreground hover:text-primary transition-smooth">
              Home
            </Link>
            <Link to="/about" className="text-xs font-medium text-foreground hover:text-primary transition-smooth">
              About
            </Link>
            <Link to="/updates" className="text-xs font-medium text-foreground hover:text-primary transition-smooth">
              Updates
            </Link>
            <Link to="/projects" className="text-xs font-medium text-foreground hover:text-primary transition-smooth">
              Projects
            </Link>
            <Link to="/resources" className="text-xs font-medium text-foreground hover:text-primary transition-smooth">
              Resources
            </Link>
            <Link to="/institute-profile" className="text-xs font-medium text-foreground hover:text-primary transition-smooth">
              Institute Profile
            </Link>
            <Link to="/student-analytics" className="text-xs font-medium text-foreground hover:text-primary transition-smooth">
              Student Analytics
            </Link>
            <Link to="/spotlight" className="text-xs font-medium text-foreground hover:text-primary transition-smooth">
              Spotlight
            </Link>
            <div onClick={() => window.open('https://collegeinfo.diplomageeks.com/predictor/telangana-polycet/', '_blank')} className="text-xs font-medium text-foreground hover:text-primary transition-smooth cursor-pointer">
              TS POLYCET Predictor
            </div>
            {/* Removed Join and Jobs from menu */}
          </div>

          {/* Right Side Buttons */}
          <div className="flex items-center space-x-3 flex-shrink-0 ml-auto">
            {/* FX Bot Button - Desktop only */}
            <Link to="/fxbot" className="hidden lg:block">
              <Button size="sm" variant="outline" className="flex items-center gap-2 hover:bg-primary hover:text-primary-foreground transition-smooth border-border text-foreground">
                <img src={fxbotIcon} alt="FX Bot" className="w-4 h-4" />
                FX Bot
              </Button>
            </Link>

            {/* Join Us Button - Desktop */}
            <Link to="/join" className="hidden lg:block">
              <Button size="sm" className="bg-gradient-brand text-white hover:opacity-90 transition-smooth shadow-glow">
                Join Us
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
              <div className="hidden lg:flex items-center space-x-3"></div>
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
          <div className="lg:hidden py-4 border-t border-border bg-background/95 backdrop-blur-xl">
            <div className="flex flex-col space-y-3">
              <Link
                to="/"
                className="text-sm font-medium text-foreground hover:text-primary transition-smooth px-3 py-2 rounded-md hover:bg-primary/10"
                onClick={() => setMobileMenuOpen(false)}
              >
                Home
              </Link>
              <Link
                to="/about"
                className="text-sm font-medium text-foreground hover:text-primary transition-smooth px-3 py-2 rounded-md hover:bg-primary/10"
                onClick={() => setMobileMenuOpen(false)}
              >
                About
              </Link>
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
                to="/institute-profile"
                className="text-sm font-medium text-foreground hover:text-primary transition-smooth px-3 py-2 rounded-md hover:bg-primary/10"
                onClick={() => setMobileMenuOpen(false)}
              >
                Institute Profile
              </Link>
              <Link
                to="/student-analytics"
                className="text-sm font-medium text-foreground hover:text-primary transition-smooth px-3 py-2 rounded-md hover:bg-primary/10"
                onClick={() => setMobileMenuOpen(false)}
              >
                Student Analytics
              </Link>
              <Link
                to="/spotlight"
                className="text-sm font-medium text-foreground hover:text-primary transition-smooth px-3 py-2 rounded-md hover:bg-primary/10"
                onClick={() => setMobileMenuOpen(false)}
              >
                Spotlight
              </Link>
              <div
                onClick={() => {
                  window.open('https://collegeinfo.diplomageeks.com/predictor/telangana-polycet/', '_blank');
                  setMobileMenuOpen(false);
                }}
                className="text-sm font-medium text-foreground hover:text-primary transition-smooth px-3 py-2 rounded-md hover:bg-primary/10 cursor-pointer"
              >
                TS POLYCET Predictor
              </div>
              {/* Removed Join and Jobs from mobile menu */}

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
                <div className="px-3 py-2 text-sm text-muted-foreground">Welcome</div>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;