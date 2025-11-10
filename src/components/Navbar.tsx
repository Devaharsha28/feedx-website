import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import feedxLogo from '@/assets/feedx-logo.png';

const Navbar = () => {
  const { isAuthenticated, user, logout } = useAuth();

  return (
    <nav className="fixed top-0 left-0 right-0 z-40 bg-background/80 backdrop-blur-lg border-b border-border">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3">
            <img src={feedxLogo} alt="FeedX Logo" className="h-12 w-12" />
            <div>
              <h1 className="text-xl font-bold text-gradient">FeedX Portal</h1>
              <p className="text-xs text-muted-foreground">Anonymous Feedback</p>
            </div>
          </Link>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-8">
            <a href="#home" className="text-sm font-medium text-foreground hover:text-primary transition-smooth">
              Home
            </a>
            <a href="#features" className="text-sm font-medium text-foreground hover:text-primary transition-smooth">
              Features
            </a>
            <a href="#about" className="text-sm font-medium text-foreground hover:text-primary transition-smooth">
              About
            </a>
            <a href="#fxbot" className="text-sm font-medium text-foreground hover:text-primary transition-smooth">
              FX Bot
            </a>
          </div>

          {/* CTA Buttons */}
          <div className="flex items-center space-x-3">
            {isAuthenticated ? (
              <>
                <span className="text-sm text-muted-foreground hidden sm:inline">
                  Welcome, {user?.name || user?.email}
                </span>
                <Button variant="ghost" onClick={logout}>
                  Sign Out
                </Button>
              </>
            ) : (
              <>
                <Link to="/signin">
                  <Button variant="ghost" className="hidden sm:inline-flex">
                    Sign In
                  </Button>
                </Link>
                <Link to="/get-started">
                  <Button className="bg-gradient-brand hover:opacity-90 transition-smooth">
                    Get Started
                  </Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;