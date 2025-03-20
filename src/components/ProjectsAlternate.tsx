
import { useRef, useEffect } from 'react';
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ExternalLink, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

type Project = {
  id: number;
  title: string;
  description: string;
  tags: string[];
  imageUrl: string;
  link: string;
};

const projects: Project[] = [
  {
    id: 1,
    title: "Arquitetura Moderna",
    description: "Um projeto residencial com foco em sustentabilidade e design minimalista, criando espaços abertos e bem iluminados.",
    tags: ["Residencial", "Sustentável", "Minimalista"],
    imageUrl: "https://images.unsplash.com/photo-1600585154526-990dced4db0d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=600&q=80",
    link: "#"
  },
  {
    id: 2,
    title: "Centro Comercial Plaza",
    description: "Renovação de espaço comercial com elementos contemporâneos, melhorando fluxo de clientes e experiência de compra.",
    tags: ["Comercial", "Renovação", "Contemporâneo"],
    imageUrl: "https://images.unsplash.com/photo-1604014236372-13626ff441ff?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=600&q=80",
    link: "#"
  },
  {
    id: 3,
    title: "Paisagismo Urbano",
    description: "Integração de áreas verdes em ambiente urbano denso, criando espaços de convivência e melhorando qualidade de vida.",
    tags: ["Paisagismo", "Urbano", "Sustentável"],
    imageUrl: "https://images.unsplash.com/photo-1605146768851-eda79da39897?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=600&q=80",
    link: "#"
  }
];

export function ProjectsAlternate() {
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
      id="projects-alternate" 
      ref={sectionRef}
      className="py-24 px-6 opacity-0 transition-opacity duration-1000 bg-secondary/10"
    >
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16">
          <div>
            <span className="inline-block rounded-full bg-secondary dark:bg-secondary/20 px-4 py-1.5 text-sm font-medium mb-6">
              Portfólio
            </span>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
              Projetos em Destaque
            </h2>
            <p className="text-muted-foreground max-w-2xl">
              Uma seleção cuidadosa dos meus trabalhos mais significativos em arquitetura e design.
            </p>
          </div>
          <Button variant="outline" className="mt-6 md:mt-0 self-start md:self-auto group">
            Ver todos os projetos
            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Button>
        </div>

        <div className="space-y-20">
          {projects.map((project, index) => (
            <div
              key={project.id}
              ref={el => (itemsRef.current[index] = el)}
              className={cn(
                "opacity-0 translate-y-8 transition-all duration-700 ease-out",
                "grid grid-cols-1 lg:grid-cols-12 gap-8 items-center"
              )}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <div className={cn(
                "lg:col-span-7",
                index % 2 === 0 ? "lg:order-1" : "lg:order-2"
              )}>
                <div className="rounded-xl overflow-hidden bg-background border shadow-sm">
                  <img 
                    src={project.imageUrl} 
                    alt={project.title}
                    className="w-full aspect-[16/9] object-cover transition-transform duration-500 ease-out hover:scale-105"
                    loading="lazy"
                  />
                </div>
              </div>
              
              <div className={cn(
                "lg:col-span-5",
                index % 2 === 0 ? "lg:order-2" : "lg:order-1"
              )}>
                <div className="space-y-4">
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag, i) => (
                      <Badge key={i} variant="secondary" className="font-normal">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  
                  <h3 className="text-2xl md:text-3xl font-bold">
                    {project.title}
                  </h3>
                  
                  <p className="text-muted-foreground">
                    {project.description}
                  </p>
                  
                  <Button variant="ghost" className="mt-2 px-0 group" asChild>
                    <a href={project.link}>
                      Ver detalhes do projeto
                      <ExternalLink className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </a>
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
