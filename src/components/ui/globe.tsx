"use client"

import createGlobe, { type COBEOptions } from "cobe"
import { useEffect, useRef } from "react"

import { cn } from "@/lib/utils"

const LAS_VEGAS: [number, number] = [36.1699, -115.1398]
const GOLD: [number, number, number] = [201 / 255, 165 / 255, 106 / 255]

// Las Vegas in gold, with arcs from places people often move here from.
export const GLOBE_CONFIG: COBEOptions = {
  width: 800,
  height: 800,
  devicePixelRatio: 2,
  phi: 2.2,
  theta: 0.32,
  dark: 0,
  diffuse: 0.4,
  mapSamples: 16000,
  mapBrightness: 1.2,
  baseColor: [1, 1, 1],
  markerColor: GOLD,
  glowColor: [1, 1, 1],
  markers: [
    { location: LAS_VEGAS, size: 0.06 },
    { location: [34.0522, -118.2437], size: 0.04 },
    { location: [37.7749, -122.4194], size: 0.04 },
    { location: [47.6062, -122.3321], size: 0.03 },
    { location: [21.3069, -157.8583], size: 0.03 },
    { location: [14.5995, 120.9842], size: 0.035 },
  ],
  arcs: [
    { from: [34.0522, -118.2437], to: LAS_VEGAS },
    { from: [37.7749, -122.4194], to: LAS_VEGAS },
    { from: [47.6062, -122.3321], to: LAS_VEGAS },
    { from: [21.3069, -157.8583], to: LAS_VEGAS },
    { from: [14.5995, 120.9842], to: LAS_VEGAS },
  ],
  arcColor: GOLD,
  arcWidth: 0.6,
  arcHeight: 0.25,
}

/**
 * Slowly spinning dotted globe (cobe v2). Drag sideways to turn it; it pauses
 * while off screen and holds still for visitors who prefer reduced motion.
 */
export function Globe({
  className,
  config = GLOBE_CONFIG,
  speed = 0.003,
}: {
  className?: string
  config?: COBEOptions
  speed?: number
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const pointerStart = useRef<number | null>(null)
  const dragOffset = useRef(0)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const still = matchMedia("(prefers-reduced-motion: reduce)").matches
    let width = canvas.offsetWidth
    let phi = config.phi
    let frame = 0
    let visible = true

    const globe = createGlobe(canvas, {
      ...config,
      width: width * 2,
      height: width * 2,
    })

    const loop = () => {
      if (!visible) {
        frame = 0
        return
      }
      if (pointerStart.current === null && !still) phi += speed
      globe.update({
        phi: phi + dragOffset.current,
        width: width * 2,
        height: width * 2,
      })
      frame = requestAnimationFrame(loop)
    }

    const onResize = () => {
      width = canvas.offsetWidth
    }
    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting
      if (visible && !frame) loop()
    })

    window.addEventListener("resize", onResize)
    observer.observe(canvas)
    loop()
    const reveal = setTimeout(() => (canvas.style.opacity = "1"))

    return () => {
      clearTimeout(reveal)
      cancelAnimationFrame(frame)
      observer.disconnect()
      window.removeEventListener("resize", onResize)
      globe.destroy()
    }
  }, [config, speed])

  const release = () => {
    pointerStart.current = null
    if (canvasRef.current) canvasRef.current.style.cursor = "grab"
  }

  return (
    <div
      className={cn(
        "absolute inset-0 mx-auto aspect-[1/1] w-full max-w-[600px]",
        className,
      )}
    >
      <canvas
        ref={canvasRef}
        aria-hidden="true"
        className="size-full cursor-grab touch-pan-y opacity-0 transition-opacity duration-500 [contain:layout_paint_size]"
        onPointerDown={(e) => {
          pointerStart.current = e.clientX - dragOffset.current * 200
          e.currentTarget.style.cursor = "grabbing"
        }}
        onPointerMove={(e) => {
          if (pointerStart.current !== null) {
            dragOffset.current = (e.clientX - pointerStart.current) / 200
          }
        }}
        onPointerUp={release}
        onPointerLeave={release}
        onPointerCancel={release}
      />
    </div>
  )
}
