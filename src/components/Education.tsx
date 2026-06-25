import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { GraduationCap, Calendar, MapPin } from "lucide-react";
import { useI18n } from "@/contexts/I18nContext";

const Education = () => {
  const { t } = useI18n();
  
  const education = [
    {
      degree: "Master of Information Technology (Major in Data Science and AI)",
      institution: "Murdoch University",
      period: "Feb 2025 - Present",
      location: "Perth, Australia",
      description: "Postgraduate degree focusing on advanced information technology topics with a specialization in data science, machine learning, and artificial intelligence.",
      achievements: [
        "Admitted to a competitive IT program with AI specialization",
        "Building real-world solutions using data-driven and AI approaches",
        "Hands-on experience with AI frameworks and cloud platforms"
      ],
      subjects: [
        "Machine Learning & AI",
        "Advanced Data Analytics",
        "Natural Language Processing",
        "Data Visualization & Interpretation",
        "Cloud Computing for AI",
        "Big Data Technologies"
      ]
    },
    {
      degree: "Bachelor of Computer Engineering",
      institution: "Kathmandu University",
      period: "Jul 2014 - Aug 2018",
      location: "Dhulikhel, Nepal",
      description: "Comprehensive computer engineering degree with a focus on software development, systems design, and problem-solving.",
      achievements: [
        "Participated and won in multiple university hackathons (1st and 3rd place)",
        "Built major projects in web and AI domains",
        "Gained strong theoretical and practical foundation in software engineering"
      ],
      subjects: [
        "Data Structures & Algorithms",
        "Software Engineering",
        "Computer Networks",
        "Database Systems",
        "Web Technologies",
        "Object-Oriented Programming"
      ]
    }
  ];
  
  
  const certifications = [
    {
      name: "React.js Certification",
      issuer: "Meta",
      date: "2023",
      credentialId: "META-REACT-2023"
    },
    {
      name: "Node.js Developer Certification",
      issuer: "Node.js Foundation",
      date: "2022",
      credentialId: "NODEJS-DEV-2022"
    },
    {
      name: "TypeScript Certification",
      issuer: "Microsoft",
      date: "2022",
      credentialId: "MS-TS-2022"
    },
    {
      name: "AWS Cloud Practitioner",
      issuer: "Amazon Web Services",
      date: "2021",
      credentialId: "AWS-CP-2021"
    }
  ];

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-background">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            <span className="bg-gradient-primary bg-clip-text text-transparent">
              {t('education.title') || 'Education & Certifications'}
            </span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {t('education.subtitle') || 'Academic background and professional certifications that shaped my technical expertise'}
          </p>
        </div>

        {/* Education Section */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold mb-8 text-foreground">
            {t('education.academicTitle') || 'Academic Education'}
          </h3>
          <div className="space-y-8">
            {education.map((edu, index) => (
              <Card 
                key={index} 
                className="bg-gradient-card border-border hover:shadow-card transition-all duration-300 animate-fade-in"
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <CardHeader>
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div>
                      <CardTitle className="text-2xl font-bold text-foreground mb-2">
                        {edu.degree}
                      </CardTitle>
                      <div className="flex items-center gap-2 text-primary font-semibold mb-2">
                        <GraduationCap className="w-5 h-5" />
                        {edu.institution}
                      </div>
                      <div className="flex items-center gap-4 text-muted-foreground">
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4" />
                          {edu.period}
                        </div>
                        <div className="flex items-center gap-2">
                          <MapPin className="w-4 h-4" />
                          {edu.location}
                        </div>
                      </div>
                    </div>
                  </div>
                  <p className="text-muted-foreground mt-4">
                    {edu.description}
                  </p>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div>
                      <h4 className="font-semibold mb-3 text-foreground">
                        {t('education.achievements') || 'Key Achievements:'}
                      </h4>
                      <ul className="space-y-2">
                        {edu.achievements.map((achievement, achIndex) => (
                          <li key={achIndex} className="flex items-start gap-3 text-muted-foreground">
                            <span className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></span>
                            {achievement}
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold mb-3 text-foreground">
                        {t('education.subjects') || 'Key Subjects:'}
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {edu.subjects.map((subject, subIndex) => (
                          <Badge key={subIndex} variant="outline" className="border-primary/20">
                            {subject}
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
      </div>
    </section>
  );
};

export default Education;
