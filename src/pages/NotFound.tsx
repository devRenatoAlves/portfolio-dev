
import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { cn } from "@/lib/utils";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 py-24 bg-background">
      <div className="text-center max-w-md mx-auto">
        <span className="inline-block rounded-full bg-secondary dark:bg-secondary/20 px-4 py-1.5 text-sm font-medium mb-6">
          404 Error
        </span>
        
        <h1 className="text-5xl font-bold tracking-tight mb-6 animate-fade-up">
          Page Not Found
        </h1>
        
        <p className="text-lg text-muted-foreground mb-8 animate-fade-up" style={{ animationDelay: "100ms" }}>
          The page you're looking for doesn't exist or has been moved.
        </p>
        
        <Link
          to="/"
          className={cn(
            "button-hover inline-flex items-center justify-center rounded-lg",
            "bg-primary text-primary-foreground px-8 py-3 animate-fade-up",
            "transition-all hover:shadow-lg"
          )}
          style={{ animationDelay: "200ms" }}
        >
          Return Home
        </Link>
      </div>
      
      {/* Background decorative elements */}
      <div className="absolute top-1/3 left-1/3 w-64 h-64 bg-primary/5 rounded-full blur-3xl -z-10"></div>
      <div className="absolute bottom-1/3 right-1/3 w-96 h-96 bg-primary/5 rounded-full blur-3xl -z-10"></div>
    </div>
  );
};

export default NotFound;
