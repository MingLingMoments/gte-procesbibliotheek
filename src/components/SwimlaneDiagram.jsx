import { useTheme } from '../context/ThemeContext'

const LANE_HEIGHT = 100
const STEP_WIDTH = 180
const STEP_HEIGHT = 52
const STEP_GAP = 40
const LANE_LABEL_WIDTH = 160
const PADDING = 24
const DIAMOND_SIZE = 38
const ARROW_HEAD = 8

const colorMap = {
  blue: { bg: '#DBEAFE', border: '#3B82F6', lane: '#EFF6FF', text: '#1E40AF' },
  pink: { bg: '#FCE7F3', border: '#EC4899', lane: '#FDF2F8', text: '#9D174D' },
  teal: { bg: '#CCFBF1', border: '#14B8A6', lane: '#F0FDFA', text: '#115E59' },
  amber: { bg: '#FEF3C7', border: '#F59E0B', lane: '#FFFBEB', text: '#92400E' },
  purple: { bg: '#EDE9FE', border: '#8B5CF6', lane: '#F5F3FF', text: '#5B21B6' },
}

const darkColorMap = {
  blue: { bg: '#1E3A5F', border: '#3B82F6', lane: '#172237', text: '#93C5FD' },
  pink: { bg: '#4A1942', border: '#EC4899', lane: '#2D1228', text: '#F9A8D4' },
  teal: { bg: '#134E4A', border: '#14B8A6', lane: '#0F2D2B', text: '#5EEAD4' },
  amber: { bg: '#4A3728', border: '#F59E0B', lane: '#2D2218', text: '#FCD34D' },
  purple: { bg: '#3B2670', border: '#8B5CF6', lane: '#251748', text: '#C4B5FD' },
}

function wrapText(text, maxChars) {
  const words = text.split(' ')
  const lines = []
  let current = ''
  for (const word of words) {
    if (current && (current + ' ' + word).length > maxChars) {
      lines.push(current)
      current = word
    } else {
      current = current ? current + ' ' + word : word
    }
  }
  if (current) lines.push(current)
  return lines
}

export default function SwimlaneDiagram({ lanes }) {
  const { dark } = useTheme()
  const palette = dark ? darkColorMap : colorMap
  const maxSteps = Math.max(...lanes.map((l) => l.steps.length))
  const svgWidth = LANE_LABEL_WIDTH + PADDING * 2 + maxSteps * (STEP_WIDTH + STEP_GAP)
  const svgHeight = lanes.length * LANE_HEIGHT + PADDING * 2
  const arrowColor = dark ? '#64748B' : '#94A3B8'
  const laneStroke = dark ? '#374151' : '#E2E8F0'

  return (
    <div className="overflow-x-auto rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-[#1f1f1f]">
      <svg
        viewBox={`0 0 ${svgWidth} ${svgHeight}`}
        width={svgWidth}
        height={svgHeight}
        className="min-w-full"
        style={{ minWidth: svgWidth }}
      >
        <defs>
          <marker
            id="arrowhead"
            markerWidth={ARROW_HEAD}
            markerHeight={ARROW_HEAD}
            refX={ARROW_HEAD}
            refY={ARROW_HEAD / 2}
            orient="auto"
          >
            <polygon
              points={`0 0, ${ARROW_HEAD} ${ARROW_HEAD / 2}, 0 ${ARROW_HEAD}`}
              fill={arrowColor}
            />
          </marker>
        </defs>

        {lanes.map((lane, laneIdx) => {
          const colors = palette[lane.color] || palette.blue
          const y = PADDING + laneIdx * LANE_HEIGHT

          return (
            <g key={laneIdx}>
              {/* Lane background */}
              <rect
                x={0}
                y={y}
                width={svgWidth}
                height={LANE_HEIGHT}
                fill={colors.lane}
                stroke={laneStroke}
                strokeWidth={1}
              />
              {/* Lane label */}
              <rect
                x={0}
                y={y}
                width={LANE_LABEL_WIDTH}
                height={LANE_HEIGHT}
                fill={colors.bg}
                stroke={colors.border}
                strokeWidth={1}
              />
              <text
                x={LANE_LABEL_WIDTH / 2}
                y={y + LANE_HEIGHT / 2}
                textAnchor="middle"
                dominantBaseline="central"
                fill={colors.text}
                fontSize={13}
                fontWeight={600}
              >
                {lane.role}
              </text>

              {/* Steps */}
              {lane.steps.map((step, stepIdx) => {
                const cx =
                  LANE_LABEL_WIDTH +
                  PADDING +
                  stepIdx * (STEP_WIDTH + STEP_GAP) +
                  STEP_WIDTH / 2
                const cy = y + LANE_HEIGHT / 2
                const lines = wrapText(step.label, 22)

                return (
                  <g key={stepIdx}>
                    {/* Connector arrow */}
                    {stepIdx > 0 && (
                      <line
                        x1={cx - STEP_WIDTH / 2 - STEP_GAP + (step.type === 'decision' ? DIAMOND_SIZE / 2 : 0)}
                        y1={cy}
                        x2={cx - STEP_WIDTH / 2 + 4}
                        y2={cy}
                        stroke={arrowColor}
                        strokeWidth={1.5}
                        markerEnd="url(#arrowhead)"
                      />
                    )}

                    {step.type === 'decision' ? (
                      <>
                        <rect
                          x={cx - DIAMOND_SIZE}
                          y={cy - DIAMOND_SIZE / 2}
                          width={DIAMOND_SIZE * 2}
                          height={DIAMOND_SIZE}
                          rx={4}
                          fill={colors.bg}
                          stroke={colors.border}
                          strokeWidth={1.5}
                          strokeDasharray="6 3"
                        />
                        {lines.map((line, i) => (
                          <text
                            key={i}
                            x={cx}
                            y={cy + (i - (lines.length - 1) / 2) * 13}
                            textAnchor="middle"
                            dominantBaseline="central"
                            fontSize={10}
                            fill={colors.text}
                            fontWeight={500}
                          >
                            {line}
                          </text>
                        ))}
                      </>
                    ) : step.type === 'start' ? (
                      <>
                        <rect
                          x={cx - STEP_WIDTH / 2}
                          y={cy - STEP_HEIGHT / 2}
                          width={STEP_WIDTH}
                          height={STEP_HEIGHT}
                          rx={STEP_HEIGHT / 2}
                          fill={colors.border}
                          stroke={colors.border}
                          strokeWidth={1.5}
                        />
                        {lines.map((line, i) => (
                          <text
                            key={i}
                            x={cx}
                            y={cy + (i - (lines.length - 1) / 2) * 14}
                            textAnchor="middle"
                            dominantBaseline="central"
                            fontSize={11}
                            fill="white"
                            fontWeight={600}
                          >
                            {line}
                          </text>
                        ))}
                      </>
                    ) : (
                      <>
                        <rect
                          x={cx - STEP_WIDTH / 2}
                          y={cy - STEP_HEIGHT / 2}
                          width={STEP_WIDTH}
                          height={STEP_HEIGHT}
                          rx={8}
                          fill={colors.bg}
                          stroke={colors.border}
                          strokeWidth={1.5}
                        />
                        {lines.map((line, i) => (
                          <text
                            key={i}
                            x={cx}
                            y={cy + (i - (lines.length - 1) / 2) * 14}
                            textAnchor="middle"
                            dominantBaseline="central"
                            fontSize={11}
                            fill={colors.text}
                            fontWeight={500}
                          >
                            {line}
                          </text>
                        ))}
                      </>
                    )}
                  </g>
                )
              })}
            </g>
          )
        })}
      </svg>
    </div>
  )
}
