import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useTheme } from '@/contexts/ThemeContext';
import { Moon, Sun, Menu, X } from 'lucide-react';
import { useState } from 'react';
import feedxLogo from '@/assets/feedx-logo.png';
import fxbotIcon from '@/assets/fxbot-icon.svg';

const Navbar = () => {
  const { isAuthenticated, user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const navLinks = [
    { to: '/', label: 'Home' },
    { to: '/updates', label: 'Updates' },
    { to: '/projects', label: 'Projects' },
    { to: '/resources', label: 'Resources' },
    { to: '/jobs', label: 'Jobs' },
    { to: '/attendance-calculator', label: 'Attendance' },
    { to: '/gallery', label: 'Gallery' },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-40 glass backdrop-blur-xl border-b border-white/20 shadow-lg">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between py-4">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3 flex-shrink-0">
            <img src={feedxLogo} alt="FEEDX Polytechnic Logo" className="h-10 w-10" />
            <div className="hidden sm:block">
              <h1 className="text-lg font-bold text-gradient">FEEDX Polytechnic</h1>
              <p className="text-xs text-muted-foreground">Connecting Students & Careers</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-4">
            <Link to="/" className="text-sm font-medium text-foreground hover:text-primary transition-colors duration-200">
              Home
            </Link>
            <Link to="/updates" className="text-sm font-medium text-foreground hover:text-primary transition-colors duration-200">
              Updates
            </Link>
            <Link to="/projects" className="text-sm font-medium text-foreground hover:text-primary transition-colors duration-200">
              Projects
            </Link>
            <Link to="/resources" className="text-sm font-medium text-foreground hover:text-primary transition-colors duration-200">
              Resources
            </Link>
            <Link to="/jobs" className="text-sm font-medium text-foreground hover:text-primary transition-colors duration-200">
              Jobs
            </Link>
            <Link to="/attendance-calculator" className="text-sm font-medium text-foreground hover:text-primary transition-colors duration-200">
              Attendance
            </Link>
            <Link to="/gallery" className="text-sm font-medium text-foreground hover:text-primary transition-colors duration-200">
              Gallery
            </Link>
          </div>

          {/* Right Side Actions */}
          <div className="flex items-center space-x-3 flex-shrink-0">
            {/* Theme Toggle */}
            <div className="flex items-center space-x-2">
              <Button
                variant="ghost"
                size="icon"
                onClick={toggleTheme}
                className="hover:bg-primary/10 transition-colors duration-200"
                aria-label="Toggle theme"
              >
                {theme === 'light' ? (
                  <Moon className="w-5 h-5" />
                ) : (
                  <Sun className="w-5 h-5" />
                )}
              </Button>
              <span className="text-sm font-medium text-muted-foreground capitalize hidden sm:inline">
                {theme}
              </span>
            </div>

            {/* FX Bot Button */}
            <Link to="/fxbot">
              <Button
                variant="outline"
                size="sm"
                className="hidden sm:flex items-center gap-2 hover:bg-primary hover:text-primary-foreground transition-colors duration-200"
              >
                <img src={fxbotIcon} alt="FX Bot" className="w-4 h-4" />
                <span className="hidden md:inline">FX Bot</span>
              </Button>
            </Link>

            {isAuthenticated ? (
              <div className="flex items-center space-x-2">
                <span className="text-sm text-muted-foreground hidden md:inline">
                  Hi, {user?.name?.split(' ')[0] || 'User'}
                </span>
                <Button variant="ghost" size="sm" onClick={logout}>
                  Sign Out
                </Button>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <Link to="/updates">
                  <Button variant="outline" size="sm" className="hover:bg-primary hover:text-primary-foreground transition-colors duration-200">
                    Updates
                  </Button>
                </Link>
                <Link to="/join">
                  <Button size="sm" className="bg-gradient-brand hover:opacity-90 transition-all duration-200">
                    Join
                  </Button>
                </Link>
              </div>
            )}

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleMenu}
              className="lg:hidden hover:bg-primary/10 transition-colors duration-200"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="lg:hidden border-t border-white/10 py-4">
            <div className="flex flex-col space-y-3">
              {navLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  className="text-sm font-medium text-foreground hover:text-primary transition-colors duration-200 px-2 py-1"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
              <div className="pt-2 border-t border-white/10">
                <Link to="/fxbot" onClick={() => setIsMenuOpen(false)}>
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full flex items-center justify-center gap-2 hover:bg-primary hover:text-primary-foreground transition-colors duration-200"
                  >
                    <img src={fxbotIcon} alt="FX Bot" className="w-4 h-4" />
                    FX Bot
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;