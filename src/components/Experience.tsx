import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Building, Calendar, MapPin, Briefcase } from "lucide-react";
import { useI18n } from "@/contexts/I18nContext";

const Experience = () => {
  const { t } = useI18n();
  const [expanded, setExpanded] = useState(false);
  const SHOW_COUNT = 2;
  
  const experiences = [
    {
      title: "Software Engineer",
      company: "Daktech",
      period: "March 2025 - Present",
      duration: "In Progress",
      location: "Remote / Australia",
      type: "Full-time",
      description: "Developing and maintaining custom web applications for business process optimization using modern web technologies.",
      achievements: [
        "Built a web application from scratch using CakePHP with full CRUD, authentication, and responsive design",
        "Maintained ongoing client communication to refine features",
        "Managed and improved the existing DakTech codebase, resolving bugs and implementing new features"
      ],
      technologies: ["CakePHP", "React.js", "Python", "Docker"]
    },
    {
      title: "Senior Software Engineer",
      company: "Monotype",
      period: "March 2023 - February 2025",
      duration: "2 years",
      location: "Remote",
      type: "Full-time",
      description: "Maintained and enhanced features of MyFonts platform, ensuring high availability and optimal performance.",
      achievements: [
        "Improved user engagement by 15% through feature enhancements",
        "Customized Shopify themes and integrated third-party apps",
        "Maintained high-performance e-commerce experiences for millions of users"
      ],
      technologies: ["React.js", "TypeScript", "Redux", "jQuery", "Shopify", "Node.js", "Docker"]
    },
    {
      title: "Lead Frontend Developer",
      company: "Zegal Tech",
      period: "September 2020 - March 2023",
      duration: "2.5 years",
      location: "Remote",
      type: "Full-time",
      description: "Led frontend development for Zegal's legal tech applications using modern state management and performance optimization techniques.",
      achievements: [
        "Designed and developed Zegal Lite app from scratch",
        "Improved app performance by avoiding unnecessary re-renders",
        "Collaborated closely with Product Owners for feature planning and development"
      ],
      technologies: ["React.js", "MobX", "Redux", "TypeScript", "Jest", "Monorepo"]
    },
    {
      title: "Full Stack Developer",
      company: "Tekkon Technology",
      period: "September 2019 - September 2020",
      duration: "1 year",
      location: "Kathmandu, Nepal",
      type: "Full-time",
      description: "Worked on client-facing full-stack web applications using modern web frameworks and SSR.",
      achievements: [
        "Developed two web apps for international clients",
        "Wrote reusable and testable code",
        "Implemented server-side rendering using Next.js"
      ],
      technologies: ["React.js", "Redux", "Node.js", "Express.js", "TypeScript", "SQL", "Next.js"]
    },
    {
      title: "Full Stack Developer",
      company: "Paaila Technology",
      period: "October 2018 - September 2019",
      duration: "1 year",
      location: "Kathmandu, Nepal",
      type: "Full-time",
      description: "Built and maintained web interfaces for AI-based robotics and internal dashboards.",
      achievements: [
        "Developed dashboard for AI robots using React.js and Redux",
        "Integrated Google Speech API for speech-to-text functionality",
        "Worked on real-time control using WebSocket"
      ],
      technologies: ["React.js", "Redux", "Node.js", "Express.js", "WebSocket", "Google Speech API"]
    },
    {
      title: "Software Engineer Intern",
      company: "Prixa Technology",
      period: "June 2018 - October 2018",
      duration: "4 months",
      location: "Kathmandu, Nepal",
      type: "Internship",
      description: "Worked on team projects including educational websites and news platforms.",
      achievements: [
        "Built school websites with a team",
        "Developed a news portal using Django and React.js"
      ],
      technologies: ["React.js", "Redux", "Django"]
    }
  ];
  
  const visibleExperiences = expanded ? experiences : experiences.slice(0, SHOW_COUNT);

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-secondary/30">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            <span className="bg-gradient-primary bg-clip-text text-transparent">
              {t('experience.title')}
            </span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {t('experience.subtitle')}
          </p>
        </div>

        <div className="space-y-8">
          {visibleExperiences.map((exp, index) => (
            <Card 
              key={index} 
              className="bg-gradient-card border-border hover:shadow-card transition-all duration-300 animate-fade-in"
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              <CardHeader>
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <div className="flex-1">
                    <CardTitle className="text-2xl font-bold text-foreground mb-2">
                      {exp.title}
                    </CardTitle>
                    <div className="flex items-center gap-2 text-primary font-semibold mb-2">
                      <Building className="w-5 h-5" />
                      {exp.company}
                    </div>
                    <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-muted-foreground text-sm">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        {exp.period}
                      </div>
                      <div className="flex items-center gap-2">
                        <Briefcase className="w-4 h-4" />
                        {exp.duration}
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4" />
                        {exp.location}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="secondary" className="text-xs">
                      {exp.type}
                    </Badge>
                  </div>
                </div>
                <p className="text-muted-foreground mt-4">
                  {exp.description}
                </p>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div>
                    <h4 className="font-semibold mb-3 text-foreground">{t('experience.achievements') || 'Key Achievements:'}:</h4>
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
                    <h4 className="font-semibold mb-3 text-foreground">{t('experience.technologies') || 'Technologies Used:'}:</h4>
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
          {experiences.length > SHOW_COUNT && (
            <div className="flex justify-center mt-6">
              <button
                className="px-6 py-2 rounded bg-primary text-white font-semibold hover:bg-primary/80 transition"
                onClick={() => setExpanded((prev) => !prev)}
              >
                {expanded ? (t('experience.showLess') || 'Show Less') : (t('experience.showAll') || 'Show All')}
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Experience;