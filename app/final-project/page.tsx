import { Navigation } from "@/components/navigation"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ArrowRight, Target, Lightbulb, Users, BookOpen } from "lucide-react"

export default function FinalProjectPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <div className="container mx-auto px-4 py-16 max-w-6xl">
        {/* Hero Section */}
        <div className="text-center mb-20">
          <Badge variant="outline" className="mb-4 text-sm">Proyecto Final</Badge>
          <h1 className="text-6xl sm:text-7xl font-bold mb-8 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Shooting Words
          </h1>
          <div className="space-y-6 max-w-4xl mx-auto">
            <p className="text-xl text-muted-foreground leading-relaxed">
              Un proyecto de investigación e innovación en el aprendizaje de idiomas que aborda uno de los desafíos más comunes entre estudiantes de inglés:
            </p>
            <p className="text-2xl sm:text-3xl font-semibold text-foreground">
              Superando la brecha entre el conocimiento pasivo y el uso real del vocabulario
            </p>
            <p className="text-lg text-muted-foreground">
              Mediante estimular la recuperación espontánea y el pensamiento asociativo
            </p>
          </div>
        </div>

        {/* Key Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          <Card className="border-0 bg-card/50 backdrop-blur-sm transition-all duration-300 hover:scale-105 hover:shadow-lg">
            <CardContent className="p-6 text-center">
              <div className="w-14 h-14 rounded-xl bg-blue-500/10 flex items-center justify-center mx-auto mb-4">
                <Target className="w-7 h-7 text-blue-500" />
              </div>
              <h3 className="font-semibold text-lg mb-2">Recuperación Activa</h3>
              <p className="text-sm text-muted-foreground">
                Estimula el uso espontáneo del vocabulario aprendido
              </p>
            </CardContent>
          </Card>

          <Card className="border-0 bg-card/50 backdrop-blur-sm transition-all duration-300 hover:scale-105 hover:shadow-lg">
            <CardContent className="p-6 text-center">
              <div className="w-14 h-14 rounded-xl bg-purple-500/10 flex items-center justify-center mx-auto mb-4">
                <Lightbulb className="w-7 h-7 text-purple-500" />
              </div>
              <h3 className="font-semibold text-lg mb-2">Pensamiento Asociativo</h3>
              <p className="text-sm text-muted-foreground">
                Conecta palabras con contextos y significados reales
              </p>
            </CardContent>
          </Card>

          <Card className="border-0 bg-card/50 backdrop-blur-sm transition-all duration-300 hover:scale-105 hover:shadow-lg">
            <CardContent className="p-6 text-center">
              <div className="w-14 h-14 rounded-xl bg-green-500/10 flex items-center justify-center mx-auto mb-4">
                <BookOpen className="w-7 h-7 text-green-500" />
              </div>
              <h3 className="font-semibold text-lg mb-2">Fluidez Natural</h3>
              <p className="text-sm text-muted-foreground">
                Reduce la traducción mental y mejora la expresión directa
              </p>
            </CardContent>
          </Card>

          <Card className="border-0 bg-card/50 backdrop-blur-sm transition-all duration-300 hover:scale-105 hover:shadow-lg">
            <CardContent className="p-6 text-center">
              <div className="w-14 h-14 rounded-xl bg-orange-500/10 flex items-center justify-center mx-auto mb-4">
                <Users className="w-7 h-7 text-orange-500" />
              </div>
              <h3 className="font-semibold text-lg mb-2">Basado en Investigación</h3>
              <p className="text-sm text-muted-foreground">
                Desarrollado con insights de estudiantes y docentes
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Main CTA */}
        <div className="max-w-4xl mx-auto">
          <Card className="border-2 border-primary/30 bg-gradient-to-br from-primary/10 via-primary/5 to-accent/10 backdrop-blur-sm">
            <CardContent className="p-12 text-center">
              <h2 className="text-3xl font-bold mb-4">Descubre el Proceso de Desarrollo</h2>
              <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
                Explora cómo identificamos las necesidades de los estudiantes de inglés y diseñamos una solución innovadora basada en investigación real.
              </p>
              <a href="/roadmap_final_project">
                <Button size="lg" className="text-lg px-8 py-6 group">
                  Ver Roadmap Completo
                  <ArrowRight className="ml-2 w-6 h-6 transition-transform group-hover:translate-x-1" />
                </Button>
              </a>
            </CardContent>
          </Card>
        </div>

        {/* Bottom Info Cards */}
        <div className="grid md:grid-cols-2 gap-6 mt-16">
          <Card className="border-2 border-primary/20 bg-card/30 backdrop-blur-sm">
            <CardContent className="p-8">
              <h3 className="text-xl font-bold mb-3">El Problema</h3>
              <p className="text-muted-foreground leading-relaxed">
                Los estudiantes de inglés a menudo poseen un vocabulario pasivo extenso pero luchan para recuperarlo espontáneamente durante conversaciones o al escribir, recurriendo a palabras más simples o traduciendo mentalmente desde su idioma nativo.
              </p>
            </CardContent>
          </Card>

          <Card className="border-2 border-accent/20 bg-card/30 backdrop-blur-sm">
            <CardContent className="p-8">
              <h3 className="text-xl font-bold mb-3">Nuestra Solución</h3>
              <p className="text-muted-foreground leading-relaxed">
                Una experiencia interactiva que entrena la recuperación activa del vocabulario mediante juegos que simulan situaciones comunicativas reales, fortaleciendo las conexiones neuronales necesarias para el uso espontáneo del idioma.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}