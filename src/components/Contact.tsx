
import { useState, useRef, useEffect } from 'react';
import { cn } from "@/lib/utils";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export function Contact() {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission with timeout
    setTimeout(() => {
      setIsSubmitting(false);
      if (formRef.current) formRef.current.reset();

      toast({
        title: "Mensagem enviada com sucesso",
        description: "Obrigado por entrar em contato. Responderei o mais breve possível.",
      });
    }, 1500);
  };

  return (
    <section 
      id="contact" 
      ref={sectionRef}
      className="py-24 px-6 opacity-0 transition-opacity duration-1000"
    >
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <span className="inline-block rounded-full bg-secondary dark:bg-secondary/20 px-4 py-1.5 text-sm font-medium mb-6"> 
            Entre em contato
          </span>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">    
        Vamos começar uma conversa
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
          Tem um projeto em mente ou quer explorar possibilidades? Estou sempre aberto a discutir novas ideias e oportunidades.
          </p>
        </div>

        <div className="glassmorphism dark:glassmorphism-dark rounded-2xl p-6 md:p-10 max-w-3xl mx-auto">
          <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label htmlFor="name" className="text-sm font-medium">
                  Seu nome
                </label>
                <Input
                  id="name"
                  placeholder="Coloque seu nome"
                  className="bg-background/50 border-border/50 focus:border-primary"
                  required
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium">
                  E-mail
                </label>
                <Input
                  id="email"
                  type="email"
                  placeholder="fulano@example.com"
                  className="bg-background/50 border-border/50 focus:border-primary"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <label htmlFor="subject" className="text-sm font-medium">
                Assunto
              </label>
              <Input
                id="subject"
                placeholder="Qual é o assunto?"
                className="bg-background/50 border-border/50 focus:border-primary"
                required
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="message" className="text-sm font-medium">
                Sua mensagem
              </label>
              <Textarea
                id="message"
                placeholder="Mensagem"
                className="min-h-[150px] bg-background/50 border-border/50 focus:border-primary"
                required
              />
            </div>

            <Button
              type="submit"
              className={cn(
                "button-hover w-full bg-primary text-primary-foreground",
                "transition-all duration-300 hover:shadow-lg"
              )}
              disabled={isSubmitting}
            >
              {isSubmitting ? "Enviando..." : "Enviar  "}
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
}
