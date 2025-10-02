import { Navigation } from "@/components/navigation"
import { Timeline } from "@/components/timeline"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

const timelineData = [
  {
    id: "1",
    title: "Aterrizaje de ideas e investigación",
    date: "Semana 1",
    phase: "Investigación",
    description:
      "En esta primera parte se hizo una lluvia de ideas con el equipo para definir el concepto del juego, sus mecánicas principales y la tecnología a utilizar. Se investigaron las mejores prácticas en diseño de juegos VR y se establecieron los objetivos del proyecto.",
    achievements: [
      "Definiendo problema a solucionar: Fobias comunes",
      "Establecimento de la herramienta (Unity, SteamVR, C#)",
      "Primeros mockups y wireframes del juego",
    ],
    status: "completed" as const,
    image: "/brainstorm.jpeg",
  },
  {
    id: "2",
    title: "Realizacion de maqueta para poder validar la idea",
    date: "Semana 2",
    phase: "Diseño",
    description:
      "Se hizo un live action con usuarios reales agenos a la carrera para poder recibir feedback y validar la idea, hacer mejorar y cambiar lo que no funcionaba.",
    achievements: [
      "Finalized game concept: 'Virtual Odyssey' - exploration-based adventure",
      "Created detailed storyboards for 5 key game sequences",
      "Designed interaction system for hand tracking and controller input",
      "Developed character personas and narrative structure",
    ],
    status: "completed" as const,
    image: "/maqueta.jpeg",
  },
  // {
  //   id: "3",
  //   title: "Prototyping & Early Development",
  //   date: "Week 5-7",
  //   phase: "Development",
  //   description:
  //     "Built initial prototypes to test core mechanics and VR interaction systems. Focused on establishing fundamental gameplay loops and user interface elements.",
  //   achievements: [
  //     "Implemented basic VR movement and teleportation system",
  //     "Created prototype environment with interactive objects",
  //     "Developed hand gesture recognition for object manipulation",
  //     "Established basic UI system optimized for VR viewing angles",
  //   ],
  //   status: "completed" as const,
  //   image: "/vr-prototype-development-unity-editor-interface.jpg",
  // },
  // {
  //   id: "4",
  //   title: "User Testing & Iteration",
  //   date: "Week 8-9",
  //   phase: "Testing",
  //   description:
  //     "Conducted initial user testing sessions with 12 participants to evaluate usability, comfort, and engagement. Gathered feedback on motion sickness, interaction intuitiveness, and overall experience.",
  //   achievements: [
  //     "Completed usability testing with 12 diverse participants",
  //     "Identified and resolved 3 major motion sickness triggers",
  //     "Improved hand tracking accuracy by 40%",
  //     "Refined UI elements based on user feedback",
  //   ],
  //   status: "completed" as const,
  //   image: "/vr-user-testing-session-with-participants-wearing-.jpg",
  // },
  // {
  //   id: "5",
  //   title: "Core Feature Implementation",
  //   date: "Week 10-12",
  //   phase: "Development",
  //   description:
  //     "Implemented core game features including advanced interaction systems, environmental storytelling elements, and immersive audio design. Focus on creating compelling gameplay experiences.",
  //   achievements: [
  //     "Developed physics-based puzzle mechanics",
  //     "Implemented spatial audio system for immersive soundscapes",
  //     "Created dynamic lighting system responsive to player actions",
  //     "Built inventory and object interaction systems",
  //   ],
  //   status: "completed" as const,
  //   image: "/vr-game-environment-with-physics-puzzles-and-inter.jpg",
  // },
  // {
  //   id: "6",
  //   title: "Polish & Optimization",
  //   date: "Week 13-14",
  //   phase: "Optimization",
  //   description:
  //     "Focused on performance optimization, visual polish, and final user experience refinements. Conducted final testing rounds and prepared for project presentation.",
  //   achievements: [
  //     "Achieved stable 90fps performance on target hardware",
  //     "Implemented advanced visual effects and particle systems",
  //     "Completed final round of user testing with 8 participants",
  //     "Created comprehensive documentation and user guide",
  //   ],
  //   status: "completed" as const,
  //   image: "/vr-game-performance-optimization-graphs-and-visual.jpg",
  // },
  // {
  //   id: "7",
  //   title: "Final Presentation & Documentation",
  //   date: "Week 15",
  //   phase: "Completion",
  //   description:
  //     "Prepared final project presentation, compiled comprehensive documentation, and reflected on the development process and lessons learned.",
  //   achievements: [
  //     "Delivered successful final presentation to course instructors",
  //     "Completed comprehensive project documentation",
  //     "Conducted post-project analysis and reflection",
  //     "Prepared project for portfolio inclusion",
  //   ],
  //   status: "completed" as const,
  //   image: "/vr-project-final-presentation-and-documentation-ma.jpg",
  // },
]

