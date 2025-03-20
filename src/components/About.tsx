
import { useRef, useEffect } from 'react';
import { cn } from "@/lib/utils";

export function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const textContentRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const textContent = textContentRef.current;
    const image = imageRef.current;

    if (!section || !textContent || !image) return;

    const sectionObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          section.classList.add('opacity-100');
          sectionObserver.unobserve(section);
        }
      },
      { threshold: 0.1 }
    );

    const contentObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          textContent.classList.add('opacity-100', 'translate-x-0');
          contentObserver.unobserve(textContent);
        }
      },
      { threshold: 0.1, rootMargin: '0px 0px -100px 0px' }
    );

    const imageObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          image.classList.add('opacity-100', 'translate-x-0');
          imageObserver.unobserve(image);
        }
      },
      { threshold: 0.1, rootMargin: '0px 0px -100px 0px' }
    );

    sectionObserver.observe(section);
    contentObserver.observe(textContent);
    imageObserver.observe(image);

    return () => {
      if (section) sectionObserver.unobserve(section);
      if (textContent) contentObserver.unobserve(textContent);
      if (image) imageObserver.unobserve(image);
    };
  }, []);

  const skills = [
    "UI/UX Design", "Web Development", "Mobile Design", "Product Strategy"
  ];

  return (
    <section 
      id="about" 
      ref={sectionRef}
      className="py-24 px-6 opacity-0 transition-opacity duration-1000 bg-secondary/30 dark:bg-secondary/10"
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <div 
            ref={textContentRef}
            className="opacity-0 -translate-x-8 transition-all duration-1000 ease-out"
          >
            <span className="inline-block rounded-full bg-secondary dark:bg-secondary/20 px-4 py-1.5 text-sm font-medium mb-6">
              About Me
            </span>

            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-6">
              Designing with purpose and intention
            </h2>

            <div className="space-y-5 text-muted-foreground">
              <p>
                I'm a passionate designer and developer focused on creating digital experiences that are both beautiful and functional. With a keen eye for detail and a commitment to user-centered design, I strive to build products that make a meaningful impact.
              </p>

              <p>
                My approach combines aesthetic sensitivity with technical knowledge, allowing me to create solutions that are not only visually appealing but also technically sound and accessible to all users.
              </p>

              <p>
                I believe in the power of simplicity, taking inspiration from the philosophy that good design is as little design as possible. This mindset guides my work, helping me create clean, intuitive, and purposeful digital products.
              </p>
            </div>

            <div className="mt-8">
              <h3 className="text-lg font-semibold mb-4">Core Skills</h3>
              <div className="flex flex-wrap gap-2">
                {skills.map((skill, index) => (
                  <span 
                    key={index}
                    className="px-4 py-2 bg-background border rounded-lg text-sm font-medium"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div 
            ref={imageRef}
            className="opacity-0 translate-x-8 transition-all duration-1000 ease-out"
          >
            <div className="rounded-2xl overflow-hidden bg-card shadow-lg relative aspect-[4/5]">
              <img 
                src="https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=1000&q=80" 
                alt="Designer working at desk"
                className="w-full h-full object-cover"
                loading="lazy"
              />
              
              {/* Decorative elements */}
              <div className="absolute -top-6 -right-6 w-24 h-24 bg-accent/80 rounded-full blur-2xl"></div>
              <div className="absolute -bottom-8 -left-8 w-32 h-32 bg-primary/10 rounded-full blur-2xl"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
