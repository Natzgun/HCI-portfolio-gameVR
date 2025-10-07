"use client"

import { Navigation } from "@/components/navigation"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { useEffect, useState } from "react"

export default function HomePage() {
  const [showIntro, setShowIntro] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowIntro(false)
    }, 3000) // Hide intro after 3 seconds

    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    // Prevent scrolling on homepage
    document.body.style.overflow = 'hidden'
    document.body.style.height = '100vh'
    
    // Cleanup when component unmounts
    return () => {
      document.body.style.overflow = 'auto'
      document.body.style.height = 'auto'
    }
  }, [])

  return (
    <div className="h-screen relative overflow-hidden" data-page="homepage">
      {/* Steam Big Picture Style Intro */}
      {showIntro && (
        <div className="steam-intro">
          <div className="intro-fog-container">
            <div className="intro-fog fog-1"></div>
            <div className="intro-fog fog-2"></div>
            <div className="intro-fog fog-3"></div>
            <div className="intro-fog fog-4"></div>
            <div className="intro-fog fog-5"></div>
          </div>
          <div className="intro-title">
            <div className="flex justify-center mb-6">
              <img 
                src="/worstg.png" 
                alt="Worst Generation Logo"
                className="w-auto drop-shadow-lg logo-glow scale-[0.7]"
              />
            </div>
            <p className="text-xl md:text-2xl text-primary font-medium">
              Inmersive Experience
            </p>
          </div>
        </div>
      )}

      <Navigation />

      {/* Animated Background with GIF */}
      <div className="fixed inset-0 -z-10">
        {/* GIF Background - Bottom layer */}
        <div className="gif-background">
          <img 
            src="/backrooms-fog-background.gif" 
            alt="Backrooms fog background"
            className="w-full h-full object-cover"
          />
        </div>
        
        {/* Overlay for better readability */}
        <div className="gif-overlay"></div>
        
        {/* Particles and effects on top */}
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
      <section className="main-content h-screen flex items-center justify-center px-4 py-8">
        <div className="max-w-4xl mx-auto text-center flex flex-col justify-center h-full">
          {/* Logo and Title */}
          <div className="mb-8">
            <div className="flex justify-center mb-4">
              <img 
                src="/worstg.png" 
                alt="Worst Generation Logo"
                className="w-auto drop-shadow-lg logo-glow scale-[0.5]"
              />
            </div>
            <p className="text-lg md:text-xl text-primary font-medium mb-2">
              Inmersive Experience
            </p>
          </div>

          {/* Project Icons */}
          <div className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-12">
            {/* VR Game Button */}
            <Link href="/vr-game" className="group">
              <div className="main-button vr-button mysterious-glow">
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
            <div className="main-button final-button disabled-button mysterious-glow">
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
