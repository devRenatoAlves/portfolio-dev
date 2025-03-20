
import { useRef, useEffect } from 'react';
import { cn } from "@/lib/utils";

type Project = {
  id: number;
  title: string;
  description: string;
  category: string;
  imageUrl: string;
  link: string;
  status: 'completed' | 'pending';
};

const projects: Project[] = [
  {
    id: 1,
    title: "API RESTful de Gerenciamento",
    description: "API completa para sistema de gerenciamento de tarefas com autenticação JWT, validação de dados e documentação com Swagger.",
    category: "Node.js / Express",
    imageUrl: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=600&q=80",
    link: "#",
    status: 'completed'
  },
  {
    id: 2,
    title: "Microserviço de Notificações",
    description: "Sistema de microserviços para envio de notificações por email e SMS, utilizando filas com RabbitMQ para processamento assíncrono.",
    category: "Microserviços",
    imageUrl: "https://images.unsplash.com/photo-1607798748738-b15c40d33d57?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=600&q=80",
    link: "#",
    status: 'pending'
  },
  {
    id: 3,
    title: "CLI para Automação",
    description: "Ferramenta de linha de comando para automação de tarefas de desenvolvimento, como criação de componentes e migrações de banco de dados.",
    category: "Node.js",
    imageUrl: "https://images.unsplash.com/photo-1629654297299-c8506221ca97?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=600&q=80",
    link: "#",
    status: 'pending'
  },
  {
    id: 4,
    title: "API GraphQL",
    description: "Backend GraphQL para aplicação web com resolvers otimizados, autenticação e autorização baseada em papéis.",
    category: "GraphQL / Apollo",
    imageUrl: "https://images.unsplash.com/photo-1633356122102-3fe601e05bd2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=600&q=80",
    link: "#",
    status: 'pending'
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
            Meus Projetos
          </span>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
            Principais Trabalhos
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Uma seleção dos meus projetos, incluindo trabalhos concluídos e os que estou atualmente desenvolvendo.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
          {projects.map((project, index) => (
            <div
              key={project.id}
              ref={el => (itemsRef.current[index] = el)}
              className={cn(
                "project-card opacity-0 translate-y-8 transition-all duration-700 ease-out",
                "bg-card border rounded-2xl overflow-hidden",
                project.status === 'pending' && "opacity-70"
              )}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <a href={project.link} className="block">
                <div className="aspect-video w-full overflow-hidden relative">
                  <img 
                    src={project.imageUrl} 
                    alt={project.title}
                    className={cn(
                      "w-full h-full object-cover transition-transform duration-500 ease-out",
                      project.status === 'completed' ? "hover:scale-105" : "filter grayscale"
                    )}
                    loading="lazy"
                  />
                  {project.status === 'pending' && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/40">
                      <span className="px-3 py-1 bg-yellow-500/90 text-black text-sm font-medium rounded">
                        Em Desenvolvimento
                      </span>
                    </div>
                  )}
                </div>
                <div className="p-6 md:p-8">
                  <div className="flex justify-between items-center">
                    <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                      {project.category}
                    </span>
                    {project.status === 'completed' && (
                      <span className="text-xs bg-green-500/20 text-green-600 dark:text-green-400 px-2 py-1 rounded">
                        Concluído
                      </span>
                    )}
                  </div>
                  <h3 className="text-xl md:text-2xl font-semibold mt-2">
                    {project.title}
                  </h3>
                  <p className="mt-3 text-muted-foreground">
                    {project.description}
                  </p>
                  <div className="mt-6 inline-flex items-center text-sm font-medium">
                    {project.status === 'completed' ? "Ver Detalhes" : "Acompanhar Progresso"}
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
