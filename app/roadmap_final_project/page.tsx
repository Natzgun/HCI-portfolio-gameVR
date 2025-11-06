import { Navigation } from "@/components/navigation"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Users, Target, Lightbulb, BookOpen, Zap, MessageCircle, ClipboardList, ExternalLink } from "lucide-react"

const participants = [
  {
    id: "A",
    title: "Estudiante intermedio",
    profile: "Motivado por la necesidad de acceder a información académica (investigación) y conectar con otros. Aprende principalmente por inmersión y consumo de medios.",
    color: "bg-blue-500/10 border-blue-500/20"
  },
  {
    id: "B",
    title: "Estudiante avanzado",
    profile: "Alguien que ya es conversacionalmente fluido, pero que lucha por encontrar la palabra precisa y a menudo recurre a un vocabulario más simple del que posee pasivamente.",
    color: "bg-purple-500/10 border-purple-500/20"
  },
  {
    id: "C",
    title: "Estudiante con poca práctica comunicativa",
    profile: "Usuario con nivel de inglés intermedio auto-percibido (más fuerte en lectura que en escucha o habla). Su principal método actual es la lectura, aunque antes hablaba más. Tiende a traducir mentalmente desde el español.",
    color: "bg-green-500/10 border-green-500/20"
  },
  {
    id: "D",
    title: "Docente de idiomas",
    profile: "Docente de idiomas con experiencia enseñando inglés en diversos niveles. Actualmente cursando una maestría y especialización (CELTA). Aporta la perspectiva pedagógica sobre las dificultades y estrategias de los estudiantes.",
    color: "bg-orange-500/10 border-orange-500/20"
  }
]

const keyNeeds = [
  {
    number: "1",
    description: "Los estudiantes necesitan desarrollar la capacidad de formular ideas directamente en inglés para mejorar la fluidez.",
    icon: Target,
    color: "bg-blue-500/10",
    iconColor: "text-blue-500"
  },
  {
    number: "2",
    description: "Se necesitan prácticas que fomenten la recuperación activa de palabras desde la memoria conectándolas con su significado y contexto.",
    icon: Lightbulb,
    color: "bg-purple-500/10",
    iconColor: "text-purple-500"
  },
  {
    number: "3",
    description: "La práctica constante es fundamental, independientemente de conocer las reglas gramaticales.",
    icon: BookOpen,
    color: "bg-green-500/10",
    iconColor: "text-green-500"
  },
  {
    number: "4",
    description: "Existe la necesidad de métodos de aprendizaje que sean motivadores y atractivos para mantener el compromiso del estudiante.",
    icon: Zap,
    color: "bg-orange-500/10",
    iconColor: "text-orange-500"
  }
]

const interviews = [
  {
    id: "A",
    title: "Entrevista - Participante A",
    description: "Estudiante intermedio",
    driveUrl: "https://drive.google.com/file/d/10lceuvvAuO_BHuns6S67VVdFV03oa0b_/view?usp=drive_link" // Reemplazar con tu URL de Google Drive
  },
  {
    id: "B",
    title: "Entrevista - Participante B",
    description: "Estudiante avanzado",
    driveUrl: "https://drive.google.com/file/d/1ymVhodDsJ4Isb8L9-i3npGqpKtDB1Q-Y/view?usp=sharing"
  },
  {
    id: "C",
    title: "Entrevista - Participante C",
    description: "Estudiante con poca práctica comunicativa",
    driveUrl: "https://drive.google.com/file/d/1NlJnEyfsQYuu460V8KB4BrKJlICffKzJ/view?usp=drive_link"
  },
  {
    id: "D",
    title: "Entrevista - Participante D",
    description: "Docente de idiomas",
    driveUrl: "https://drive.google.com/file/d/1r7jcCdOTchutg33isQn9eQgs9R2bWGWR/view?usp=drive_link"
  }
]

const studentQuestions = [
  {
    section: "Sección 1: El Contexto",
    questions: [
      "En una escala del 1 al 10, ¿cómo calificas tu habilidad para entender inglés (leyendo/escuchando)? ¿Y tu habilidad para hablarlo?",
      "¿Te pasa que reconoces una palabra al leer, pero días después, cuando quieres usarla, no la recuerdas?"
    ]
  },
  {
    section: "Sección 2: El \"Bloqueo\" y sus Causas",
    questions: [
      "¿Cómo percibes que es tu proceso de recuperación de lenguaje durante una conversación o redacción?",
      "Cuando olvidas una palabra ¿Cómo intentas recordar o reemplazarla? (¿usas una palabra más simple, relacionada, describes la idea?).",
      "Cuando hablas, ¿sientes que piensas en español y traduces, o las palabras fluyen directamente en inglés?",
      "¿Te confundes a menudo al elegir entre palabras con significados parecidos (como see, look y watch)?",
      "¿Sientes a veces que usas palabras \"fáciles\" (como \"good\") aunque sabes que existe una palabra más precisa (como \"outstanding\"), pero no te viene a la mente lo suficientemente rápido?"
    ]
  },
  {
    section: "Sección 3: El Impacto",
    questions: [
      "¿Cómo afecta esta experiencia a tu confianza general? ¿Evitas hablar en ciertas situaciones por miedo a bloquearte?"
    ]
  }
]

