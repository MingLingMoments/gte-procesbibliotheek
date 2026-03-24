export default function GteLogo({ className = "h-10 w-auto" }) {
  return (
    <svg className={className} viewBox="0 0 120 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Yellow arrow (top-left) */}
      <polygon points="35,5 65,55 50,55 20,5" fill="#F6DD00" />
      <polygon points="20,5 35,5 50,55 35,55" fill="#E5CC00" />
      {/* Dark green arrow (top-right) */}
      <polygon points="55,10 95,80 80,80 40,10" fill="#008948" />
      <polygon points="40,10 55,10 80,80 65,80" fill="#006B38" />
      {/* Light green arrow (bottom) */}
      <polygon points="10,60 25,60 55,95 40,95" fill="#5BB446" />
      <polygon points="25,60 55,95 70,95 40,60" fill="#4DA33B" />
      {/* Overlap connectors */}
      <polygon points="35,35 50,55 35,55" fill="#3D8C30" opacity="0.6" />
      <polygon points="55,55 65,70 50,70" fill="#008948" opacity="0.4" />
    </svg>
  )
}
