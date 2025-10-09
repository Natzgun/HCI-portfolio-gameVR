"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useEffect, useRef, useState } from "react"
import Image from "next/image"

interface TimelineItem {
  id: string
  title: string
  date: string
  phase: string
  description: string
  achievements: string[]
  status: "completed" | "in-progress" | "upcoming"
  image?: string
}

interface TimelineProps {
  items: TimelineItem[]
}

export function Timeline({ items }: TimelineProps) {
  const [visibleItems, setVisibleItems] = useState<Set<number>>(new Set())
  const itemRefs = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    const observers = itemRefs.current.map((ref, index) => {
      if (!ref) return null

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              setVisibleItems((prev) => new Set([...prev, index]))
            }, index * 200) // Stagger animations
          }
        },
        { threshold: 0.3 },
      )

      observer.observe(ref)
      return observer
    })

    return () => {
      observers.forEach((observer) => observer?.disconnect())
    }
  }, [])

  return (
    <div className="relative">
      <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-primary"></div>

      <div className="space-y-8">
        {items.map((item, index) => (
          <div
            key={item.id}
            ref={(el) => (itemRefs.current[index] = el)}
            className={`relative flex items-start gap-8 transition-all duration-700 ${
              visibleItems.has(index) ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8"
            }`}
          >
            <div
              className={`relative z-10 flex h-16 w-16 items-center justify-center rounded-full border-4 transition-all duration-500 ${
                item.status === "completed"
                  ? `bg-primary border-primary text-primary-foreground ${
                      visibleItems.has(index) ? "shadow-lg shadow-primary/50 scale-110" : ""
                    }`
                  : item.status === "in-progress"
                    ? `bg-accent border-accent text-accent-foreground ${
                        visibleItems.has(index) ? "shadow-lg shadow-accent/50 scale-110" : ""
                      }`
                    : "bg-muted border-muted-foreground text-muted-foreground"
              }`}
            >
              <span
                className={`text-sm font-bold transition-all duration-300 ${
                  visibleItems.has(index) ? "scale-125" : ""
                }`}
              >
                {index + 1}
              </span>

              {item.status === "in-progress" && visibleItems.has(index) && (
                <div className="absolute inset-0 rounded-full border-2 border-accent animate-ping"></div>
              )}
            </div>

            {/* Content */}
            <div className="flex-1 pb-8">
              <Card
                className={`border-0 transition-all duration-500 hover:scale-[1.02] ${
                  item.status === "completed"
                    ? "bg-card/80 hover:bg-card/90"
                    : item.status === "in-progress"
                      ? "bg-accent/10 border-accent/20 border hover:bg-accent/15"
                      : "bg-muted/30 hover:bg-muted/40"
                } backdrop-blur-sm ${visibleItems.has(index) ? "shadow-xl" : "shadow-md"}`}
              >
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-xl font-semibold text-foreground">{item.title}</h3>
                    <Badge
                      variant={
                        item.status === "completed"
                          ? "default"
                          : item.status === "in-progress"
                            ? "secondary"
                            : "outline"
                      }
                      className="transition-all duration-300 hover:scale-105"
                    >
                      {item.phase}
                    </Badge>
                  </div>

                  <p className="text-sm text-muted-foreground mb-4">{item.date}</p>

                  {item.image && (
                    <div className="mb-4 overflow-hidden rounded-lg">
                      <Image
                        src={item.image || "/placeholder.svg"}
                        alt={item.title}
                        width={600}
                        height={300}
                        className="w-full h-48 object-cover transition-transform duration-300 hover:scale-105"
                      />
                    </div>
                  )}

                  <p className="text-muted-foreground leading-relaxed mb-4">{item.description}</p>

                  {item.achievements.length > 0 && (
                    <div>
                      <h4 className="text-sm font-medium text-foreground mb-2">Key Achievements:</h4>
                      <ul className="space-y-1">
                        {item.achievements.map((achievement, i) => (
                          <li
                            key={i}
                            className={`text-sm text-muted-foreground flex items-start gap-2 transition-all duration-300 ${
                              visibleItems.has(index) ? "translate-x-0 opacity-100" : "translate-x-4 opacity-0"
                            }`}
                            style={{ transitionDelay: `${(i + 1) * 100}ms` }}
                          >
                            <span className="text-primary mt-1.5 flex-shrink-0">•</span>
                            <span>{achievement}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
