import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { Shield, MessageSquare, Clock, FileText, Users, CheckCircle, ArrowRight, Menu, X } from "lucide-react";

const Index = () => {
    const navigate = useNavigate();
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    return (
        <div className="min-h-screen bg-background flex flex-col overflow-hidden">
            {/* Header */}
            <header className="fixed top-0 w-full z-50 glass border-b-0">
                <div className="container mx-auto px-4 h-16 flex items-center justify-between">
                    <div className="flex items-center gap-2 animate-slide-in-right">
                        <img src="/fxbot-app/logo.jpg" alt="FXBOT Logo" className="w-10 h-10 rounded-xl object-cover shadow-sm" />
                        <span className="font-bold text-xl tracking-tight">FXBOT</span>
                    </div>

                    {/* Desktop Navigation Menu */}
                    <nav className="hidden md:flex items-center gap-8 animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
                        <button
                            onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
                            className="text-foreground/80 hover:text-primary transition-colors font-medium"
                        >
                            About
                        </button>
                        <button
                            onClick={() => document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' })}
                            className="text-foreground/80 hover:text-primary transition-colors font-medium"
                        >
                            Features
                        </button>
                        <button
                            onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                            className="text-foreground/80 hover:text-primary transition-colors font-medium"
                        >
                            Contact
                        </button>
                    </nav>

                    {/* Desktop Login Button */}
                    <div className="hidden md:flex gap-3 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
                        <Button
                            onClick={() => navigate("/auth")}
                            className="shadow-lg hover:shadow-xl transition-all duration-300 px-6"
                        >
                            Login
                        </Button>
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        className="md:hidden p-2 hover:bg-primary/10 rounded-lg transition-colors"
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        aria-label="Toggle menu"
                    >
                        {mobileMenuOpen ? (
                            <X className="w-6 h-6 text-primary" />
                        ) : (
                            <Menu className="w-6 h-6 text-primary" />
                        )}
                    </button>
                </div>

                {/* Mobile Menu Slide-in */}
                {mobileMenuOpen && (
                    <>
                        {/* Backdrop */}
                        <div
                            className="fixed inset-0 bg-black/20 backdrop-blur-sm md:hidden"
                            onClick={() => setMobileMenuOpen(false)}
                        />

                        {/* Menu Panel */}
                        <div className="fixed top-16 right-0 w-64 h-[calc(100vh-4rem)] bg-white border-l shadow-xl md:hidden animate-slide-in-right p-6">
                            <nav className="flex flex-col gap-6">
                                <button
                                    onClick={() => {
                                        document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
                                        setMobileMenuOpen(false);
                                    }}
                                    className="text-left text-lg font-medium text-foreground hover:text-primary transition-colors"
                                >
                                    About
                                </button>
                                <button
                                    onClick={() => {
                                        document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' });
                                        setMobileMenuOpen(false);
                                    }}
                                    className="text-left text-lg font-medium text-foreground hover:text-primary transition-colors"
                                >
                                    Features
                                </button>
                                <button
                                    onClick={() => {
                                        document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
                                        setMobileMenuOpen(false);
                                    }}
                                    className="text-left text-lg font-medium text-foreground hover:text-primary transition-colors"
                                >
                                    Contact
                                </button>

                                <div className="pt-4 border-t">
                                    <Button
                                        onClick={() => navigate("/auth")}
                                        className="w-full shadow-lg hover:shadow-xl transition-all"
                                    >
                                        Login
                                    </Button>
                                </div>
                            </nav>
                        </div>
                    </>
                )}
            </header>

            {/* Hero Section */}
            <section className="pt-32 pb-20 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-100 via-background to-background">
                <div className="container mx-auto px-4 text-center relative">
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-blue-400/20 blur-[100px] rounded-full pointer-events-none" />

                    <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6 animate-fade-in-up relative z-10">
                        Institutional Feedback <br className="hidden md:block" />
                        <span className="text-gradient">Management System</span>
                    </h1>
                    <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-10 animate-fade-in-up relative z-10" style={{ animationDelay: '0.2s' }}>
                        A secure, transparent platform for students and faculty of Government Institute of Electronics, Secunderabad to manage issues, feedback, and suggestions.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up relative z-10" style={{ animationDelay: '0.4s' }}>
                        <Button size="lg" className="text-lg px-8 h-14 rounded-full shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300" onClick={() => navigate("/auth")}>
                            Get Started <ArrowRight className="ml-2 w-5 h-5" />
                        </Button>
                        <Button size="lg" variant="outline" className="text-lg px-8 h-14 rounded-full border-2 hover:bg-secondary/50" onClick={() => document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' })}>
                            Learn More
                        </Button>
                    </div>
                </div>
            </section>

            {/* Features Grid */}
            <section id="features" className="py-24 bg-muted/30 relative">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-16 animate-fade-in-up">
                        <h2 className="text-3xl md:text-4xl font-bold mb-4">Key Features</h2>
                        <p className="text-muted-foreground text-lg max-w-2xl mx-auto">Everything you need to manage institutional feedback efficiently and transparently.</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        <FeatureCard
                            icon={<Shield className="w-8 h-8 text-primary" />}
                            title="Secure Authentication"
                            description="OTP-based verification ensures only authorized students and faculty can access the system."
                            delay={0.1}
                        />
                        <FeatureCard
                            icon={<MessageSquare className="w-8 h-8 text-primary" />}
                            title="Issue Tracking"
                            description="Real-time status updates from submission to resolution with a transparent stepper interface."
                            delay={0.2}
                        />
                        <FeatureCard
                            icon={<Clock className="w-8 h-8 text-primary" />}
                            title="48h Escalation"
                            description="Issues not resolved within 48 hours can be escalated to higher authorities automatically."
                            delay={0.3}
                        />
                        <FeatureCard
                            icon={<FileText className="w-8 h-8 text-primary" />}
                            title="Proof Attachments"
                            description="Upload images or documents to support your issues and provide necessary context."
                            delay={0.4}
                        />
                        <FeatureCard
                            icon={<Users className="w-8 h-8 text-primary" />}
                            title="Anonymous Mode"
                            description="Submit sensitive feedback anonymously without revealing your identity to faculty."
                            delay={0.5}
                        />
                        <FeatureCard
                            icon={<CheckCircle className="w-8 h-8 text-primary" />}
                            title="Faculty Response"
                            description="Direct communication channel for faculty to address and resolve student concerns."
                            delay={0.6}
                        />
                    </div>
                </div>
            </section>

            {/* About Section */}
            <section id="about" className="py-24 bg-background relative">
                <div className="container mx-auto px-4">
                    <div className="max-w-3xl mx-auto text-center animate-fade-in-up">
                        <h2 className="text-3xl md:text-4xl font-bold mb-6 text-primary">About FXBOT</h2>
                        <p className="text-lg text-foreground/80 leading-relaxed mb-6">
                            FXBOT (Feedback Exchange Bot) is a comprehensive institutional feedback management system designed specifically for the Government Institute of Electronics, Secunderabad.
                        </p>
                        <p className="text-lg text-foreground/80 leading-relaxed mb-6">
                            Our platform bridges the communication gap between students and faculty, providing a secure, transparent, and efficient way to manage issues, feedback, and suggestions. With features like OTP-based authentication, real-time tracking, and automatic escalation, FXBOT ensures that every voice is heard and every concern is addressed.
                        </p>
                        <div className="glass border-none p-6 rounded-2xl">
                            <p className="text-foreground/70 italic">
                                "Security, FXBOT replaces external platforms and provides a unified, secure environment for all campus communications."
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Contact Section */}
            <section id="contact" className="py-24 bg-muted/30 relative">
                <div className="container mx-auto px-4">
                    <div className="max-w-2xl mx-auto text-center animate-fade-in-up">
                        <h2 className="text-3xl md:text-4xl font-bold mb-6 text-primary">Get in Touch</h2>
                        <p className="text-lg text-muted-foreground mb-8">
                            Have questions or need support? We're here to help.
                        </p>

                        <div className="glass border-none p-8 rounded-2xl space-y-6">
                            <div>
                                <h3 className="font-semibold text-primary mb-2">Government Institute of Electronics</h3>
                                <p className="text-foreground/70">Secunderabad, Telangana</p>
                            </div>

                            <div className="pt-4 border-t border-white/20">
                                <p className="text-sm text-muted-foreground mb-4">
                                    For technical support or inquiries, please contact your institution's IT department.
                                </p>
                                <Button
                                    onClick={() => navigate("/auth")}
                                    className="shadow-lg hover:shadow-xl transition-all"
                                >
                                    Access FXBOT
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="border-t py-12 mt-auto bg-background">
                <div className="container mx-auto px-4 text-center">
                    <div className="flex items-center justify-center gap-2 mb-4 opacity-80">
                        <img src="/fxbot-app/logo.jpg" alt="FXBOT Logo" className="w-8 h-8 rounded-lg object-cover" />
                        <span className="font-bold text-lg">FXBOT</span>
                    </div>
                    <p className="text-muted-foreground">&copy; 2025 FXBOT - Government Institute of Electronics, Secunderabad</p>
                </div>
            </footer>
        </div>
    );
};

const FeatureCard = ({ icon, title, description, delay }: { icon: React.ReactNode, title: string, description: string, delay: number }) => (
    <Card className="border-none shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 group bg-background/50 backdrop-blur-sm animate-fade-in-up" style={{ animationDelay: `${delay}s` }}>
        <CardHeader>
            <div className="w-14 h-14 bg-primary/5 rounded-2xl flex items-center justify-center mb-4 group-hover:bg-primary/10 transition-colors duration-300">
                {icon}
            </div>
            <CardTitle className="text-xl group-hover:text-primary transition-colors duration-300">{title}</CardTitle>
        </CardHeader>
        <CardContent>
            <p className="text-muted-foreground leading-relaxed">{description}</p>
        </CardContent>
    </Card>
);

export default Index;