export default function VRGamePage() {
  return (
    <div className="min-h-screen bg-background animate-in fade-in duration-700 relative">
      <div
        className="page-background"
        style={{
          backgroundImage: "url('/dark-ethereal-vr-landscape-with-floating-geometric.jpg')",
        }}
      />

      <Navigation />

      {/* Hero Section */}
      <section className="py-16 sm:py-24 animate-in slide-in-from-bottom duration-1000">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-4xl text-center">
            <Badge variant="outline" className="mb-4 horror-glow">
              Proyecto VR
            </Badge>
            <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl text-balance">
              Safe Yourself
              <span className="block text-primary mt-2">
                Proceso de desarrollo
              </span>
            </h1>
            <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-muted-foreground text-pretty">
              Aqui encontraras el proceso desde la primera idea hasta el resultado final :D </p>
          </div>
        </div>
      </section>

      {/* Project Overview */}
      <section className="py-16 bg-muted/20 animate-in slide-in-from-bottom duration-1000 delay-300">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-6xl">
            <div className="grid gap-8 md:grid-cols-3">
              <Card className="border-0 bg-card/50 backdrop-blur-sm horror-glow">
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 rounded-lg bg-primary/20 flex items-center justify-center mx-auto mb-4">
                    <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                      />
                    </svg>
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">Experiencia Inmersiva</h3>
                  <p className="text-sm text-muted-foreground">
                    Vista en 360° en un entorno de realidad virtual con audio espacial y retroalimentación háptica
                  </p>
                </CardContent>
              </Card>

              <Card className="border-0 bg-card/50 backdrop-blur-sm horror-glow">
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 rounded-lg bg-accent/20 flex items-center justify-center mx-auto mb-4">
                    <svg className="w-6 h-6 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M7 11.5V14m0-2.5v-6a1.5 1.5 0 113 0m-3 6a1.5 1.5 0 00-3 0v2a7.5 7.5 0 0015 0v-5a1.5 1.5 0 00-3 0m-6-3V11m0-5.5v-1a1.5 1.5 0 013 0v1m0 0V11m0-5.5a1.5 1.5 0 013 0v3m0 0V11"
                      />
                    </svg>
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">Hand Tracking</h3>
                  <p className="text-sm text-muted-foreground">
                    Reconocimiento de gestos para interactuar con objetos de forma natural
                  </p>
                </CardContent>
              </Card>

              <Card className="border-0 bg-card/50 backdrop-blur-sm horror-glow">
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 rounded-lg bg-chart-2/20 flex items-center justify-center mx-auto mb-4">
                    <svg className="w-6 h-6 text-chart-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                      />
                    </svg>
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">Minipuzzles</h3>
                  <p className="text-sm text-muted-foreground">
                    Resuelve minipuzzles con los objetos que tengas a la mano para avanzar en el juego
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Development Timeline */}
      <section className="py-24 animate-in slide-in-from-bottom duration-1000 delay-500">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-4xl">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-foreground mb-4">Proceso de desarrollo</h2>
              {/* <p className="text-lg text-muted-foreground">
                A detailed timeline showcasing the iterative development approach and key milestones achieved throughout
                the 15-week project duration.
              </p> */}
            </div>

            <Timeline items={timelineData} />
          </div>
        </div>
      </section>

      {/* Project Outcomes */}
      {/* <section className="py-16 bg-muted/20 animate-in slide-in-from-bottom duration-1000 delay-700">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-4xl">
            <h2 className="text-3xl font-bold text-center text-foreground mb-12">Project Outcomes</h2>

            <div className="grid gap-8 md:grid-cols-2">
              <Card className="border-0 bg-card/50 backdrop-blur-sm horror-glow">
                <CardContent className="p-8">
                  <h3 className="text-xl font-semibold text-foreground mb-4">Technical Achievements</h3>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-3">
                      <span className="text-primary mt-1 flex-shrink-0">✓</span>
                      <span className="text-muted-foreground">Stable 90fps performance on Oculus Rift S</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-primary mt-1 flex-shrink-0">✓</span>
                      <span className="text-muted-foreground">Advanced hand tracking with 95% accuracy</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-primary mt-1 flex-shrink-0">✓</span>
                      <span className="text-muted-foreground">Spatial audio system with 3D positioning</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-primary mt-1 flex-shrink-0">✓</span>
                      <span className="text-muted-foreground">Physics-based interaction system</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="border-0 bg-card/50 backdrop-blur-sm horror-glow">
                <CardContent className="p-8">
                  <h3 className="text-xl font-semibold text-foreground mb-4">User Experience Results</h3>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-3">
                      <span className="text-primary mt-1 flex-shrink-0">✓</span>
                      <span className="text-muted-foreground">92% user satisfaction rating</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-primary mt-1 flex-shrink-0">✓</span>
                      <span className="text-muted-foreground">Reduced motion sickness by 75%</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-primary mt-1 flex-shrink-0">✓</span>
                      <span className="text-muted-foreground">Average session time: 45 minutes</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-primary mt-1 flex-shrink-0">✓</span>
                      <span className="text-muted-foreground">100% task completion rate in testing</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section> */}
    </div>
  )
}
