import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Building, Calendar } from "lucide-react";

const Experience = () => {
  const experiences = [
    {
      title: "Senior Software Engineer",
      company: "Monotype",
      period: "2023 - Present",
      location: "Kathmandu, Nepal",
      description: "Leading full-stack development initiatives with focus on Generative AI integration and modern web technologies.",
      achievements: [
        "Architected and implemented AI-powered features using GPT and LangChain",
        "Led cross-functional teams in delivering scalable React.js applications",
        "Optimized application performance resulting in 40% faster load times",
        "Mentored junior developers and established coding best practices"
      ],
      technologies: ["React.js", "Node.js", "TypeScript", "Generative AI", "AWS"]
    },
    {
      title: "Full Stack Engineer",
      company: "Previous Company",
      period: "2021 - 2023",
      location: "Nepal",
      description: "Developed and maintained web applications using modern JavaScript frameworks and backend technologies.",
      achievements: [
        "Built responsive web applications serving 10k+ users",
        "Implemented microservices architecture for better scalability",
        "Collaborated with product teams to deliver user-centric solutions",
        "Maintained 99.9% uptime for critical business applications"
      ],
      technologies: ["JavaScript", "React.js", "Node.js", "MongoDB", "Docker"]
    }
  ];

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-secondary/30">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            <span className="bg-gradient-primary bg-clip-text text-transparent">
              Professional Experience
            </span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Building innovative solutions and leading development teams in the evolving tech landscape
          </p>
        </div>

        <div className="space-y-8">
          {experiences.map((exp, index) => (
            <Card key={index} className="bg-gradient-card border-border hover:shadow-card transition-all duration-300">
              <CardHeader>
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <div>
                    <CardTitle className="text-2xl font-bold text-foreground mb-2">
                      {exp.title}
                    </CardTitle>
                    <div className="flex items-center gap-2 text-primary font-semibold mb-2">
                      <Building className="w-5 h-5" />
                      {exp.company}
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Calendar className="w-4 h-4" />
                      {exp.period} • {exp.location}
                    </div>
                  </div>
                </div>
                <p className="text-muted-foreground mt-4">
                  {exp.description}
                </p>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div>
                    <h4 className="font-semibold mb-3 text-foreground">Key Achievements:</h4>
                    <ul className="space-y-2">
                      {exp.achievements.map((achievement, achIndex) => (
                        <li key={achIndex} className="flex items-start gap-3 text-muted-foreground">
                          <span className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></span>
                          {achievement}
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold mb-3 text-foreground">Technologies Used:</h4>
                    <div className="flex flex-wrap gap-2">
                      {exp.technologies.map((tech, techIndex) => (
                        <Badge key={techIndex} variant="outline" className="border-primary/20">
                          {tech}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;