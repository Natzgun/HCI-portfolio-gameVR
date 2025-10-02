import { Navigation } from "@/components/navigation"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

const teamMembers = [
  {
    id: "1",
    name: "Erick Malcoaccha",
    role: "Lead VR Developer & Project Manager",
    bio: "Passionate about creating immersive experiences that push the boundaries of human-computer interaction. Specializes in Unity development, 3D graphics, and user experience design in virtual environments.",
    skills: ["Unity 3D", "C# Programming", "VR/AR Development", "3D Modeling", "Project Management"],
    contributions: [
      "Led overall project architecture and development strategy",
      "Implemented core VR interaction systems and physics",
      "Coordinated team efforts and managed project timelines",
      "Designed and developed the Virtual Odyssey game mechanics",
    ],
    image: "https://images3.memedroid.com/images/UPLOADED920/6584ffaa9714d.jpeg",
    linkedin: "#",
    github: "#",
    email: "emalcoaccha@unsa.edu.pe",
  },
  {
    id: "2",
    name: "Marko Sumire",
    role: "UX/UI Designer & Accessibility Specialist",
    bio: "Dedicated to creating inclusive digital experiences that work for everyone. Combines expertise in user experience design with deep knowledge of accessibility standards and assistive technologies.",
    skills: ["UX/UI Design", "Accessibility Standards", "User Research", "Prototyping", "Inclusive Design"],
    contributions: [
      "Conducted comprehensive user research and accessibility audits",
      "Designed inclusive interfaces for the AccessiVR platform",
      "Developed accessibility testing methodologies",
      "Created user personas and journey maps for diverse user groups",
    ],
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTWO7qUiWTFRGESZRBzjqMKdOrjBStV2cJD5I02roOppaoNRPOhA3MHKtRmiOqPwKpEdMw&usqp=CAU",
    linkedin: "#",
    github: "#",
    email: "msumirer@unsa.edu.pe",
  },
  {
    id: "3",
    name: "Josue Philco",
    role: "AI/ML Engineer & Research Specialist",
    bio: "Focused on integrating artificial intelligence and machine learning into immersive experiences. Specializes in adaptive systems, natural language processing, and computer vision applications in VR.",
    skills: ["Machine Learning", "Python", "Computer Vision", "Natural Language Processing", "Data Analysis"],
    contributions: [
      "Developed AI-powered adaptive interface systems",
      "Implemented voice recognition and eye tracking features",
      "Conducted research on personalization algorithms",
      "Created machine learning models for user behavior analysis",
    ],
    image: "https://i.pinimg.com/736x/fb/aa/76/fbaa769f925acd59d4303258bf5b9a47.jpg",
    linkedin: "#",
    github: "#",
    email: "jphilco@unsa.edu.pe",
  },
  {
    id: "4",
    name: "Aldo Martinez",
    role: "Quality Assurance & User Testing Lead",
    bio: "Committed to ensuring exceptional user experiences through rigorous testing and quality assurance. Specializes in usability testing, performance optimization, and cross-platform compatibility.",
    skills: ["Quality Assurance", "User Testing", "Performance Optimization", "Test Automation", "Analytics"],
    contributions: [
      "Designed and executed comprehensive testing protocols",
      "Coordinated user testing sessions with diverse participant groups",
      "Implemented performance monitoring and optimization strategies",
      "Developed automated testing frameworks for VR applications",
    ],
    image: "https://i.pinimg.com/236x/ce/36/f1/ce36f180b613489acec6d77845e48983.jpg",
    linkedin: "#",
    github: "#",
    email: "amartinezch@unsa.edu.pe",
  },
]

