import { Navigation } from "@/components/navigation"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"

export default function HomePage() {
  return (
    <div className="min-h-screen relative overflow-hidden">
      <Navigation />

      {/* Animated Background */}
      <div className="fixed inset-0 -z-10">
        <div className="suspense-background">
          <div className="floating-particles">
            <div className="particle particle-1"></div>
            <div className="particle particle-2"></div>
            <div className="particle particle-3"></div>
            <div className="particle particle-4"></div>
            <div className="particle particle-5"></div>
            <div className="particle particle-6"></div>
            <div className="particle particle-7"></div>
            <div className="particle particle-8"></div>
          </div>
          <div className="shadow-overlay"></div>
        </div>
        <div className="vignette-overlay"></div>
      </div>

      {/* Main Content */}
      <section className="min-h-screen flex items-center justify-center px-4">
        <div className="max-w-4xl mx-auto text-center">
          {/* Title */}
          <div className="mb-16">
            <h1 className="text-6xl md:text-8xl font-bold tracking-tight text-foreground mb-6 drop-shadow-lg">
              HUYE
            </h1>
            <p className="text-2xl md:text-3xl text-primary font-medium mb-2">
              Experiencia Interactiva
            </p>
          </div>

          {/* Project Icons */}
          <div className="flex flex-col md:flex-row items-center justify-center gap-12 md:gap-20">
            {/* VR Game Button */}
            <Link href="/vr-game" className="group">
              <div className="main-button vr-button">
                <div className="button-icon">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="52"
                    height="52"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="text-white drop-shadow-lg"
                  >
                    <path d="M8 5v14l11-7z"/>
                  </svg>
                </div>
                <span className="button-text">Juego VR</span>
                <div className="button-glow"></div>
              </div>
            </Link>

            {/* Final Project Button - Disabled */}
            <div className="main-button final-button disabled-button">
              <div className="button-icon">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="52"
                  height="52"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  className="text-white drop-shadow-lg"
                >
                  <circle cx="12" cy="12" r="10"/>
                  <polyline points="12,6 12,12 16,14"/>
                  <circle cx="12" cy="12" r="2" fill="currentColor"/>
                </svg>
              </div>
              <span className="button-text">Proyecto Final</span>
              <div className="button-glow accent-glow"></div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
