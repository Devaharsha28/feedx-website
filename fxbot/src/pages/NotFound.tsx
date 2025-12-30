import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";

const NotFound = () => {
    const location = useLocation();

    useEffect(() => {
        console.error(
            "404 Error: User attempted to access non-existent route:",
            location.pathname
        );
    }, [location.pathname]);

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 via-white to-blue-100 p-4 text-center relative overflow-hidden">
            <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]"></div>

            <div className="glass border-none p-12 rounded-3xl max-w-md w-full relative z-10 animate-scale-in">
                <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6 animate-fade-in-up">
                    <span className="text-5xl">🔍</span>
                </div>

                <h1 className="text-7xl font-bold mb-4 text-gradient animate-fade-in-up" style={{ animationDelay: '0.1s' }}>404</h1>
                <h2 className="text-2xl font-semibold text-primary mb-2 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>Page Not Found</h2>
                <p className="text-muted-foreground mb-8 animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
                    The page you're looking for doesn't exist or has been moved.
                </p>

                <Button asChild className="shadow-lg hover:shadow-xl transition-all hover:-translate-y-0.5 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
                    <Link to="/">Return to Home</Link>
                </Button>
            </div>
        </div>
    );
};

export default NotFound;
