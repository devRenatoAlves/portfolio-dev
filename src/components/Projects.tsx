
import { useRef, useEffect } from 'react';
import { cn } from "@/lib/utils";

type Project = {
  id: number;
  title: string;
  description: string;
  category: string;
  imageUrl: string;
  link: string;
};

const projects: Project[] = [
  {
    id: 1,
    title: "Minimalist E-commerce",
    description: "A clean, user-focused shopping experience with intuitive navigation and seamless checkout.",
    category: "Web Design",
    imageUrl: "https://images.unsplash.com/photo-1472851294608-062f824d29cc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=600&q=80",
    link: "#"
  },
  {
    id: 2,
    title: "Portfolio Dashboard",
    description: "An elegant dashboard interface for creatives to showcase their work with detailed analytics.",
    category: "UI/UX Design",
    imageUrl: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=600&q=80",
    link: "#"
  },
  {
    id: 3,
    title: "Productivity App",
    description: "A focus-oriented task management system with clean interface and intuitive organization tools.",
    category: "Mobile App",
    imageUrl: "https://images.unsplash.com/photo-1555421689-3f034debb7a6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=600&q=80",
    link: "#"
  },
  {
    id: 4,
    title: "Smart Home Controller",
    description: "An integrated system for managing connected devices with a focus on accessibility and simplicity.",
    category: "IoT Design",
    imageUrl: "https://images.unsplash.com/photo-1558002038-bb0237f4bf6a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=600&q=80",
    link: "#"
  }
];

export function Projects() {
  const sectionRef = useRef<HTMLElement>(null);
  const itemsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          section.classList.add('opacity-100');
          observer.unobserve(section);
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(section);

    return () => {
      if (section) observer.unobserve(section);
    };
  }, []);

  useEffect(() => {
    const items = itemsRef.current.filter(Boolean) as HTMLDivElement[];
    
    const itemObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('opacity-100', 'translate-y-0');
            itemObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -100px 0px' }
    );

    items.forEach(item => itemObserver.observe(item));

    return () => {
      items.forEach(item => itemObserver.unobserve(item));
    };
  }, []);

  return (
    <section 
      id="projects" 
      ref={sectionRef}
      className="py-24 px-6 opacity-0 transition-opacity duration-1000"
    >
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <span className="inline-block rounded-full bg-secondary dark:bg-secondary/20 px-4 py-1.5 text-sm font-medium mb-6">
            Featured Work
          </span>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
            Selected Projects
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            A curated collection of my most significant work, showcasing my approach to design challenges and technical implementation.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
          {projects.map((project, index) => (
            <div
              key={project.id}
              ref={el => (itemsRef.current[index] = el)}
              className={cn(
                "project-card opacity-0 translate-y-8 transition-all duration-700 ease-out",
                "bg-card border rounded-2xl overflow-hidden"
              )}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <a href={project.link} className="block">
                <div className="aspect-video w-full overflow-hidden">
                  <img 
                    src={project.imageUrl} 
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-500 ease-out hover:scale-105"
                    loading="lazy"
                  />
                </div>
                <div className="p-6 md:p-8">
                  <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                    {project.category}
                  </span>
                  <h3 className="text-xl md:text-2xl font-semibold mt-2">
                    {project.title}
                  </h3>
                  <p className="mt-3 text-muted-foreground">
                    {project.description}
                  </p>
                  <div className="mt-6 inline-flex items-center text-sm font-medium">
                    View Details
                    <svg 
                      className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" 
                      xmlns="http://www.w3.org/2000/svg" 
                      viewBox="0 0 24 24" 
                      fill="none" 
                      stroke="currentColor" 
                      strokeWidth="2" 
                      strokeLinecap="round" 
                      strokeLinejoin="round"
                    >
                      <path d="M5 12h14"></path>
                      <path d="m12 5 7 7-7 7"></path>
                    </svg>
                  </div>
                </div>
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
