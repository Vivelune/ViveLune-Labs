import React from 'react'

interface Props {
  className?: string; // Prop for external width/height management
}

/**
 * WebinarThumbnail - A premium-feeling fallback for missing pictures.
 * Styling: Ultra-dark, subtle gradient, and minimal placeholder content.
 */
const WebinarThumbnail: React.FC<Props> = ({ className = "" }) => {
  return (
    <div className={`
      relative
      aspect-[16/9] /* Enforce a specific aspect ratio */
      border border-border/10
      rounded-md
      overflow-hidden
      bg-[#121212] /* Deep background */
      /* Apply outer classes last to override defaults if needed */
      ${className}
    `}>
      {/* 1. Subtle Radial Gradient Background */}
      <div className="absolute inset-0 z-0 bg-radial-gradient from-[#1c1c1c] via-black/10 to-[#0A0A0A] opacity-60"></div>

      {/* 2. Glassmorphism Top Layer (Subtle shine) */}
      <div className="absolute inset-x-0 top-0 h-1/3 z-10 bg-gradient-to-b from-white/5 to-transparent"></div>

      {/* 3. Central Premium Placeholder Element */}
      <div className="absolute inset-0 z-20 flex flex-col items-center justify-center gap-4">
        {/* Decorative Circle: Soft outline, implies a main focus */}
        <div className="w-16 h-16 rounded-full border border-white/10 flex items-center justify-center p-3">
          {/* Internal gradient to make it look 'glowing' or deep */}
          <div className="w-full h-full rounded-full bg-radial-gradient from-white/10 via-black to-black"></div>
        </div>

        {/* Minimal text to hint at Academia / Private content */}
        <div className="text-center space-y-1">
          <p className="text-white/50 text-[11px] font-medium tracking-wide uppercase">
            MEMBERS EXCLUSIVE
          </p>
          <p className="text-white/30 text-[10px] font-normal tracking-tight">
            VIVELUNE LABS
          </p>
        </div>
      </div>
    </div>
  )
}

export default WebinarThumbnail