export default function TeamPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* Hero Section */}
      <section className="py-16 sm:py-24">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-4xl text-center">
            <div className="flex justify-center mb-8">
              <img 
                src="/worstg.png" 
                alt="Worst Generation Logo"
                className="w-auto drop-shadow-lg logo-glow scale-[0.7]"
              />
            </div>
            {/* <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-muted-foreground text-pretty">
              A diverse group of passionate researchers, developers, and designers united by our commitment to creating
              innovative and inclusive virtual reality experiences.
            </p> */}
          </div>
        </div>
      </section>

      {/* Team Values */}
      {/* <section className="py-16 bg-muted/20">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-6xl">
            <h2 className="text-3xl font-bold text-center text-foreground mb-12">Our Values</h2>

            <div className="grid gap-8 md:grid-cols-3">
              <Card className="border-0 bg-card/50 backdrop-blur-sm text-center">
                <CardContent className="p-8">
                  <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-6">
                    <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z"
                      />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold text-foreground mb-4">Inclusivity</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    We believe technology should be accessible to everyone, regardless of their abilities or
                    backgrounds. Our designs prioritize universal access and inclusive experiences.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-0 bg-card/50 backdrop-blur-sm text-center">
                <CardContent className="p-8">
                  <div className="w-16 h-16 rounded-full bg-accent/20 flex items-center justify-center mx-auto mb-6">
                    <svg className="w-8 h-8 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                      />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold text-foreground mb-4">Innovation</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    We push the boundaries of what's possible in virtual reality, exploring new interaction paradigms
                    and emerging technologies to create groundbreaking experiences.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-0 bg-card/50 backdrop-blur-sm text-center">
                <CardContent className="p-8">
                  <div className="w-16 h-16 rounded-full bg-chart-2/20 flex items-center justify-center mx-auto mb-6">
                    <svg className="w-8 h-8 text-chart-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold text-foreground mb-4">Excellence</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    We maintain the highest standards in research, development, and user experience design, ensuring our
                    work contributes meaningfully to the field of HCI.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section> */}

      {/* Team Members */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-6xl">

            <div className="grid gap-8 md:grid-cols-2">
              {teamMembers.map((member) => (
                <Card key={member.id} className="border-0 bg-card/50 backdrop-blur-sm overflow-hidden">
                  <CardContent className="p-0">
                    <div className="md:flex">
                      <div className="md:w-1/3">
                        <img
                          src={member.image || "/placeholder.svg"}
                          alt={`${member.name} - ${member.role}`}
                          className="w-full h-64 md:h-full object-cover"
                        />
                      </div>
                      <div className="md:w-2/3 p-6">
                        <h3 className="text-xl font-semibold text-foreground mb-1">{member.name}</h3>
                        <p className="text-primary font-medium mb-4">{member.role}</p>
                        <p className="text-muted-foreground text-sm leading-relaxed mb-4">{member.bio}</p>

                        <div className="mb-4">
                          <h4 className="text-sm font-medium text-foreground mb-2">Skills & Expertise</h4>
                          <div className="flex flex-wrap gap-1">
                            {member.skills.map((skill, index) => (
                              <Badge key={index} variant="secondary" className="text-xs">
                                {skill}
                              </Badge>
                            ))}
                          </div>
                        </div>

                        <div className="mb-4">
                          <h4 className="text-sm font-medium text-foreground mb-2">Key Contributions</h4>
                          <ul className="space-y-1">
                            {member.contributions.slice(0, 2).map((contribution, index) => (
                              <li key={index} className="text-xs text-muted-foreground flex items-start gap-2">
                                <span className="text-primary mt-1 flex-shrink-0">•</span>
                                <span>{contribution}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        <div className="flex items-center gap-3">
                          <Button variant="outline" size="sm" asChild>
                            <a href={member.linkedin} target="_blank" rel="noopener noreferrer">
                              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                              </svg>
                            </a>
                          </Button>
                          <Button variant="outline" size="sm" asChild>
                            <a href={member.github} target="_blank" rel="noopener noreferrer">
                              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                              </svg>
                            </a>
                          </Button>
                          <Button variant="outline" size="sm" asChild>
                            <a href={`mailto:${member.email}`}>
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                                />
                              </svg>
                            </a>
                          </Button>
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
    </div>
  )
}