const teacherQuestions = [
  "¿Qué falla en los métodos habituales de enseñar vocabulario que dificulta que los alumnos usen las palabras que aprenden?",
  "Cuando un alumno se 'bloquea' buscando una palabra, ¿qué habilidad clave crees que necesita desarrollar para encontrarla?",
  "¿Qué tipo de práctica ayudaría más a los alumnos a poder usar espontáneamente las palabras que ya entienden?",
  "¿Cómo afecta a los alumnos el traducir mentalmente o confundir palabras parecidas al comunicarse?",
  "En tu opinión, ¿cuál es la necesidad más importante para que los alumnos puedan usar activamente el vocabulario que ya conocen?"
]

export default function RoadmapPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <div className="container mx-auto px-4 py-12 max-w-5xl">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold mb-6">Roadmap de Desarrollo</h1>
          <Badge className="px-6 py-3 text-base">
            Fase 1: Needfinding (Investigación de Necesidades)
          </Badge>
        </div>

        {/* Participants Section */}
        <div className="mb-20">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
              <Users className="w-7 h-7 text-primary" />
            </div>
            <h2 className="text-3xl font-bold">Perfiles de Participantes</h2>
          </div>

          <div className="space-y-6">
            {participants.map((participant) => (
              <Card 
                key={participant.id}
                className={`border-2 ${participant.color}`}
              >
                <CardContent className="p-8">
                  <div className="flex gap-6">
                    <div className={`w-16 h-16 rounded-full bg-background flex items-center justify-center flex-shrink-0 font-bold text-2xl border-2 ${participant.color}`}>
                      {participant.id}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold text-xl mb-3">
                        Participante {participant.id}
                      </h3>
                      <Badge variant="secondary" className="mb-4">
                        {participant.title}
                      </Badge>
                      <p className="text-base text-muted-foreground leading-relaxed">
                        <span className="font-medium text-foreground">Perfil: </span>
                        {participant.profile}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Key Needs Section */}
        <div className="mb-20">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
              <Lightbulb className="w-7 h-7 text-primary" />
            </div>
            <h2 className="text-3xl font-bold">Necesidades Clave Identificadas</h2>
          </div>

          <div className="space-y-6">
            {keyNeeds.map((need) => {
              const Icon = need.icon
              return (
                <Card 
                  key={need.number}
                  className="border-l-4 border-l-primary"
                >
                  <CardContent className="p-8">
                    <div className="flex items-start gap-6">
                      <div className="flex flex-col items-center gap-3 flex-shrink-0">
                        <div className={`w-14 h-14 rounded-lg ${need.color} flex items-center justify-center font-bold text-xl`}>
                          {need.number}
                        </div>
                        <div className={`w-14 h-14 rounded-lg ${need.color} flex items-center justify-center`}>
                          <Icon className={`w-7 h-7 ${need.iconColor}`} />
                        </div>
                      </div>
                      <div className="flex-1 pt-3">
                        <p className="text-base leading-relaxed">
                          <span className="font-semibold text-lg">Need #{need.number}: </span>
                          {need.description}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>

        {/* Interviews Section */}
        <div className="mb-20">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
              <MessageCircle className="w-7 h-7 text-primary" />
            </div>
            <h2 className="text-3xl font-bold">Entrevistas Completas</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {interviews.map((interview) => (
              <Card key={interview.id} className="border-2 hover:border-primary/50 transition-colors">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 font-bold text-lg">
                      {interview.id}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold text-lg mb-1">{interview.title}</h3>
                      <p className="text-sm text-muted-foreground mb-4">{interview.description}</p>
                      <a 
                        href={interview.driveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline"
                      >
                        Ver entrevista completa
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Questionnaires Section */}
        <div className="mb-20">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
              <ClipboardList className="w-7 h-7 text-primary" />
            </div>
            <h2 className="text-3xl font-bold">Cuestionarios</h2>
          </div>

          {/* Student Questionnaire */}
          <Card className="mb-8 border-2">
            <CardContent className="p-8">
              <div className="mb-6">
                <h3 className="font-bold text-2xl mb-2">Cuestionario para Estudiantes</h3>
                <Badge variant="secondary">Participantes A, B y C</Badge>
              </div>

              <div className="space-y-8">
                {studentQuestions.map((section, idx) => (
                  <div key={idx}>
                    <h4 className="font-bold text-lg mb-4 text-primary">{section.section}</h4>
                    <div className="space-y-4">
                      {section.questions.map((question, qIdx) => (
                        <div key={qIdx} className="flex gap-4">
                          <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 font-medium text-sm">
                            {qIdx + 1}
                          </div>
                          <p className="text-base leading-relaxed pt-1">{question}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Teacher Questionnaire */}
          <Card className="border-2">
            <CardContent className="p-8">
              <div className="mb-6">
                <h3 className="font-bold text-2xl mb-2">Cuestionario para Docente</h3>
                <Badge variant="secondary">Participante D - Usuario Experto</Badge>
              </div>

              <div className="space-y-4">
                {teacherQuestions.map((question, idx) => (
                  <div key={idx} className="flex gap-4">
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 font-medium text-sm">
                      {idx + 1}
                    </div>
                    <p className="text-base leading-relaxed pt-1">{question}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}