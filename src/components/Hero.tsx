import { Button } from "@/components/ui/button";
import { Github, Linkedin, Mail, Download } from "lucide-react";
import heroImage from "@/assets/hero-image.jpg";

const Hero = () => {
  return (
    <section className="min-h-screen bg-gradient-hero flex items-center justify-center px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <div className="text-center lg:text-left space-y-8 animate-fade-in">
            <div className="space-y-4 animate-slide-up">
              <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight">
                <span className="text-foreground">Hi, I'm</span>
                <br />
                <span className="bg-gradient-primary bg-clip-text text-transparent">
                  Suraj Dhakal
                </span>
              </h1>
              <p className="text-xl sm:text-2xl text-muted-foreground max-w-2xl">
                Computer Engineer | Generative AI | React.js | Node.js | TypeScript
              </p>
              <p className="text-lg text-muted-foreground max-w-2xl">
                Experienced Full Stack Engineer with demonstrated history in the outsourcing/offshoring industry. 
                Currently serving as Senior Software Engineer at Monotype, building innovative solutions with 
                cutting-edge technologies and leadership expertise. Graduate of Kathmandu University.
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button size="lg" className="bg-gradient-primary hover:shadow-glow transition-all duration-300">
                <Mail className="w-5 h-5 mr-2" />
                Contact Me
              </Button>
              <Button variant="outline" size="lg" className="hover:bg-secondary transition-all duration-300">
                <Download className="w-5 h-5 mr-2" />
                Download CV
              </Button>
            </div>

            {/* Social Links */}
            <div className="flex gap-6 justify-center lg:justify-start">
              <a 
                href="https://www.linkedin.com/in/software-engineer-suraj/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="p-3 rounded-full bg-card border border-border hover:bg-gradient-primary hover:shadow-glow transition-all duration-300 group"
              >
                <Linkedin className="w-6 h-6 group-hover:text-primary-foreground" />
              </a>
              <a 
                href="https://github.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="p-3 rounded-full bg-card border border-border hover:bg-gradient-primary hover:shadow-glow transition-all duration-300 group"
              >
                <Github className="w-6 h-6 group-hover:text-primary-foreground" />
              </a>
            </div>
          </div>

          {/* Hero Image */}
          <div className="relative">
            <div className="relative overflow-hidden rounded-2xl">
              <img
                src={heroImage}
                alt="Suraj Dhakal - Software Engineer"
                className="w-full h-[500px] object-cover animate-float"
              />
              <div className="absolute inset-0 bg-gradient-primary opacity-20"></div>
            </div>
            
            {/* Floating Elements */}
            <div className="absolute -top-4 -right-4 w-24 h-24 bg-gradient-primary rounded-full opacity-20 animate-pulse-glow"></div>
            <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-accent/20 rounded-full animate-float"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;