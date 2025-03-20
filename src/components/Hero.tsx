
import { useEffect, useRef } from 'react';
import { cn } from "@/lib/utils";

export function Hero() {
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('opacity-100');
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(element);

    return () => {
      if (element) observer.unobserve(element);
    };
  }, []);

  return (
    <section id="home" className="relative min-h-[90vh] flex items-center justify-center pt-28 px-6">
      <div 
        ref={elementRef} 
        className="max-w-7xl mx-auto text-center space-y-8 opacity-0 transition-opacity duration-1000"
      >
        <span className="inline-block rounded-full bg-secondary dark:bg-secondary/20 px-4 py-1.5 text-sm font-medium mb-6 animate-fade-up">
          Creative Portfolio
        </span>
        
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight text-balance mx-auto max-w-5xl leading-tight animate-fade-up" style={{ animationDelay: "100ms" }}>
          Crafting digital experiences with purpose and precision
        </h1>
        
        <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto animate-fade-up" style={{ animationDelay: "200ms" }}>
          A showcase of design and development projects created with attention to detail, 
          focusing on clean aesthetics and functional simplicity.
        </p>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-6 animate-fade-up" style={{ animationDelay: "300ms" }}>
          <a 
            href="#projects" 
            className={cn(
              "button-hover rounded-lg bg-primary text-primary-foreground px-8 py-3",
              "transition-all hover:shadow-lg focus:ring-2 focus:ring-primary/50"
            )}
          >
            View Projects
          </a>
          <a 
            href="#contact" 
            className={cn(
              "button-hover rounded-lg bg-secondary text-secondary-foreground px-8 py-3",
              "transition-all hover:shadow-md focus:ring-2 focus:ring-secondary/50"
            )}
          >
            Get in Touch
          </a>
        </div>
      </div>

      {/* Background decorative elements */}
      <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary/5 rounded-full blur-3xl -z-10"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl -z-10"></div>
    </section>
  );
}
