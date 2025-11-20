import feedxLogo from '@/assets/feedx-logo.png';
import ContactForm from './ContactForm';

const Footer = () => {
  return (
    <footer className="bg-card border-t border-border py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-3 mb-4">
              <img src={feedxLogo} alt="FeedX Logo" className="h-12 w-12" />
              <div>
                <h3 className="text-xl font-bold text-gradient">FeedX Portal</h3>
                <p className="text-sm text-muted-foreground">Anonymous Feedback</p>
              </div>
            </div>
            <p className="text-sm text-muted-foreground max-w-sm">
              Empowering students to share feedback and drive positive change through our secure, 
              anonymous feedback system powered by FX Bot AI.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#home" className="text-muted-foreground hover:text-primary transition-smooth">
                  Home
                </a>
              </li>
              <li>
                <a href="#features" className="text-muted-foreground hover:text-primary transition-smooth">
                  Features
                </a>
              </li>
              <li>
                <a href="#fxbot" className="text-muted-foreground hover:text-primary transition-smooth">
                  FX Bot
                </a>
              </li>
              <li>
                <a href="#about" className="text-muted-foreground hover:text-primary transition-smooth">
                  About Us
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Us */}
          <div>
            <h4 className="font-semibold mb-4">Contact Us</h4>
            <ContactForm />
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-border text-center text-sm text-muted-foreground">
          <p>© 2024 FeedX Portal. All rights reserved. Listen • Respond • Resolve</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;