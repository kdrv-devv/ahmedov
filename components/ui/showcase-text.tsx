"use client"

import { motion } from "motion/react"
import { useEffect, useRef, useState } from "react"

interface TextHoverEffectProps {
  text: string
  duration?: number
}

export const TextHoverEffect: React.FC<TextHoverEffectProps> = ({
  text,
  duration = 0.4,
}) => {
  const svgRef = useRef<SVGSVGElement | null>(null)
  const [cursor, setCursor] = useState({ x: 0, y: 0 })
  const [hovered, setHovered] = useState(false)
  const [maskPosition, setMaskPosition] = useState({ cx: "50%", cy: "50%" })

  useEffect(() => {
    if (!svgRef.current) return

    const svgRect = svgRef.current.getBoundingClientRect()

    const cxPercentage = ((cursor.x - svgRect.left) / svgRect.width) * 100
    const cyPercentage = ((cursor.y - svgRect.top) / svgRect.height) * 100

    setMaskPosition({
      cx: `${cxPercentage}%`,
      cy: `${cyPercentage}%`,
    })
  }, [cursor])

  return (
    <svg
      ref={svgRef}
      viewBox="0 0 300 100"
      width="100%"
      height="100%"
      className="select-none"
      role="img"
      aria-label={text}
      xmlns="http://www.w3.org/2000/svg"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onMouseMove={(e) =>
        setCursor({ x: e.clientX, y: e.clientY })
      }
    >
      <defs>
        <linearGradient
          id="textGradient"
          cx="50%"
          cy="50%"
          r="25%"
          gradientUnits="userSpaceOnUse"
        >
          {hovered && (
            <>
              <stop offset="0%" stopColor="#eab308" />
              <stop offset="25%" stopColor="#ef4444" />
              <stop offset="50%" stopColor="#3b82f6" />
              <stop offset="75%" stopColor="#06b6d4" />
              <stop offset="100%" stopColor="#8b5cf6" />
            </>
          )}
        </linearGradient>

        <motion.radialGradient
          id="revealMask"
          r="20%"
          gradientUnits="userSpaceOnUse"
          initial={{ cx: "50%", cy: "50%" }}
          animate={maskPosition}
          transition={{ duration, ease: "easeOut" }}
        >
          <stop offset="0%" stopColor="white" />
          <stop offset="100%" stopColor="black" />
        </motion.radialGradient>

        <mask id="textMask">
          <rect width="100%" height="100%" fill="url(#revealMask)" />
        </mask>
      </defs>

      {/* Outline */}
      <motion.text
        x="50%"
        y="50%"
        textAnchor="middle"
        dominantBaseline="middle"
        strokeWidth="0.3"
        initial={{ strokeDashoffset: 1000, strokeDasharray: 1000 }}
        animate={{ strokeDashoffset: 0 }}
        transition={{ duration: 4, ease: "easeInOut" }}
        className={`fill-transparent  font-bold ${
          hovered ? "stroke-transparent" : "stroke-gray-400"
        }`}
      >
        {text}
      </motion.text>

      {/* Gradient Reveal */}
      <text
        x="50%"
        y="50%"
        textAnchor="middle"
        dominantBaseline="middle"
        mask="url(#textMask)"
        stroke="url(#textGradient)"
        strokeWidth="0.3"
        className="fill-transparent text-7xl font-bold"
      >
        {text}
      </text>
    </svg>
  )
}

export default TextHoverEffect